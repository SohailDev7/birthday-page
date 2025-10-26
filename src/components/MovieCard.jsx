import React from 'react';
import { Eye, EyeOff, Play, Edit3, Trash2 } from 'lucide-react';

const MovieCard = ({ 
  movie, 
  onToggleWatched,
  onCardClick,
  // Admin props - only used when showAdminActions is true
  showAdminActions = false,
  onEdit = null,
  onDelete = null,
  viewMode = 'grid' // Add viewMode prop
}) => {
  const renderStars = (score) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < score ? 'star filled' : 'star'}>
        ⭐
      </span>
    ));
  };

  const handleActionClick = (e, action) => {
    e.stopPropagation();
    if (action) action();
  };

  // Determine card background based on watched status and target audience
  const getCardBackgroundClass = () => {
    if (movie.watched === 'watched') {
      if (movie.targetAudience === 'For Soil') {
        return 'watched-by-prachi'; // Blue for Prachi watching Soil's movie
      } else if (movie.targetAudience === 'For Prachi') {
        return 'watched-by-soil'; // Pink for Soil watching Prachi's movie
      }
    }
    return '';
  };

  const cardClass = `movie-card-modern ${viewMode}-view ${getCardBackgroundClass()}`;

  return (
    <div 
      className={cardClass} 
      onClick={() => onCardClick(movie)}
    >
      {/* Poster Section */}
      <div className={`movie-poster-modern ${viewMode}-view`}>
        {movie.posterUrl ? (
          <img 
            src={movie.posterUrl} 
            alt={movie.movieName} 
            className="poster-image"
          />
        ) : (
          <div className="poster-placeholder-modern">
            🎬
          </div>
        )}
        
        {/* Poster Overlay - Only Audience Tag */}
        <div className="poster-overlay">
          <div className={`audience-tag ${movie.targetAudience === 'For Soil' ? 'soil' : 'prachi'}`}>
            {movie.targetAudience.replace('For ', '')}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="movie-content-modern">
        {/* Movie Title */}
        <h3 className="movie-title-modern">
          {movie.movieName}
        </h3>

        {/* Rating Section - Below Title */}
        <div className="rating-section">
          <div className="rating-stars">
            {renderStars(movie.soilScore)}
          </div>
          <span className="rating-score">
            {movie.soilScore}/5
          </span>
        </div>

        {/* Action Buttons */}
        <div className="movie-actions">
          <button
            className={`action-btn watch-toggle-btn ${movie.watched === 'watched' ? 'watched' : ''}`}
            onClick={(e) => handleActionClick(e, () => onToggleWatched(movie._id))}
          >
            {movie.watched === 'watched' ? <Eye size={14} /> : <EyeOff size={14} />}
            {movie.watched === 'watched' ? 'Watched' : 'Not Watched'}
          </button>

          {movie.watchLink && (
            <button
              className="action-btn watch-now-btn-card"
              onClick={(e) => {
                e.stopPropagation();
                window.open(movie.watchLink, '_blank');
              }}
            >
              <Play size={14} />
              Watch
            </button>
          )}
        </div>

        {/* Admin Actions - Only show when explicitly enabled */}
        {showAdminActions && (
          <div className="admin-actions">
            <button
              className="admin-btn edit-btn"
              onClick={(e) => handleActionClick(e, onEdit ? () => onEdit(movie) : null)}
            >
              <Edit3 size={12} />
              Edit
            </button>
            <button
              className="admin-btn delete-btn"
              onClick={(e) => handleActionClick(e, onDelete ? () => onDelete(movie._id) : null)}
            >
              <Trash2 size={12} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;