"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Toolbar from "./Toolbar";
import * as stylex from "@stylexjs/stylex";
import { publish } from "../../actions";
import { useActionState } from "react";
import Form from "next/form";
import { PublishState } from "../../types";

export function Tiptap() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: "<p>Hello World! 🌎️</p>",
    immediatelyRender: false,
  });

  const [state, formAction, pending] = useActionState<PublishState, FormData>(
    publish,
    { message: "", title: "", author: "", publisher: "", content: "" }
  );

  return (
    <Form action={formAction} {...stylex.props(styles.container)}>
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

      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <input type="hidden" name="content" value={editor?.getHTML() || ""} />

      <button type="submit" disabled={pending}>
        발행하기
      </button>
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </Form>
  );
}

const styles = stylex.create({
  container: {
    maxWidth: "70vw",
    margin: "24px auto",
    border: "1px solid #ccc",
    padding: "24px",
    borderRadius: "12px",
    display: "grid",
    gap: "12px",
  },
});
