// src/components/AdditionalResources.jsx
import React from 'react';
import './AdditionalResources.css';  // Create a CSS file for styling

const AdditionalResources = () => {
  return (
    <div className="additional-resources">
      {/* Ed Link Section */}
      <div className="ed-link-section">
        <h2>Explore Educational Resources</h2>
        <a href="https://ed.example.com" className="ed-link" target="_blank" rel="noopener noreferrer">
          Visit Ed Resources
        </a>
      </div>

      {/* Helpful Resources Section */}
      <div className="helpful-resources">
        <h2>Helpful Resources</h2>
        <div className="resources-grid">
          {/* Each video thumbnail */}
          <div className="resource-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Video Thumbnail"
              className="thumbnail"
            />
            <h3>Video Title 1</h3>
            <p>Description for Video 1.</p>
          </div>

          <div className="resource-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Video Thumbnail"
              className="thumbnail"
            />
            <h3>Video Title 2</h3>
            <p>Description for Video 2.</p>
          </div>

          <div className="resource-card">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Video Thumbnail"
              className="thumbnail"
            />
            <h3>Video Title 3</h3>
            <p>Description for Video 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalResources;
