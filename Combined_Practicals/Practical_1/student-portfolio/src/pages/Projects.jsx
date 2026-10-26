import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchRepositories = () => {
    setLoading(true);
    setError("");

    fetch("https://api.github.com/users/MansiJogani12/repos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch repositories.");
        }
        return response.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={fetchRepositories}
      />
    );
  }

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <section id="projects">
        <h2>GitHub Repositories</h2>

        <p>
          Repositories fetched dynamically using the GitHub REST API.
        </p>

        <input
          className="search-box"
          type="text"
          placeholder="Search repository..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="project-grid">
          {filteredRepos.map((repo) => (
            <div className="project-card" key={repo.id}>
              <h3>{repo.name}</h3>

              <p>
                ⭐ Stars: {repo.stargazers_count}
              </p>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
              >
                View Repository
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;