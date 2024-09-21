import React from 'react';
import './adminView.css';

const AdminView = () => {

    // dummy data
    const stats = {

        totalUsers: 1200,  
        activeUsers: 900,  
        completedLessons: 450,  
        totalSurveys: 300,  
        avgConfidenceScore: 7.8,  
        avgCommunityScore: 8.3,  
        percentChangeCommunity: '15%', 
        lessonConfidenceScores: [7.2, 7.5, 8.0, 8.2, 7.9, 8.1, 7.8, 8.4],  
        lessonCommunityScores: [8.0, 8.2, 8.5, 8.7, 8.3, 8.6, 8.4, 8.9],  

    };

    return (
        <div className="admin-view">
            
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
                    <p>{stats.avgConfidenceScore}/10</p>
                </div>

                <div className="stat-box">
                    <h2>Average Community Score Across All Lessons</h2>
                    <p>{stats.avgCommunityScore}/10</p>
                </div>

                <div className="stat-box">
                    <h2>Percent Change in Community Score (First to Last Lesson)</h2>
                    <p>{stats.percentChangeCommunity}</p>
                </div>

                <div className="stat-box">
                    <h2>Total Surveys Submitted</h2>
                    <p>{stats.totalSurveys}</p>
                </div>

                {stats.lessonConfidenceScores.map((score, index) => (
                    <div className="stat-box" key={`confidence-${index}`}>
                        <h2>Average Confidence Level: Lesson {index + 1}</h2>
                        <p>{score}/10</p>
                    </div>
                ))}

                {stats.lessonCommunityScores.map((score, index) => (
                    <div className="stat-box" key={`community-${index}`}>
                        <h2>Average Community Level: Lesson {index + 1}</h2>
                        <p>{score}/10</p>
                    </div>
                ))}

            </div>

            <section className="export-view">

                <h2>Export CSV</h2>
                <button className="export-btn">Export</button>
                
            </section>

        </div>
    );
};

export default AdminView;
