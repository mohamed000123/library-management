import styles from "../../style/bookCard.module.css";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin({}) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:8000/pinned`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        if (data) {
          setBooks(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {books.length > 0 ? (
        books.map((book) => {
          return (
            <div className={styles.book} key={book.ISBN}>
              <p>
                title:
                <span style={{ color: "blue" }}>{book.title}</span>
              </p>
              <p>
                author:
                <span style={{ color: "blue" }}>{book.title}</span>
              </p>
              <p>
                description:
                <span style={{ color: "blue" }}>{book.description}</span>
              </p>
            </div>
          );
        })
      ) : (
        <h2>no pending books</h2>
      )}
    </>
  );
}
