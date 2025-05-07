"use client";

import { ReactNode, useRef } from "react";
import { useIntersection } from "react-use";
import * as stylex from "@stylexjs/stylex";

export function InviewRender({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // @ts-expect-error: react-use 와 react 버전 이슈로 추측
  // 참고: https://github.com/streamich/react-use/issues/2612
  const intersection = useIntersection(ref, { threshold: 0.8 });

  return (
    <>
      <div ref={ref} {...stylex.props(styles.sentinel)} />
      <div>{intersection?.isIntersecting && children}</div>
    </>
  );
}

const styles = stylex.create({
  sentinel: {
    height: "2px",
  },
});
