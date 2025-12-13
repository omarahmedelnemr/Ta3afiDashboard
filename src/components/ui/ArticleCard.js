import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import Badge from './Badge';
import './ArticleCard.css';

const ArticleCard = ({
  article,
  onReport,
  onClick,
  ...props
}) => {
  // AI Safety rating color
  const getSafetyColor = (rate) => {
    if (rate < 50) return 'danger';
    if (rate < 75) return 'warning';
    return 'success';
  };

  return (
    <div className="article-card" {...props}>
      {/* Cover Image */}
      {article.covorImage && (
        <div className="article-card-cover">
          <img
            src={article.covorImage}
            alt={article.title}
            className="article-card-cover-img"
          />
          <div className="article-card-cover-overlay">
            <Badge variant="info" size="sm">
              {article.category}
            </Badge>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="article-card-content">
        {/* Author */}
        <div className="article-card-author">
          <div className="article-card-avatar-wrapper">
            <img
              src={article.doctorProfileImage}
              alt={article.doctorName}
              className="article-card-avatar"
            />
            <a
              href={`./profile/doctor/${article.doctorID}`}
              className="article-card-avatar-link"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
          <div className="article-card-author-info">
            <div className="article-card-author-name">
              {article.doctorName}
              {article.edited && <span className="article-card-edited">(edited)</span>}
            </div>
            <div className="article-card-date">{article.date}</div>
          </div>
        </div>

        {/* AI Rating */}
        <div className="article-card-ai-rating">
          <span className="article-card-ai-label">AI Safety:</span>
          <Badge variant={getSafetyColor(article.AI_saftyRate)} size="sm">
            {article.AI_saftyRate}% - {article.AI_saftyWord}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="article-card-title">
          <a href={`/articles/${article.id}`} className="article-card-title-link">
            {article.title}
          </a>
        </h3>

        {/* Excerpt */}
        <p className="article-card-excerpt">
          {article.mainText.substring(0, 150)}...
        </p>

        {/* Stats */}
        <div className="article-card-stats">
          <div className="article-card-stat">
            <FontAwesomeIcon icon={faEye} />
            <span>{article.seenCount}</span>
          </div>
          <div className="article-card-stat">
            <FontAwesomeIcon icon={faHeart} />
            <span>{article.upVotes}</span>
          </div>
          <div className="article-card-stat">
            <FontAwesomeIcon icon={faComment} />
            <span>{article.commentsNumber}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="article-card-actions">
          <a
            href={`/articles/${article.id}`}
            className="article-card-action-btn article-card-action-read"
          >
            Read More
          </a>
          <button
            className="article-card-action-btn article-card-action-report"
            onClick={onReport}
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
