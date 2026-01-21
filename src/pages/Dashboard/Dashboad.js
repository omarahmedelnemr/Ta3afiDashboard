import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserDoctor, faNewspaper, faComments, faComment, faCalendarCheck, faUsers, faUserShield, faUserPlus, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { StatCard, Card, Button } from '../../components/ui';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Dashboard() {
  // Stats State
  const [patientsCount, setPatientCount] = useState(null);
  const [doctorsCount, setDoctorCount] = useState(null);
  const [articlesCount, setArticlesCount] = useState(null);
  const [postsCount, setPostsCount] = useState(null);
  const [commentsCount, setCommentsCount] = useState(null);
  const [appointmentsCount, setAppointmentsCount] = useState(null);
  const [supervisorsCount, setSupervisorsCount] = useState(null);
  const [activeUsersCount, setActiveUsersCount] = useState(null);
  const [totalUsersRegistered, setTotalUsersRegistered] = useState(null);
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(null);
  const [userRegistrationsOverTime, setUserRegistrationsOverTime] = useState([]);
  const [userRegistrationsByRole, setUserRegistrationsByRole] = useState(null);
  const [userRegistrationsByRoleOvertime, setUserRegistrationsByRoleOvertime] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charts State
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [postsOverTime, setPostsOverTime] = useState([]);
  const [articlesOverTime, setArticlesOverTime] = useState([]);
  const [appointmentsOverTime, setAppointmentsOverTime] = useState([]);

  // Date Range State (for User Registrations by Role and Appointment Status)
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  const currentDate = new Date();
  const initialFromDate = formatDateForInput(new Date(currentDate.getFullYear(), 0, 1));
  const initialToDate = formatDateForInput(new Date(currentDate.getFullYear(), 11, 31));
  
  // Applied values (used for API calls)
  const [fromDate, setFromDate] = useState(initialFromDate);
  const [toDate, setToDate] = useState(initialToDate);
  
  // Temporary values (for inputs before Apply is clicked)
  const [tempFromDate, setTempFromDate] = useState(initialFromDate);
  const [tempToDate, setTempToDate] = useState(initialToDate);
  const [dateRangeUpdateTrigger, setDateRangeUpdateTrigger] = useState(0);

  // Year State (for Activity Over Time and Monthly Registrations by Role)
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [tempYear, setTempYear] = useState(currentYear);
  const [yearUpdateTrigger, setYearUpdateTrigger] = useState(0);
  
  // Generate year options (last 5 years to current year)
  const yearOptions = [];
  for (let i = 0; i < 6; i++) {
    yearOptions.push(currentYear - i);
  }

  // Apply date range filter
  const handleApplyDateRange = () => {
    setFromDate(tempFromDate);
    setToDate(tempToDate);
    setDateRangeUpdateTrigger(prev => prev + 1);
  };

  // Apply year filter
  const handleApplyYear = () => {
    setSelectedYear(tempYear);
    setYearUpdateTrigger(prev => prev + 1);
  };

  // Fetch all stats data
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Build query parameters for date range
        const dateParams = new URLSearchParams();
        if (fromDate) dateParams.append('fromDate', new Date(fromDate).toISOString());
        if (toDate) dateParams.append('toDate', new Date(toDate).toISOString());
        const queryString = dateParams.toString() ? `?${dateParams.toString()}` : '';

        const [patients, doctors, articles, posts, appointments, comments, appointmentsTotal, supervisors, activeUsers, totalUsers, newUsers, registrationsByRole] = await Promise.all([
          axios.get(globalVar.backendURL + '/admin/patients-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/doctors-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/articles-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/posts-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/appointment-status' + queryString),
          axios.get(globalVar.backendURL + '/admin/comments-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/appointments-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/supervisors-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/active-users-number' + queryString),
          axios.get(globalVar.backendURL + '/admin/total-users-registered' + queryString),
          axios.get(globalVar.backendURL + '/admin/new-users-this-month'),
          axios.get(globalVar.backendURL + '/admin/user-registrations-by-role' + queryString)
        ]);

        setPatientCount(patients.data.number);
        setDoctorCount(doctors.data.number);
        setArticlesCount(articles.data.number);
        setPostsCount(posts.data.number);
        setAppointmentsData(appointments.data);
        setCommentsCount(comments.data.number);
        setAppointmentsCount(appointmentsTotal.data.number);
        setSupervisorsCount(supervisors.data.number);
        setActiveUsersCount(activeUsers.data.number);
        setTotalUsersRegistered(totalUsers.data.number);
        setNewUsersThisMonth(newUsers.data.number);
        setUserRegistrationsByRole(registrationsByRole.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [fromDate, toDate, dateRangeUpdateTrigger]);

  // Fetch time series data (Activity Over Time and Monthly Registrations by Role) - uses Year
  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const firstDayOfYear = new Date(selectedYear, 0, 1);
        const lastDayOfYear = new Date(selectedYear, 11, 31);

        const [posts, articles, appointments, userRegistrations, registrationsByRoleOverTime] = await Promise.all([
          axios.get(globalVar.backendURL + `/admin/posts-overtime?fromDate=${firstDayOfYear.toISOString()}&toDate=${lastDayOfYear.toISOString()}`),
          axios.get(globalVar.backendURL + `/admin/articles-overtime?fromDate=${firstDayOfYear.toISOString()}&toDate=${lastDayOfYear.toISOString()}`),
          axios.get(globalVar.backendURL + `/admin/appointments-overtime?fromDate=${firstDayOfYear.toISOString()}&toDate=${lastDayOfYear.toISOString()}`),
          axios.get(globalVar.backendURL + `/admin/user-registrations-overtime?fromDate=${firstDayOfYear.toISOString()}&toDate=${lastDayOfYear.toISOString()}`),
          axios.get(globalVar.backendURL + `/admin/user-registrations-by-role-overtime?fromDate=${firstDayOfYear.toISOString()}&toDate=${lastDayOfYear.toISOString()}`)
        ]);

        setPostsOverTime(posts.data);
        setArticlesOverTime(articles.data);
        setAppointmentsOverTime(appointments.data);
        setUserRegistrationsOverTime(userRegistrations.data);
        setUserRegistrationsByRoleOvertime(registrationsByRoleOverTime.data);
      } catch (err) {
        console.error('Error fetching time series data:', err);
      }
    };

    fetchTimeData();
  }, [selectedYear, yearUpdateTrigger]);

  // Chart: Appointments Doughnut
  const appointmentsChartData = useMemo(() => {
    // Handle both array and object formats
    if (!appointmentsData) return null;

    let labels = [];
    let data = [];

    // If it's an object like {scheduled: 5, completed: 0, canceled: 0}
    if (typeof appointmentsData === 'object' && !Array.isArray(appointmentsData)) {
      labels = Object.keys(appointmentsData).map(key =>
        key.charAt(0).toUpperCase() + key.slice(1)
      );
      data = Object.values(appointmentsData);
    }
    // If it's an array like [{status: "scheduled", count: 5}]
    else if (Array.isArray(appointmentsData) && appointmentsData.length > 0) {
      labels = appointmentsData.map(item => item.status || 'Unknown');
      data = appointmentsData.map(item => item.count || 0);
    } else {
      return null;
    }

    // Don't show chart if all values are 0
    if (data.every(val => val === 0)) return null;

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(124, 102, 244, 0.8)',
            'rgba(6, 182, 212, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(168, 85, 247, 0.8)'
          ],
          borderColor: [
            'rgb(124, 102, 244)',
            'rgb(6, 182, 212)',
            'rgb(16, 185, 129)',
            'rgb(245, 158, 11)',
            'rgb(239, 68, 68)',
            'rgb(168, 85, 247)'
          ],
          borderWidth: 2
        }
      ]
    };
  }, [appointmentsData]);

  // Chart: Time Series Line
  const timeSeriesChartData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };

    // Helper function to transform data from [{year, month, count}] to array of 12 numbers
    const transformTimeData = (data) => {
      if (!Array.isArray(data) || data.length === 0) {
        return new Array(12).fill(0);
      }

      // Initialize array with 12 zeros (one for each month)
      const monthlyData = new Array(12).fill(0);

      // If data is array of objects with {year, month, count}
      if (data[0] && typeof data[0] === 'object' && 'month' in data[0]) {
        data.forEach(item => {
          const monthIndex = monthMap[item.month];
          if (monthIndex !== undefined) {
            monthlyData[monthIndex] = item.count || 0;
          }
        });
      }
      // If data is already an array of numbers (backward compatibility)
      else if (typeof data[0] === 'number') {
        return data;
      }

      return monthlyData;
    };

    const postsData = transformTimeData(postsOverTime);
    const articlesData = transformTimeData(articlesOverTime);
    const appointmentsData = transformTimeData(appointmentsOverTime);
    const userRegistrationsData = transformTimeData(userRegistrationsOverTime);

    // Check if we have any data (at least one value > 0 in any dataset)
    const hasData =
      postsData.some(val => val > 0) ||
      articlesData.some(val => val > 0) ||
      appointmentsData.some(val => val > 0) ||
      userRegistrationsData.some(val => val > 0);

    return {
      labels: months,
      datasets: [
        {
          label: 'Posts',
          data: postsData,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Articles',
          data: articlesData,
          borderColor: 'rgb(6, 182, 212)',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Appointments',
          data: appointmentsData,
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'User Registrations',
          data: userRegistrationsData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ],
      hasData
    };
  }, [postsOverTime, articlesOverTime, appointmentsOverTime, userRegistrationsOverTime]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8
      }
    }
  };

  // User Registrations by Role Chart Data
  const registrationsByRoleChartData = useMemo(() => {
    if (!userRegistrationsByRole) return null;

    const labels = [];
    const data = [];
    const colors = [
      'rgba(124, 102, 244, 0.8)',
      'rgba(245, 158, 11, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(168, 85, 247, 0.8)'
    ];
    const borderColors = [
      'rgb(124, 102, 244)',
      'rgb(245, 158, 11)',
      'rgb(16, 185, 129)',
      'rgb(168, 85, 247)'
    ];

    if (userRegistrationsByRole.patients !== undefined) {
      labels.push('Patients');
      data.push(userRegistrationsByRole.patients || 0);
    }
    if (userRegistrationsByRole.doctors !== undefined) {
      labels.push('Doctors');
      data.push(userRegistrationsByRole.doctors || 0);
    }
    if (userRegistrationsByRole.partners !== undefined) {
      labels.push('Partners');
      data.push(userRegistrationsByRole.partners || 0);
    }
    if (userRegistrationsByRole.supervisors !== undefined) {
      labels.push('Supervisors');
      data.push(userRegistrationsByRole.supervisors || 0);
    }

    // Check if all values are 0
    if (data.every(val => val === 0)) return null;

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: borderColors.slice(0, labels.length),
          borderWidth: 2
        }
      ]
    };
  }, [userRegistrationsByRole]);

  // Monthly Registrations by Role Bar Chart Data
  const monthlyRegistrationsByRoleChartData = useMemo(() => {
    if (!userRegistrationsByRoleOvertime) return null;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthMap = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };

    // Helper function to transform data from [{year, month, count}] to array of 12 numbers
    const transformTimeData = (data) => {
      if (!Array.isArray(data) || data.length === 0) {
        return new Array(12).fill(0);
      }

      const monthlyData = new Array(12).fill(0);

      if (data[0] && typeof data[0] === 'object' && 'month' in data[0]) {
        data.forEach(item => {
          const monthIndex = monthMap[item.month];
          if (monthIndex !== undefined) {
            monthlyData[monthIndex] = item.count || 0;
          }
        });
      } else if (typeof data[0] === 'number') {
        return data;
      }

      return monthlyData;
    };

    const patientsData = transformTimeData(userRegistrationsByRoleOvertime.patients || []);
    const doctorsData = transformTimeData(userRegistrationsByRoleOvertime.doctors || []);
    const partnersData = transformTimeData(userRegistrationsByRoleOvertime.partners || []);
    const supervisorsData = transformTimeData(userRegistrationsByRoleOvertime.supervisors || []);

    // Check if we have any data
    const hasData =
      patientsData.some(val => val > 0) ||
      doctorsData.some(val => val > 0) ||
      partnersData.some(val => val > 0) ||
      supervisorsData.some(val => val > 0);

    if (!hasData) return null;

    return {
      labels: months,
      datasets: [
        {
          label: 'Patients',
          data: patientsData,
          backgroundColor: 'rgba(124, 102, 244, 0.8)',
          borderColor: 'rgb(124, 102, 244)',
          borderWidth: 2,
          borderRadius: 4
        },
        {
          label: 'Doctors',
          data: doctorsData,
          backgroundColor: 'rgba(245, 158, 11, 0.8)',
          borderColor: 'rgb(245, 158, 11)',
          borderWidth: 2,
          borderRadius: 4
        },
        {
          label: 'Partners',
          data: partnersData,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2,
          borderRadius: 4
        },
        {
          label: 'Supervisors',
          data: supervisorsData,
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
          borderColor: 'rgb(168, 85, 247)',
          borderWidth: 2,
          borderRadius: 4
        }
      ]
    };
  }, [userRegistrationsByRoleOvertime]);

  const groupedBarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with Ta3afy today.</p>
        </div>
        <div className="dashboard-date-range">
          <div className="date-range-group">
            <label htmlFor="from-date" className="date-range-label">From:</label>
            <input
              type="date"
              id="from-date"
              className="date-range-input"
              value={tempFromDate}
              onChange={(e) => setTempFromDate(e.target.value)}
              max={tempToDate}
            />
          </div>
          <div className="date-range-group">
            <label htmlFor="to-date" className="date-range-label">To:</label>
            <input
              type="date"
              id="to-date"
              className="date-range-input"
              value={tempToDate}
              onChange={(e) => setTempToDate(e.target.value)}
              min={tempFromDate}
              max={formatDateForInput(new Date())}
            />
          </div>
          <Button
            onClick={handleApplyDateRange}
            variant="primary"
            size="md"
            style={{ alignSelf: 'flex-end' }}
          >
            Apply
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Patients"
          value={patientsCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faUser} />}
          gradient="var(--gradient-purple-pink)"
          loading={loading}
        />
        <StatCard
          title="Total Doctors"
          value={doctorsCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faUserDoctor} />}
          gradient="var(--gradient-warning)"
          loading={loading}
        />
        <StatCard
          title="Total Articles"
          value={articlesCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faNewspaper} />}
          gradient="var(--gradient-secondary)"
          loading={loading}
        />
        <StatCard
          title="Total Posts"
          value={postsCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faComments} />}
          gradient="var(--gradient-teal-blue)"
          loading={loading}
        />
        <StatCard
          title="Total Comments"
          value={commentsCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faComment} />}
          gradient="var(--gradient-green)"
          loading={loading}
        />
        <StatCard
          title="Total Appointments"
          value={appointmentsCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faCalendarCheck} />}
          gradient="var(--gradient-blue)"
          loading={loading}
        />
        <StatCard
          title="Active Users"
          value={activeUsersCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faUsers} />}
          gradient="var(--gradient-indigo)"
          loading={loading}
        />
        <StatCard
          title="Total Supervisors"
          value={supervisorsCount?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faUserShield} />}
          gradient="var(--gradient-purple)"
          loading={loading}
        />
        <StatCard
          title="Total Users Registered"
          value={totalUsersRegistered?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faUserPlus} />}
          gradient="var(--gradient-primary)"
          loading={loading}
        />
        <StatCard
          title="New Users This Month"
          value={newUsersThisMonth?.toLocaleString()}
          icon={<FontAwesomeIcon icon={faCalendarPlus} />}
          gradient="var(--gradient-success)"
          loading={loading}
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* User Registrations by Role Chart */}
        <Card className="chart-card">
          <Card.Header>
            <h3 className="chart-title">User Registrations by Role</h3>
            <p className="chart-subtitle">Distribution of registered users by their role</p>
          </Card.Header>
          <Card.Body>
            <div className="chart-container">
              {registrationsByRoleChartData ? (
                <Doughnut data={registrationsByRoleChartData} options={doughnutOptions} />
              ) : (
                <div className="chart-empty">
                  <p>No registration data available</p>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* Monthly Registrations by Role Bar Chart */}
        <Card className="chart-card chart-card-wide">
          <Card.Header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <div>
                <h3 className="chart-title">Monthly Registrations by Role</h3>
                <p className="chart-subtitle">Number of users registered each month, split by role</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <label htmlFor="year-select-registrations" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Year:</label>
                <select
                  id="year-select-registrations"
                  value={tempYear}
                  onChange={(e) => setTempYear(parseInt(e.target.value))}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer'
                  }}
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <Button
                  onClick={handleApplyYear}
                  variant="primary"
                  size="sm"
                >
                  Apply
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="chart-container">
              {monthlyRegistrationsByRoleChartData ? (
                <Bar data={monthlyRegistrationsByRoleChartData} options={groupedBarChartOptions} />
              ) : (
                <div className="chart-empty">
                  <p>No registration data available for {selectedYear}</p>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* Appointments Status Chart */}
        <Card className="chart-card">
          <Card.Header>
            <h3 className="chart-title">Appointment Status</h3>
            <p className="chart-subtitle">Distribution of appointment statuses (filtered by date range)</p>
          </Card.Header>
          <Card.Body>
            <div className="chart-container">
              {appointmentsChartData ? (
                <Doughnut data={appointmentsChartData} options={doughnutOptions} />
              ) : (
                <div className="chart-empty">
                  <p>No appointment data available</p>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

        {/* Time Series Chart */}
        <Card className="chart-card chart-card-wide">
          <Card.Header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <div>
                <h3 className="chart-title">Activity Over Time</h3>
                <p className="chart-subtitle">Monthly trends for posts, articles, appointments, and user registrations</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <label htmlFor="year-select-activity" style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Year:</label>
                <select
                  id="year-select-activity"
                  value={tempYear}
                  onChange={(e) => setTempYear(parseInt(e.target.value))}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer'
                  }}
                >
                  {yearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <Button
                  onClick={handleApplyYear}
                  variant="primary"
                  size="sm"
                >
                  Apply
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="chart-container">
              {timeSeriesChartData.hasData ? (
                <Line data={timeSeriesChartData} options={chartOptions} />
              ) : (
                <div className="chart-empty">
                  <p>No activity data available for {selectedYear}</p>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
