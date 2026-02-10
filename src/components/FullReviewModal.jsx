import React from 'react';
import { Modal, Button, Badge, Row, Col, Card } from 'react-bootstrap';
import { Play, ExternalLink } from 'lucide-react';

const FullReviewModal = ({ movie, onClose }) => {
  const renderStars = (score) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < score ? 'star filled' : 'star'}>
        ⭐
      </span>
    ));
  };

  if (!movie) return null;

  return (
    <Modal show={!!movie} onHide={onClose} size="lg" centered className="full-review-modal">
      <Modal.Header closeButton>
        <Modal.Title>🎬 {movie.movieName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            {movie.posterUrl ? (
              <img 
                src={movie.posterUrl} 
                alt={movie.movieName} 
                className="img-fluid rounded shadow" 
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="review-poster-placeholder d-flex align-items-center justify-content-center rounded shadow" 
                style={{ height: '300px' }}
              >
                🎬
              </div>
            )}
          </Col>
          <Col md={8}>
            <div className="d-flex flex-column h-100">
              <div className="mb-3">
                <strong className="me-2">Soil Score:</strong> 
                {renderStars(movie.soilScore)} 
                <span className="ms-2">({movie.soilScore}/5)</span>
              </div>
              <div className="mb-3">
                <strong className="me-2">Audience:</strong> 
                <Badge bg={movie.targetAudience === 'For Soil' ? 'primary' : 'pink'}>
                  {movie.targetAudience}
                </Badge>
              </div>
              <div className="mb-3">
                <strong className="me-2">Status:</strong> 
                <span className={movie.watched === 'watched' ? 'text-success' : 'text-warning'}>
                  {movie.watched === 'watched' ? '✅ Watched' : '⏳ Not Watched'}
                </span>
              </div>
              
              {}
              {movie.watchLink && movie.watchLink.trim() !== '' && (
                <Card className="watch-link-section">
                  <Card.Body className="text-center p-3">
                    <h6 className="mb-2">🎥 Where to Watch</h6>
                    <Button 
                      as="a"
                      variant="success" 
                      href={movie.watchLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="watch-now-btn px-4 py-2 fw-bold"
                      size="lg"
                    >
                      <Play size={18} className="me-2" /> 
                      Watch Now
                      <ExternalLink size={16} className="ms-2" />
                    </Button>
                    <div className="watch-link-url mt-3">
                      <a 
                        href={movie.watchLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-decoration-none"
                      >
                        {movie.watchLink}
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
          </Col>
          
          <Col xs={12} className="mt-4">
            <hr />
            <h5>📖 Summary</h5>
            <p className="lead">{movie.summary}</p>

            {movie.whatYouWillLike && (
              <>
                <h5>💖 What You'll Like</h5>
                <p>{movie.whatYouWillLike}</p>
              </>
            )}

            {movie.myLetterboxdReview && (
              <>
                <h5>🎟️ Letterboxd Review</h5>
                <p>{movie.myLetterboxdReview}</p>
              </>
            )}

            {movie.myReview && (
              <>
                <h5>📝 Personal Review</h5>
                <p className="fst-italic">{movie.myReview}</p>
              </>
            )}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FullReviewModal;