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

    const handleExportCSV = async (type) => {
        try {

            const response = await fetch(`127.0.0.1:5000/api/admin/dump/${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/csv',
                },

            });

            if (response.ok) {

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;

                a.download = `${type}-data.csv`; 
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

                <h2>Export CSV's</h2>
                <button className="export-btn" style={{ marginRight: '5px' }}>Export this Page</button>
                <button className="export-btn">Export Users</button>
                <button onClick={() => handleExportCSV('lessons')} className="export-btn" style={{ marginLeft: '5px' }}>Export Lessons</button>

            </section>

        </div>
    );
};

export default AdminView;
