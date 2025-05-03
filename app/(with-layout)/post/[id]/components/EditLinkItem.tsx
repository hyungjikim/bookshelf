import { Edit } from "lucide-react";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { listItemStyles } from "@/app/styles/listItem.styles";

interface EditLinkItemProps {
  /** 수정할 게시물의 id */
  id: number;
}

export function EditLinkItem({ id }: EditLinkItemProps) {
  return (
    <li {...stylex.props(listItemStyles.li)}>
      <Link href={`/post/${id}/edit`} {...stylex.props(listItemStyles.liInner)}>
        <Edit /> <span>수정</span>
      </Link>
    </li>
  );
}
