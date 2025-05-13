// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   Box,
//   Button,
//   TextInput,
//   FormControl,
//   Heading,
//   Select,
//   Textarea,
//   Flash,
// } from "@primer/react";
// import { RepoIcon } from "@primer/octicons-react";



// const CreateRepository = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     visibility: "true",
//     content: "",
//   });

//   const [message, setMessage] = useState(null);
//   const navigate = useNavigate();


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem("userId");

//     try {
//       const response = await fetch("http://localhost:3000/repo/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           owner: userId,
//           visibility: formData.visibility === "true",
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage({ type: "success", text: "Repository created successfully!" });
//         setFormData({ name: "", description: "", visibility: "true", content: "" });

//         setTimeout(() => {
//     navigate("/");
//   }, 2000);
//       } else {
//         setMessage({ type: "error", text: data.error || "Failed to create repository." });
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage({ type: "error", text: "Something went wrong!" });
//     }
//   };

//   return (
//     <Box
//       width="100%"           // Make it responsive
//   maxWidth="900px"       // Increased from 100vh to 900px
//   mx="auto"              // Horizontally center the box
//   mt={3}
//   p={5}                   
//   borderRadius={6}
//   borderWidth={1}
//   borderColor="border.default"
//   boxShadow="medium"
//   bg="#161a23"
//   color="#f1f6fd"
//   sx={{
//     '@media screen and (max-width: 768px)': {
//       p: 3,
//     },
//     '@media screen and (max-width: 480px)': {
//       p: 2,
//       width: '95%',
//     }
//   }}
//     >
//       <Heading as="h2" sx={{ mb: 4 }}>
//         <RepoIcon size={24} /> Create a New Repository
//       </Heading>

//       {message && (
//         <Flash variant={message.type} sx={{ mb: 3 }}>
//           {message.text}
//         </Flash>
//       )}

//       <form onSubmit={handleSubmit}>
//         <FormControl required sx={{ mt: 3 }}>
//           <FormControl.Label>Repository Name</FormControl.Label>
//           <TextInput
//             name="name"
//             placeholder="e.g. my-awesome-repo"
//             value={formData.name}
//             onChange={handleChange}
//             contrast
//             sx={{
//               borderColor: "white",
//               backgroundColor: "white",
//               color: "black",
//               "::placeholder": { color: "#666" },
//             }}
//           />
//         </FormControl>

//         <FormControl sx={{ mt: 3 }}>
//           <FormControl.Label>Description (optional)</FormControl.Label>
//           <Textarea
//             name="description"
//             placeholder="Describe your repository..."
//             value={formData.description}
//             onChange={handleChange}
//             rows={3}
//             sx={{
//               borderColor: "white",
//               backgroundColor: "white",
//               color: "black",
//               "::placeholder": { color: "#666" },
//             }}
//           />
//         </FormControl>

//         <FormControl sx={{ mt: 3 }}>
//           <FormControl.Label>Visibility</FormControl.Label>
//           <Select
//             name="visibility"
//             value={formData.visibility}
//             onChange={handleChange}
//             sx={{
//               borderColor: "white",
//               backgroundColor: "white",
//               color: "black",
//             }}
//           >
//             <Select.Option value="true">🌍 Public</Select.Option>
//             <Select.Option value="false">🔒 Private</Select.Option>
//           </Select>
//         </FormControl>

//         <FormControl sx={{ mt: 3 }}>
//           <FormControl.Label>Initial Content</FormControl.Label>
//           <Textarea
//             name="content"
//             placeholder="README content or initial code snippet..."
//             value={formData.content}
//             onChange={handleChange}
//             rows={5}
//             sx={{
//               borderColor: "white",
//               backgroundColor: "white",
//               color: "black",
//               "::placeholder": { color: "#666" },
//             }}
//           />
//         </FormControl>

//         <Button type="submit" variant="primary" sx={{ mt: 4, width: "100%" }}>
//           Create Repository
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default CreateRepository;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextInput,
  FormControl,
  Heading,
  Select,
  Textarea,
  Flash,
} from "@primer/react";
import { RepoIcon, GlobeIcon, LockIcon } from "@primer/octicons-react";

const CreateRepository = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "public",
    content: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch("https://github-clone-1-w9pl.onrender.com/repo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          owner: userId,
          visibility: formData.visibility === "public",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ variant: "success", children: "Repository created!" });
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage({ variant: "danger", children: data.error || "Failed." });
      }
    } catch {
      setMessage({ variant: "danger", children: "Server error." });
    }
  };

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="border.default"
      borderRadius={2}
      boxShadow="small"
      p={4}
      mx="auto"
      my={4}
      maxWidth="800px"
        sx={{
          
          position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: ["90vw", "500px"],        // 90% width on mobile, capped at 500px
        mx: "auto",
        my: 4,
        p: 4,
        zIndex: 100,
          "@media(max-width:768px)": {
            position: "static",
            width: "100%",
            height: "auto",
            mx: "auto",
            my: 4,
          },
        }}
    >
      <Heading
        as="h2"
        sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
      >
        <RepoIcon size={24} /> Create a New Repository
      </Heading>

      {message && <Flash variant={message.variant}>{message.children}</Flash>}

      <form onSubmit={handleSubmit}>
        <FormControl required sx={{ mt: 4 }}>
          <FormControl.Label>
            <Box as="span" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <RepoIcon size={16} /> Repository name
            </Box>
          </FormControl.Label>
          <TextInput
            name="name"
            placeholder="e.g. my-awesome-repo"
            value={formData.name}
            onChange={handleChange}
            block
          />
          {formData.name && (
            <FormControl.Caption>
              URL: <code>github.com/your-username/{formData.name}</code>
            </FormControl.Caption>
          )}
        </FormControl>

        <FormControl sx={{ mt: 4 }}>
          <FormControl.Label>Description (optional)</FormControl.Label>
          <Textarea
            name="description"
            placeholder="A short description"
            value={formData.description}
            onChange={handleChange}
            rows={2}
            block
          />
        </FormControl>

        <FormControl sx={{ mt: 4 }}>
          <FormControl.Label>Visibility</FormControl.Label>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box
              as="label"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                border:
                  formData.visibility === "public"
                    ? "2px solid #0969da"
                    : "1px solid #d0d7de",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={formData.visibility === "public"}
                onChange={handleChange}
                hidden
              />
              <GlobeIcon />
              <Box>
                <strong>Public</strong>
                <Box sx={{ fontSize: 1, color: "fg.muted" }}>
                  Anyone can see this repository.
                </Box>
              </Box>
            </Box>

            <Box
              as="label"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                border:
                  formData.visibility === "private"
                    ? "2px solid #0969da"
                    : "1px solid #d0d7de",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={formData.visibility === "private"}
                onChange={handleChange}
                hidden
              />
              <LockIcon />
              <Box>
                <strong>Private</strong>
                <Box sx={{ fontSize: 1, color: "fg.muted" }}>
                  Only you can see this repository.
                </Box>
              </Box>
            </Box>
          </Box>
        </FormControl>

        <FormControl sx={{ mt: 4 }}>
          <FormControl.Label>Initialize with a README</FormControl.Label>
          <Textarea
            name="content"
            placeholder="Add initial README content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            block
          />
        </FormControl>

        <Button type="submit" variant="primary" sx={{ mt: 5, width: "100%" }}>
          Create Repository
        </Button>
      </form>
    </Box>
  );
};

export default CreateRepository;

