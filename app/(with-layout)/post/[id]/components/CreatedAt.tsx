import dayjs from "dayjs";
import * as stylex from "@stylexjs/stylex";

interface CreatedAtProps {
  date: Date;
}

export function CreatedAt({ date }: CreatedAtProps) {
  const formatDate = dayjs(date).format("YYYY-MM-DD");
  return <small {...stylex.props(styles.small)}>{formatDate}</small>;
}

const styles = stylex.create({
  small: {
    textAlign: "end",
  },
});
