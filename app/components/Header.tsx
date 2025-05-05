import Image from "next/image";
import Link from "next/link";
import * as stylex from "@stylexjs/stylex";
import { AuthMenu } from "./AuthMenu";

export default function Header() {
  return (
    <header>
      <div {...stylex.props(styles.wrapper)}>
        <div>
          <Image src="/tango.webp" alt="Logo" width={100} height={100} />
        </div>
        <nav>
          <ul {...stylex.props(styles.list)}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <AuthMenu />
          </ul>
        </nav>
      </div>
    </header>
  );
}

const styles = stylex.create({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
  },
  list: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    listStyle: "none",
  },
});
