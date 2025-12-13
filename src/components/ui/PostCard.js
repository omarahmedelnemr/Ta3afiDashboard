import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faComment, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import Badge from './Badge';
import './PostCard.css';

const PostCard = ({
  post,
  onReport,
  onAccept,
  onReject,
  onLoadComments,
  commentButton,
  commentButtonState = 'enabled',
  children,
  isPending = false,
  ...props
}) => {
  // Determine user display
  const isAnonymous = post.hideIdentity;
  const userName = isAnonymous ? 'Anonymous Member' : post.userName;
  const userImage = isAnonymous ? (
    <div className="post-card-avatar-anonymous">
      <FontAwesomeIcon icon={faUserSecret} />
    </div>
  ) : (
    <img
      src={post.userProfileImage}
      alt={userName}
      className="post-card-avatar"
    />
  );

  // AI Safety rating color
  const getSafetyColor = (rate) => {
    if (rate < 50) return 'danger';
    if (rate < 75) return 'warning';
    return 'success';
  };

  return (
    <div className="post-card" {...props}>
      {/* Header */}
      <div className="post-card-header">
        <div className="post-card-user">
          <div className="post-card-avatar-wrapper">
            {userImage}
            {!isAnonymous && (
              <a
                href={`./profile/patient/${post.patientID}`}
                className="post-card-avatar-link"
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
          </div>
          <div className="post-card-user-info">
            <div className="post-card-username">
              {userName}
              {post.edited && <span className="post-card-edited">(edited)</span>}
            </div>
            <div className="post-card-date">{post.date}</div>
          </div>
        </div>

        <div className="post-card-badges">
          <Badge variant="info" size="sm">
            {post.community}
          </Badge>
        </div>
      </div>

      {/* AI Safety Rating */}
      <div className="post-card-ai-rating">
        <span className="post-card-ai-label">AI Safety:</span>
        <Badge variant={getSafetyColor(post.AI_saftyRate)} size="sm">
          {post.AI_saftyRate}% - {post.AI_saftyWord}
        </Badge>
      </div>

      {/* Body */}
      <div className="post-card-body">
        <p className="post-card-text">{post.mainText}</p>

        {post.images && post.images.length > 0 && (
          <div className="post-card-images">
            {post.images.map((img, index) => (
              <img
                key={index}
                src={`${img.link}`}
                alt={`Post attachment ${index + 1}`}
                className="post-card-image"
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {!isPending && (
        <div className="post-card-stats">
          <div className="post-card-stat">
            <FontAwesomeIcon icon={faEye} />
            <span>{post.views}</span>
          </div>
          <div className="post-card-stat">
            <FontAwesomeIcon icon={faHeart} />
            <span>{post.reactions}</span>
          </div>
          <div className="post-card-stat">
            <FontAwesomeIcon icon={faComment} />
            <span>{post.commentsNumber}</span>
          </div>
        </div>
      )}

      {/* Comments Section */}
      {children && (
        <div className="post-card-comments">
          {children}
        </div>
      )}

      {/* Comments Button */}
      {commentButton && (
        <button
          className={`post-card-comments-btn ${commentButtonState === 'disabled' ? 'disabled' : ''}`}
          onClick={onLoadComments}
          disabled={commentButtonState === 'disabled'}
        >
          {commentButton}
        </button>
      )}

      {/* Actions */}
      <div className="post-card-actions">
        {isPending ? (
          <>
            <button
              className="post-card-action-btn post-card-action-accept"
              onClick={onAccept}
            >
              Accept
            </button>
            <button
              className="post-card-action-btn post-card-action-reject"
              onClick={onReject}
            >
              Reject
            </button>
          </>
        ) : (
          <button
            className="post-card-action-btn post-card-action-report"
            onClick={onReport}
          >
            Report
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
