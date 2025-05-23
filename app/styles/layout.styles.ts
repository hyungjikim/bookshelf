import * as stylex from "@stylexjs/stylex";

export const layoutStyles = stylex.create({
  main: {
    margin: "0 auto",
    maxWidth: "760px",
    padding: "24px",
  },
  section: {
    width: "100%",
  },
  fallbackWrapper: {
    minHeight: "56px",
  },
});
