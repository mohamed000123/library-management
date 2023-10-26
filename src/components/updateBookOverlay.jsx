import styles from "../style/bookCard.module.css";
import { useEffect, useRef, useState } from "react";
export function UpdateBookOverlay({ showOverlay, bookISBN, book }) {
  //   state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [copiesNumber, setCopiesNumber] = useState("");
  const [error, setError] = useState(false);
  // elements
  const overlay = useRef(null);
  const titleInput = useRef(null);
  const descriptionInput = useRef(null);
  const authorInput = useRef(null);
  const no_copiesInput = useRef(null);
  function fillInputs() {
    if (book) {
      titleInput.current.value = book.title;
      descriptionInput.current.value = book.description;
      authorInput.current.value = book.author;
      no_copiesInput.current.value = book.availableCopies;
    }
  }
  useEffect(() => {
    fillInputs();
  }, []);
  if (showOverlay) {
    overlay.current.style.display = "block";
  }
  function handelClose() {
    overlay.current.style.display = "none";
  }

  async function handelUpdate(e) {
    e.preventDefault();
    try {
      overlay.current.style.display = "none";
      const res = await fetch(`http://localhost:8000/book/${bookISBN}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          author: author,
          description: description,
          availableCopies: copiesNumber,
        }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <form className={styles.overlay} ref={overlay}>
      <div className={styles.form2}>
        <label style={{ color: "blue" }}>title</label>
        <input
          ref={titleInput}
          type="text"
          className={styles.input}
          placeholder="book title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <label style={{ color: "blue" }}>description</label>
        <input
          ref={descriptionInput}
          type="text"
          className={styles.input}
          placeholder="book description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label style={{ color: "blue" }}>author</label>
        <input
          ref={authorInput}
          type="text"
          className={styles.input}
          placeholder="author"
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <label style={{ color: "blue" }}>number of copies</label>
        <input
          ref={no_copiesInput}
          type="text"
          className={styles.input}
          placeholder="no of copies"
          onChange={(e) => {
            setCopiesNumber(e.target.value);
          }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button className={styles.editBtn} onClick={handelUpdate}>
          edit
        </button>
        <button className={styles.close} onClick={handelClose}>
          x
        </button>
      </div>
    </form>
  );
}
