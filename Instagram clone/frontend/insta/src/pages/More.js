import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { signOut } from "firebase/auth"; // For logout
import { auth } from "../firebase/firebase"; // Import firebase auth
import "../styles/pages/more.css"; // Import the CSS

export default function More() {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  return (
    <div className="more-container">
      <h2>More Options</h2>
      <ul>
        <li onClick={() => navigate("/settings")}>Settings</li>
        <li onClick={() => navigate("/your-activity")}>Your Activity</li>
        <li onClick={() => navigate("/saved")}>Saved</li>
        <li onClick={() => navigate("/switch-appearance")}>Switch Appearance</li>
        <li onClick={() => navigate("/report-problem")}>Report a Problem</li>
        <li className="logout" onClick={handleLogout}>Log out</li>
      </ul>
    </div>
  );
}
