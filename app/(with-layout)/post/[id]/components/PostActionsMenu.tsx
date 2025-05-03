import * as stylex from "@stylexjs/stylex";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useClickAway } from "react-use";
import { DeleteDialog } from "./DeleteDialog";

interface PostActionsMenuProps {
  /** 수정할 게시물의 id */
  id: number;
  /** 메뉴 영역 바깥을 클릭했을때 실행할 콜백함수 */
  clickAwayCallback: () => void;
}

export function PostActionsMenu({
  id,
  clickAwayCallback,
}: PostActionsMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, clickAwayCallback);

  return (
    <div ref={ref} {...stylex.props(styles.container)}>
      <ul {...stylex.props(styles.ul)}>
        <Link href={`/post/${id}/edit`}>
          <li {...stylex.props(styles.li)}>
            <Edit /> 수정
          </li>
        </Link>

        <DeleteDialog />
      </ul>
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
  li: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px",
    padding: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#ccc",
    },
  },
  liSpace: {
    marginTop: "4px",
  },
});
