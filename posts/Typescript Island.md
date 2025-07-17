# Typescript Island

Arrival:

Typescript?
정적 타입 언어로, 변수나 객체를 미리 어떤 타입인 지 명확히 지정해주는 어쩌구
React에서 TS를 쓸 경우에는 React 컴포넌트는 JSX를 반환하는데, TypeScript가 이를 자동으로 추론해준다. 그래서 반환값도 안써도 됩니다.
ex) window
: 브라우저 전역객체라서 누군지 알고는 있음
ex) window.naver 
: Script로 src="...naver maps..." 넣었을 때만 생기는 
외부 속성이라 모르니 빵 하고 컴파일 에러 발생
해결 방법
1) Typrscript에게 소개해주기
declare global { // 전역 스코프를 의미 && winodw || document 확장시 사용
interface Window { // typescript 내에 이미 window가 interface기 때문에 extend 해서 사용, 왜냐하면 여러번 정의 시 자동으로 merge하기 때문
  naver : any
}
}
Typescript의 interface란?
: 객체의 모양(구조)을 정의한다.
types.ts
export interface BookData {
id: number;           // 숫자 타입
title: string;        // 문자열 타입
subTitle: string;
author: string;
publisher: string;
description: string;
coverImgUrl: string;
}
// 이렇게 사용됩니다:
const book: BookData = {
  id: 1,
  title: "해리포터",
  subTitle: "마법사의 돌",
  author: "J.K. 롤링",
  publisher: "문학수첩",
  description: "소년 마법사의 이야기",
  coverImgUrl: "https://example.com/harry.jpg"
};

// 만약 필수 속성이 빠지면 에러 발생!
const wrongBook: BookData = {
  id: 1,
  title: "책제목"
};
Typescript의 파일 구분법
스크립트 파일 (import/export 없음, .d.ts)
모듈 파일 ("" 있음, .ts)
declare global의 경우 모듈파일에서만 동작하고 스크립트파일에서 동작하지 않는다.
keyof : 타입스크립트의 키 체크 연산자로, 컴파일 시 개발자가 올바른 키를 전달했는지 체크한다. 
as String : 타입 단언 형식 으로 타입 가드와 상반되며, 개발자가 특정 코드의 타입에 대해서 확신하는 경우 사용한다. 컴파일 시점에만 체크한다.
결국 이 책 정보를 담을 객체는 반드시 이 8개의 속성을 가져야해! 라고 알려주는 타입 정의서예요.
객체 설계도라고 할 수 있겠군요!

[Read more](https://velog.io/@deepsea/Typescript-Island)