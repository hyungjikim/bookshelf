import { listItemStyles } from "@/app/styles/listItem.styles";
import * as stylex from "@stylexjs/stylex";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

export function DeleteDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <li
        {...stylex.props(listItemStyles.li, styles.liSpace)}
        popoverTarget="delete-popover"
      >
        <button
          onClick={() => ref.current?.showModal()}
          {...stylex.props(listItemStyles.liInner, styles.deleteButton)}
        >
          <Trash2 /> <span>삭제</span>
        </button>
      </li>

      <dialog ref={ref} {...stylex.props(styles.dialog)}>
        <p {...stylex.props(styles.p)}>이 글을 삭제할까요?</p>
        <ul {...stylex.props(styles.ul)}>
          <li {...stylex.props(styles.confirmLi)}>
            <button
              {...stylex.props(styles.confirmButton)}
              onClick={() => ref.current?.close()}
            >
              취소
            </button>
          </li>
          <li {...stylex.props(styles.confirmLi)}>
            <button {...stylex.props(styles.confirmButton)}>삭제</button>
          </li>
        </ul>
      </dialog>
    </>
  );
}

const styles = stylex.create({
  liSpace: {
    marginTop: "4px",
  },
  deleteButton: {
    width: "100%",
    backgroundColor: "unset",
    border: "none",
    cursor: "pointer",
    color: "rgb(23,23,23)",
    fontSize: "16px",
  },
  dialog: {
    top: "50%",
    left: "50%",
    transform: " translate(-50%, -50%)",
    minWidth: "300px",
    padding: "12px",
    borderRadius: "12px",
    borderColor: "#ccc",
  },
  p: { textAlign: "center", fontWeight: "bold" },
  ul: {
    width: "100%",
    display: "flex",
    gap: "4px",
    listStyleType: "none",
    marginTop: "12px",
  },
  confirmButton: {
    display: "block",
    width: "100%",
  },
  confirmLi: {
    width: "100%",
  },
});
