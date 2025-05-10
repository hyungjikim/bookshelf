"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useActionState } from "react";
import Form from "next/form";
import EditorWrapper from "@/app/(without-layout)/new/components/editor/Tiptap";
import { update } from "./actions";
import { EditState } from "./types";
import { buttonStyles, formStyles } from "@/app/styles/form.styles";

interface EditFormProps {
  /** 수정할 게시물의 id (dynamic segment) */
  id: number;
  /** 수정할 게시물의 기존 내용 */
  defaultValue: string;
}

export function EditForm({ defaultValue, id }: EditFormProps) {
  const [state, formAction, pending] = useActionState<EditState, FormData>(
    update,
    {
      message: "",
    }
  );

  const [content, setContent] = useState(defaultValue);

  return (
    <Form action={formAction} {...stylex.props(formStyles.container)}>
      <input type="hidden" name="id" value={id} />

      <EditorWrapper value={content} onChange={setContent} />
      <input type="hidden" name="content" value={content} />

      {state?.message && (
        <p aria-live="polite" role="status">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !content}
        {...stylex.props(buttonStyles.button, styles.customButton)}
      >
        수정하기
      </button>
    </Form>
  );
}

const styles = stylex.create({
  customButton: {
    height: "36px",
  },
});
