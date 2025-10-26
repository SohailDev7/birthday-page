import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, ListGroup, Spinner, Alert, Badge, Tabs, Tab } from 'react-bootstrap';
import { Search, Film, Tv, Star, Calendar, X } from 'lucide-react';

const AddMovieModal = ({ 
  show, 
  onHide, 
  editingMovie, 
  onSubmit, 
  formData, 
  onFormChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [searchType, setSearchType] = useState('movie'); // 'movie' or 'tv'

  // TMDB API Configuration
  const TMDB_API_KEY = 'ca3a0e8f666474fba42197776b8fd9a0'; // Get from https://www.themoviedb.org/settings/api
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
  const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

  // Reset state when modal opens/closes
  useEffect(() => {
    if (show) {
      setSearchQuery('');
      setSearchResults([]);
      setSelectedContent(null);
      setSearchError('');
      setSearchType('movie');
    }
  }, [show]);

  // Search movies or TV shows with debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const searchContent = async () => {
      setIsSearching(true);
      setSearchError('');
      
      try {
        const endpoint = searchType === 'movie' ? 'search/movie' : 'search/tv';
        const response = await fetch(
          `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}&language=en-US&page=1&include_adult=false`
        );
        
        if (!response.ok) {
          throw new Error('Failed to search');
        }
        
        const data = await response.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchError('Failed to search. Please try again.');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchContent, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchType]);

  // Fetch details when content is selected
  const fetchContentDetails = async (contentId) => {
    setIsLoadingDetails(true);
    setSearchError('');
    
    try {
      const endpoint = searchType === 'movie' ? 'movie' : 'tv';
      const response = await fetch(
        `${TMDB_BASE_URL}/${endpoint}/${contentId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch details');
      }
      
      const contentData = await response.json();
      
      // Fill title, poster, and summary based on type
      const contentInfo = {
        movieName: searchType === 'movie' ? contentData.title : contentData.name,
        posterUrl: contentData.poster_path ? `${TMDB_IMAGE_BASE}${contentData.poster_path}` : '',
        summary: contentData.overview || 'No summary available.'
      };
      
      onFormChange(prev => ({
        ...prev,
        ...contentInfo
      }));
      
      setSelectedContent({
        ...contentData,
        type: searchType,
        displayTitle: searchType === 'movie' ? contentData.title : contentData.name
      });
      setSearchResults([]);
      setSearchQuery('');
      
    } catch (error) {
      console.error('Error fetching details:', error);
      setSearchError('Failed to load details. Please try again.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleInputChange = (field, value) => {
    onFormChange(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const clearSelection = () => {
    setSelectedContent(null);
    onFormChange(prev => ({
      ...prev,
      movieName: '',
      posterUrl: '',
      summary: ''
    }));
  };

  const getContentTypeBadge = (type) => {
    return type === 'movie' ? 
      { label: '🎬 Movie', variant: 'primary' } : 
      { label: '📺 TV Series', variant: 'info' };
  };

  const getReleaseYear = (content) => {
    if (searchType === 'movie') {
      return content.release_date ? new Date(content.release_date).getFullYear() : 'Unknown year';
    } else {
      return content.first_air_date ? new Date(content.first_air_date).getFullYear() : 'Unknown year';
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="add-movie-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          {editingMovie ? '✏️ Edit Content' : '🎬 Add New Content'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Content Search Section */}
        {!editingMovie && (
          <div className="content-search-section mb-4">
            <Form.Group className="mb-3">
              <Form.Label>
                <Search size={16} className="me-2" />
                Search for Movies or TV Series (Auto-fills title, poster & summary)
              </Form.Label>
              
              {/* Search Type Tabs */}
              <Tabs
                activeKey={searchType}
                onSelect={(key) => setSearchType(key)}
                className="mb-3 search-type-tabs"
              >
                <Tab eventKey="movie" title={
                  <span>
                    <Film size={14} className="me-1" />
                    Movies
                  </span>
                }>
                  {/* Movie search content */}
                </Tab>
                <Tab eventKey="tv" title={
                  <span>
                    <Tv size={14} className="me-1" />
                    TV Series
                  </span>
                }>
                  {/* TV search content */}
                </Tab>
              </Tabs>

              <div className="search-input-container">
                <Form.Control
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Type ${searchType === 'movie' ? 'movie' : 'TV series'} name to search (min. 2 characters)...`}
                  className="content-search-input"
                />
                {isSearching && (
                  <div className="search-spinner">
                    <Spinner animation="border" size="sm" />
                  </div>
                )}
              </div>
              
              {searchError && (
                <Alert variant="danger" className="mt-2 py-2">
                  {searchError}
                </Alert>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="search-results-container mt-2">
                  <div className="search-results-header small text-muted mb-2">
                    Found {searchResults.length} {searchType === 'movie' ? 'movies' : 'TV series'}
                  </div>
                  <ListGroup>
                    {searchResults.slice(0, 6).map(content => (
                      <ListGroup.Item
                        key={content.id}
                        className="search-result-item"
                        onClick={() => fetchContentDetails(content.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-center">
                          {content.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${content.poster_path}`}
                              alt={searchType === 'movie' ? content.title : content.name}
                              className="search-poster me-3"
                              style={{ width: '40px', height: '60px', objectFit: 'cover' }}
                            />
                          ) : (
                            <div className="search-poster-placeholder me-3">
                              {searchType === 'movie' ? <Film size={20} /> : <Tv size={20} />}
                            </div>
                          )}
                          
                          <div className="flex-grow-1">
                            <div className="fw-bold">
                              {searchType === 'movie' ? content.title : content.name}
                            </div>
                            <div className="text-muted small">
                              {getReleaseYear(content)}
                              {content.vote_average > 0 && ` • ⭐ ${content.vote_average.toFixed(1)}`}
                            </div>
                            {searchType === 'tv' && content.first_air_date && (
                              <div className="text-muted small">
                                First aired: {new Date(content.first_air_date).getFullYear()}
                              </div>
                            )}
                          </div>
                          
                          <Badge 
                            bg={searchType === 'movie' ? 'primary' : 'info'} 
                            className="content-type-badge"
                          >
                            {searchType === 'movie' ? '🎬' : '📺'}
                          </Badge>
                          
                          {isLoadingDetails && (
                            <Spinner animation="border" size="sm" className="ms-2" />
                          )}
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}
            </Form.Group>
            
            {!selectedContent && (
              <div className="text-center text-muted mb-3">
                <small>— OR manually fill the form below —</small>
              </div>
            )}
          </div>
        )}

        {/* Selected Content Info */}
        {selectedContent && !editingMovie && (
          <div className="selected-content-info mb-4 p-3 border rounded bg-light">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h6 className="mb-0 text-success">✅ Content Details Auto-filled!</h6>
                <Badge 
                  bg={getContentTypeBadge(selectedContent.type).variant}
                  className="mt-1"
                >
                  {getContentTypeBadge(selectedContent.type).label}
                </Badge>
              </div>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={clearSelection}
                className="clear-selection-btn"
              >
                <X size={14} />
              </Button>
            </div>
            <div className="d-flex mt-2">
              {selectedContent.poster_path && (
                <img
                  src={`${TMDB_IMAGE_BASE}${selectedContent.poster_path}`}
                  alt={selectedContent.displayTitle}
                  className="selected-poster me-3"
                  style={{ width: '60px', height: '90px', objectFit: 'cover', borderRadius: '4px' }}
                />
              )}
              <div className="flex-grow-1">
                <h6 className="mb-1">{selectedContent.displayTitle}</h6>
                <div className="small text-muted">
                  {selectedContent.release_date || selectedContent.first_air_date ? (
                    <span className="me-2">
                      <Calendar size={12} className="me-1" />
                      {new Date(selectedContent.release_date || selectedContent.first_air_date).getFullYear()}
                    </span>
                  ) : null}
                  {selectedContent.vote_average > 0 && (
                    <span>
                      <Star size={12} className="me-1" />
                      {selectedContent.vote_average.toFixed(1)}/10
                    </span>
                  )}
                </div>
                {selectedContent.overview && (
                  <div className="small text-muted mt-1">
                    {selectedContent.overview.substring(0, 120)}...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Content Name *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.movieName}
                  onChange={(e) => handleInputChange('movieName', e.target.value)}
                  required
                  placeholder="Enter movie or series title"
                  className="content-name-input"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Poster URL</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.posterUrl}
                  onChange={(e) => handleInputChange('posterUrl', e.target.value)}
                  placeholder="https://image.tmdb.org/t/p/w500/..."
                  className="poster-url-input"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Summary *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              required
              placeholder="Plot summary"
              className="summary-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>What You Will Like About It</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.whatYouWillLike}
              onChange={(e) => handleInputChange('whatYouWillLike', e.target.value)}
              placeholder="What makes this content special?"
              className="likes-input"
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  value={formData.soilScore}
                  onChange={(e) => handleInputChange('soilScore', parseInt(e.target.value))}
                  className="rating-select"
                >
                  {[0, 1, 2, 3, 4, 5].map(score => (
                    <option key={score} value={score}>
                      {score} {score > 0 ? '⭐'.repeat(score) : '☆'}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Target Audience</Form.Label>
                <Form.Select
                  value={formData.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className="audience-select"
                >
                  <option value="For Soil">👨‍💻 For Soil</option>
                  <option value="For Prachi">👩‍🎨 For Prachi</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Watched Status</Form.Label>
                <Form.Select
                  value={formData.watched}
                  onChange={(e) => handleInputChange('watched', e.target.value)}
                  className="status-select"
                >
                  <option value="not watched">⏳ Not Watched</option>
                  <option value="watched">✅ Watched</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Where to Watch (URL)</Form.Label>
            <Form.Control
              type="url"
              value={formData.watchLink}
              onChange={(e) => handleInputChange('watchLink', e.target.value)}
              placeholder="https://netflix.com/movie or https://youtube.com/watch?v=..."
              className="watch-link-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>My Letterboxd Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.myLetterboxdReview}
              onChange={(e) => handleInputChange('myLetterboxdReview', e.target.value)}
              placeholder="Your review link or text"
              className="letterboxd-input"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>My Personal Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={formData.myReview}
              onChange={(e) => handleInputChange('myReview', e.target.value)}
              placeholder="Your personal thoughts"
              className="personal-review-input"
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onHide} className="cancel-btn">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              className="submit-btn"
              disabled={isLoadingDetails}
            >
              {isLoadingDetails ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Loading...
                </>
              ) : (
                editingMovie ? 'Update Content' : 'Add Content'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddMovieModal;