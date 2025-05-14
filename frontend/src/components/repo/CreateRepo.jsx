import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextInput,
  Heading,
  Flash,
  FormControl,
  Text,
  Select,
  Checkbox,
} from "@primer/react";

const CreateRepository = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [includeReadme, setIncludeReadme] = useState(false);
  const [gitignoreTemplate, setGitignoreTemplate] = useState("");
  const [licenseTemplate, setLicenseTemplate] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateRepository = async () => {
    const owner = localStorage.getItem("userId");

    const body = {
      owner,
      name,
      description,
      visibility: visibility === "public",
      content: [],
      issues: [],
    };

    if (includeReadme) {
      body.content.push("README.md");
    }

    if (gitignoreTemplate) {
      body.content.push(`.gitignore (${gitignoreTemplate})`);
    }

    if (licenseTemplate) {
      body.content.push(`LICENSE (${licenseTemplate})`);
    }

    try {
      const response = await fetch("https://github-clone-1-w9pl.onrender.com/repo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Repository created successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMessage(data.error || "Failed to create repository.");
      }
    } catch (err) {
      console.error("Error creating repository:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <Box
      width="100%"
      maxWidth="600px"
      mx="auto"
      mt={5}
      p={4}
      borderRadius={6}
      boxShadow="medium"
      backgroundColor="#ffffff"
      sx={{
        "@media (max-width: 768px)": {
          p: 3,
        },
      }}
    >
      <Heading as="h2" mb={3}>
        Create a new repository
      </Heading>

      {message && (
        <Flash variant="success" mb={3}>
          {message}
        </Flash>
      )}

      <FormControl>
        <FormControl.Label>Repository name</FormControl.Label>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. my-project"
          block
        />
      </FormControl>

      <FormControl mt={3}>
        <FormControl.Label>Description (optional)</FormControl.Label>
        <TextInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this repository about?"
          block
        />
      </FormControl>

      <FormControl mt={3}>
        <FormControl.Label>Visibility</FormControl.Label>
        <Select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          block
        >
          <Select.Option value="public">Public</Select.Option>
          <Select.Option value="private">Private</Select.Option>
        </Select>
      </FormControl>

      <Box mt={4}>
        <FormControl>
          <Checkbox
            id="readme"
            checked={includeReadme}
            onChange={() => setIncludeReadme(!includeReadme)}
          />
          <FormControl.Label htmlFor="readme">
            Initialize this repository with a README
          </FormControl.Label>
        </FormControl>
      </Box>

      <FormControl mt={4}>
        <FormControl.Label>Add .gitignore (optional)</FormControl.Label>
        <Select
          value={gitignoreTemplate}
          onChange={(e) => setGitignoreTemplate(e.target.value)}
          block
        >
          <Select.Option value="">None</Select.Option>
          <Select.Option value="Node">Node</Select.Option>
          <Select.Option value="Python">Python</Select.Option>
          <Select.Option value="Java">Java</Select.Option>
        </Select>
      </FormControl>

      <FormControl mt={4}>
        <FormControl.Label>Choose a license (optional)</FormControl.Label>
        <Select
          value={licenseTemplate}
          onChange={(e) => setLicenseTemplate(e.target.value)}
          block
        >
          <Select.Option value="">None</Select.Option>
          <Select.Option value="MIT">MIT License</Select.Option>
          <Select.Option value="Apache-2.0">Apache License 2.0</Select.Option>
          <Select.Option value="GPL-3.0">GNU GPL v3</Select.Option>
        </Select>
      </FormControl>

      <Button
        variant="primary"
        mt={4}
        onClick={handleCreateRepository}
        disabled={!name}
      >
        Create repository
      </Button>
    </Box>
  );
};

export default CreateRepository;
