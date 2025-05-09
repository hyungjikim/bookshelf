import * as stylex from "@stylexjs/stylex";

export const layoutStyles = stylex.create({
  container: {
    margin: "0 auto",
    maxWidth: "760px",
    padding: "24px",
    height: "calc(100vh - 100px)",
  },
  section: {
    width: "100%",
  },
  fallbackWrapper: {
    minHeight: "56px",
  },
});
