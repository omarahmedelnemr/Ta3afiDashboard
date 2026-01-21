import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faPaperPlane, faUser, faUserDoctor, faCheck, faTimes, faSearch, faFilter, faChevronLeft, faChevronRight, faUsers } from '@fortawesome/free-solid-svg-icons';
import globalVar from '../../public Func/globalVar';
import axios from '../../public Func/axiosAuth';
import { Button, Card, Input, LoadingSkeleton } from '../../components/ui';
import './SendNotifications.css';

function SendNotifications() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all'); // 'all', 'patient', 'doctor', 'partner'
  const [message, setMessage] = useState({ type: '', text: '' });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 20,
    hasNextPage: false,
    hasPreviousPage: false
  });

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, userTypeFilter]);

  useEffect(() => {
    // Debounce search - reset to page 1 when search changes
    const timer = setTimeout(() => {
      setPagination(prev => ({ ...prev, page: 1 }));
      fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {
        loadBlock: pagination.page,
        limit: pagination.limit,
        roleFilter: userTypeFilter,
        searchQuery: searchTerm || undefined
      };
      const res = await axios.get(globalVar.backendURL + '/admin/all-users', { params });
      setUsers(res.data.data || []);
      if (res.data.pagination) {
        setPagination(prev => ({
          ...prev,
          ...res.data.pagination,
          page: res.data.pagination.page || prev.page
        }));
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setMessage({ type: 'error', text: 'Failed to load users. Please try again.' });
      setLoading(false);
    }
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev => {
      const isSelected = prev.some(u => u.id === user.id && u.role === user.role);
      if (isSelected) {
        return prev.filter(u => !(u.id === user.id && u.role === user.role));
      } else {
        return [...prev, user];
      }
    });
  };

  const selectAllUsers = () => {
    setSelectedUsers(users);
  };

  const deselectAllUsers = () => {
    setSelectedUsers([]);
  };

  const handleFilterChange = (filter) => {
    setUserTypeFilter(filter);
    setPagination(prev => ({ ...prev, page: 1 }));
    setSelectedUsers([]);
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    setSelectedUsers([]);
  };

  const validateForm = () => {
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a notification title.' });
      return false;
    }
    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Please enter a notification description.' });
      return false;
    }
    return true;
  };

  const handleSend = async () => {
    if (selectedUsers.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one user.' });
      return;
    }

    if (!validateForm()) return;

    try {
      setSending(true);
      setMessage({ type: '', text: '' });

      const userIDs = selectedUsers.map(u => u.id);
      const roles = selectedUsers.map(u => u.role);

      const res = await axios.post(
        globalVar.backendURL + '/notify/send-bulk-notifications',
        {
          userIDs,
          roles,
          header: title.trim(),
          text: description.trim(),
          category: category
        }
      );

      if (res.data && res.data.successful > 0) {
        setMessage({
          type: 'success',
          text: `Successfully sent notifications to ${res.data.successful} user(s)!`
        });
        setSelectedUsers([]);
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to send some notifications. Please check the console for details.'
        });
      }
    } catch (err) {
      console.error('Error sending notifications:', err);
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to send notifications. Please try again.'
      });
    } finally {
      setSending(false);
    }
  };

  const handleBulkSendByRole = async (role) => {
    if (!validateForm()) return;

    try {
      setSending(true);
      setMessage({ type: '', text: '' });

      const res = await axios.post(
        globalVar.backendURL + '/notify/send-bulk-notifications-by-role',
        {
          role: role,
          header: title.trim(),
          text: description.trim(),
          category: category
        }
      );

      if (res.data && res.data.successful > 0) {
        setMessage({
          type: 'success',
          text: `Successfully sent notifications to ${res.data.successful} ${role}(s)!`
        });
      } else {
        setMessage({
          type: 'error',
          text: 'Failed to send notifications. Please check the console for details.'
        });
      }
    } catch (err) {
      console.error('Error sending bulk notifications:', err);
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to send notifications. Please try again.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="send-notifications-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-icon">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div>
            <h1 className="page-title">Send Notifications</h1>
            <p className="page-subtitle">Send notifications to one or more users</p>
          </div>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton count={3} />
      ) : (
        <div className="notifications-content">
          {/* Message Display */}
          {message.text && (
            <div className={`message-alert ${message.type}`}>
              <FontAwesomeIcon icon={message.type === 'success' ? faCheck : faTimes} />
              <span>{message.text}</span>
              <button onClick={() => setMessage({ type: '', text: '' })} className="close-message">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          )}

          <div className="notifications-grid">
            {/* Left Column - User Selection */}
            <Card className="users-selection-card">
              <div className="card-header">
                <h2>Select Users</h2>
                <div className="selection-actions">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={selectAllUsers}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={deselectAllUsers}
                  >
                    Deselect All
                  </Button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="search-filter-section">
                <div className="search-filter-label">
                  <FontAwesomeIcon icon={faSearch} />
                  <span>Search Users</span>
                </div>
                <div className="search-input-wrapper">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <Input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="filter-section-divider"></div>
                <div className="filter-buttons-container">
                  <div className="filter-buttons-label">
                    <FontAwesomeIcon icon={faFilter} />
                    <span>Filter by Type</span>
                  </div>
                  <div className="filter-buttons">
                    <Button
                      variant={userTypeFilter === 'all' ? 'primary' : 'outline'}
                      size="small"
                      onClick={() => handleFilterChange('all')}
                    >
                      All
                    </Button>
                    <Button
                      variant={userTypeFilter === 'patient' ? 'primary' : 'outline'}
                      size="small"
                      onClick={() => handleFilterChange('patient')}
                    >
                      <FontAwesomeIcon icon={faUser} /> Patients
                    </Button>
                    <Button
                      variant={userTypeFilter === 'doctor' ? 'primary' : 'outline'}
                      size="small"
                      onClick={() => handleFilterChange('doctor')}
                    >
                      <FontAwesomeIcon icon={faUserDoctor} /> Doctors
                    </Button>
                  </div>
                </div>
              </div>

              {/* Selected Count */}
              {selectedUsers.length > 0 && (
                <>
                  <div className="selected-count">
                    <strong>{selectedUsers.length}</strong> user(s) selected
                  </div>
                  <div className="quick-send-section">
                    <Button
                      variant="primary"
                      size="medium"
                      onClick={handleSend}
                      disabled={sending}
                      className="quick-send-button"
                      fullWidth
                    >
                      {sending ? (
                        <>
                          <span className="spinner"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} />
                          Send to Selected ({selectedUsers.length})
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}

              {/* Users List */}
              <div className="users-list">
                {users.length === 0 ? (
                  <div className="empty-state">
                    <p>No users found</p>
                  </div>
                ) : (
                  users.map((user) => {
                    const isSelected = selectedUsers.some(
                      u => u.id === user.id && u.role === user.role
                    );
                    return (
                      <div
                        key={`${user.role}-${user.id}`}
                        className={`user-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleUserSelection(user)}
                      >
                        <div className="user-checkbox">
                          {isSelected && <FontAwesomeIcon icon={faCheck} />}
                        </div>
                        <img
                          src={user.profileImage || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTI0IDI0QzI0IDI0IDIwIDI4IDIwIDMyQzIwIDM2IDIyIDM4IDI0IDM4QzI2IDM4IDI4IDM2IDI4IDMyQzI4IDI4IDI0IDI0IDI0IDI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTggMThDMTggMTYgMTkgMTUgMjEgMTVDMjMgMTUgMjQgMTYgMjQgMThDMjQgMjAgMjMgMjEgMjEgMjFDMTkgMjEgMTggMjAgMTggMThaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNCAxOEMyNCAxNiAyNSAxNSAyNyAxNUMyOSAxNSAzMCAxNiAzMCAxOEMzMCAyMCAyOSAyMSAyNyAyMUMyNSAyMSAyNCAyMCAyNCAxOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'}
                          alt={user.name}
                          className="user-avatar"
                          onError={(e) => {
                            // Prevent infinite loop by checking if already set to default
                            if (e.target.src && !e.target.src.includes('data:image')) {
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTI0IDI0QzI0IDI0IDIwIDI4IDIwIDMyQzIwIDM2IDIyIDM4IDI0IDM4QzI2IDM4IDI4IDM2IDI4IDMyQzI4IDI4IDI0IDI0IDI0IDI0WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTggMThDMTggMTYgMTkgMTUgMjEgMTVDMjMgMTUgMjQgMTYgMjQgMThDMjQgMjAgMjMgMjEgMjEgMjFDMTkgMjEgMTggMjAgMTggMThaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yNCAxOEMyNCAxNiAyNSAxNSAyNyAxNUMyOSAxNSAzMCAxNiAzMCAxOEMzMCAyMCAyOSAyMSAyNyAyMUMyNSAyMSAyNCAyMCAyNCAxOFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                              e.target.onerror = null; // Remove error handler to prevent infinite loop
                            }
                          }}
                        />
                        <div className="user-info">
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                        <div className="user-role-badge">
                          <FontAwesomeIcon
                            icon={user.role === 'patient' ? faUser : faUserDoctor}
                          />
                          <span>{user.role === 'patient' ? 'Patient' : 'Doctor'}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Pagination Controls */}
              {pagination.totalPages > 1 && (
                <div className="pagination-controls">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={!pagination.hasPreviousPage}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Previous
                  </Button>
                  <span className="pagination-info">
                    Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
                  </span>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={!pagination.hasNextPage}
                  >
                    Next
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Button>
                </div>
              )}
            </Card>

            {/* Right Column - Notification Form */}
            <Card className="notification-form-card">
              <div className="card-header">
                <h2>Notification Details</h2>
              </div>

              <div className="form-content">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="general">General</option>
                    <option value="announcement">Announcement</option>
                    <option value="update">Update</option>
                    <option value="reminder">Reminder</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter notification title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                  />
                  <small className="char-count">{title.length}/100</small>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    className="form-textarea"
                    placeholder="Enter notification description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    maxLength={500}
                  />
                  <small className="char-count">{description.length}/500</small>
                </div>

                {/* Bulk Send Buttons */}
                <div className="bulk-send-section">
                  <div className="bulk-send-label">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Send to All</span>
                  </div>
                  <div className="bulk-send-buttons">
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={() => handleBulkSendByRole('all')}
                      disabled={sending}
                      className="bulk-send-btn"
                    >
                      <FontAwesomeIcon icon={faUsers} />
                      Send to All Users
                    </Button>
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={() => handleBulkSendByRole('patient')}
                      disabled={sending}
                      className="bulk-send-btn"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      Send to All Patients
                    </Button>
                    <Button
                      variant="outline"
                      size="medium"
                      onClick={() => handleBulkSendByRole('doctor')}
                      disabled={sending}
                      className="bulk-send-btn"
                    >
                      <FontAwesomeIcon icon={faUserDoctor} />
                      Send to All Doctors
                    </Button>
                  </div>
                </div>

                <div className="form-actions">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={handleSend}
                    disabled={sending || selectedUsers.length === 0}
                    className="send-button"
                  >
                    {sending ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Send to Selected ({selectedUsers.length})
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default SendNotifications;

