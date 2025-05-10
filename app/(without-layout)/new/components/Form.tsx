"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useActionState } from "react";
import Form from "next/form";
import { publish } from "../actions";
import { PublishState } from "../types";
import EditorWrapper from "./editor/Tiptap";
import {
  buttonStyles,
  formStyles,
  inputStyles,
  labelStyles,
} from "@/app/styles/form.styles";

export function PublishForm() {
  const [state, formAction, pending] = useActionState<PublishState, FormData>(
    publish,
    { message: "", title: "", author: "", publisher: "", content: "" }
  );

  const [content, setContent] = useState("");

  return (
    <Form action={formAction} {...stylex.props(formStyles.form)}>
      <div>
        <label htmlFor="title" {...stylex.props(labelStyles.label)}>
          책 제목
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={state?.title}
          autoFocus
          placeholder="책 제목을 입력해주세요"
          {...stylex.props(inputStyles.input)}
        />
      </div>
      <div>
        <label htmlFor="author" {...stylex.props(labelStyles.label)}>
          작가 이름
        </label>
        <input
          id="author"
          name="author"
          defaultValue={state?.author}
          {...stylex.props(inputStyles.input)}
        />
      </div>
      <div>
        <label htmlFor="publisher" {...stylex.props(labelStyles.label)}>
          출판사
        </label>
        <input
          id="publisher"
          name="publisher"
          defaultValue={state?.publisher}
          {...stylex.props(inputStyles.input)}
        />
      </div>

      <EditorWrapper value={content} onChange={setContent} />

      <input type="hidden" name="content" value={content} />

      <button
        type="submit"
        disabled={pending || !content}
        {...stylex.props(buttonStyles.button, styles.customButton)}
      >
        발행하기
      </button>
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </Form>
  );
}

const styles = stylex.create({
  customButton: {
    height: "36px",
  },
});
