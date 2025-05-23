// import React, { useState, useEffect } from "react";
// import "./dashboard.css";
// import Navbar from "../Navbar";
// import {
//   RepoIcon,
//   InfoIcon,
//   CalendarIcon,
//   SearchIcon,
// } from "@primer/octicons-react";

// const Dashboard = () => {
//   const [repositories, setRepositories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     const fetchRepositories = async () => {
//       try {
//         const response = await fetch(`https://github-clone-1-w9pl.onrender.com/repo/user/${userId}`);
//         const data = await response.json();
//         setRepositories(data.repositories || []);
//       } catch (err) {
//         console.error("Error while fetching repositories: ", err);
//       }
//     };

//     const fetchSuggestedRepositories = async () => {
//       try {
//         const response = await fetch(`https://github-clone-1-w9pl.onrender.com/repo/all`);
//         const data = await response.json();
//         setSuggestedRepositories(data);
//       } catch (err) {
//         console.error("Error while fetching suggested repositories: ", err);
//       }
//     };

//     fetchRepositories();
//     fetchSuggestedRepositories();
//   }, []);

//   useEffect(() => {
//     if (searchQuery === "") {
//       setSearchResults(repositories);
//     } else {
//       const filteredRepo = repositories.filter((repo) =>
//         repo.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSearchResults(filteredRepo);
//     }
//   }, [searchQuery, repositories]);

//   return (
//     <>
//       <Navbar />
//       <section id="dashboard">
//         {/* Suggested Repositories */}
//         <aside>
//           <h3>
//             <RepoIcon size={16} /> Suggested Repositories
//           </h3>
//           {suggestedRepositories.length === 0 ? (
//             <p>No suggestions available</p>
//           ) : (
//             suggestedRepositories.slice(0, 5).map((repo) => (
//               <div key={repo._id} className="repo-card">
//                 <h4>
//                   <RepoIcon size={16} /> {repo.name}
//                 </h4>
//                 <p>
//                   <InfoIcon size={14} />{" "}
//                   {repo.description || "No description provided."}
//                 </p>
//               </div>
//             ))
//           )}
//         </aside>

//         {/* Your Repositories */}
//         <main>
//           <h2>
//             <RepoIcon size={20} /> Your Repositories
//           </h2>

//           <div id="search">
//             <SearchIcon size={16} style={{ marginRight: "8px" }} />
//             <input
//               type="text"
//               value={searchQuery}
//               placeholder="Search repositories..."
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           {searchResults.length === 0 ? (
//             <p>No repositories found.</p>
//           ) : (
//             searchResults.map((repo) => (
//               <div key={repo._id} className="repo-card">
//                 <h4>
//                   <RepoIcon size={16} /> {repo.name}
//                 </h4>
//                 <p>
//                   <InfoIcon size={14} />{" "}
//                   {repo.description || "No description provided."}
//                 </p>
//               </div>
//             ))
//           )}
//         </main>

//         {/* Upcoming Events */}
//         <aside>
//           <h3>
//             <CalendarIcon size={16} /> Upcoming Events
//           </h3>
//           <ul>
//             <li>
//               <p>
//                 <CalendarIcon size={14} /> Tech Conference - Dec 15
//               </p>
//             </li>
//             <li>
//               <p>
//                 <CalendarIcon size={14} /> Developer Meetup - Dec 25
//               </p>
//             </li>
//             <li>
//               <p>
//                 <CalendarIcon size={14} /> React Summit - Jan 5
//               </p>
//             </li>
//           </ul>
//         </aside>
//       </section>
//     </>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import { Button } from "@primer/react";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://github-clone-1-w9pl.onrender.com/repo/user/${userId}`);
        const data = await response.json();
        setRepositories(data.repositories || []);
        setSearchResults(data.repositories || []);
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
        setError("Failed to fetch repositories");
        setLoading(false);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`https://github-clone-1-w9pl.onrender.com/repo/all`);
        const data = await response.json();
        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error("Error while fetching suggested repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        <aside>
          <h3>Suggested Repositories</h3>
          {suggestedRepositories.length > 0 ? (
            suggestedRepositories.map((repo) => (
              <div key={repo._id} className="repo-card">
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          ) : (
            <p>No suggestions available.</p>
          )}
        </aside>

        <main>
          <h2>Your Repositories</h2>

          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : searchResults.length === 0 ? (
            <p>You have no repositories yet.</p>
          ) : (
            searchResults.map((repo) => (
              <div key={repo._id} className="repo-card">
                <h4>{repo.name}</h4>
                <p>{repo.description}</p>
              </div>
            ))
          )}
        </main>

        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Dec 25</p>
            </li>
            <li>
              <p>React Summit - Jan 5</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
