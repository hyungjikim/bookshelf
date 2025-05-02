"use client";

import { useState } from "react";
import { PostActionsMenu } from "./PostActionsMenu";
import { Menu } from "lucide-react";
import * as stylex from "@stylexjs/stylex";

interface PostActionsControlsProps {
  /** 액션이 필요한 게시물의 id */
  id: number;
  /** 해당 게시물 작성자인지 여부
   * WithAuthorOnly 컴포넌트에서 확인
   */
  isAuthor?: boolean;
}

export function PostActionsControls({
  id,
  isAuthor,
}: PostActionsControlsProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div {...stylex.props(styles.container)}>
      {isAuthor && (
        <button onClick={() => setIsVisible((prev) => !prev)}>
          <Menu />
        </button>
      )}
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
