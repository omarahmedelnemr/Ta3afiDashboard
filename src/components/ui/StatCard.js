import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './StatCard.css';

const StatCard = ({
  title,
  value,
  icon,
  gradient,
  color,
  trend,
  trendValue,
  loading = false,
  onClick,
  className = '',
  ...props
}) => {
  const cardClasses = [
    'stat-card',
    gradient && 'stat-card-gradient',
    onClick && 'stat-card-clickable',
    loading && 'stat-card-loading',
    className
  ].filter(Boolean).join(' ');

  const cardStyle = gradient
    ? { background: gradient }
    : color
    ? { '--stat-color': color }
    : {};

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      style={cardStyle}
      {...props}
    >
      <div className="stat-card-content">
        <div className="stat-card-header">
          <div className="stat-card-icon-title-row">
            <div className="stat-card-icon" style={{ color: gradient ? '#fff' : color }}>
              {icon}
            </div>
            {loading ? (
              <div className="skeleton-line skeleton-title"></div>
            ) : (
              <p className="stat-card-title">{title}</p>
            )}
          </div>
          {trend && trendValue && (
            <div className={`stat-card-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
              <FontAwesomeIcon icon={trend === 'up' ? faArrowUp : faArrowDown} />
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        <div className="stat-card-body">
          {loading ? (
            <div className="skeleton-line skeleton-value"></div>
          ) : (
            <h3 className="stat-card-value">{value || '-'}</h3>
          )}
        </div>
      </div>

      {gradient && <div className="stat-card-overlay"></div>}
    </div>
  );
};

export default StatCard;
