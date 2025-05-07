import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing React Icons
import "../../styles/feed/Stories.css";

export default function Stories() {
  const users = Array.from({ length: 37 }, (_, i) => `user_${i + 1}`);
  const scrollRef = useRef(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [key, setKey] = useState(0);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  useEffect(() => {
    if (currentStoryIndex !== null) {
      const timer = setTimeout(() => {
        setCurrentStoryIndex((prev) => (prev < users.length - 1 ? prev + 1 : null));
        setKey((k) => k + 1);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [currentStoryIndex]);

  const handleStoryClick = (index) => {
    setCurrentStoryIndex(index);
    setKey((k) => k + 1);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentStoryIndex < users.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setKey((k) => k + 1);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setKey((k) => k + 1);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setCurrentStoryIndex(null);
  };

  return (
    <>
      <div className="stories-wrapper">
        <button className="scroll-btn left" onClick={scrollLeft}>
          <FaArrowLeft /> {/* Using React Icon for left arrow */}
        </button>

        <div className="stories" ref={scrollRef}>
          {users.map((user, index) => (
            <div className="story" key={index} onClick={() => handleStoryClick(index)}>
              <div
                className="story-avatar"
                style={{
                  backgroundImage: `url(/story-img/${index + 1}.jpg)`,
                }}
              />
              <span className="story-name">{user}</span>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={scrollRight}>
          <FaArrowRight /> {/* Using React Icon for right arrow */}
        </button>
      </div>

      {currentStoryIndex !== null && (
        <div className="story-fullscreen" onClick={handleClose}>
          <div className="progress-bar">
            <div className="progress" key={key}></div>
          </div>

          <img
            src={`/story-img/${currentStoryIndex + 1}.jpg`}
            alt="story"
            className="story-image"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="nav-button left" onClick={handlePrev}>
            <FaArrowLeft /> {/* React Icon for left navigation */}
          </button>
          <button className="nav-button right" onClick={handleNext}>
            <FaArrowRight /> {/* React Icon for right navigation */}
          </button>
          <button className="close-btn" type="button" onClick={handleClose}>
            ✖
          </button>
        </div>
      )}
    </>
  );
}
