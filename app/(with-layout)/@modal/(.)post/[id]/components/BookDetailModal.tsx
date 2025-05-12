import * as stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

export function BookDetailModal({ children }: { children: ReactNode }) {
  return (
    <div role="dialog" aria-modal="true" {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.content)}>{children}</div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    maxHeight: "80vh",
    width: "100%",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "white",
    borderRadius: "8px",
    maxWidth: {
      default: 700,
      "@media (max-width: 700px)": "80vw",
    },
    minHeight: "80vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxHeight: "70vh",
    overflow: "auto",
  },
});
