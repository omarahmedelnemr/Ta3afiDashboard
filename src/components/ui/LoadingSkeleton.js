import React from 'react';
import './LoadingSkeleton.css';

const LoadingSkeleton = ({
  variant = 'rect',
  width,
  height,
  count = 1,
  circle = false,
  className = '',
  ...props
}) => {
  const skeletonClasses = [
    'skeleton',
    circle && 'skeleton-circle',
    className
  ].filter(Boolean).join(' ');

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100px'),
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={skeletonClasses}
          style={style}
          {...props}
        />
      ))}
    </>
  );
};

// Preset Skeleton Components
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card-header">
      <LoadingSkeleton circle width="48px" height="48px" />
      <div className="skeleton-card-header-text">
        <LoadingSkeleton width="60%" height="20px" />
        <LoadingSkeleton width="40%" height="16px" />
      </div>
    </div>
    <div className="skeleton-card-body">
      <LoadingSkeleton width="100%" height="16px" count={3} />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="skeleton-table">
    <div className="skeleton-table-header">
      <LoadingSkeleton width="100%" height="40px" />
    </div>
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="skeleton-table-row">
        <LoadingSkeleton width="100%" height="60px" />
      </div>
    ))}
  </div>
);

export const SkeletonProfile = () => (
  <div className="skeleton-profile">
    <LoadingSkeleton circle width="120px" height="120px" />
    <LoadingSkeleton width="200px" height="24px" />
    <LoadingSkeleton width="150px" height="16px" />
    <div className="skeleton-profile-stats">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="skeleton-profile-stat">
          <LoadingSkeleton width="60px" height="32px" />
          <LoadingSkeleton width="80px" height="16px" />
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;
