import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserDoctor, faNewspaper, faComments } from '@fortawesome/free-solid-svg-icons';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import axios from '../../public Func/axiosAuth';
import globalVar from '../../public Func/globalVar';
import { StatCard, Card } from '../../components/ui';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
  const [loading, setLoading] = useState(true);

  // Charts State
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [postsOverTime, setPostsOverTime] = useState([]);
  const [articlesOverTime, setArticlesOverTime] = useState([]);
  const [appointmentsOverTime, setAppointmentsOverTime] = useState([]);

  // Current year for display
  const currentYear = new Date().getFullYear();

  // Fetch all stats data
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [patients, doctors, articles, posts, appointments] = await Promise.all([
          axios.get(globalVar.backendURL + '/admin/patients-number'),
          axios.get(globalVar.backendURL + '/admin/doctors-number'),
          axios.get(globalVar.backendURL + '/admin/articles-number'),
          axios.get(globalVar.backendURL + '/admin/posts-number'),
          axios.get(globalVar.backendURL + '/admin/appointment-status')
        ]);

        setPatientCount(patients.data.number);
        setDoctorCount(doctors.data.number);
        setArticlesCount(articles.data.number);
        setPostsCount(posts.data.number);
        setAppointmentsData(appointments.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Fetch time series data
  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const firstDayOfYear = new Date(currentYear, 0, 1);
        const lastDayOfYear = new Date(currentYear, 11, 31);

        const [posts, articles, appointments] = await Promise.all([
          axios.get(globalVar.backendURL + `/admin/posts-overtime?fromDate=${firstDayOfYear}&toDate=${lastDayOfYear}`),
          axios.get(globalVar.backendURL + `/admin/articles-overtime?fromDate=${firstDayOfYear}&toDate=${lastDayOfYear}`),
          axios.get(globalVar.backendURL + `/admin/appointments-overtime?fromDate=${firstDayOfYear}&toDate=${lastDayOfYear}`)
        ]);

        setPostsOverTime(posts.data);
        setArticlesOverTime(articles.data);
        setAppointmentsOverTime(appointments.data);
      } catch (err) {
        console.error('Error fetching time series data:', err);
      }
    };

    fetchTimeData();
  }, []);

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

    // Check if we have any data (at least one value > 0 in any dataset)
    const hasData =
      postsData.some(val => val > 0) ||
      articlesData.some(val => val > 0) ||
      appointmentsData.some(val => val > 0);

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
        }
      ],
      hasData
    };
  }, [postsOverTime, articlesOverTime, appointmentsOverTime]);

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

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with Ta3afy today.</p>
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
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Appointments Status Chart */}
        <Card className="chart-card">
          <Card.Header>
            <h3 className="chart-title">Appointment Status</h3>
            <p className="chart-subtitle">Distribution of appointment statuses</p>
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
            <h3 className="chart-title">Activity Over Time ({currentYear})</h3>
            <p className="chart-subtitle">Monthly trends for posts, articles, and appointments</p>
          </Card.Header>
          <Card.Body>
            <div className="chart-container">
              {timeSeriesChartData.hasData ? (
                <Line data={timeSeriesChartData} options={chartOptions} />
              ) : (
                <div className="chart-empty">
                  <p>No activity data available for {currentYear}</p>
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
