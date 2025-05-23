import Image from "next/image";
import * as stylex from "@stylexjs/stylex";
import { signOut } from "@/app/actions/auth";
import { buttonStyles } from "@/app/styles/form.styles";
import { LogOut } from "lucide-react";
import { tokens } from "@/app/styles/tokens.stylex";

interface AvatarProps {
  url: string;
}

export function Avatar({ url }: AvatarProps) {
  return (
    <div>
      <div {...stylex.props(styles.imgWrapper)}>
        <button popoverTarget="profile" popoverTargetAction="toggle">
          <Image src={url || "/누렁이.webp"} fill alt="avatar image" />
        </button>
      </div>

      <div id="profile" popover="auto" {...stylex.props(styles.popoverTarget)}>
        <form action={signOut}>
          <button {...stylex.props(buttonStyles.button, styles.customButton)}>
            <LogOut {...stylex.props(styles.customoButtonIcon)} />
            <span {...stylex.props(styles.customButtonInnerText)}>
              로그아웃
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = stylex.create({
  imgWrapper: {
    position: "relative",
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  popoverTarget: {
    position: "absolute",
    inset: "unset",
    top: "60px",
    right: "10px",
    border: "none",
  },
  customButton: {
    gap: {
      default: "4px",
      "@container globalHeader (max-width: 400px)": "2px",
    },
    backgroundColor: {
      default: "transparent",
      ":hover": tokens.tertiary,
    },
    whiteSpace: "nowrap",
  },
  customoButtonIcon: {
    width: {
      default: "24px",
      "@container globalHeader (max-width: 400px)": "16px",
    },
    height: {
      default: "24px",
      "@container globalHeader (max-width: 400px)": "16px",
    },
  },
  customButtonInnerText: {
    fontSize: {
      default: "1rem",
      "@container globalHeader (max-width: 400px)": "0.8rem",
    },
  },
});
