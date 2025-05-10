import * as stylex from "@stylexjs/stylex";
import { tokens } from "./tokens.stylex";

export const formStyles = stylex.create({
  container: {
    maxWidth: "90vw",
    margin: "24px auto",
    border: "1px solid #ccc",
    padding: "24px",
    borderRadius: "12px",
    display: "grid",
    gap: "12px",
  },
});

export const buttonStyles = stylex.create({
  button: {
    inset: "unset",
    backgroundColor: {
      default: tokens.primary,
      ":hover": tokens.tertiary,
    },
    borderRadius: "6px",
    padding: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.dark,
    cursor: "pointer",
  },
});

export const labelStyles = stylex.create({
  label: {
    display: "block",
    marginBottom: "4px",
    fontSzie: "1.1rem",
  },
});

export const inputStyles = stylex.create({
  input: {
    height: "36px",
    width: "100%",
    maxWidth: "400px",
    padding: "4px",
    borderRadius: "6px",
    borderColor: tokens.dark,
    borderWidth: "1px",
    fontSize: "1.1rem",
  },
});
