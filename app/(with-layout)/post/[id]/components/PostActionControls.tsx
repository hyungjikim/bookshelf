"use client";

import { useState } from "react";
import { PostActionsMenu } from "./PostActionsMenu";
import { Menu } from "lucide-react";
import * as stylex from "@stylexjs/stylex";

interface PostActionsControlsProps {
  /** 수정할 게시물의 id */
  id: number;
}

export function PostActionsControls({ id }: PostActionsControlsProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div {...stylex.props(styles.container)}>
      <button onClick={() => setIsVisible((prev) => !prev)}>
        <Menu />
      </button>
      {isVisible && (
        <PostActionsMenu
          id={id}
          clickAwayCallback={() => setIsVisible(false)}
        />
      )}
    </div>
  );
}

const styles = stylex.create({
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
  },
});
