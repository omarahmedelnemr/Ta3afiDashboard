import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserDoctor, faLanguage, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { Badge } from './index';
import './DoctorCard.css';

const DoctorCard = ({
  doctor,
  verified = false,
  onClick,
  className = '',
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(doctor);
    } else {
      navigate(`/doctors/info/${doctor.id}`);
    }
  };

  const cardClasses = [
    'doctor-card',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      {...props}
    >
      {/* Status Badge */}
      <div className="doctor-card-badge">
        <Badge
          variant={verified ? 'success' : 'warning'}
          size="sm"
          rounded
        >
          {verified ? 'Verified' : 'Pending'}
        </Badge>
      </div>

      {/* Doctor Image */}
      <div className="doctor-card-image">
        <img
          src={doctor.profileImage || '/default-avatar.png'}
          alt={doctor.name}
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />
        {doctor.starRate && (
          <div className="doctor-card-rating">
            <FontAwesomeIcon icon={faStar} />
            <span>{doctor.starRate.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Doctor Info */}
      <div className="doctor-card-content">
        <h3 className="doctor-card-name">{doctor.name}</h3>
        {doctor.title && (
          <p className="doctor-card-title">{doctor.title}</p>
        )}
        {doctor.description && (
          <p className="doctor-card-description">
            {doctor.description.length > 100
              ? `${doctor.description.substring(0, 100)}...`
              : doctor.description}
          </p>
        )}
      </div>

      {/* Doctor Stats */}
      <div className="doctor-card-stats">
        {doctor.gender && (
          <div className="doctor-stat">
            <FontAwesomeIcon icon={faVenusMars} className="stat-icon" />
            <span className="stat-label">{doctor.gender}</span>
          </div>
        )}
        {doctor.language && (
          <div className="doctor-stat">
            <FontAwesomeIcon icon={faLanguage} className="stat-icon" />
            <span className="stat-label">{doctor.language}</span>
          </div>
        )}
        {doctor.completedSessions !== undefined && (
          <div className="doctor-stat">
            <FontAwesomeIcon icon={faUserDoctor} className="stat-icon" />
            <span className="stat-label">{doctor.completedSessions} Sessions</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
