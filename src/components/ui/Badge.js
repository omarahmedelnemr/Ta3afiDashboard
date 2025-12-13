import React from 'react';
import './Badge.css';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  dot = false,
  className = '',
  ...props
}) => {
  const badgeClasses = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    rounded && 'badge-rounded',
    dot && 'badge-dot',
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={badgeClasses} {...props}>
      {dot && <span className="badge-dot-indicator"></span>}
      {children}
    </span>
  );
};

export default Badge;
