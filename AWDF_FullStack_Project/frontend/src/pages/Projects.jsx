import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Projects() {
  const [username, setUsername] = useState("MansiJogani12");
  const [queryUser, setQueryUser] = useState("MansiJogani12");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchRepositories = (targetUser = queryUser) => {
    setLoading(true);
    setError("");

    fetch(`https://api.github.com/users/${targetUser}/repos?sort=updated`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub user "${targetUser}" not found or API rate limit reached.`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch repositories.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRepositories(queryUser);
  }, [queryUser]);

  const handleUserSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setQueryUser(username.trim());
    }
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="projects-container" style={{ maxWidth: "1000px", margin: "auto" }}>
      <div className="site-header" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
          🌐 Practical 3: REST API Integration (GitHub Repositories)
        </h2>
        <p style={{ opacity: 0.85, lineHeight: "1.6" }}>
          Asynchronous data fetching with <code>fetch</code>, loading state with <code>Spinner</code>, 
          error handling with retry mechanism, and dynamic repository filtering.
        </p>
      </div>

      {/* GitHub Username Search & Repo Filter */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: "18px"
      }}>
        <form onSubmit={handleUserSearch} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid var(--card-border)" }}
          />
          <button type="submit" className="send-btn" style={{ width: "auto", padding: "10px 18px" }}>
            Search User
          </button>
        </form>

        <input
          type="text"
          placeholder="Filter repositories by name or topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--card-border)" }}
        />
      </div>

      {/* Active State View */}
      {loading ? (
        <Spinner message={`Fetching repositories for @${queryUser}...`} />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchRepositories(queryUser)} />
      ) : (
        <div>
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600 }}>
              Repositories for <code>@{queryUser}</code> ({filteredRepos.length} found)
            </span>
            <button
              onClick={() => fetchRepositories(queryUser)}
              className="theme-btn"
              style={{ padding: "6px 12px", fontSize: "0.85rem" }}
            >
              🔄 Refresh Repos
            </button>
          </div>

          {filteredRepos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", background: "var(--card-bg)", borderRadius: "16px" }}>
              <p>No repositories matched your search.</p>
            </div>
          ) : (
            <div className="project-grid">
              {filteredRepos.map((repo) => (
                <div key={repo.id} className="project-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", wordBreak: "break-all" }}>{repo.name}</h3>
                    <p style={{ fontSize: "0.9rem", margin: "8px 0 14px", opacity: 0.85, minHeight: "40px" }}>
                      {repo.description || "No description provided."}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                      <span>⭐ Stars: {repo.stargazers_count}</span>
                      {repo.language && (
                        <span style={{ background: "rgba(37,99,235,0.15)", color: "var(--accent)", padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem" }}>
                          {repo.language}
                        </span>
                      )}
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "block",
                        textAlign: "center",
                        background: "var(--accent)",
                        color: "white",
                        textDecoration: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "0.9rem"
                      }}
                    >
                      View on GitHub ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}