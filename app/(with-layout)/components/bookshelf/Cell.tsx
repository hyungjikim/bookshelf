import * as stylex from "@stylexjs/stylex";
import { BookUI } from "./types";

export default function Cell({ book }: { book: BookUI }) {
  return (
    <div {...stylex.props(styles.container)} data-testid="cell-container">
      <h1 {...stylex.props(styles.title)} data-testid="cell-title">
        {book.title}
      </h1>
      <p
        {...stylex.props(styles.desc, styles.author)}
        data-testid="cell-author"
      >
        {book.author}
      </p>
      <p
        {...stylex.props(styles.desc, styles.publisher)}
        data-testid="cell-publisher"
      >
        {book.publisher}
      </p>
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
