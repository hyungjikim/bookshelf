"use client";

import { PostActionsMenu } from "@/app/(with-layout)/post/[id]/components/PostActionsMenu";
import * as stylex from "@stylexjs/stylex";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ModalHeaderActionsProps {
  /** 액션이 필요한 게시물의 id */
  id: number;
  /** 해당 게시물 작성자인지 여부
   * WithAuthorOnly 컴포넌트에서 확인
   */
  isAuthor?: boolean;
}

export function ModalHeaderActions({ id, isAuthor }: ModalHeaderActionsProps) {
  const router = useRouter();

  const [isActionVisible, setIsActionVisible] = useState(false);

  return (
    <div {...stylex.props(styles.buttonWrapper)}>
      {isAuthor && (
        <button
          onClick={() => {
            setIsActionVisible((prev) => !prev);
          }}
        >
          <Menu />
        </button>
      )}
      {isActionVisible && (
        <PostActionsMenu
          id={id}
          clickAwayCallback={() => setIsActionVisible(false)}
        />
      )}
      <button onClick={() => router.back()}>
        <X />
      </button>
    </div>
  );
}

const styles = stylex.create({
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
