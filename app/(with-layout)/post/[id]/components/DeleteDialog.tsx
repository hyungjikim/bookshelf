import * as stylex from "@stylexjs/stylex";
import { Trash2 } from "lucide-react";
import { useRef } from "react";

export function DeleteDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button onClick={() => ref.current?.showModal()}>
        <li
          {...stylex.props(styles.li, styles.liSpace)}
          popoverTarget="delete-popover"
        >
          <Trash2 /> 삭제
        </li>
      </button>
      <dialog ref={ref} {...stylex.props(styles.dialog)}>
        <p {...stylex.props(styles.p)}>이 글을 삭제할까요?</p>
        <ul {...stylex.props(styles.ul)}>
          <li {...stylex.props(styles.actionLi)}>
            <button
              {...stylex.props(styles.button)}
              onClick={() => ref.current?.close()}
            >
              취소
            </button>
          </li>
          <li {...stylex.props(styles.actionLi)}>
            <button {...stylex.props(styles.button)}>삭제</button>
          </li>
        </ul>
      </dialog>
    </>
  );
}

const styles = stylex.create({
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
  button: {
    display: "block",
    width: "100%",
  },
  actionLi: {
    width: "100%",
  },
});
