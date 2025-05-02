import * as stylex from "@stylexjs/stylex";

export const layoutStyles = stylex.create({
  container: {
    margin: "0 auto",
    maxWidth: "760px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #eee",
    padding: "12px",
    borderRadius: "12px",
  },
  section: {
    width: "100%",
  },
  fallbackWrapper: {
    minHeight: "56px",
  },
});
