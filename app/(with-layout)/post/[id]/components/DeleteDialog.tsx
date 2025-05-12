"use client";

import { deleteContent } from "@/app/actions/deleteContent";
import { buttonStyles } from "@/app/styles/form.styles";
import { listItemStyles } from "@/app/styles/listItem.styles";
import { tokens } from "@/app/styles/tokens.stylex";
import * as stylex from "@stylexjs/stylex";
import { Trash2 } from "lucide-react";
import { useActionState, useRef } from "react";

export function DeleteDialog({ id }: { id: number }) {
  const ref = useRef<HTMLDialogElement>(null);

  const [state, formAction, pending] = useActionState(deleteContent, {
    message: "",
  });
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
              {...stylex.props(buttonStyles.button, styles.customButton)}
              onClick={() => ref.current?.close()}
            >
              취소
            </button>
          </li>
          <li {...stylex.props(styles.confirmLi)}>
            <form>
              <input type="hidden" name="id" value={id} readOnly />
              <button
                {...stylex.props(
                  buttonStyles.button,
                  styles.customButton,
                  styles.confirmDeleteButton
                )}
                formAction={formAction}
                disabled={pending}
              >
                {pending ? "...삭제중" : "삭제"}
              </button>
            </form>
          </li>
        </ul>
        {state.message && (
          <p aria-live="polite" role="status" {...stylex.props(styles.message)}>
            {state.message}
          </p>
        )}
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
    fontSize: "16px",
  },
  dialog: {
    top: "50%",
    left: "50%",
    transform: " translate(-50%, -50%)",
    minWidth: "300px",
    padding: "12px",
    borderRadius: "12px",
    borderColor: tokens.dark,
  },
  p: { textAlign: "center", fontWeight: "bold" },
  ul: {
    width: "100%",
    display: "flex",
    gap: "4px",
    listStyleType: "none",
    marginTop: "12px",
  },
  customButton: {
    display: "block",
    width: "100%",
    height: "36px",
  },
  confirmDeleteButton: {
    backgroundColor: tokens.white,
    borderColor: tokens.danger,
    color: tokens.danger,
    opacity: {
      default: 1,
      ":hover": 0.6,
    },
  },
  confirmLi: {
    width: "100%",
  },
  message: {
    marginTop: "8px",
    textAlign: "center",
    color: tokens.danger,
    fontSize: "14px",
  },
});
