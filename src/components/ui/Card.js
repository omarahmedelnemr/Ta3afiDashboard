import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  gradient = false,
  className = '',
  onClick,
  ...props
}) => {
  const cardClasses = [
    'card',
    `card-${variant}`,
    `card-padding-${padding}`,
    hoverable && 'card-hoverable',
    clickable && 'card-clickable',
    gradient && 'card-gradient',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`card-header ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`card-body ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`card-footer ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
