import { useState, useEffect } from "react";
import AddSubredditForm from "./components/AddSubredditForm";
import SubredditLane from "./components/SubredditLane";
import Poput from "./components/Poput";
import "./index.css";

function App() {
  const [subreddits, setSubreddits] = useState(() => {
    const stored = localStorage.getItem("subreddits");
    return stored ? JSON.parse(stored) : ["javascript", "reactjs"];
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("subreddits", JSON.stringify(subreddits));
  }, [subreddits]);

  const addSubreddit = async (newSubreddit) => {
    const exists = subreddits.some(
      (s) => s.toLowerCase() === newSubreddit.toLowerCase()
    );
    if (exists) {
      alert(`El subreddit "${newSubreddit}" ya existe.`);
      return;
    }
    
    try {
      const response = await fetch(`https://www.reddit.com/r/${newSubreddit}.json`);
      if (!response.ok) {
        alert(`El subreddit "${newSubreddit}" no existe.`);
        return;
      }
      const data = await response.json();
      if (!data.data || !data.data.children || data.data.children.length === 0) {
        alert(`El subreddit "${newSubreddit}" no tiene publicaciones.`);
        return;
      }
      setSubreddits((prev) => [...prev, newSubreddit]);
      setShowModal(false);
    } catch {
      alert(`No se pudo verificar el subreddit "${newSubreddit}".`);
    }
  };

  const removeSubreddit = (subredditToRemove) => {
    setSubreddits((prev) =>
      prev.filter(
        (s) => s.toLowerCase() !== subredditToRemove.toLowerCase()
      )
    );
  };

  return (
    <div className="app">
      <h1 className="title">Reddit Client</h1>
      <button className="addSubreddit" onClick={() => setShowModal(true)}>
        Agregar Subreddit
      </button>
      
      {showModal && (
        <Poput onClose={() => setShowModal(false)}>
          <AddSubredditForm addSubreddit={addSubreddit} />
        </Poput>
      )}

      <div className="lanes">
        {subreddits.map((subreddit) => (
          <SubredditLane
            key={subreddit}
            subreddit={subreddit}
            onDelete={() => removeSubreddit(subreddit)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
