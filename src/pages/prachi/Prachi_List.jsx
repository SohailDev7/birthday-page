import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Dropdown, Spinner, ButtonGroup, Modal } from 'react-bootstrap';
import { useTheme } from '../../context/ThemeContext';
import { Settings, RefreshCw, Grid, List, Search, Filter, AlertTriangle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

import AddMovieModal from '../../components/AddMovieModal';
import AdminPanel from '../../components/AdminPanel';
import FullReviewModal from '../../components/FullReviewModal';
import MovieCard from '../../components/MovieCard';

import '../css/Prachi_List.css';

const Prachi_List = () => {
  const { currentTheme } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showFullReview, setShowFullReview] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [serverDown, setServerDown] = useState(false);
  const [wakingServer, setWakingServer] = useState(false);
  const [showServerModal, setShowServerModal] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking'); 

  const forSoilRef = useRef(null);
  const forPrachiRef = useRef(null);
  const allMoviesRef = useRef(null);

  const API_BASE_URL = 'https://express-umdy.onrender.com/api';
  const SERVER_URL = 'https://express-umdy.onrender.com';

  const [formData, setFormData] = useState({
    movieName: '',
    summary: '',
    whatYouWillLike: '',
    soilScore: 3,
    targetAudience: 'For Soil',
    myLetterboxdReview: '',
    watched: 'not watched',
    posterUrl: '',
    myReview: '',
    watchLink: ''
  });

  const checkServerStatus = async (timeout = 10000) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.error('Server health check failed:', error);
      return false;
    }
  };

  const wakeUpServer = async () => {
    setWakingServer(true);
    setServerStatus('checking');

    try {
      
      console.log('Pinging server to wake it up...');
      await fetch(SERVER_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => { }); 

      window.open(SERVER_URL, '_blank');

      let attempts = 0;
      const maxAttempts = 12; 

      const attemptWakeUp = async () => {
        attempts++;
        console.log(`Wake-up attempt ${attempts}/${maxAttempts}`);

        const isServerUp = await checkServerStatus(5000);

        if (isServerUp) {
          setServerStatus('active');
          setServerDown(false);
          setWakingServer(false);

          setTimeout(() => {
            setShowServerModal(false);
            
            loadMovies();
          }, 1500);

          return;
        }

        if (attempts < maxAttempts) {
          setServerStatus('waking');
          
          setTimeout(attemptWakeUp, 5000);
        } else {
          setServerStatus('sleeping');
          setWakingServer(false);
          alert('Server is taking longer than expected to wake up. Please try again in a moment.');
        }
      };

      setTimeout(attemptWakeUp, 3000);

    } catch (error) {
      console.error('Error waking server:', error);
      setServerStatus('sleeping');
      setWakingServer(false);
      alert('Error trying to wake server. Please try again.');
    }
  };

  const loadMovies = async () => {
    try {
      setLoading(true);
      setServerDown(false);

      const loadTimeout = setTimeout(() => {
        console.log('Movie loading timeout reached - showing server wake modal');
        setServerDown(true);
        setShowServerModal(true);
        setLoading(false);
      }, 15000);

      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(loadTimeout);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      setMovies(result.data || []);

    } catch (error) {
      console.error('Failed to load movies:', error);
      clearTimeout(loadTimeout);

      const isServerUp = await checkServerStatus(5000);
      if (!isServerUp) {
        setServerDown(true);
        setShowServerModal(true);
      } else {
        alert('🚨 Error loading movies. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveMovie = async (movieData, isEdit = false) => {
    try {
      const url = isEdit ? `${API_BASE_URL}/movies/${editingMovie._id}` : `${API_BASE_URL}/movies`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to save movie:', error);

      const isServerUp = await checkServerStatus();
      if (!isServerUp) {
        setServerDown(true);
        setShowServerModal(true);
        throw new Error('Server is down. Please wake it up first.');
      } else {
        alert('🚨 Server Error: Cannot save movie');
        throw error;
      }
    }
  };

  const deleteMovie = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete movie:', error);

      const isServerUp = await checkServerStatus();
      if (!isServerUp) {
        setServerDown(true);
        setShowServerModal(true);
        throw new Error('Server is down. Please wake it up first.');
      } else {
        alert('🚨 Server Error: Cannot delete movie');
        throw error;
      }
    }
  };

  const toggleWatched = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}/toggle-watched`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to toggle watched status:', error);

      const isServerUp = await checkServerStatus();
      if (!isServerUp) {
        setServerDown(true);
        setShowServerModal(true);
        throw new Error('Server is down. Please wake it up first.');
      } else {
        alert('🚨 Server Error: Cannot update status');
        throw error;
      }
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      
      const isServerUp = await checkServerStatus(10000);
      if (!isServerUp) {
        setServerDown(true);
        setShowServerModal(true);
        setLoading(false);
      } else {
        
        await loadMovies();
      }
    };

    initializeApp();
  }, []);

  const handleAddMovie = async () => {
    try {
      const result = await saveMovie(formData);
      setMovies(prev => [result.data, ...prev]);
      handleCloseModals();
    } catch (error) {
      
    }
  };

  const handleEditMovie = async () => {
    try {
      const result = await saveMovie(formData, true);
      setMovies(prev => prev.map(movie =>
        movie._id === editingMovie._id ? result.data : movie
      ));
      handleCloseModals();
    } catch (error) {
      
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return;

    try {
      await deleteMovie(movieId);
      setMovies(prev => prev.filter(movie => movie._id !== movieId));
    } catch (error) {
      
    }
  };

  const handleToggleWatched = async (movieId) => {
    try {
      await toggleWatched(movieId);
      setMovies(prev => prev.map(movie =>
        movie._id === movieId
          ? { ...movie, watched: movie.watched === 'watched' ? 'not watched' : 'watched' }
          : movie
      ));
    } catch (error) {
      
    }
  };

  const handleCloseModals = () => {
    setShowAddMovie(false);
    setShowAdmin(false);
    setEditingMovie(null);
    resetForm();
  };

  const startEditMovie = (movie) => {
    setEditingMovie(movie);
    setFormData({
      movieName: movie.movieName || '',
      summary: movie.summary || '',
      whatYouWillLike: movie.whatYouWillLike || '',
      soilScore: movie.soilScore || 3,
      targetAudience: movie.targetAudience || 'For Soil',
      myLetterboxdReview: movie.myLetterboxdReview || '',
      watched: movie.watched || 'not watched',
      posterUrl: movie.posterUrl || '',
      myReview: movie.myReview || '',
      watchLink: movie.watchLink || ''
    });
    setShowAdmin(false);
    setShowAddMovie(true);
  };

  const resetForm = () => {
    setFormData({
      movieName: '',
      summary: '',
      whatYouWillLike: '',
      soilScore: 3,
      targetAudience: 'For Soil',
      myLetterboxdReview: '',
      watched: 'not watched',
      posterUrl: '',
      myReview: '',
      watchLink: ''
    });
  };

  const scrollLeft = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const filteredMovies = movies
    .filter(movie => {
      const matchesFilter = filter === 'all' ||
        (filter === 'for-soil' && movie.targetAudience === 'For Soil') ||
        (filter === 'for-prachi' && movie.targetAudience === 'For Prachi') ||
        (filter === 'watched' && movie.watched === 'watched') ||
        (filter === 'not-watched' && movie.watched === 'not watched');

      const matchesSearch = movie.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.summary.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      
      if (a.watched === 'not watched' && b.watched === 'watched') return -1;
      if (a.watched === 'watched' && b.watched === 'not watched') return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const forSoilMovies = movies
    .filter(movie => movie.targetAudience === 'For Soil')
    .sort((a, b) => {
      
      if (a.watched === 'not watched' && b.watched === 'watched') return -1;
      if (a.watched === 'watched' && b.watched === 'not watched') return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const forPrachiMovies = movies
    .filter(movie => movie.targetAudience === 'For Prachi')
    .sort((a, b) => {
      
      if (a.watched === 'not watched' && b.watched === 'watched') return -1;
      if (a.watched === 'watched' && b.watched === 'not watched') return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const needsHorizontalScroll = (movies) => viewMode === 'grid' && movies.length > 4;

  const HorizontalMovieSection = forwardRef(({ title, movies, badgeColor }, ref) => {
    if (movies.length === 0) return null;

    const unwatchedCount = movies.filter(movie => movie.watched === 'not watched').length;

    if (viewMode === 'list') {
      return (
        <div className="movies-section">
          <div className="section-header-modern">
            <div className="section-title-modern">
              <h2>{title}</h2>
              <div className="section-badge">{movies.length} movies</div>
            </div>
            <div className="section-stats-modern">
              {unwatchedCount > 0 && (
                <div className="priority-badge">
                  ⭐ {unwatchedCount} unwatched
                </div>
              )}
            </div>
          </div>

          <div>
            {movies
              .filter(movie => movie.movieName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(movie => (
                <div key={movie._id} className="mb-3">
                  <MovieCard
                    movie={movie}
                    viewMode="list"
                    onToggleWatched={handleToggleWatched}
                    onCardClick={setShowFullReview}
                  />
                </div>
              ))
            }
          </div>
        </div>
      );
    }

    return (
      <div className="movies-section">
        <div className="section-header-modern">
          <div className="section-title-modern">
            <h2>{title}</h2>
            <div className="section-badge">{movies.length} movies</div>
          </div>
          <div className="section-stats-modern">
            {unwatchedCount > 0 && (
              <div className="priority-badge">
                ⭐ {unwatchedCount} unwatched
              </div>
            )}
          </div>
        </div>

        {needsHorizontalScroll(movies) ? (
          
          <div className="horizontal-scroll-section-modern">
            <div className="scroll-container-modern">
              <button
                className="scroll-btn-modern scroll-left-modern"
                onClick={() => scrollLeft(ref)}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="horizontal-scroll-content-modern" ref={ref}>
                <div className="horizontal-movies-grid">
                  {movies
                    .filter(movie => movie.movieName.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(movie => (
                      <div key={movie._id} className="horizontal-movie-item-modern">
                        <MovieCard
                          movie={movie}
                          viewMode="grid"
                          onToggleWatched={handleToggleWatched}
                          onCardClick={setShowFullReview}
                        />
                      </div>
                    ))
                  }
                </div>
              </div>

              <button
                className="scroll-btn-modern scroll-right-modern"
                onClick={() => scrollRight(ref)}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {movies
              .filter(movie => movie.movieName.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(movie => (
                <div key={movie._id} className="col">
                  <MovieCard
                    movie={movie}
                    viewMode="grid"
                    onToggleWatched={handleToggleWatched}
                    onCardClick={setShowFullReview}
                  />
                </div>
              ))
            }
          </div>
        )}
      </div>
    );
  });

  HorizontalMovieSection.displayName = 'HorizontalMovieSection';

  const RegularMovieSection = ({ movies }) => {
    if (movies.length === 0) return null;

    return (
      <div>
        {viewMode === 'list' ? (
          
          <div>
            {movies.map(movie => (
              <div key={movie._id} className="mb-3">
                <MovieCard
                  movie={movie}
                  viewMode="list"
                  onToggleWatched={handleToggleWatched}
                  onCardClick={setShowFullReview}
                />
              </div>
            ))}
          </div>
        ) : (
          
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {movies.map(movie => (
              <div key={movie._id} className="col">
                <MovieCard
                  movie={movie}
                  viewMode="grid"
                  onToggleWatched={handleToggleWatched}
                  onCardClick={setShowFullReview}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`prachi-list-page ${currentTheme}`} data-theme={currentTheme}>
      {}
      <Modal show={showServerModal} onHide={() => setShowServerModal(false)} centered className="server-wake-modal">
        <Modal.Header closeButton className="bg-warning text-dark">
          <Modal.Title>
            <AlertTriangle size={24} className="me-2" />
            Server Asleep 😴
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="display-1 mb-3">🌙</div>
            <h5 className="mb-3">Free Server Hosting Limitations</h5>
            <p className="text-muted mb-4">
              I didn't have money to buy a server, so I'm using a free server hoster that goes down every 20 minutes if unused.
            </p>
            <div className="alert alert-info">
              <strong>Click the "Wake Up Server" button and stay on the page that opens until it says "Server Active".</strong>
              <br />
              Then come back to this page and click "Refresh Movies".
            </div>

            {}
            {serverStatus === 'checking' && (
              <div className="mt-3">
                <Spinner animation="border" size="sm" className="me-2" />
                <span>Checking server status...</span>
              </div>
            )}

            {serverStatus === 'waking' && (
              <div className="mt-3 text-warning">
                <Spinner animation="border" size="sm" className="me-2" />
                <span>Waking up server... This can take up to 60 seconds</span>
              </div>
            )}

            {serverStatus === 'active' && (
              <div className="mt-3 text-success">
                <strong>✅ Server Active!</strong>
                <br />
                <small>You can now close the server tab and return here.</small>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={wakeUpServer}
            disabled={wakingServer || serverStatus === 'active'}
            className="w-100 py-2 fw-bold"
          >
            {wakingServer ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {serverStatus === 'waking' ? 'Waking Server...' : 'Starting...'}
              </>
            ) : serverStatus === 'active' ? (
              '✅ Server Ready!'
            ) : (
              <>
                <ExternalLink size={16} className="me-2" />
                Wake Up Server
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {}
      <button
        className="admin-floating-btn-modern"
        onClick={() => setShowAdmin(true)}
      >
        <Settings size={24} />
      </button>

      <div className="prachi-list-container">
        {}
        <div className="prachi-header">
          <h1 className="prachi-title">🎬 Pringles Cinema List</h1>
          <p className="prachi-subtitle">Made for sharing each other movies</p>

          <div className="prachi-header-actions">
            {serverDown && (
              <div className="server-status-alert">
                <AlertTriangle size={16} className="me-2" />
                Server is sleeping. Some features may not work.
                <button
                  className="btn btn-outline-warning btn-sm ms-2"
                  onClick={() => setShowServerModal(true)}
                >
                  Wake Up
                </button>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="controls-section">
          <div className="controls-card">
            <div className="controls-grid">
              {}
              <div className="search-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {}
              <div className="filter-dropdown">
                <select
                  className="filter-toggle"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Movies</option>
                  <option value="for-soil">For Soil</option>
                  <option value="for-prachi">For Prachi</option>
                  <option value="watched">Watched</option>
                  <option value="not-watched">Not Watched</option>
                </select>
              </div>

              {}
              <div className="view-toggle-group">
                <button
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={16} /> Grid
                </button>
                <button
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <List size={16} /> List
                </button>
              </div>

              {}
              <button
                className="refresh-btn-modern"
                onClick={loadMovies}
                disabled={loading}
              >
                <RefreshCw size={16} /> Refresh
              </button>
            </div>
          </div>
        </div>

        {}
        {loading && (
          <div className="loading-state-modern">
            <div className="loading-spinner"></div>
            <p>Loading movies from server...</p>
            <small className="text-muted">This may take a moment if the server is waking up</small>
          </div>
        )}

        {}
        {serverDown && !loading && (
          <div className="empty-state-modern">
            <div className="empty-icon">😴</div>
            <h4>Server is Sleeping</h4>
            <p className="text-muted mb-4">
              The backend server needs to be woken up before loading movies.
            </p>
            <button
              className="refresh-btn-modern"
              onClick={() => setShowServerModal(true)}
            >
              <ExternalLink size={16} className="me-2" />
              Wake Up Server
            </button>
          </div>
        )}

        {}
        {!loading && !serverDown && (
          <>
            {}
            {forPrachiMovies.length > 0 && (filter === 'all' || filter === 'for-prachi') && (
              <HorizontalMovieSection
                title="🌸 For Prachi's Watchlist"
                movies={forPrachiMovies}
                badgeColor="pink"
                ref={forPrachiRef}
              />
            )}

            {}
            {forSoilMovies.length > 0 && (filter === 'all' || filter === 'for-soil') && (
              <HorizontalMovieSection
                title="🍿 For Soil's Watchlist"
                movies={forSoilMovies}
                badgeColor="primary"
                ref={forSoilRef}
              />
            )}

            {}
            {filteredMovies.length > 0 && (
              <div className="movies-section">
                <div className="section-header-modern">
                  <h2 className="section-title-modern">
                    {filter === 'all' ? 'All Movies' :
                      filter === 'for-soil' ? 'For Soil' :
                        filter === 'for-prachi' ? 'For Prachi' :
                          filter === 'watched' ? 'Watched Movies' : 'Movies to Watch'}
                  </h2>
                  <div className="section-badge">{filteredMovies.length} movies</div>
                </div>

                <RegularMovieSection movies={filteredMovies} />
              </div>
            )}

            {filteredMovies.length === 0 && (
              <div className="empty-state-modern">
                <div className="empty-icon">🎭</div>
                <h4>No movies found</h4>
                <p>Try changing your filters or search terms</p>
              </div>
            )}
          </>
        )}
      </div>

      {}
      <AddMovieModal
        show={showAddMovie}
        onHide={handleCloseModals}
        editingMovie={editingMovie}
        onSubmit={editingMovie ? handleEditMovie : handleAddMovie}
        formData={formData}
        onFormChange={setFormData}
      />

      <AdminPanel
        show={showAdmin}
        onHide={() => setShowAdmin(false)}
        movies={movies}
        loading={loading}
        forSoilMovies={forSoilMovies}
        viewMode={viewMode}
        onAddMovie={() => { setShowAddMovie(true); setShowAdmin(false); }}
        onRefresh={loadMovies}
      >
        {movies.map(movie => (
          <div key={movie._id} className={viewMode === 'list' ? 'mb-3' : 'col'}>
            <MovieCard
              movie={movie}
              viewMode={viewMode}
              showActions={true}
              onToggleWatched={handleToggleWatched}
              onEdit={startEditMovie}
              onDelete={handleDeleteMovie}
              onCardClick={setShowFullReview}
              showAdminActions={true}
            />
          </div>
        ))}
      </AdminPanel>

      <FullReviewModal
        movie={showFullReview}
        onClose={() => setShowFullReview(null)}
      />
    </div>
  );
};

export default Prachi_List;