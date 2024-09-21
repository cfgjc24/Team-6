import React, { useEffect, useState } from 'react';
import './adminView.css';

const AdminView = () => {

  const [adminData, setAdminData] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    completedLessons: 0,
    avgConfidenceScores: [],
    avgCommunityScores: [],
    totalSurveys: 0,

  });

  useEffect(() => {

    const fetchAdminData = async () => {

      try {

        const response = await fetch('http://127.0.0.1:5000/api/admin/get_all'); // api call to all data
        const data = await response.json();

        const totalUsers = data.length;
        const completedLessons = data.filter(user => user.completed).length;
        const activeUsers = totalUsers - completedLessons;
        const totalSurveys = data.filter(user => user.suggestions !== null).length;

        const avgConfidenceScores = data.map(user => user.confidence_level).filter(Boolean);
        const avgCommunityScores = data.map(user => user.belonging_level).filter(Boolean);

        setStats({

          totalUsers,
          activeUsers,
          completedLessons,
          avgConfidenceScores,
          avgCommunityScores,
          totalSurveys,

        });

        setAdminData(data);

      } catch (error) {

        console.error('Error fetching the admin data:', error);

      }

    };

    fetchAdminData();
  }, []);

  const handleExportCSV = async (path) => {
    
    try {

      const response = await fetch(path);

      if (response.ok) {

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `data.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();

      } else {

        console.error('Failed to download the file');
      }

    } catch (error) {

      console.error('Error downloading the file', error);

    }

  };

  const calculateAverage = (scores) => { // calculating average of community and confidence scores

    return scores.length ? (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2) : 0;

  };

  return (
    
    <div className="admin-view">

      {/* data boxes */}
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of platform statistics and performance for First Generation Investors</p>
      </header>

      <div className="stats-grid">
        <div className="stat-box">
          <h2>Total Users (Active + Graduated)</h2>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="stat-box">
          <h2>Active Users</h2>
          <p>{stats.activeUsers}</p>
        </div>

        <div className="stat-box">
          <h2>Lessons Completed</h2>
          <p>{stats.completedLessons}</p>
        </div>

        <div className="stat-box">
          <h2>Average Confidence Level Across All Lessons</h2>
          <p>{calculateAverage(stats.avgConfidenceScores)}/10</p>
        </div>

        <div className="stat-box">
          <h2>Average Community Score Across All Lessons</h2>
          <p>{calculateAverage(stats.avgCommunityScores)}/10</p>
        </div>

        <div className="stat-box">
          <h2>Total Surveys Submitted</h2>
          <p>{stats.totalSurveys}</p>
        </div>
      </div>

      <section className="export-view">

        <h2>Export CSV's</h2>
        <button className="export-btn" style={{ marginRight: '5px' }}>Export this Page</button>
        <button onClick={() => handleExportCSV('http://127.0.0.1:5000/api/admin/dump')} className="export-btn">Export Users</button>
        <button onClick={() => handleExportCSV('http://127.0.0.1:5000/api/admin/dump/lesson')} className="export-btn" style={{ marginLeft: '5px' }}>Export Lessons</button>

      </section>

    </div>

  );

};

export default AdminView;