import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  UnderlineNav,
  Spinner,
} from "@primer/react";
import { StarFillIcon, RepoIcon } from "@primer/octicons-react";

const StarredRepositories = () => {
  const [starredRepos, setStarredRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarredRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/repo/starred");
        const data = await response.json();
        setStarredRepos(data);
      } catch (error) {
        console.error("Failed to fetch starred repositories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredRepos();
  }, []);

  return (
    <Box
      px={4}
      py={5}
      mx="auto"
      width ="100%"
      maxWidth="900px"
      bg="#161a23"
  color="#f1f6fd"
      sx={{
        "@media (max-width: 768px)": {
          px: 3,
          py: 4,
        },
        "@media (max-width: 480px)": {
          px: 2,
          py: 3,
        },
        minHeight: "100vh",
      }}
    >
      <Heading as="h2" sx={{ mb: 4 }}>
        <StarFillIcon size={24} /> Starred repositories
      </Heading>

      <UnderlineNav aria-label="Repo Tabs" sx={{ mb: 4 }}>
        <UnderlineNav.Item selected icon={StarFillIcon}>
          Starred
        </UnderlineNav.Item>
      </UnderlineNav>

      {loading ? (
        <Spinner size="large" />
      ) : starredRepos.length > 0 ? (
        <Box>
          {starredRepos.map((repo) => (
            <Box
              key={repo._id}
              sx={{
                border: "1px solid",
                borderColor: "border.default",
                borderRadius: 6,
                p: 3,
                mb: 3,
                bg: "white",
                color: "black",
              }}
            >
              <Heading as="h3" sx={{ fontSize: 3 }}>
                <RepoIcon /> {repo.name}
              </Heading>
              <Text as="p" sx={{ color: "#555", mt: 1 }}>
                {repo.description || "No description provided."}
              </Text>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            border: "1px dashed",
            borderColor: "border.default",
            borderRadius: 6,
            p: 4,
            textAlign: "center",
            bg: "white",
            color: "black",
          }}
        >
          <Text sx={{ fontSize: 2, display: "block", mb: 3 }}>
            You don’t have any starred repositories yet.
          </Text>
          <Text sx={{ fontSize: 1 }}>
            Create your first list to organize and save starred repos.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default StarredRepositories;
