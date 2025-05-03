import * as stylex from "@stylexjs/stylex";

import { PostActions } from "./PostActions";

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
  return (
    <div {...stylex.props(styles.container)}>
      <PostActions id={id} isAuthor={isAuthor} />
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
