import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

// Pages
import Home from "./pages/Home";  // Home page ko import karo
import Search from "./pages/Search";
import Explore from "./pages/Explore";
import Reels from "./pages/Reels";
import Messages from "./pages/Messages";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import More from "./pages/More";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Styling
import "./styles/layout/app.css";

export default function App() {
  const { user } = useContext(AuthContext); // AuthContext se user data get kar rahe hain

  return (
    <Router>
      {!user ? (  // Agar user logged in nahi hai toh login ya signup page dikhaye
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (  // Agar user logged in hai toh main app dikhe
        <div className="insta-app">
          <Sidebar />  {/* Sidebar component */}
          <main className="insta-main">
            <Routes>
              {/* Yahan Home page ko default path pe dikhana */}
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/more" element={<More />} />
              {/* Agar koi bhi page match nahi karta toh Home page pe redirect ho */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}
