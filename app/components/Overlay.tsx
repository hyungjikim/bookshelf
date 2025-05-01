"use client";

import { ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

export function Overlay({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.overlay)}>{children}</div>;
}

const styles = stylex.create({
  overlay: {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0, 0.4)",
  },
});
