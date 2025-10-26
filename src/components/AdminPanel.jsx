import React from 'react';
import { Modal, Button, Badge, Spinner } from 'react-bootstrap';
import { Plus, RefreshCw } from 'lucide-react';

const AdminPanel = ({ 
  show, 
  onHide, 
  movies, 
  loading, 
  forSoilMovies, 
  viewMode, 
  onAddMovie,
  onRefresh,
  children 
}) => {
  const forPrachiMovies = movies.filter(m => m.targetAudience === 'For Prachi');
  const watchedMovies = movies.filter(m => m.watched === 'watched');
  const unwatchedMovies = movies.filter(m => m.watched === 'not watched');

  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable className="admin-panel">
      <Modal.Header closeButton>
        <Modal.Title>🎬 Admin Panel</Modal.Title>
        <Button variant="outline-primary" size="sm" onClick={onRefresh} disabled={loading}>
          <RefreshCw size={14} /> Refresh
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button variant="primary" onClick={onAddMovie} className="add-movie-btn">
            <Plus size={16} /> Add New Movie
          </Button>
          
          <div className="d-flex gap-2 stats-badges">
            <Badge bg="primary">Total: {movies.length}</Badge>
            <Badge bg="success">For Soil: {forSoilMovies.length}</Badge>
            <Badge bg="info">For Prachi: {forPrachiMovies.length}</Badge>
            <Badge bg="warning">Watched: {watchedMovies.length}</Badge>
            <Badge bg="secondary">Unwatched: {unwatchedMovies.length}</Badge>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4 loading-state">
            <Spinner animation="border" />
            <p className="mt-2">Loading movies...</p>
          </div>
        ) : (
          <div className={viewMode === 'list' ? 'movies-list' : 'row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3'}>
            {children}
          </div>
        )}

        {movies.length === 0 && !loading && (
          <div className="text-center py-5 empty-state">
            <div className="display-1 mb-3">🎬</div>
            <h4>No movies in database</h4>
            <p className="text-muted">Add your first movie to get started!</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AdminPanel;