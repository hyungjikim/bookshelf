"use client";

import { PostActionsMenu } from "@/app/(with-layout)/post/[id]/components/PostActionsMenu";
import * as stylex from "@stylexjs/stylex";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export function BookDetailModal({
  children,
  id,
}: {
  children: ReactNode;
  id: number;
}) {
  const router = useRouter();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <div role="dialog" {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.content)}>
          <div {...stylex.props(styles.buttonWrapper)}>
            <button
              onClick={() => {
                setIsMenuVisible((prev) => !prev);
              }}
            >
              <Menu />
            </button>
            {isMenuVisible && (
              <PostActionsMenu
                id={id}
                clickAwayCallback={() => setIsMenuVisible(false)}
              />
            )}
            <button onClick={() => router.back()}>
              <X />
            </button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
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
