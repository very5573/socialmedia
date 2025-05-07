// In Home.js
import React from 'react';
import Stories from "../components/feed/Stories"; // Default import
import Feed from "../components/feed/Feed"; // Default import
import RightSidebar from "../components/layout/RightSidebar"; // Default import
import "../styles/pages/home.css";

export default function Home() {
  return (
    <div className="home-page">
      <div className="feed">
        <Stories />
        <Feed currentUserId="uid1" /> {/* Pass actual user ID */}
      </div>

      <RightSidebar />
    </div>
  );
}
