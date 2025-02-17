import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Poput from "./Poput";

function SubredditLane({ subreddit, onDelete }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Tiempo de validez del caché: 10 minutos (en milisegundos)
  const CACHE_TTL = 10 * 60 * 1000;

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const cacheKey = `cache-${subreddit}`;
      const cached = localStorage.getItem(cacheKey);
      const now = Date.now();

      if (cached) {
        const cachedData = JSON.parse(cached);
        // Si la data en caché es reciente, la usamos y evitamos la solicitud
        if (now - cachedData.timestamp < CACHE_TTL) {
          setPosts(cachedData.posts);
          setLoading(false);
          return;
        }
      }

      // Si no hay data en caché o está desactualizada, se realiza la petición
      const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener el subreddit.`);
      }
      const data = await response.json();
      const fetchedPosts = data.data.children.map((post) => ({
        id: post.data.id,
        title: post.data.title,
        author: post.data.author,
        votes: post.data.ups,
        url: post.data.url,
      }));

      // Guardamos la data en caché junto con el timestamp actual
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ posts: fetchedPosts, timestamp: now })
      );

      setPosts(fetchedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [subreddit]);

  const visiblePosts = showAll ? posts : posts.slice(0, 3);

  return (
    <div className="subreddit-lane">
      <button
        className="options-btn"
        onClick={() => setShowOptions(true)}
        title="Opciones"
      >
        &#8942;
      </button>

      <h2>{subreddit}</h2>

      {loading && <p>Cargando posts...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          {posts.length === 0 ? (
            <p>No se encontraron publicaciones.</p>
          ) : (
            <>
              <ul>
                {visiblePosts.map((post) => (
                  <li key={post.id}>
                    <p>Autor: {post.author}</p>
                    <p>
                      Título:{" "}
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </a>
                    </p>
                    <p>Votos: {post.votes}</p>
                  </li>
                ))}
              </ul>
              {posts.length > 3 && (
                <button
                  className={`btn ${showAll ? "show-more" : "show-less"}`}
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Mostrar menos" : "Mostrar más"}
                </button>
              )}
            </>
          )}
        </>
      )}

      {showOptions && (
        <Poput onClose={() => setShowOptions(false)}>
          <div className="options-popup">
            <button
              className="btn-refresh"
              onClick={() => {
                // Elimina el caché para forzar una actualización
                localStorage.removeItem(`cache-${subreddit}`);
                fetchPosts();
                setShowOptions(false);
              }}
            >
              Refresh
            </button>
            {onDelete && (
              <button
                className="btn-delete"
                onClick={() => {
                  onDelete();
                  setShowOptions(false);
                }}
              >
                Delete
              </button>
            )}
          </div>
        </Poput>
      )}
    </div>
  );
}

SubredditLane.propTypes = {
  subreddit: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default SubredditLane;


// YA ESTA EL CODIGO, DARLE UNA ULTIMA REVISADA Y
// CONFIRMAR EL COMMIT Y ENVIARLO AL REPO REMOTO

// YA ESTA EL CODIGO, DARLE UNA ULTIMA REVISADA Y
// CONFIRMAR EL COMMIT Y ENVIARLO AL REPO REMOTO