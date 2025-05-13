import { layoutStyles } from "@/app/styles/layout.styles";
import { tokens } from "@/app/styles/tokens.stylex";
import * as stylex from "@stylexjs/stylex";

const BOOKSHELF_REPO_URL = "https://github.com/hyungjikim/bookshelf";
const GITHUB_URL = "https://github.com/hyungjikim";

export default function Page() {
  return (
    <main {...stylex.props(layoutStyles.main, styles.customMain)}>
      <section {...stylex.props(layoutStyles.section)}>
        <div {...stylex.props(styles.container)}></div>
        <strong>독서</strong> 좋아하시나요?
        <p>
          독서를 하면서 떠오른 생각이나 인상 깊은 문장을 기록하고 싶었습니다.
        </p>
        <p>
          소스 코드는{" "}
          <a
            href={BOOKSHELF_REPO_URL}
            target="_blank"
            {...stylex.props(styles.a)}
          >
            여기에서
          </a>{" "}
          보실 수 있습니다.
        </p>
        <hr {...stylex.props(styles.hr)} />
        <div>
          <p>
            사소하고 작은 결정들이 모여서 잘 설계된 위대한 소프트웨어가
            만들어진다고 믿습니다.
          </p>
          <p>
            따라서, 코드에는 <strong>&quot;왜&quot;</strong>를 설명할 수 있는
            이유가 있어야 한다고 생각합니다.
          </p>
          <p>
            이를 위해 기술을 단순히 사용하는 것보다 꾸준히 공부하면서 깊이
            이해하며 사용하는 것을 지향합니다.
          </p>
        </div>
        <hr {...stylex.props(styles.hr)} />
        <ul {...stylex.props(styles.ul)}>
          <li>
            <a href={GITHUB_URL} target="_blank" {...stylex.props(styles.a)}>
              Github
            </a>
          </li>
          <li>
            <a
              href="mailto:dev.hjk329@gmail.com"
              target="_blank"
              {...stylex.props(styles.a)}
            >
              Email: dev.hjk329@gmail.com
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

const styles = stylex.create({
  customMain: { textAlign: "center" },
  container: {
    margin: "0 auto",
  },
  hr: {
    margin: "16px 0",
  },
  a: {
    textDecoration: "underline",
    color: {
      default: tokens.text,
      ":hover": tokens.secondary,
    },
  },
  ul: {
    listStyle: "none",
  },
});
