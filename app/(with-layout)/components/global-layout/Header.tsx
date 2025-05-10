import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { createClient } from "@/utils/supabase/server";
import { LogOut, SquarePen } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { buttonStyles } from "@/app/styles/form.styles";
import { tokens, zIndex } from "@/app/styles/tokens.stylex";

const PROJECT_REPO_URL = "https://github.com/hyungjikim/bookshelf";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header {...stylex.props(styles.stickyHeader)}>
      <div {...stylex.props(styles.wrapper)}>
        <div>
          <a
            href={`${PROJECT_REPO_URL}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/tango.webp"
              alt="Logo"
              width={64}
              height={64}
              {...stylex.props(styles.logo)}
            />
          </a>
        </div>
        <nav {...stylex.props(styles.nav)}>
          <ul {...stylex.props(styles.ul)}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            {user && (
              <li>
                <Link href="/new">
                  <SquarePen />
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* 로그인, 로그아웃 */}
        {user ? (
          <li {...stylex.props(styles.li)}>
            <form action={signOut}>
              <button
                {...stylex.props(buttonStyles.button, styles.customButton)}
              >
                <LogOut {...stylex.props(styles.customoButtonIcon)} />
                <span {...stylex.props(styles.customButtonInnerText)}>
                  로그아웃
                </span>
              </button>
            </form>
          </li>
        ) : (
          <li {...stylex.props(styles.li)}>
            <Link href="/sign-in">로그인</Link>
          </li>
        )}
      </div>
    </header>
  );
}

const styles = stylex.create({
  stickyHeader: {
    position: "sticky",
    top: 0,
    zIndex: zIndex.header,
    backgroundColor: tokens.white,
    container: "globalHeader / inline-size",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 24px",
    gap: "24px",
  },
  logo: {
    borderRadius: "50%",
    width: {
      default: "64px",
      "@container globalHeader (max-width: 400px)": "32px",
    },
    height: {
      default: "64px",
      "@container globalHeader (max-width: 400px)": "32px",
    },
  },
  nav: {
    flex: 1,
  },
  ul: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: {
      default: "12px",
      "@container globalHeader (max-width: 400px)": "6px",
    },
    listStyle: "none",
  },
  li: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
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
