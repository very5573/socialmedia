import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaRegHeart, FaUser } from "react-icons/fa";
import { MdOutlineExplore, MdOutlineVideoLibrary } from "react-icons/md";
import { FiMessageSquare, FiPlusSquare } from "react-icons/fi";
import { CgMoreO } from "react-icons/cg";

import "../../styles/layout/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h1 className="logo">Tripathi</h1>
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FaHome /> <span>Home</span>
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FaSearch /> <span>Search</span>
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <MdOutlineExplore /> <span>Explore</span>
        </NavLink>
        <NavLink to="/reels" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <MdOutlineVideoLibrary /> <span>Reels</span>
        </NavLink>
        <NavLink to="/messages" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FiMessageSquare /> <span>Messages</span>
        </NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FiPlusSquare /> <span>Create</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FaUser /> <span>Profile</span>
        </NavLink>
        <NavLink to="/more" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <CgMoreO /> <span>More</span>
        </NavLink>
      </nav>
    </aside>
  );
}
