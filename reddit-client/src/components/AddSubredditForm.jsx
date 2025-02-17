import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function AddSubredditForm({ addSubreddit }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (input.trim()) {
      addSubreddit(input.trim());
      setInput("");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Añadir un subreddit..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

AddSubredditForm.propTypes = {
  addSubreddit: PropTypes.func.isRequired,
};

export default AddSubredditForm;
