# Zustand Island

편하게 부르기 위해 주땐드라고 부르겠습니다.
들어가기전에
주땐드는 뭘까요?
상태관리의 의미, 이유, 라이브러리들에 대해 알아봅니다.
상태관리는 뭘까요?
말 그대로 state를 관리하는 것으로, 상태란 화면에 영향을 주는 값을 뜻합니다.
그럼 상태관리는 왜 하는걸까요?
리액트에서는 프로젝트 초기에는 useState로 충분하지만, 여러 컴포넌트가 생기거나 프로젝트가 커질 경우 props drilling이 발생해 코드가 복잡해집니다. 그래서 상태관리를 통해 데이터를 통제합니다.
그럼 주땐드, 뭐가 좋은 걸까요?(feat.걔가 나보다 나은게 뭔데)
간결함
낮은 러닝커브
Provider 없이 가능
유연한 구조
리렌더링 최적화(필요한 상태만 구독)
Typescript 없어도 됨
주떈드의 구조
create((set,get)=>{
  });
create : 제네릭으로 전체 store의 타입 지정
(set, get) => { ... } : Zustand가 제공하는 함수들을 
다른 라이브러리와의 비교
라이브러리
특징/장점
복잡도
러닝커브
상태+함수 선언 방식 예시



Redux
보일러플레이트 많음, 복잡도 높음, 미들웨어 필요
높음
높음
액션, 리듀서, 미들웨어 따로 작성


Context API
리액트 내장, 불필요한 리렌더링 이슈
중간
중간
createContext, Provider 등 사용


Jotai/Recoil
원자(Atom) 기반, 의존성 표현 용이
중간
중간
atom, selector 등으로 상태 관리


Zustand
간결, 빠름, 직관적, 단일 스토어, 훅 기반
낮음
낮음
create(() => ({ count: 0, inc: () => {...} })) 😮


가볍게 알아보았습니다.
이러한 배경으로 선택한 Zustand와 이제 친해져봅니다.
1. 스토어
스토어란?
일종의 보관함으로, 전역에서 사용할 수 있는 상태와 그 상태를 변경하는 함수를 담고있습니다.
스토어에서 사용되는 함수
create 주떈드에서 스토어를 정의할 떄는 create 함수를 사용해서 정의합니다. 이것이 스토어 생성의 시작입니다.
set 주떈드에서 스토어 내 상태값을 변경할 때 주로 사용하는 함수입니다.
get 현재 상태를 계산할 수 있는 함수입니다.
store/useAppStore.tsx
import 'create' from zustand 

const useAppStore = create((set)=>({
    count: 0,
      increment: () => set((state) =>({count: state.count+1}) ),
      doubleCount: ()=> get().count *2,
}))

export default useAppStore
2. 상태 설계 패턴
자유로운 상태 관리 도구, 주땐드의 상태관리 4가지 주제
1) 스토어 구조화의 기본 원칙
상태  ex) count
액션 ex) increment
계산된 값 ex)get
2) 상태 선택 패턴(selector)
selector는 스토어에 전달이 되는데 필요한 값만 선택적으로 가져올 수 있습니다.
const name = useUserStore(state=> state.user.name);
const isLoggedIn = useUserStore(state=>state.user.isLoggedIn);
// 이 경우 name 변경 시 name만 리렌더 되고 isLoggedIn은 리렌더되지 않는다.
성능에 도움이 되는 팁 
필요한 값만 선택하거나 selector는 바깥에서 선언하여 재사용하고 useShallow등을 사용하여 객체 비교 최적화합니다.
3) 안전한 상태 업데이트(set, get)
set() 으로 상태를 안전하게 변경하기
get() 으로 상태를 조회하기
4) 복잡한 상태구조 다루기
ex) 중첩구조에서 불변성을 유지하며 객체의 상태를 업데이트해봅니다.
updatePersonalInfo: (newInfo) => set( state => ({
  profile: {
    ...state.profile,
    personal: {
        ...state.personal,
          ...newInfo
    }
  }
}))
리액트는 내부에서 얕은 비교(===)로 상태가 바뀌었는 지 판단합니다. 
즉, 참조가 변경되었는 지 판단합니다.
그래서 ...state.profile과 ...state.profile.personal을 사용해서 새로운 객체를 만들면서,
불변성(immutability)을 지키게 됩니다.
이렇게 하면 profile, personal의 참조가 바뀌기 때문에 리액트가 변경을 감지하고 리렌더링됩니다.
하지만 복잡해지면 Immer를 고려하는 게 좋습니다.
이는 배열도 동일한데, 기존 값을 본사한 후 추가해야 리액트가 변경을 감지할 수 있습니다.
addTask : () => set(state => ({
  tasks: [...state.tasks, task]
}))
3. 액션 설계 패턴
액션이란?
상태를 바꾸는 주체로, 잘 설계된 액션은 스토어의 품질을 결정합니다.
액션은 매개변수를 받아야한다.
외부에서 필요한 정보는 넘겨받고, 액션은 그 정보에 따라 상태를 수정하는 것입니다.
매개변수 없는 액션은 유지보수의 악마라고 봐도 됩니다.
액션 하나로 여러 상태를 동시에 변경하기
액션은 상태변경에만 집중합니다.
피해야할 것 : 액션 내부 API 호출, setTimeout, 
4.

[Read more](https://velog.io/@deepsea/Zustand-Island)