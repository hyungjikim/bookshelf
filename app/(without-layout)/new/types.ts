/** 책 추가 폼의 상태를 나타내는 타입 */
export type PublishState = {
  /** 오류 메시지 */
  message?: string;
  /** 책 제목 */
  title: string;
  /** 작가 이름 */
  author?: string;
  /** 출판사 이름 */
  publisher?: string;
  /** 감상문 내용 */
  content?: string;
};
