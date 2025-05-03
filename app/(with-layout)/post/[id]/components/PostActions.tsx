"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { EditLinkItem } from "./EditLinkItem";
import { DeleteDialog } from "./DeleteDialog";
import { PostActionsLayout } from "./PostActionsLayout";

interface PostActionsProps {
  /** 액션이 필요한 게시물의 id */
  id: number;
  /** 해당 게시물 작성자인지 여부
   * WithAuthorOnly 컴포넌트에서 확인
   */
  isAuthor?: boolean;
}

export function PostActions({ id, isAuthor }: PostActionsProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {isAuthor && (
        <button onClick={() => setIsVisible((prev) => !prev)}>
          <Menu />
        </button>
      )}
      {isVisible && (
        <PostActionsLayout clickAwayCallback={() => setIsVisible(false)}>
          <EditLinkItem id={id} />
          <DeleteDialog />
        </PostActionsLayout>
      )}
    </>
  );
}
