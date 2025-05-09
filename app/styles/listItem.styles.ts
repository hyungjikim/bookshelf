import * as stylex from "@stylexjs/stylex";
import { tokens } from "./tokens.stylex";

export const listItemStyles = stylex.create({
  li: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",

    backgroundColor: {
      default: tokens.white,
      ":hover": tokens.primary,
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
