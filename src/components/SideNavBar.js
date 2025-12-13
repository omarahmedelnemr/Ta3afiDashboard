import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faUserTie,
  faClock,
  faCircleCheck,
  faComments,
  faNewspaper,
  faBars,
  faXmark,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import logoImage from '../content/smallLogo.png';
import './styles/SideNav.css';

const SideNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, isMobile]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/Login';
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: faChartPie,
      path: '/dashboard',
      color: 'var(--primary-500)'
    },
    {
      id: 'supervisors',
      label: 'Supervisors',
      icon: faUserTie,
      path: '/supervisors',
      color: 'var(--accent-purple)'
    },
    {
      id: 'unverified',
      label: 'Unverified Doctors',
      icon: faClock,
      path: '/doctors/unverified',
      color: 'var(--warning-500)'
    },
    {
      id: 'verified',
      label: 'Verified Doctors',
      icon: faCircleCheck,
      path: '/doctors/verified',
      color: 'var(--success-500)'
    },
    {
      id: 'posts-pending',
      label: 'Posts (Pending)',
      icon: faComments,
      path: '/posts-pending',
      color: 'var(--accent-orange)'
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: faComments,
      path: '/posts',
      color: 'var(--info-500)'
    },
    {
      id: 'articles',
      label: 'Articles',
      icon: faNewspaper,
      path: '/articles',
      color: 'var(--accent-teal)'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          className="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      {/* Backdrop */}
      {isMobile && isOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`modern-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={logoImage} alt="Ta3afy Logo" className="logo-image" />
            <div className="logo-text">
              <h2 className="logo-title">Ta3afy</h2>
              <p className="logo-subtitle">Admin Dashboard</p>
            </div>
          </div>
          {isMobile && (
            <button
              className="sidebar-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-section-title">Main Menu</p>
            <ul className="nav-list">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.id} className="nav-item">
                    <button
                      className={`nav-link ${active ? 'nav-link-active' : ''}`}
                      onClick={() => handleNavClick(item.path)}
                      style={{
                        '--nav-color': item.color
                      }}
                    >
                      <span className="nav-icon">
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <span className="nav-label">{item.label}</span>
                      {active && <span className="nav-indicator" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <span className="logout-icon">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
