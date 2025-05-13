// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const IssueForm = ({ repositoryId }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [repository, setRepository] = useState(""); // Editable now
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch existing issues when component mounts
//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/issue/all?repositoryId=${repositoryId}`
//         );
//         setIssues(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch issues");
//         setLoading(false);
//       }
//     };

//     fetchIssues();
//   }, [repositoryId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const issueData = {
//       title,
//       description,
//       repositoryId,
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/issue/create",
//         issueData
//       );

//       if (response.status === 201) {
//         console.log("Issue created:", response.data);
//         setTitle("");
//         setDescription("");
//         setRepository("");
//         setIssues((prev) => [response.data, ...prev]);
//       }
//     } catch (error) {
//       console.error("Error creating issue:", error);
//       alert("Error creating issue, please try again.");
//     }
//   };

//   return (
//     <div className="issue-form">
//       <h2>Create New Issue</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="repository">Repository</label>
//           <input
//             type="text"
//             id="repository"
//             value={repository}
//             onChange={(e) => setRepository(e.target.value)}
//             placeholder="Enter repository name"
//           />
//         </div>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <button type="submit">Create Issue</button>
//       </form>

//       <h3>Existing Issues</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : issues.length > 0 ? (
//         <ul>
//           {issues.map((issue) => (
//             <li key={issue._id}>
//               <strong>{issue.title}</strong>
//               <p>{issue.description}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No issues found for this repository.</p>
//       )}
//     </div>
//   );
// };

// export default IssueForm;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { IssueOpenedIcon, RepoIcon } from "@primer/octicons-react";
import "./issue.css";

const IssueForm = ({ repositoryId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [repository, setRepository] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/issue/all?repositoryId=${repositoryId}`
        );
        setIssues(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch issues");
        setLoading(false);
      }
    };

    fetchIssues();
  }, [repositoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issueData = { title, description, repositoryId };
    try {
      const response = await axios.post("http://localhost:3000/issue/create", issueData);
      if (response.status === 201) {
        setTitle("");
        setDescription("");
        setRepository("");
        setIssues((prev) => [response.data, ...prev]);
      }
    } catch (error) {
      alert("Error creating issue, please try again.");
    }
  };

  return (
    <div className="issue-layout">
      <div className="issue-form-container">
        <h2><IssueOpenedIcon size={18} /> Create New Issue</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="repository">Repository</label>
            <input
              type="text"
              id="repository"
              value={repository}
              onChange={(e) => setRepository(e.target.value)}
              placeholder="e.g., user/repo-name"
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Create Issue</button>
        </form>
      </div>

      <div className="issues-list-container">
        <h3><RepoIcon size={18} /> Existing Issues</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : issues.length > 0 ? (
          <ul>
            {issues.map((issue) => (
              <li key={issue._id}>
                <strong><IssueOpenedIcon size={16} /> {issue.title}</strong>
                <p>{issue.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No issues found for this repository.</p>
        )}
      </div>
    </div>
  );
};

export default IssueForm;


