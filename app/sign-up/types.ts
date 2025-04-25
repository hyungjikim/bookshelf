type SignupFields = {
  email?: string;
  password?: string;
  nickname?: string;
};

/** 회원가입 폼의 상태를 나타내는 타입 */
export type State = {
  /** 각 필드별 유효성 검사 오류 메시지 (예: 이메일 형식 오류 등) */
  fieldError?: { [K in keyof SignupFields]?: string[] };

  /** Supabase 등 서버 상의 오류 등 전역 오류 메시지 */
  globalError?: string;

  /** 사용자가 입력한 폼 데이터
   * @example 유효성 검사 실패 시 재입력용으로 사용
   */
  inputs?: SignupFields;
};
