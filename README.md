# 📚 bookshelf

Next.js App Router 를 활용하여 SSR 을 이해하고, 실전에 적용해보기 위한 사이드 프로젝트입니다.

---

## ✨ 프로젝트 소개

최근 꾸준히 독서를 하면서 떠오른 생각이나 인상 깊은 문장을 기록하고 싶었습니다. 이왕이면 이를 도와주는 애플리케이션을 직접 만들어보고자 했고, 동시에 **Next.js App Router** 를 활용해 SSR(Server Side Rendering)을 이해하고자 이 프로젝트를 시작했습니다.

**간단한 배포**는 Vercel, **간편한 백엔드와 DB 구축**은 Supabase 를 활용하여 빠르게 개발할 수 있도록 구성했습니다.

---

## 🛠 기술 스택

- **Next.js (App Router)**: SSR 및 최신 기능 지원
- **Stylex**: SSR 환경에서 Zero Runtime CSS 제공
- **Zod**: 타입 검증
- **Supabase**: 인증 및 데이터베이스 기능 제공
- **Vercel**: 빠르고 쉬운 배포 환경

## 폴더 구조 및 설계
```
bookshelf
├─ app
│  ├─ (with-layout)               # 글로벌 레이아웃을 사용하는 라우트 그룹
│  │  ├─ post/[id]                # 게시글 상세 페이지
│  │  ├─ @modal/(.)post/[id]      # 게시글 상세 모달 (병렬 라우트)
│  │  ├─ components               # 헤더, 책장 등 UI 구성 요소
│  │  ├─ hooks                    # 클라이언트 훅
│  │  └─ layout.tsx              # 공통 레이아웃
│  ├─ (without-layout)            # 글로벌 레이아웃을 사용하지 않는 라우트 그룹 (ex. /sign-in)
│  │  ├─ sign-in / sign-up
│  │  ├─ new                      # 새 게시물 작성
│  │  └─ auth                     # 인증 관련 라우트
│  ├─ actions                     # 서버 액션
│  ├─ components                  # 전역 컴포넌트
│  ├─ constants                   # 상수 정의
│  ├─ lib/queries                 # Supabase 쿼리 모음
│  ├─ styles                      # 스타일 파일 (StyleX)
│  └─ utils                       # 데이터 변환 유틸
├─ supabase                       # Supabase 설정
├─ e2e                            # E2E 테스트 (Playwright)
└─ middleware.ts                  # 미들웨어
```

### 📌 설계 원칙
- 라우트 그룹 단위 분리
  - with-layout, without-layout으로 라우트 그룹을 명확히 분리해, 공통 레이아웃 유무에 따른 UI/UX를 명확히 구분함

- 도메인 중심 구조(Domain-oriented structure)
  - 각 도메인의 하위에 components, hooks 디렉토리를 만들어 관련 로직을 해당 도메인에 국한시킴

- 공통 모듈의 상향 리팩토링
  - 작업 초기에는 도메인 내부에 생성된 컴포넌트 및 훅이라도, 기능이 확장되고 다른 도메인에서도 필요할 경우 app/components 혹은 app/hooks로 상향시켜 공통 모듈화

---

## 🚀 사용 방법

### 개발 환경 실행
```bash
pnpm install
pnpm dev
```

## 💡 주요 기능

### ✅ 인증

- 이메일/비밀번호 회원가입
- 이메일/비밀번호 로그인
- 소셜 로그인 (Google, GitHub)
- 로그아웃

### 📘 책 관리

- **Create**: 로그인한 사용자만 책 추가 가능
- **Read All**: 비로그인 사용자도 책 리스트 조회 가능
- **Read One**: 비로그인 사용자도 책 상세 조회 가능
- **Update**: 책을 추가한 사용자만 수정 가능
- **Delete**: 책을 추가한 사용자만 삭제 가능

---

## 🧠 기술적 포인트 및 Next.js App Router 활용 전략

- **정적 생성 (`generateStaticParams`)**  
  [책 상세 페이지](https://github.com/hyungjikim/bookshelf/blob/main/app/(with-layout)/post/%5Bid%5D/page.tsx)는 dynamic route로 구현하되, 가능한 라우트를 빌드 타임에 생성해 성능 최적화

- **Parallel Routes + Intercepting Routes**  
  리스트에서 클릭할 경우 [**모달 UI**](https://github.com/hyungjikim/bookshelf/blob/main/app/(with-layout)/%40modal/(.)post/%5Bid%5D/page.tsx)로 상세 페이지 제공, URL로 직접 접근할 경우에는 [**페이지 UI**](https://github.com/hyungjikim/bookshelf/blob/main/app/(with-layout)/post/%5Bid%5D/page.tsx)로 렌더링하여 사용자 목적에 따라 UX 차별화

- **라우트 그룹 구성**  
  공통 레이아웃을 사용하는 페이지와 그렇지 않은 페이지를 명확히 구분하여 유지보수 용이성 향상 `예) (with-layout) 라우트 그룹과 (without-layout) 라우트 그룹`

- **클라이언트/서버 역할 분리**  
  데이터 fetch는 **서버 컴포넌트** 중심으로, UI 상호작용은 **클라이언트 컴포넌트** 중심으로 구성

- **컴포넌트 단위 데이터 분리 및 `Suspense` 격리 처리**  
  컴포넌트별로 데이터를 fetch하고, [`Suspense`로 격리](https://github.com/hyungjikim/bookshelf/blob/0852fb1c2e66ea53fe781f2c8c5b077b5a2d130c/app/(with-layout)/post/%5Bid%5D/page.tsx#L65)시켜 먼저 준비된 UI부터 사용자에게 빠르게 보여줄 수 있도록 하여 사용자 경험 향상

- **향후 계획**  
  현재는 사용자가 직접 책 정보를 입력하지만, 추후에는 ISBN 기반의 **Open API 연동**으로 메타데이터 자동 등록 기능 추가 예정
