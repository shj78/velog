# WebSocket, Socket.IO, SockJS, SSE 정리

1. 소켓 통신 라이브러리
🔹 Websocket
프로토콜, 통신 규약
HTML5 표준 기술
양방향 연결 채널을 구성하는 것
구동 방식
HTTP로 Handshake로 초기 통신 후 웹소켓 프로토콜로 변환하여(101) 데이터를 전송
🔹 socket.io
자바스크립트를 이용해 실시간 웹을 구현할 수 있도록 한 기술
오래된 브라우저는 웹소켓을 지원하지 않기 때문에 socket.io를 사용
웹소켓은 ws://, wss:// 라는 프로토콜을 사용
ws : 실시간의 시대가 열리게 된 프로토콜
채팅, 스트리밍, 웹 실시간 온라인 게임 모두 ws 를 이용한다!
구동 방식
  먼저 서버 socket.io와 클라이언트 socket.io로 나뉜다.
  메시지는 이벤트로 동작한다.
클라이언트 socket.io가 서버 socket.io에게 메시지를 보냄
서버 socket.io는 적절한 클라이언트에게 받은 메시지를 보냄
🔹 SockJS
웹소켓 API를 에뮬레이션(흉내)해서 만들었다가 웹소켓보다 확장성이 높아짐
(특히 spring boot)서버-클라이언트 API 통신에 적합
🔹 SSE
단방향 서버에서 클라이언트로 변경이 필요한 데이터를 효율적으로 푸쉬
🔹 Stomp
메시지 전송을 효율적으로 하기 위한 프로토콜
publishing(발행한다)/subscribe(구독한다)기반
클라이언트가 서버로 메시지 보내는 것  : pub
클라이언트가 서버로부터 메시지 받는 것 : sub
Handler필요 없이 WebsocketConfigurer에 @EnableWebsocketMessageBroker 로 STOMP 사용 선언 후 @MessageMapping어노테이션 만으로 메시지 pub시 엔드 포인트(종착지)를 별도로 분리하여 관리
웹소켓만을 사용할 때 보다 간편해진 코드
필수로 오버라이드할 게 사라진다
handler 클래스를 구성할 필요가 없다(인터셉터를 설정할 게 아니라면)
메시지 형식 or 파싱에 대한 고민을 할 필요가 없다 → 메시지를 주고받는 형식이 정해져 있기 때문
메시지 브로커나 메시지 큐는 스프링 부트 서버 내에 숨겨져있다.
세션은 자동으로 관리된다.

[Read more](https://velog.io/@deepsea/WebSocket-Socket.IO-SockJS-SSE-%EC%A0%95%EB%A6%AC)