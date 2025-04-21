import { Database } from "@/database.types";
import * as stylex from "@stylexjs/stylex";

type Book = Database["public"]["Tables"]["books"]["Row"];

export default function Cell({ book }: { book: Book }) {
  return (
    <div {...stylex.props(styles.container)}>
      <h1 {...stylex.props(styles.title)}>{book.title}</h1>
      <p {...stylex.props(styles.desc, styles.author)}>{book.author}</p>
      <p {...stylex.props(styles.desc, styles.publisher)}>{book.publisher}</p>
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "grid",
    gap: "4px",
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
    },
  },
  title: {
    fontSize: "1.1rem",
  },
  desc: {
    fontSize: "0.9rem",
  },
  author: {
    color: "#888",
  },
  publisher: {
    color: "#d1d1d1",
  },
});
