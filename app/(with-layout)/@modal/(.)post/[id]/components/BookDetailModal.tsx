"use client";

import * as stylex from "@stylexjs/stylex";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function BookDetailModal({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div role="dialog" {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.content)}>
        <div {...stylex.props(styles.buttonWrapper)}>
          <button onClick={() => router.back()}>
            <X />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    maxWidth: "440px",
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
    padding: "8px",
    backgroundColor: "white",
  },
});
