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
import { ReactElement, useState } from "react";

type ToolbarItem =
  | "heading1"
  | "heading2"
  | "heading3"
  | "bold"
  | "italic"
  | "strike"
  | "alignLeft"
  | "alignCenter"
  | "alignRight"
  | "list"
  | "orderedList"
  | "highlight";

interface Items {
  icon: ReactElement;
  onClick: () => void;
  active: boolean;
}

export default function Toolbar({ editor }: { editor: Editor | null }) {
  const [activeButton, setActiveButton] = useState<ToolbarItem | null>(null);

  if (!editor) {
    return null;
  }

  const Items: Items[] = [
    {
      icon: <Heading1 />,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        setActiveButton("heading1");
      },
      active: activeButton === "heading1",
    },
    {
      icon: <Heading2 />,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        setActiveButton("heading2");
      },
      active: activeButton === "heading2",
    },
    {
      icon: <Heading3 />,
      onClick: () => {
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        setActiveButton("heading3");
      },
      active: activeButton === "heading3",
    },
    {
      icon: <Bold />,
      onClick: () => {
        editor.chain().focus().toggleBold().run();
        setActiveButton("bold");
      },
      active: activeButton === "bold",
    },
    {
      icon: <Italic />,
      onClick: () => {
        editor.chain().focus().toggleItalic().run();
        setActiveButton("italic");
      },
      active: activeButton === "italic",
    },
    {
      icon: <Strikethrough />,
      onClick: () => {
        editor.chain().focus().toggleStrike().run();
        setActiveButton("strike");
      },
      active: activeButton === "strike",
    },
    {
      icon: <AlignLeft />,
      onClick: () => {
        editor.chain().focus().setTextAlign("left").run();
        setActiveButton("alignLeft");
      },
      active: activeButton === "alignLeft",
    },
    {
      icon: <AlignCenter />,
      onClick: () => {
        editor.chain().focus().setTextAlign("center").run();
        setActiveButton("alignCenter");
      },
      active: activeButton === "alignCenter",
    },
    {
      icon: <AlignRight />,
      onClick: () => {
        editor.chain().focus().setTextAlign("right").run();
        setActiveButton("alignRight");
      },
      active: activeButton === "alignRight",
    },
    {
      icon: <List />,
      onClick: () => {
        editor.chain().focus().toggleBulletList().run();
        setActiveButton("list");
      },
      active: activeButton === "list",
    },
    {
      icon: <ListOrdered />,
      onClick: () => {
        editor.chain().focus().toggleOrderedList().run();
        setActiveButton("orderedList");
      },
      active: activeButton === "orderedList",
    },
    {
      icon: <Highlighter />,
      onClick: () => {
        editor.chain().focus().toggleHighlight().run();
        setActiveButton("highlight");
      },
      active: activeButton === "highlight",
    },
  ] as const;

  return (
    <div {...stylex.props(styles.container)}>
      {Items.map((option, index) => (
        <button
          key={index}
          onClick={option.onClick}
          {...stylex.props(styles.button, option.active && styles.active)}
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
    justifyContent: "stretch",
  },
  button: {
    borderRadius: "4px",
  },
  active: {
    backgroundColor: "#ccc",
  },
});
