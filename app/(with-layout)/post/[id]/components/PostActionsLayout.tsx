import * as stylex from "@stylexjs/stylex";
import { PropsWithChildren, useRef } from "react";
import { useClickAway } from "react-use";

interface PostActionsLayout {
  /** 메뉴 영역 바깥을 클릭했을때 실행할 콜백함수 */
  clickAwayCallback: () => void;
}

export function PostActionsLayout({
  clickAwayCallback,
  children,
}: PropsWithChildren<PostActionsLayout>) {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, clickAwayCallback);

  return (
    <div ref={ref} {...stylex.props(styles.container)}>
      <ul {...stylex.props(styles.ul)}>{children}</ul>
    </div>
  );
}

const styles = stylex.create({
  container: {
    position: "absolute",
    top: "44px",
  },
  ul: {
    listStyleType: "none",
  },
});
