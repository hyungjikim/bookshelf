"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Toolbar from "./Toolbar";
import * as stylex from "@stylexjs/stylex";

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

  return (
    <div {...stylex.props(styles.container)}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
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
