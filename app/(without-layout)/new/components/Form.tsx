"use client";

import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { useActionState } from "react";
import Form from "next/form";
import { publish } from "../actions";
import { PublishState } from "../types";
import EditorWrapper from "./editor/Tiptap";
import { formStyles } from "@/app/styles/form.styles";

export function PublishForm() {
  const [state, formAction, pending] = useActionState<PublishState, FormData>(
    publish,
    { message: "", title: "", author: "", publisher: "", content: "" }
  );

  const [content, setContent] = useState("");

  return (
    <Form action={formAction} {...stylex.props(formStyles.container)}>
      <div>
        <label htmlFor="title">책 제목</label>
        <input id="title" name="title" required defaultValue={state?.title} />
      </div>
      <div>
        <label htmlFor="author">작가 이름</label>
        <input id="author" name="author" defaultValue={state?.author} />
      </div>
      <div>
        <label htmlFor="publisher">출판사</label>
        <input
          id="publisher"
          name="publisher"
          defaultValue={state?.publisher}
        />
      </div>

      <EditorWrapper value={content} onChange={setContent} />
      <input type="hidden" name="content" value={content} />

      <button type="submit" disabled={pending}>
        발행하기
      </button>
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </Form>
  );
}
