import * as stylex from "@stylexjs/stylex";

export function CreatedBy({ name }: { name: string }) {
  return <small {...stylex.props(styles.small)}>{name}님 작성</small>;
}

const styles = stylex.create({
  small: {
    textAlign: "end",
    margin: "8px 0",
  },
});
