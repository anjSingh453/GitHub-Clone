import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MarkGithubIcon,
  RepoIcon,
  PlusIcon,
  IssueOpenedIcon,
  PersonIcon,
} from "@primer/octicons-react";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/auth");  // ✅ client-side navigation
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <MarkGithubIcon size={32} />
          <h3>GitHub</h3>
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/create" className="nav-item">
          <PlusIcon size={16} />
          <span>Create</span>
        </Link>
        <Link to="/issue" className="nav-item">
          <IssueOpenedIcon size={16} />
          <span>Issues</span>
        </Link>
        <Link to="/profile" className="nav-item">
          <PersonIcon size={16} />
          <span>Profile</span>
        </Link>
        
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
