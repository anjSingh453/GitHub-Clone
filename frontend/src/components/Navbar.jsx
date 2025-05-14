// import React from "react";
// import { Link } from "react-router-dom";
// import "./navbar.css";

// const Navbar = () => {
//   return (
//     <nav>
//       <Link to="/">
//         <div>
//           <img
//             src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
//             alt="GitHub Logo"
//           />
//           <h3>GitHub</h3>
//         </div>
//       </Link>
//       <div>
//         <Link to="/create">
//           <p>Create a Repository</p>
//         </Link>
//         <Link to="/issue">
//         <p>Issue</p>
//         </Link>
//         <Link to="/profile">
//           <p>Profile</p>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from "react";
import { Link } from "react-router-dom";
import {
  MarkGithubIcon,
  RepoIcon,
  PlusIcon,
  IssueOpenedIcon,
  PersonIcon,
} from "@primer/octicons-react";
import "./navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    // Remove token and userId from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    // Redirect to login page
    window.location.href = "/auth";
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
        
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
