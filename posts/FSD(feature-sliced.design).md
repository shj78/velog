# FSD(feature-sliced.design)

FSD는 기능 기반 분할 설계로, 의존 방향을 위에서 아래로만 제한하는 프론트엔드 아키텍쳐입니다.
기술 중심 구조의 폴더 구조를 사용하다보면,
특정 파일이 어디에 있는 지 찾기 어려워 가독성이 떨어질 뿐만 아니라 의존성이 뒤섞이게 됩니다.
FSD는 복잡한 프론트엔드 구조를 도메인 중심으로 구조화하기 위해서 나왔습니다.
FSD의 핵심 개념
Layer
app, processes, pages, widgets, features, entities, shared의 7개 계층으로 구분됩니다.
Slice
각 레이어는 도메인별로 쪼개집니다. ex) Pot, User, Search...
Segment
각 슬라이스 내에서 ui, model, api, lib등의 세부 디렉토리로 구분됩니다.
Public API
외부에 보여줄 것만 명시해서 보여주는 출입문으로 도메인 폴더 내 index.ts로 관리됩니다.

[Read more](https://velog.io/@deepsea/FSDfeature-sliced.design)