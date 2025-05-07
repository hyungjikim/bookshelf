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
    maxWidth: "460px",
    minHeight: "700px",
    width: "100%",
    margin: "0 auto",
    padding: "24px",
    backgroundColor: "white",
    borderRadius: "8px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxHeight: "80vh",
    overflow: "auto",
  },
});
