"use client";

import { PostActions } from "@/app/(with-layout)/post/[id]/components/PostActions";
import { buttonStyles } from "@/app/styles/form.styles";
import { tokens } from "@/app/styles/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

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

  return (
    <div {...stylex.props(styles.wrapper)}>
      <PostActions id={id} isAuthor={isAuthor} />
      <button
        onClick={() => router.back()}
        {...stylex.props(buttonStyles.button, styles.customButton)}
      >
        <X />
      </button>
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    position: "sticky",
    top: 0,
    display: "flex",
    justifyContent: "end",
    gap: "8px",
    padding: "8px",
    backgroundColor: "#fff",
  },
  customButton: {
    backgroundColor: {
      default: tokens.white,
      ":hover": tokens.primary,
    },
  },
});
