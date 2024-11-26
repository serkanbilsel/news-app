import React from "react";
import "../styles/LivePage.css";

const Live: React.FC = () => {
  return (
    <div className="live-container">
      <div className="live-header">
        <h1>Live Broadcast</h1>
      </div>
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/1wNxGhtZeng?si=DINllJPPlvhanpOM"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="CNN Live"
        ></iframe>
      </div>
    </div>
  );
};

export default Live;
