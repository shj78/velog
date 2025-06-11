# Vue Island

Vue란 무엇인가?
   MVVM 패턴의 ViewModel 레이어에 해당하는 View 단 라이브러리
MVVM패턴이란?
Backend 로직과 Client 마크업 & 데이터 표현단을 분리하기 위한 구조
MVC에서 기인
그럼, 뭐가 다른가?
Vue.js와 Spring MVC 차이
데이터 바인딩을 지원하는 지 안하는 지
로직과 상태를 관리하는 지 Controller가 로직을 수행하는 지
특징
데이터 바인딩, 화면 단위를 컴포넌트 형태로 제공
2Way(양방향) data binding 동일하게 제공
Component간 통신의 기본 골격은 React 1 Way Data Flow(부모 → 자식)와 거의 유사
Virtual DOM을 이용한 렌더링 방식이 React와 거의 유사
가볍고 빠르다
Vue Instance 라이프사이클 초기화
Vue 객체가 생성될 때는 아래의 초기화 작업을 수행한다.
데이터 관찰(watch)
템플릿 컴파일(babel)
DOM에 객체 연결
데이터 변경시 DOM 업데이트
** created, destroyed** 등 메서드로 객체를 컨트롤 하기때문에 자바와 달리 별도의 컨트롤러를 가지고 있지 않다.
beforeCreate, created, mounted, updated 를 라이프사이클 훅이라고 한다.

// 라이프사이클 훅 커스텀 로직

<html>
  <head>
    <title>Vue Sample</title>
  </head>
  <body>
    <div id="app">
      {{ message }}
    </div>
    <script src="<https://unpkg.com/vue@2.4.4/dist/vue.js>"></script>
    <script>
        // Vue 인스턴스 
        // Vue라는 객체(Vue 생성자)로 이것저것 포함해서 화면의 단위를 생성한다.
        // Vue 인스턴스는 생성 후 html 범위 내에서만 옵션 속성들이 적용되고, 이를 인스턴스 유효범위라 한다.
      new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue.js!'//, methods: {}. created: {}, life cycle callback .. 등의 옵션 가능
        },
        beforeCreate: function() {
          console.log("beforeCreate");
        },
        created: function() {
          console.log("created");
        },
        mounted: function() {
          console.log("mounted");
        },
        updated: function() {
          console.log("updated");
        }
      })

    </script>
  </body>
</html>

Vue 컴포넌트
화면에 비춰지는 뷰의 단위를 쪼개어 재활용이 가능한 형태로 관리하는 것, 
Vue는 이렇게 부모, 자식 관계를 형성하는 트리 구조를 형성한다.
<html>
  <head>
    <title>Vue Sample</title>
  </head>
  <body>
    <div id="app">
      <button>Parent Component</button>
      <my-component></my-component><!--전역-->
      <my-local-component></my-local-component>
    </div>

    <div id="app2">
      <my-component></my-component><!--전역-->
      <my-local-component></my-local-component>
    </div>

    <script src="<https://unpkg.com/vue@2.3.3>"></script>

    <script>
      // Global Component - 전역으로 등록
                    //태그명
      Vue.component('my-component', {
        //컴포넌트의 내용
        template: '<div>A global component!</div>'
      });

      // Local Component
      var cmp = {
        //컴포넌트의 내용
        template: '<div>A local component!</div>'
      };

      //로컬
      new Vue({
        el: '#app',//새로운 인스턴스가 올라갈 때
        components: {//아래와 같은 컴포넌트를 추가
          // 태그명 : 컴포넌트의 내용
          'my-local-component': cmp
        }
      })

      //인스턴스 안에 로컬 컴포넌트 등록하는 방법
      new Vue({
        el: '#app2',
        components: {
                    //컴포넌트 이름(컨벤션상 케밥기법 good): 컴포넌트 내용
          'my-local-component': cmp
        }
      })

    </script>
  </body>
</html>

Vue 컴포넌트 통신
구조상 "상하위 상하위~트위스트" 춤을 추는 컴포넌트의 통신은
부모에서 자식 - props down
자식에서 부모 - events up
props - 모든 컴포넌트는 각 컴포넌트 자체의 스코프를 갖는다
→ 하위 스코프가 상위 스코프 바로 접근? 절대 안됨!!!!!
→ 그래서 상위에서 하위로 갈 때는 무조건 props를 사용한다 ★
추가: 컴포넌트를 케밥 형식으로 만들 시 속성 props에는 ['MyName']에는 카멜로 쓰고,
  html에서는 케밥으로 my-name 이라고 해야 props 정상적으로 전달됨
같은 레벨간 컴포넌트의 통신
child → parent → 다시 2개의 child
같은 레벨의 컴포넌트는 직접적 통신 안됨
Event Bus
Child 컴포넌트간 통신을 돕는다.
Vue 라우터
  router-view 태그로 영역을 만들어주고, router-link 태그로 라우트를 명시해주면 할 일이 끝난다.
흐름
보여줄 라우트 컴포넌트를 선언한다 
컴포넌트와 URL을 매핑하는 routes 배열을 만든다 
Vue Router 인스턴스를 만들어서 앞서 만든 routes를 도장 땅땅 
해당 라우터가 뷰 딴에서 그려지도록 주입한다
중첩 라우터 Nested Routers
가장 큰 상위의 컴포넌트가 하위의 컴포넌트를 포함하는 Parent-Child 형태
children 속성
컴포넌트가 컴포넌트를 품음
var routes = [
 {
   path: '/login',//해석 순서 2: 요기에 도착을 했을 때
   component: Login,//해석 순서 1: 로그인 컴포넌트가
   children: [
     { path: '', component: LoginForm }//해석 순서3: 로그인 폼이 뿌려지는 장소
   ]
 },
 {
   path: '/list',
   component: List,
   children: [
     { path: '', component: ListItems }
   ]
 }
];



Named View
특정 라우터로 이동할 때 여러가지 컴포넌트를 동시에 렌더링하며 띄운다
Vue 리소스(라는게 있었다.)
Vue 1.x 대의 HTTP 요청 라이브러리이고 현재는 공식문서도 axios를 사용 권장
Vue 템플릿
템플릿 태그
<template>
<!-- 여기에 탬플릿 내용이 들어갑니다 -->
</template>



디렉티브(Directives)
v- 접두사를 붙인 attributes
<div :class="['bigtabBox', {'on': isActive}]">


:class (v-bind:class의 축약형) - 동적으로 클래스를 바인딩
{'on': isActive} 객체 문법으로 조건부 클래스 적용
데이터 바인딩
DOM 기반 HTML Template에 Vue데이터를 바인딩하는 방법은 값 대입, 값 연결, 디렉티브 사용이 있다
값 대입 - interpolaration
 {{msg}} 
값 연결 - binding expressions
{{ }} 를 이용한 데이터 바인딩 시 자바스크립트 표현식(+ , *) 및 여러개 체인 필터
디렉티브 v 접두사를 갖는 여러가지 기능하는 애들
클래스 바인딩 - css스타일링을 위해 class를 아래와 같이 추가가능
class = "{{ className }}" 
v-bind : class
https://vuejs.org/v2/guide/syntax.html
싱글파일 컴포넌트 체계 with JSX(ES6)
싱글 파일 컴포넌트란?
앱 복잡도 ↑, .vue 라는 파일 안에 html, js, css를 관리할 수 있는 방법 
∴ 결국 .vue 파일을 이용해라라는 것! 이 안에 너(vue, html, js, css) 있다. *
복잡도가 커짐에 따라 야기되는 문제는 결국 싱글 파일 컴포넌트가 필요한 이유
모든 컴포넌트에 고유의 이름을 붙여야 함
js파일에서 template 안에 html 의 문법 강조가 되지 않음
js 파일 상에서 css 스타일링 작업이 거의 불가
ES5를 이용하여 계속 앱을 작성할 경우 Babel 빌드가 지원되지 않음
상태 관리 라이브러리 Vuex
개요
복잡하고 많은 컴포넌트 데이터를 효율적으로 관리
React flux 패턴 → vue 라이브러리의 등장 배경
데이터의 흐름이 여러 갈래로 나뉘지 않고 단방향으로만 처리
주요속성
state 
여러 컴포넌트에 공유되는 데이터 data와 같은 형태
getters 
연산된 state 값을 접근하는 속성 computed처럼 미리 연산된 값으 접근하는 속성
mutations 
state값을 변경하는 이벤트 로직 cf) methods
actions
비동기 처리 로직을 선언하는 메서드 cf)async methods
``` 
import Vue from 'vue'
import Vuex from 'vuex'

//vue를 이제 쓰겠다.
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        headerText : 'Todo it!'
    }
});

```

-   TodoHeader.vue

```
<template>
    <header>
        <h1>{{this.$store.state.headerText}}</h1>
    </header>
</template>

```

-   vue dev


mutations : state 값을 변경할 수 있는 유일한 방법이자 메서드
commit( ) 으로 동작시킨다.
store.js
state: {storeNum : 10},
mutations: {
    modifyState(state, payload){
        console.log(payload.str);
        return state.storeNum += payload.num;
    }
}


App.vue
this.$store.commit('modifyState', {
    str: 'passed from payload',
    num: 20
});

∴ 결과 → App.vue에서 modifyState 라는 mutations 메서드를 호출하는 순간 modifyState에 state객체와 payload라는 객체가 넘어온다. 그리고 payload.str인 'passed form payload'가 로그로 찍히고, 10+20인 30이 반환된다.
→ state를 변경하기 위해 mutations를 동작시킬 때 인자(payload)를 전달할 수 있음
Vuex의 헬퍼함수
mapState - vuex에 선언한 state 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼
   //App.vue
   import { mapState } from 'vuex'

   computed() {
       ...mapState(['num'])
       // num() { return this.$store.state.num; }
   }





    //store.js
    state: {
        num: 10
    }


    <p> {{ this.num }}</p>

    ```

mapGetters - vuex에 선언한 state 속성을 뷰 컴포넌트에 더 쉽게 연결해주는 헬퍼함수
그 외 Vue
슬롯, slot, # 이란?
특정 컴포넌트의 일부 UI를 "재정의" 할 수 있게 해준다.
부모 컴포넌트에서 자식 컴포넌트로 컨텐츠를 전달할 수 있게 해준다.
webpack이란?
여러개의 파일을 하나의 파일로 합쳐주는 모듈 번들러
Vue CLI란?
webpack 기반 vue 개발 환경 구축 도구, vue 플젝 개발 환경을 설정해주구 vue 플젝 구성을 도와주는 도구
왜 뷰인가?
https://codingapple.com/unit/why-use-vue-over-react/

[Read more](https://velog.io/@deepsea/Vue-Island)