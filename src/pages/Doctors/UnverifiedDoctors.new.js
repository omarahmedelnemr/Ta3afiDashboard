import React, { useEffect, useState, useMemo } from 'react';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { SearchBar, DoctorCard, LoadingSkeleton } from '../../components/ui';
import './DoctorsHub.new.css';

function UnverifiedDoctors() {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(globalVar.backendURL + '/admin/unverified-doctors');
        setDoctorList(response.data);
      } catch (err) {
        console.error('Error fetching unverified doctors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!searchQuery.trim()) return doctorList;

    const query = searchQuery.toLowerCase();
    return doctorList.filter(doctor =>
      doctor.name.toLowerCase().includes(query) ||
      doctor.title?.toLowerCase().includes(query) ||
      doctor.description?.toLowerCase().includes(query)
    );
  }, [doctorList, searchQuery]);

  return (
    <div className="doctors-hub-page">
      {/* Header */}
      <div className="doctors-hub-header">
        <div>
          <h1 className="page-title">Unverified Doctors</h1>
          <p className="page-subtitle">
            {loading ? 'Loading...' : `${filteredDoctors.length} pending ${filteredDoctors.length === 1 ? 'application' : 'applications'}`}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="doctors-hub-search">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, title, or description..."
          size="lg"
          fullWidth
          disabled={loading}
        />
      </div>

      {/* Doctors Grid */}
      <div className="doctors-grid">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="skeleton-doctor-card">
              <LoadingSkeleton width="100%" height="200px" />
              <LoadingSkeleton width="80%" height="24px" />
              <LoadingSkeleton width="60%" height="16px" />
              <LoadingSkeleton width="100%" height="60px" />
            </div>
          ))
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              verified={false}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="empty-state-title">No pending applications</h3>
            <p className="empty-state-description">
              {searchQuery ? 'Try adjusting your search criteria' : 'All applications have been reviewed'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UnverifiedDoctors;
