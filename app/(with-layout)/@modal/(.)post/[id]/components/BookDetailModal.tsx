import * as stylex from "@stylexjs/stylex";
import { ReactNode } from "react";

export function BookDetailModal({ children }: { children: ReactNode }) {
  return (
    <div role="dialog" aria-modal="true" {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.content)}>
        <div>{children}</div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    maxWidth: "760px",
    width: "100%",
    padding: "24px",
    margin: "0 auto",
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
  buttonWrapper: {
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "end",
    gap: "8px",
    padding: "8px",
    backgroundColor: "white",
  },
});
