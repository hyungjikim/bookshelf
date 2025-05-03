import * as stylex from "@stylexjs/stylex";

export const listItemStyles = stylex.create({
  li: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#ccc",
    },
  },
  liInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px",
    padding: "4px",
  },
});
