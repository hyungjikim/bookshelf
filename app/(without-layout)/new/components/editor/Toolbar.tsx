import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import * as stylex from "@stylexjs/stylex";
import { ReactElement } from "react";
import { buttonStyles } from "@/app/styles/form.styles";
import { tokens } from "@/app/styles/tokens.stylex";

interface Items {
  icon: ReactElement;
  title: string;
  command: () => void;
  isActive: boolean;
}

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Items: Items[] = [
    {
      icon: <Heading1 />,
      title: "제목 1",
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 />,
      title: "제목 2",
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 />,
      title: "제목 3",
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold />,
      title: "굵게",
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Italic />,
      title: "기울임꼴",
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough />,
      title: "취소선",
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: <List />,
      title: "글머리 기호",
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered />,
      title: "번호 매기기",
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      icon: <AlignLeft />,
      title: "왼쪽 정렬",
      command: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter />,
      title: "가운데 정렬",
      command: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight />,
      title: "오른쪽 정렬",
      command: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <Highlighter />,
      title: "형광펜",
      command: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
    },
  ] as const;

  return (
    <div {...stylex.props(styles.container)}>
      {Items.map((option, index) => (
        <button
          type="button"
          key={index}
          title={option.title}
          onClick={option.command}
          {...stylex.props(
            buttonStyles.button,
            option.isActive && styles.active
          )}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    justifyContent: "center",
    margin: "12px 0",
  },
  active: {
    backgroundColor: tokens.dark,
  },
});
