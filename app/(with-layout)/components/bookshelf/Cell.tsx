import * as stylex from "@stylexjs/stylex";
import { Book } from "./types";
import { ChevronRight } from "lucide-react";
import { tokens } from "@/app/styles/tokens.stylex";

export default function Cell({ book }: { book: Book }) {
  return (
    <div {...stylex.props(styles.container)} data-testid="cell-container">
      <div {...stylex.props(styles.bookInfo)}>
        <h1 {...stylex.props(styles.title)} data-testid="cell-title">
          {book.title}
        </h1>

        {book.author && (
          <p
            {...stylex.props(styles.desc, styles.author)}
            data-testid="cell-author"
          >
            {book.author}
          </p>
        )}

        {book.publisher && (
          <p
            {...stylex.props(styles.desc, styles.publisher)}
            data-testid="cell-publisher"
          >
            {book.publisher}
          </p>
        )}
      </div>

      <div>
        <ChevronRight />
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
    },
  },
  bookInfo: {
    flex: 1,
    display: "grid",
  },
  title: {
    fontSize: "1.1rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    color: tokens.text,
  },
  desc: {
    fontSize: "0.9rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  author: {
    color: "#888",
  },
  publisher: {
    color: "#d1d1d1",
  },
});
