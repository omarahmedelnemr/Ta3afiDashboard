import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import globalVar from '../../public Func/globalVar';
import axios from 'axios';
import { Button, Badge, Card, Input, LoadingSkeleton } from '../../components/ui';
import './Supervisors.css';

function SupervisorsPage() {
  const [superList, setSuperList] = useState([]);
  const [generatedSignupLink, setGeneratedLink] = useState('');
  const [showLinkBox, setShowLinkBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState({});

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const res = await axios.get(globalVar.backendURL + '/super/supervisors-list');
        setSuperList(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching supervisors:', err);
        setLoading(false);
      }
    };

    fetchSupervisors();
  }, []);

  const generateSignupLink = async () => {
    try {
      const res = await axios.get(globalVar.backendURL + '/super/generatLoginJWT');
      setGeneratedLink(globalVar.frontendURL + '/supersignup/' + res.data);
      setShowLinkBox(!showLinkBox);
      setCopied(false);
    } catch (err) {
      console.error('Error generating link:', err);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedSignupLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const activateSupervisor = async (superID) => {
    try {
      await axios.post(globalVar.backendURL + '/super/activate', {
        superID: superID,
        token: localStorage.getItem('token')
      });
      setSuperList(superList.map(sup =>
        sup.id === superID ? { ...sup, active: true } : sup
      ));
    } catch (err) {
      console.error('Error activating supervisor:', err);
    }
  };

  const deactivateSupervisor = async (superID) => {
    try {
      await axios.post(globalVar.backendURL + '/super/deactivate', {
        superID: superID,
        token: localStorage.getItem('token')
      });
      setSuperList(superList.map(sup =>
        sup.id === superID ? { ...sup, active: false } : sup
      ));
    } catch (err) {
      console.error('Error deactivating supervisor:', err);
    }
  };

  const showDeleteConfirmation = (superID) => {
    setConfirmDelete({ ...confirmDelete, [superID]: true });
  };

  const cancelDelete = (superID) => {
    setConfirmDelete({ ...confirmDelete, [superID]: false });
  };

  const confirmDeleteSupervisor = async (superID) => {
    try {
      await axios.delete(globalVar.backendURL + '/super/supervisor', {
        data: { superID: superID, token: localStorage.getItem('token') }
      });
      setSuperList(superList.filter(sup => sup.id !== superID));
      setConfirmDelete({ ...confirmDelete, [superID]: false });
    } catch (err) {
      console.error('Error deleting supervisor:', err);
      setConfirmDelete({ ...confirmDelete, [superID]: false });
    }
  };

  return (
    <div className="supervisors-page">
      {/* Header */}
      <div className="supervisors-header">
        <div>
          <h1 className="page-title">Supervisors</h1>
          <p className="page-subtitle">
            {loading ? 'Loading...' : `${superList.length} ${superList.length === 1 ? 'supervisor' : 'supervisors'}`}
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={generateSignupLink}
        >
          Add New Supervisor
        </Button>
      </div>

      {/* Signup Link Box */}
      {showLinkBox && (
        <Card className="signup-link-card">
          <Card.Body>
            <p className="link-card-warning">
              This link is valid for only 24 hours
            </p>
            <div className="link-input-group">
              <Input
                value={generatedSignupLink}
                readOnly
                fullWidth
              />
              <Button
                variant={copied ? 'success' : 'secondary'}
                onClick={copyLink}
                className="copy-btn"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              </Button>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Supervisors Table */}
      <Card className="supervisors-table-card">
        <Card.Body>
          {loading ? (
            <div className="supervisors-skeleton">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="supervisor-row-skeleton">
                  <LoadingSkeleton width="200px" height="20px" />
                  <LoadingSkeleton width="250px" height="20px" />
                  <LoadingSkeleton width="100px" height="24px" />
                  <LoadingSkeleton width="150px" height="32px" />
                </div>
              ))}
            </div>
          ) : superList.length > 0 ? (
            <div className="supervisors-table">
              {/* Table Header */}
              <div className="table-header">
                <div className="table-cell">Name</div>
                <div className="table-cell">Email</div>
                <div className="table-cell">Status</div>
                <div className="table-cell">Actions</div>
              </div>

              {/* Table Body */}
              <div className="table-body">
                {superList.map((supervisor) => (
                  <div key={supervisor.id} className="table-row">
                    <div className="table-cell supervisor-name">
                      {supervisor.name}
                    </div>
                    <div className="table-cell supervisor-email">
                      {supervisor.email}
                    </div>
                    <div className="table-cell supervisor-status">
                      <Badge variant={supervisor.active ? 'success' : 'warning'}>
                        {supervisor.active ? 'Active' : 'Not Active'}
                      </Badge>
                    </div>
                    <div className="table-cell supervisor-actions">
                      {Number(supervisor.id) !== 1 ? (
                        <div className="superControlButton">
                          <span 
                            className={'DeactiveButton' + (supervisor.active ? '' : ' hide')} 
                            onClick={() => deactivateSupervisor(supervisor.id)}
                          >
                            Deactivate
                          </span>
                          <span 
                            className={'ActiveButton' + (supervisor.active ? ' hide' : '')} 
                            onClick={() => activateSupervisor(supervisor.id)}
                          >
                            Activate
                          </span>
                          <span> | </span>
                          <span 
                            className={'deleteButton' + (confirmDelete[supervisor.id] ? ' hide' : '')} 
                            onClick={() => showDeleteConfirmation(supervisor.id)}
                          >
                            delete
                          </span>
                          <span className={'ConfirmDelete' + (confirmDelete[supervisor.id] ? '' : ' hide')}>
                            Confirm Delete?{' '}
                            <span className="ConfirmYes" onClick={() => confirmDeleteSupervisor(supervisor.id)}>
                              Yes
                            </span>
                            {' / '}
                            <span className="ConfirmNo" onClick={() => cancelDelete(supervisor.id)}>
                              No
                            </span>
                          </span>
                        </div>
                      ) : (
                        <span className="no-actions">No Actions</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="empty-state-title">No supervisors yet</h3>
              <p className="empty-state-description">
                Click "Add New Supervisor" to create a signup link and invite supervisors
              </p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default SupervisorsPage;
