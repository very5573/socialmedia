import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/pages/reels.css';

const Reels = () => {
  const reels = useSelector((state) => state.feed.reels);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!reels || reels.length === 0) {
    return <p className="no-reels">No reels available.</p>;
  }

  const currentReel = reels[currentIndex];

  return (
    <div className="reel-wrapper">
      <button
        className="nav-button left"
        onClick={goToPrevious}
        disabled={currentIndex === 0}
      >
        &#10094;
      </button>

      <div className="reel-card">
        <div className="reel-header">
          <img
            src={currentReel.profilePic}
            alt="Profile"
            className="reel-profile-pic"
          />
        </div>
        <video
          src={currentReel.video}
          className="reel-video"
          controls
          autoPlay
        />
      </div>

      <button
        className="nav-button right"
        onClick={goToNext}
        disabled={currentIndex === reels.length - 1}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Reels;
