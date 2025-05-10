"use client";

import { useActionState } from "react";
import Form from "next/form";
import * as stylex from "@stylexjs/stylex";
import { State } from "./types";
import { signUp } from "./actions";
import { layoutStyles } from "@/app/styles/layout.styles";
import {
  buttonStyles,
  formStyles,
  inputStyles,
  labelStyles,
} from "@/app/styles/form.styles";
import { tokens } from "@/app/styles/tokens.stylex";
import { Home } from "lucide-react";
import Link from "next/link";

const initialState = {
  fieldError: {},
  globalError: "",
  success: false,
};

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState<
    State | undefined,
    FormData
  >(signUp, initialState);

  return (
    <main {...stylex.props(layoutStyles.main, styles.customMain)}>
      <section {...stylex.props(layoutStyles.section)}>
        <Form action={formAction} {...stylex.props(formStyles.form)}>
          <h1>회원가입</h1>
          <div>
            <label htmlFor="nickname" {...stylex.props(labelStyles.label)}>
              닉네임
            </label>
            <input
              id="nickname"
              name="nickname"
              required
              defaultValue={state?.inputs?.nickname}
              {...stylex.props(inputStyles.input)}
            />
            {state?.fieldError?.nickname && (
              <p
                aria-live="polite"
                role="status"
                {...stylex.props(styles.feedback)}
              >
                {state.fieldError.nickname[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" {...stylex.props(labelStyles.label)}>
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={state?.inputs?.email}
              {...stylex.props(inputStyles.input)}
            />
            {state?.fieldError?.email && (
              <p
                aria-live="polite"
                role="status"
                {...stylex.props(styles.feedback)}
              >
                {state.fieldError.email[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" {...stylex.props(labelStyles.label)}>
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              defaultValue={state?.inputs?.password}
              {...stylex.props(inputStyles.input)}
            />
            {state?.fieldError?.password && (
              <p
                aria-live="polite"
                role="status"
                {...stylex.props(styles.feedback)}
              >
                {state.fieldError.password[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            {...stylex.props(buttonStyles.button, styles.customButton)}
          >
            {pending ? "...기다려주세요" : "회원가입"}
          </button>
          {state?.globalMessage && (
            <p
              aria-live="polite"
              role="status"
              {...stylex.props(styles.feedback)}
            >
              {state.globalMessage}
            </p>
          )}
        </Form>
        {state?.success && (
          <Link href="/" {...stylex.props(styles.successContainer)}>
            <Home size={20} /> 홈으로
          </Link>
        )}
      </section>
    </main>
  );
}

const styles = stylex.create({
  customMain: {
    maxWidth: "400px",
  },
  customButton: {
    height: "36px",
    marginTop: "12px",
  },
  feedback: {
    marginTo: "4px",
    color: tokens.danger,
  },

  successContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    color: {
      default: tokens.text,
      ":hover": tokens.dark,
    },
  },
});
