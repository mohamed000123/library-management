import noBooks from "../assets/noBooks.jpeg";
import BookCard from "../components/bookCard";
import { useEffect, useState } from "react";
import styles from "../style/bookCard.module.css";

function UserBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch(`http://localhost:8000/user-books`, {
          credentials: "include",
        });
        const data = await res.json();
        setBooks(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <>
      <div className={styles.container}>
        {books.length > 0 ? (
          <>
            <h2>available books</h2>
            <BookCard books={books}></BookCard>
          </>
        ) : (
          <>
            <h2>the library is empty for now</h2>
            <img src={noBooks} className={styles.noBooks} />
          </>
        )}
      </div>
    </>
  );
}

export default UserBooks;
