import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Toolbar from "./Toolbar";
import { LoaderCircle } from "lucide-react";
import * as stylex from "@stylexjs/stylex";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function EditorWrapper({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Placeholder.configure({
        placeholder: "이 책을 읽고 어떤 생각을 하셨나요? 💡",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor)
    return (
      <div {...stylex.props(styles.loaderContainer)}>
        <LoaderCircle />
        <p>에디터를 불러오고 있어요</p>
      </div>
    );

  return (
    <>
      <div {...stylex.props(styles.editorContainer)}>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </>
  );
}

const styles = stylex.create({
  loaderContainer: {
    minHeight: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
  },
  editorContainer: {
    container: "editor / inline-size",
    maxWidth: "100%",
  },
});
