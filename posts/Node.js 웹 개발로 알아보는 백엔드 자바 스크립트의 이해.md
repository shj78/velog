# Node.js 웹 개발로 알아보는 백엔드 자바 스크립트의 이해

1-1. 노드의 정의
노드란?
V8 자바 스크립트 엔진으로 빌드된 자바 스크립트 런타임(실행 기계)
브라우저 밖(서버 환경)에서도 자바스크립트를 빠르게 실행할 수 있도록 해주는 환경
→ 그냥 실행기가 아닌 빠른 실행기 



언어는 자바스크립트, 런타임은 노드
자바스크립트의 친구는 타입스크립트, 타입스크립트의 런타임은 디노(노드의 경쟁자)
자바스크립트는 웹에 종속적이었는데...
→ 노드가 해방
→ 자바 스크립트의 위상 상승
→ V8 엔진을 제공하여 서로 다른 브라우저, 서버에서 동작 가능
→ 여러 OS환경에서 실행할 수 있는 환경 제공
❗️Java Virtual Machine에서 Runtime에서 .class로 변환된 자바 코드가 구동되듯이 자바스크립트 코드는 노드에서 구동
1-2 노드의 특성
특성
설명



비동기 I/O
멀티 요청을 효율적으로 처리 (논블로킹)


이벤트 기반
이벤트 루프 중심으로 동작하며, 이벤트가 발생할 때 콜백 실행


싱글 스레드
기본적으로 한 개의 스레드로 동작하지만 비동기 처리로 효율적


V8 엔진
구글의 빠른 자바스크립트 실행 엔진 사용


npm
전 세계 패키지를 쉽게 설치/사용할 수 있는 생태계


크로스 플랫폼
Windows, macOS, Linux 등 다양한 OS에서 실행 가능


서버 내장 기능
http, fs, net 등 서버 구축에 필요한 기능을 기본 제공







1-3 서버로서의 노드

노드의 내부 구조
⭐ libuv
립유브이라고 부른다.
libuv란?
C로 만들어진 라이브러리로, 노드에게 비동기 I/O나 그 외 여러 기능을 제공한다.
자바스크립트의 논블로킹과 event-driven 구조를 위해 Backbone에서 동작한다.
이벤트 기반(event-driven)이란?
거의 왠만한 프로그래밍이 이벤트 기반이다.
ex) 클릭, 네트워크 요청, 타이머 → 모두 이벤트들
이벤트 리스너 = 이벤트를 등록하는 함수
콜백 함수 = 이벤트가 발생됐을 때 실행될 함수
논블로킹 I/O 기능을 갖는다
논블로킹 : 오래 걸리는 함수를 백그라운드로 보내 다음 코드가 먼저 실행되게 하고 나중에 오래 걸리는 함수를 실행하는 것
그렇다고 항상 논블로킹이 랜덤으로 실행되는 것은 아니다.
동기 → 코드가 순서대로 실행된다. ↔ 비동기 → 코드가 순서대로 실행되지 않을 수 있다.
동기를 알기 위해서 🎖️실행 콘텍스트(this, scope)를 알아야 한다.
논블로킹을 알기 위해서 🎖️이벤트 루프와 ️프로토 타입을 알아야 한다.
그렇다면 왜 노드는 싱글 스레드를 채택했을까?
크롬에 페이스북, 네이버, 트위터의 탭을 켰을 경우에 모든 페이지에서 알림이 온다면 싱글스레드는 페이스북을 하고 있을 때 네이버와 트위터의 알람은 뜨지 않는다. 멀티스레드는 내가 네이버를 하든 트위터를 하든 띄워놓은 모든 프로세스의 알람이 뜬다.
싱글 스레드의 경우 점원1만 일하고 점원2, 3은 놀자판이다.
그래서 논블로킹을 채택하여 I/O 작업은 백그라운드 작업을 하게 했다.
립유브이에는 총 4개의 스레드가 있고 그 중 3개의 스레드가 논블로킹 일을 한다.
그런데 코딩이 너무 어렵다
인건비가 많이 든다.
그래서 코딩이 비교적 덜 어렵고 한 가지 일을 잘하는 싱글 스레드를 채택했다
그리고 병렬처리 시는 멀티 프로세스를 택했다.
먼저 주문을 고객으로부터 모두 받아 놓는다.
대신 점원 관리를 잘 해야한다.
점원이 힘들면 가게가 망한다.
그래서 멀티프로세스를 사용한다. → 체인점과 같은 개념
10명의 고객이 있다면 점원이 1명인 가게 10개를 만들어서 제공하는 것
현재는 노드 12버전에서 멀티 스레드를 사용
멀티 스레드를 사용할 수 있도록 worker_threads 모듈 도입
CPU를 많이 사용하는 작업인 경우 활용 가능 ↔ IO 요청이 많은 경우 멀티 프로세싱
멀티 프로세싱만 가능했던 노드의 아쉬움을 달래줌
진상 손님같은 복잡도가 높은 것을 위해 멀티 스레드를 제공했다
멀티 스레드와 싱글 스레드
싱글 스레드 모델은 에러를 처리하지 못하는 경우 멈춤 → 디버깅이 어렵다.
프로그래밍 난이도 下, CPU와 메모리 적게 사용
멀티 스레드 모델은 에러 발생 시 새로운 스레드를 생성하여 극복
단, 새로운 스레드 생성이나 놀고 있는 스레드 처리에 비용 발생
프로그래밍 난이도 上
스레드 수만큼 리소스 소모
노드의 장단점
장점:
멀티 스레드 방식에 비해 자원 적게 소모
       - 멀티 스레드 방식보다 쉬움
       - 웹 서버 내장
     - JS를 사용함
     - 세계 플밍 사용자수 1위
      - 커뮤니티가 큼
      - 망할 일이 없음
      - JSON 형식과 호환이 쉬움
      - 빈번한 I/O 처리에서 성능이 좋다. → I/O 작업이 많은 서버로 적합
              - 서버 확장에 용이하다.
               - 프론트에서 백딴까지 작성할 수 있다.
            - ex) 트위터 - 엄청 많은 양의 input, output 데이터를 처리하는 서비스에 강점

- 단점:
-싱글 스레드라 CPU를 하나만 사용한다. → 코어가 많은 경우, 하나만 터지기 직전이고 나머지 코어는 차디 차다.
             - CPU 작업이 많은 서버로는 부적합하다.
             - 하나뿐인 스레드가 멈추지 않도록 관리해야 한다.
             - 서버 규모가 클 시, 서버 관리가 어렵다.
             - 어중간한 성능
서버 외의 노드
               - 자바스크립트 런타임이기 때문에 용도가 서버에 국한되지 않는다.
               - 다양한 프레임워크, 데탑 개발도구가 노드 기반으로 동작한다.
                   - Angular
                   - React
                   - ReactNative
                   - Vue
                   - VSCode
                   - Slack
                   - Discord




2-1 호출 스택
호출 스택
함수를 선언한다.
  → 함수를 메모리에 올린다.(잠깐 저장한다)
  → 어나니머스까지 실행되면 자바스크립트 실행이 완료 
  → 스택이 비었을 떄 
  → 노드 종료
  
### 이렇게 순서 파악이 쉬우면 좋겠지만 ‼️ 문제는 비동기

- 대표적인 비동기 함수 setTimeOut(함수, 밀리세컨)

    → 비동기 함수는 호출스택으로 설명할 수 없기 때문에 **이벤트 루프**를 알아야 함

    ![image.png](attachment:81ab2790-0e20-4de8-9f6f-68f01c29a6a8:image.png)
2-2 이벤트 루프 ⭐
이벤트 루프
anonymous
파일이 시작되면 무조건 호출스택 최하단에 깔리고, 호출스택에서 가장 나중에 실행
함수는 호출스택에 쌓이고 호출되면 호출스택에서 제거된다
  ex) console.log(), setTimeout() 
비동기 함수는 백그라운드에 뭔가를 보낸다.
setTimeOut()은 타이머를 보낸다.
setTimeOut(익명, 0) = setTimeOut(()⇒ {console.log('wow');}, 0)
위 setTimeOut이 바로 실행되냐? 아니다.
무조건 백그라운드로 간다.
백그라운드는 호출 스택이랑 동시 실행이 가능하기 때문에 좋다.
설령 백그라운드가 먼저 처리되어도 호출스택이 무조건 먼저 처리가 되어야 한다.
어나니머스도 제거되고 호출스택이 빈 상태에서 백그라운드는 run을 3초뒤에 태스크 큐에 보낸다.
이벤트루프는 호출스택이 비었을 때 태스크 큐에 있는 걸 호출스택으로 끌어온다.
그리고 run이 호출되고 호출스택이 다시 비어있게 되면서 자바 스크립트 실행이 끝난다.
예제1) - 인간 V8 엔진이 되기
2-3 const, let, var
ES2015 이전에는 var var은 블록 스코프를 무시한다(전역변수)
const, let Vs var - 스코프의 차이 → ES6 이후 블록단위 { } 로 범위가 제한되었음
블록만 있으면 제한한다.
var은 function 중괄호 밖으로는 못빠져나간다.  → 함수 스코프를 respect한다.
const → 블록 스코프를 respect한다.
const Vs let (ES6) - 값을 초기화하는데 1번만 가능한 것이 const, 여러번 가능한 것이 let
const a = 3; 
a='5'; //에러

const b = {name : 'zerocho'};
b.name = 'nerocho';

//const는 = 를 한번밖에 못쓴다. -> 상수 개념 

const c;
c=3; // 에러 

//그래서 값을 바꾸고 싶으면 let을 쓴다.

let c = 5;
c=3;
c=10;

//왠만하면 const써라. 앞으로 쓸 일이 많다. 값을 변경할 일이 생각보다 많지 않다. 
2-4 템플릿 문자열과 객체 리터럴
`로 이용하는 🟣 템플릿 문자열 🟣
var won  = 1000;
var result = '이 과자는 '+ won + '입니다.';

//여기서 이렇게 편리하게 바뀜 - 템플릿 문자열 
const result =  '이 과자는 ${won}입니다'
🟣 객체 리터럴 🟣
객체의 메서드에 :function을 붙이지 않아도 됨
{ sayNode : sayNode } 와 같은 것을 {sayNode}로 축약가능
k,v가 같은 것들
ex ) return {x:x, y:y}; → return {x,y}
[변수 + 값] 등으로 동적 속성명을 객체 속성 명으로 사용 가능
동적 속성명 - 변수를 속성으로 쓰는 경우
//ES5 시절 
var sayNode = function(){
  console.log('Node');
  }
var es = 'ES';
var oldObject = {
  **sayJS : function() {**
      console.log('JS');

  },
  **sayNode : sayNode,**
};
oldObject[es + 6] = 'Fantastic';
oldOjbect.sayNode(); //Node
oldObject.sayJS(); //JS
console.log(oldObject.ES6); //Fanstastic 

//아래가 바뀐 ES6내용 
//--------------------------------------------------------
const newObject =  {
  **sayJs(){ //function()이 빠짐 ① - 타자수가 줄어든다. 알면 편하다. 핵심은 아님.**
      console.log('JS');

  },
  **sayNode, // k,v의 경우 같다면 생략해도 된다.**
  **[es + 6] : 'Fantastic', //동적 속성을 함수안에 선언할 수 있게 되었다.**
};
newObject.sayNode(); //Node 
newObject.sayJs(); //JS
console.log(newObject.ES6); //Fanstastic
2-5 화살표 함수
코드 간결성때문에 쓴다.  +)this에 개인적인 값 할당
앞전에 const와 let을 공부하며, var은 대체되었다고 말했다.
그런데 화살표 함수는 함수를 대체하지 못한다.
//기존
function add1(x,y) {
    return x+y;
}

//함수명 변수명처럼 적어주고 함수는 => "~이면"
const add2 = (x,y) => {
    return x+y;
};

const add3 = (x,y) => x+y;

const add4 = (x,y) => (x+y); // 

function not1(x) {
    return !x;

//매개변수가 하나인 경우에는 괄호 생략 
const not2 = x => !x;
}

//이런식으로 변화하였다.
화살표 함수가 기존 함수를 대체하지 못한 이유는 this때문이다.
this가 부모의 this인지, 자기만의 this인지 구분하지 못한다.
button.addEventListener('click', function(e){
    console.log(this.textContent);
});
//------------------------------------------------
button.addEventListener('click', (e)=>{
    console.log(this.textContent); //자기만의 this -> 동작 안함 
});

객체 자체를 리턴할 때 조심하기
중괄호 후 바로 return 나온다면 중괄호와 return을 생략할 수 있다.
중괄호 후 console.log 이런 거 껴있으면 안된다.
그런데! 생략했을 때의 문제점 - 객체 반환 시 함수의 바디인지 객체의 리터럴(중괄호)인지? 엔진이 인식을 못한다!
const obj = (x,y) => x,y;

const obj = (x,y) => {
  return x,y;
}

//so

//바로 객체를 반환할 때는 소괄호가 필수이다. ★

//like
const obj = (x,y) => {(x+y)};
2-6 구조 분해 할당
신기하게 자바스크립트에서는 이런게 많이 나온다.
const example = {a:123, b: {c:123, d:146}}

//const a가 가능한 것은 const가 블록 스코프이기 때문
const a = example.a;
const d = example.b.d;

const {a,b: {d}} = example;
console.log(a)//123;
console.log(d)//146;

arr = [1,2,3,4,5]
const x = arr[0]
const y = arr[1]
const 4 = arr[4]

구조 분해 할당이란?
구조 분해 할당에서 this를 사용하면 문제가 생긴다.
this를 사용할 시 구조 분해 할당하지 말 것
2-7 클래스
클래스는 프로토 타입이다.
그저 프로토 타입을 깔끔하게 만든 것 뿐이다.
자바스크립트에서 생성자 함수는 대문자로 선언한다.
자바도 그렇다. 클래스는 대문자.
클래스가 없을 때는 코드가 복잡하고 지저분 했다.
클래스가 나오고 가독성이 좋아졌다.
2-8 프로미스, async/await ✨
프로미스 : 콜백 헬이라는 자바스크립트 코드의 해결책
  → 콜백 대신 프로미스, async, await
자바스크립트 비동기 처리에 사용되는 객체
비동기 처리란?
  특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행하는 자바스크립트의 특성  
자바스크립트와 노드에서 비동기 API로 밀어주고 있어 유망
내용이 실행은 되었지만 결과를 아직 반환하지 않은 객체
코드를 분리한다 → 가독성이 좋아진다 ★
프로미스가 없다면 기존 데이터 통신에서 데이터를 요청하고 데이터를 받아오기 전 화면에 데이터표시에서 오류가 발생하거나 빈화면이 나오게 된다.
```jsx
const promise = setTimeoutPromise(3000)

console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');
console.log('딴짓');

//필요할 때 꺼내쓴다 - 무조건 알아야 한다 ★ 
promise.then(()=>{
    '지금할래'
});
```

- 콜백이면 호출 시 바로 실행된다.
- 프로미스는 원할 때 then을 이용하여 프로미스에서 꺼내쓸 수 있다.
    - 어떻게? then을 붙이면 결과를 반환함.
    - resolve는 성공시, reject는 실패 시 실행
        - resolve는 성공 리턴값으로 then으로 연결
        - reject는 실패 리턴값으로 catch로 연결
        - finally 부분은 무조건 실행
- 실행이 완료되지 않았으면 실행 완료 후 then 내부 함수가 실행됨
- 현재 노드 생태계가 콜백에서 프로미스로 바뀌고 있는 추세임
- 콜백 함수를 쓰다보면 콜백 헬이 생긴다.
    - 프로미스를 쓰면 일정하게 유지된다.
    - 이 또한 then.. then.. then.. 으로 프로미스 지옥이라고 제로초는 말한다.
- Promise.all(배열): 여러개의 프로미스를 동시에 실행
- 프로미스는 어떤 동작을 하는 것이다.
    - "네이버에 로그인 요청을 해와."
        - 실패할 수 있다 → 비동기
            - 네이버가 나의 요청을 거부했을 경우
            - reject 호출 후 catch 실행 ( 아니면 resolve 호출 → then )


async :  프로미스다. 프로미스를 간단하게 만든 것.
then으로
catch가 없다.
항상 프로미스를 반환한다.
for await of 는 프로미스를 반복할 때 쓴다. (노드 10부터)
async 안에서 사용해야함
await- 프로미스를 사용하며 then.. then.. 지옥을 경험했다.(비동기에 대한 사고) 그게 싫다면 then 대신 await을 써준다.
그래서 실행순서가 오른쪽에서 왼쪽이다.
프로미스는 위에서 아래로 왼쪽에서 아래로
예전에는 어웨잇을 쓰려면 에이싱크로 감싸줘야했다.
const promise = new Promise(...)
promise.then((result)=> ...);

//과거
async function main() {
  const result = await promise;
}

//async에서 리턴한 것은 main().then((name)=> ....) 이다. 

//현재
const result = await promise;

지금은 그럴 필요 없다.
불안하면 써줘라.
→ async, await 이 코드 간결해지고 좋긴한데 resolve만 처리하고(then) reject를 처리하는 부분이 없어서 그럴 경우에 try...catch문을 써준다. → 잘 쓰지는 않는다. 드물다.
기본 문법
async function 함수명 () {
    await 비동기_처리_메소드명();
}
//async - 예약어
//await - 함수 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 붙여준다.

//비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await가 의도한 대로 동작한다는 점 
2-9 프론트
ajax - 서버로 요청을 보내는 코드
라이브러리 없이는 브라우저가 지원하는 XMLHttpRequest 객체를 이용
AJAX 요청 시 Axios 라이브러리를 사용하는 게 편함
HTML에 스크립트 한 줄만 추가하면 사용할 수 있음
GET 요청 보내기 
axios.get 함수의 인수로 요청을 보낼 주소를 넣으면 됨
프로미스 기반 코드라 async/await 사용가능
axios.get('https://www.zerocho.com/api/get')
 .then((result) => {
 console.log(result);
 console.log(result.data); 
 })
 .catch((error) => {
     console.error(error);
 });
//에이싱크도 쓸 수 있다.
(async () => {
 try {
     const result = await axios.get('https://www.zerocho.com/api/get');
     console.log(result);
     console.log(result.data);
 }catch (error){
     console.error(error);
 }
})();
POST 요청을 하는 코드(데이터를 담아 서버로 보내는 경우)
(async () => {
 try {
     const result = await axios.post('https://www.zerocho.com/api/post/json', {
         name : 'zerocho',
         birth : 1994,
     });
     console.log(result);
     console.log(result.data);
 }catch (error){
     console.error(error);
 }
})();
FormData - HTML form 태그에 담긴 데이터를  AJAX 요청으로 보내고 싶은 경우 FormData 객체를 이용한다. 
FormData 메서드
append : 데이터를 하나씩 추가
Has로 데이터의 존재 여부 확인
Get으로 데이터 조회
getAll로 데이터 모두 조회
delete로 데이터 삭제
set으로 데이터 수정
encodeURIComponet, decodeURIComponent
주소창에 한글 입력시 서버가 처리 못하는 경우
 → encodeURIComponent로 한글 감싸줘서 처리 
```jsx
(async () => {
    try {
        const result = await axios.get('https://www.zerocho.com/api/search/
    ${encodeURIComponent('노드')}'); //%EB%85%B8%EB%93%9C가 됨 
        console.log(result);
        console.log(result.data);
    } catch (error){
        console.error(error);
    }
})();
```

- decodeURIComponent('%EB%85%B8%EB%93%9C'); //노드
    - 주소에 한글이 들어갈 시 주의하자!


data attribute와 dataset
서버의 데이터를 프론트엔드로 내려줄 때 사용
태그 속성으로 data 속성명
속성명은 내가 임의로 지정할 수 있다.
자바스크립트에서 태그.dataset.속성명 으로 접근이 가능하다.
data-user-job → dataset.user.job
반대로 dataset에 값을 할당하면 data-속성이 생긴다.
dataset.monthSalary = 10000 → data-month-salary = "10000"
3-1 REPL(레플) - node 라고 써있는 터미널
프롬프트가 > 모양으로 바뀌면 자바스크립트 코드 입력
방금 빵 터짐 나의 백치미에
한 줄짜리 코드 확인할 때 사용 ex) 계산기
cmd 명령어
cd ..
cd ../..
cd 경로1/경로
화살표 위로 향하는 키
근데 그냥 VSCode에 있는 터미널 쓰자.
파워쉘보다는 cmd가 낫다.
3-2 모듈 (ES2015)
노드에서는 모듈이라는 시스템이 있어서 코드가 있다면 여러 파일로 잘게 쪼갤 수 있다.
노드는 자바스크립트 코드를 모듈로 만들 수 있음
모듈: 특정 기능을 하는 함수나 변수의 집합
모듈로 만들면 여러 프로그램에서 재사용 가능
같은 폴더 내에 var.js, func.js등 을 만들기
코드가 길다면 관리하기 쉽게 하기 위해 사용
test.js
function helloworld(){
    console.log('Hello world!');
    helloNode();
}

function helloNode(){
    console.log('Hello world!!!');
}

helloworld();
var.js
const odd = '홀수입니다';
const even = '짝수입니다';

//내가 다른 파일에서 쓰고 싶은 변수를 넘겨준다.

//노드의 모듈시스템과 자바의 모듈시스템은 다르다.  
//노드 모듈시스템 - module.exports
//자바 모듈시스템 - import{ } from './var';

//왜 노드는 자바의 모듈시스템을 안쓰는가?
//A: 쓸 수 는 있는데, 노드가 먼저 모듈시스템을 도입을 하고 자바 스크립트에서 만들었는데 둘의 모듈 시스템이 일치하지 않는 것.
//그래서 노드가 최신 모듈 시스템인 import를 쓰겠다 하면 기존의 문법이 고장나기 때문에 module 과 require을 유지하고 있다.
//쓸 수는 있다. 
//import {odd, even } from './var';
//const c = require('./var');

module.exports = { //객체를 module.exports에 대입해주었음
    odd,//odd:odd 
    even, //이렇게 넘겨주게되면 얘네를 다른 파일에서 쓸 수 있다.
};
//module도 생략이 가능하다!
//위와 같은 것
/*
exports.odd = odd;
exports.even = even;
*/
//exprots = {odd, even} 이 아니라는 것 기억!

// 그럼 둘은 무슨 차이가 있나? 
//module.exports === exports === {}
//module.exports === exports === {odd,even} 까지는 괜찮아요
//module.exports !== exports === {function같은 것} 
//참조관계가 끊기게 된다. 

//module.exports는 한가지 ! 반환할 때 만 쓴다. 

//그리고 var 파일 자체가 module이 된다. 

//const value = require('./var') // .js 는 생략할 수 있다.
// C:\ECS\study\node\chat-app\bin>node func
// { odd: '홀수입니다', even: '짝수입니다' }
/*
const {odd, even} = require('./var');

function checkOddOrEven(number) {
    if(number % 2){
        return odd;
    }else {
        return even;
    }
}

//넘겨받은 데이터를 다시 넘겨줄 수 도 있다.
//모듈은 파일에 서 한번만 쓸 수 있다.
module.exports = {
    checkOddOrEven,
    odd,
    even,
};
*/
index.js
const {odd, even, checkOddOrEven} = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
    if(str.length % 2){
        return odd;
    } else {
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
func.js
const value = require('./var') // .js 는 생략할 수 있다. //. 현재 경로 
//function require 해야하지만 node 에서 제공한다. 
//require() : 외부 모듈을 가져온다. 

//만약 모듈이 없다면 파일간의 중복이 발생한다. 

function checkOddOrEven(number) {
    if(number % 2) {
        return odd;
    } else {
        return value.even;
    }
}

module.exports = checkOddOrEven;
3-3 global, console, timer
global
console.log()나 module.export도 global에 들어가 있는 것이다.
global 속성에 값을 대입하면 다른 파일에서 사용가능하다.
근데 왠만해서 권장하지 않는다. 어디에서 추가했는 지 알 길이 없기 때문이다.
console객체
console.time() , console.timeEnd()  - 코드 수행 시간
console.error
console.table - 노드, 브라우저에서
console.dir
console.trace - 호출스택 로깅(어나니머스도 나온다)
console.js
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside : {
        inside : {
            'key' : 'value',
        },
    },
};

console.time('전체 시간');
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);
console.error('에러메시지는 console.error에 담아주세용');

console.table([{name: '제로', birth: 1994}, {name:'hero', birth:1988}]);

console.dir(obj, {colors: false, depth: 2});
console.dir(obj, {colors: true, depth: 1});

console.time('시간 측정');
for(let i=0; i<100000; i++){}
console.timeEnd('시간 측정');

function b(){
    console.trace('에러 위치 추적');
}
function a(){
    b();
}
a();

console.timeEnd('전체 시간');
/*
C:\deepsea\study\node\chat-app\bin>node console
평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.
abc 1 true
에러메시지는 console.error에 담아주세용
┌─────────┬────────┬───────┐
│ (index) │  name  │ birth │
├─────────┼────────┼───────┤
│    0    │ '제로' │ 1994  │
│    1    │ 'hero' │ 1988  │
└─────────┴────────┴───────┘
{ outside: { inside: { key: 'value' } } }
{ outside: { inside: [Object] } }
시간 측정: 1.428ms
Trace: 에러 위치 추적
    at b (C:\deepsea\study\node\chat-app\bin\console.js:27:13)
    at a (C:\deepsea\study\node\chat-app\bin\console.js:30:5)
    at Object.<anonymous> (C:\deepsea\study\node\chat-app\bin\console.js:32:1)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47
전체 시간: 12.196ms
*/
timer
setTimeout(콜백함수, 밀리초) - 주어진 밀리초 이후에 콜백함수를 실행
setInterval(콜백함수, 밀리초) - 주어진 밀리초마다 콜백함수를 반복 실행
  → 이런거 할 때는 변수에 담아주어야 한다.
setImmediate(콜백함수) - 콜백함수를 즉시 실행합니다.
setTimeout과 둘중에 뭘 써야할까?
둘이 거의 차이 없으니까 setImmediate 쓰세요. (헷갈리니까, 환경에 따라서 먼저 실행되는게 다르긴 함)
setImmediate(()⇒ console.log('hi', 0))
이런거 쓸 때는 console.log('hi')찍으면 되잖아요?
비동기, 동시실행, timer 같은거 쓰면 백그라운드로 넘어간다고 했죠? 그래서 좋습니다~
clearTimeout(아이디) : setTimeout을 취소합니다.
clearInterval(아이디) :  setInterval을 취소합니다.
claerImmediate(아이디) : setImmediate를 취소합니다.
setImmediate도! 취소할 수 있다.
바로 실행되는게 아니라 백그라운드 → 태스크 큐 → 호출스택 이 과정을 지나기 떄문에 이 과정이 모두 지나기 이전 clearImmediate 를 사용 시 취소가 된다. 신기하죠?
const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside : {
        inside : {
            'key' : 'value',
        },
    },
};

console.time('전체 시간');
console.log('평범한 로그입니다. 쉼표로 구분해 여러 값을 찍을 수 있습니다.');
console.log(string, number, boolean);
console.error('에러메시지는 console.error에 담아주세용');

console.table([{name: '제로', birth: 1994}, {name:'hero', birth:1988}]);

console.dir(obj, {colors: false, depth: 2});
console.dir(obj, {colors: true, depth: 1});

console.time('시간 측정');
for(let i=0; i<100000; i++){}
console.timeEnd('시간 측정');

function b(){
    console.trace('에러 위치 추적');
}
function a(){
    b();
}
a();

console.timeEnd('전체 시간');
3-4 export 와 this
export 관련 var.js 코드 참고
filename.js

console.log(__filename);
console.log(__dirname);

/*
C:\deepsea\study\node>cd chat-app/bin

C:\deepsea\study\node\chat-app\bin>node filename
C:\deepsea\study\node\chat-app\bin\filename.js
C:\deepsea\study\node\chat-app\bin

C:\deepsea\study\node\chat-app\bin>
*/
3-5 모듈 심화, 순환 참조
import가 exports 보다 위에 있어야 한다.
require('./var');
//var라는 파일에 있는 변수는 가져오지 않고 실행만 시킬 때 변수에 담지는 않는다.

console.log(require);
//결과------------------------------------------------------
//main, cache 알아두기
//main - 자바 스크립트를 노드로 실행하면 모듈이다. 어떤 것을 실행했는 지 알 수 있음
// 한번 require했던 것은 캐싱된다. 
// 두번째 불러올 때는 메모리에서 불러온다.
// 캐싱이란 하드 디스크에 있는 정보를 메모리에 옮겨 오는 것을 뜻한다. 
// 캐시를 비우고 싶다면 할 수는 있지만 내장 객체를 초기화 하는 것이기 때문에 잘 안쓰고, 위험하기도 하다.  
// 즉 require.cache~해서 직접 접근도 가능하지만 안쓴다.
// exports가 module.exports
// require.();
/*
C:\deepsea\study\node\chat-app\bin>node require
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: Module {
    id: '.',
    path: 'C:\\deepsea\\study\\node\\chat-app\\bin',
    exports: {},
    filename: 'C:\\deepsea\\study\\node\\chat-app\\bin\\require.js',
    loaded: false,
    children: [ [Module] ],
    paths: [
      'C:\\deepsea\\study\\node\\chat-app\\bin\\node_modules',
      'C:\\deepsea\\study\\node\\chat-app\\node_modules',
      'C:\\deepsea\\study\\node\\node_modules',
      'C:\\deepsea\\study\\node_modules',
      'C:\\deepsea\\node_modules',
      'C:\\node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)]
  },
  cache: [Object: null prototype] {
    'C:\\deepsea\\study\\node\\chat-app\\bin\\require.js': Module {
      id: '.',
      path: 'C:\\deepsea\\study\\node\\chat-app\\bin',
      exports: {},
      filename: 'C:\\deepsea\\study\\node\\chat-app\\bin\\require.js',
      loaded: false,
      children: [Array],
      paths: [Array]
    },
    'C:\\deepsea\\study\\node\\chat-app\\bin\\var.js': Module {
      id: 'C:\\deepsea\\study\\node\\chat-app\\bin\\var.js',
      path: 'C:\\deepsea\\study\\node\\chat-app\\bin',
      exports: [Object],
      filename: 'C:\\deepsea\\study\\node\\chat-app\\bin\\var.js',
      loaded: true,
      children: [],
      paths: [Array]
    }
  }
}
*/
3-6 process
노드를 실행하면 프로세스 하나가 뜬다.
즉 아래는 프로세스의 정보들이다.
C:\deepsea\study\node>node
Welcome to Node.js v16.13.0.
Type ".help" for more information.
> process
process {
  version: 'v16.13.0',
  versions: {
    node: '16.13.0',
    v8: '9.4.146.19-node.13',
    uv: '1.42.0',
    zlib: '1.2.11',
    brotli: '1.0.9',
    ares: '1.17.2',
    modules: '93',
    nghttp2: '1.45.1',
    napi: '8',
    llhttp: '6.0.4',
    openssl: '1.1.1l+quic',
    cldr: '39.0',
    icu: '69.1',
    tz: '2021a',
    unicode: '13.0',
    ngtcp2: '0.1.0-DEV',
    nghttp3: '0.1.0-DEV'
  },
  arch: 'x64', //아키텍쳐 정보
  platform: 'win32', //운영체제에 따라 다르게 뜬다.
  release: {
    name: 'node',
    lts: 'Gallium',
    sourceUrl: 'https://nodejs.org/download/release/v16.13.0/node-v16.13.0.tar.gz',
    headersUrl: 'https://nodejs.org/download/release/v16.13.0/node-v16.13.0-headers.tar.gz',
    libUrl: 'https://nodejs.org/download/release/v16.13.0/win-x64/node.lib'
  },
  _rawDebug: [Function: _rawDebug],
  moduleLoadList: [
    'Internal Binding native_module',
    'Internal Binding errors',
    'NativeModule internal/errors',
    'Internal Binding config',
    'Internal Binding constants',
    'Internal Binding util',
    'Internal Binding types',
    'NativeModule internal/util',
    'NativeModule internal/util/types',
    'NativeModule internal/assert',
    'NativeModule internal/validators',
    'Internal Binding icu',
    'NativeModule internal/util/inspect',
    'NativeModule events',
    'Internal Binding buffer',
    'Internal Binding string_decoder',
    'NativeModule internal/buffer',
    'Internal Binding blob',
    'NativeModule internal/encoding',
    'Internal Binding symbols',
    'Internal Binding messaging',
    'NativeModule internal/worker/js_transferable',
    'NativeModule internal/blob',
    'NativeModule buffer',
    'NativeModule internal/process/per_thread',
    'Internal Binding process_methods',
    'Internal Binding credentials',
    'Internal Binding async_wrap',
    'Internal Binding task_queue',
    'NativeModule internal/async_hooks',
    'NativeModule async_hooks',
    'NativeModule internal/process/promises',
    'NativeModule internal/fixed_queue',
    'NativeModule internal/process/task_queues',
    'Internal Binding trace_events',
    'NativeModule internal/constants',
    'NativeModule internal/console/constructor',
    'NativeModule internal/console/global',
    'NativeModule internal/util/inspector',
    'Internal Binding inspector',
    'NativeModule internal/querystring',
    'NativeModule path',
    'NativeModule querystring',
    'Internal Binding url',
    'NativeModule internal/url',
    'NativeModule internal/util/debuglog',
    'NativeModule util',
    'Internal Binding performance',
    'NativeModule internal/perf/utils',
    'NativeModule internal/event_target',
    'NativeModule internal/abort_controller',
    'Internal Binding worker',
    'NativeModule internal/streams/end-of-stream',
    'NativeModule internal/streams/destroy',
    'NativeModule internal/streams/legacy',
    'NativeModule internal/streams/add-abort-signal',
    'NativeModule internal/streams/buffer_list',
    'NativeModule internal/streams/state',
    'NativeModule string_decoder',
    'NativeModule internal/streams/from',
    'NativeModule internal/streams/readable',
    'NativeModule internal/streams/writable',
    'NativeModule internal/streams/duplex',
    'NativeModule internal/streams/utils',
    'NativeModule internal/streams/pipeline',
    'NativeModule internal/streams/compose',
    'NativeModule stream/promises',
    'NativeModule internal/streams/transform',
    'NativeModule internal/streams/passthrough',
    'NativeModule stream',
    'NativeModule internal/worker/io',
    'Internal Binding timers',
    'NativeModule internal/linkedlist',
    'NativeModule internal/priority_queue',
    'NativeModule internal/timers',
    'NativeModule timers',
    'NativeModule internal/perf/performance_entry',
    'NativeModule internal/perf/observe',
    'NativeModule internal/perf/nodetiming',
    'NativeModule internal/perf/usertiming',
    'NativeModule internal/perf/event_loop_utilization',
    'NativeModule internal/histogram',
    'NativeModule internal/perf/timerify',
    'NativeModule internal/perf/performance',
    'NativeModule internal/perf/event_loop_delay',
    'NativeModule perf_hooks',
    'NativeModule internal/process/execution',
    'NativeModule internal/process/warning',
    'Internal Binding fs',
    'NativeModule internal/fs/utils',
    'Internal Binding fs_dir',
    'NativeModule internal/fs/dir',
    'Internal Binding fs_event_wrap',
    'Internal Binding uv',
    'NativeModule internal/fs/watchers',
    'NativeModule internal/fs/read_file_context',
    'NativeModule fs',
    'Internal Binding serdes',
    'Internal Binding profiler',
    'Internal Binding heap_utils',
    ... 63 more items
  ],
  binding: [Function: binding],
  _linkedBinding: [Function: _linkedBinding],
  _events: [Object: null prototype] {
    newListener: [ [Function: startListeningIfSignal], [Function (anonymous)] ],
    removeListener: [ [Function: stopListeningIfSignal], [Function (anonymous)] ],
    warning: [Function: onWarning],
    SIGWINCH: [Function (anonymous)]
  },
  _eventsCount: 4,
  _maxListeners: undefined,
  domain: [Getter/Setter],
  _exiting: false,
  config: [Getter/Setter],
  dlopen: [Function: dlopen],
  uptime: [Function: uptime], //프로세스 시작 후 흐른 시간 - 5분 후에 꺼지도록 할 수 있음
  _getActiveRequests: [Function: _getActiveRequests],
  _getActiveHandles: [Function: _getActiveHandles],
  reallyExit: [Function: reallyExit],
  _kill: [Function: _kill],
  cpuUsage: [Function: cpuUsage],
  resourceUsage: [Function: resourceUsage],
  memoryUsage: [Function: memoryUsage] { rss: [Function: rss] },
  kill: [Function: kill],
  exit: [Function: exit],
  openStdin: [Function (anonymous)],
  allowedNodeEnvironmentFlags: [Getter/Setter],
  assert: [Function: deprecated],
  features: {
    inspector: true,
    debug: false,
    uv: true,
    ipv6: true,
    tls_alpn: true,
    tls_sni: true,
    tls_ocsp: true,
    tls: true,
    cached_builtins: [Getter]
  },
  _fatalException: [Function (anonymous)],
  setUncaughtExceptionCaptureCallback: [Function (anonymous)],
  hasUncaughtExceptionCaptureCallback: [Function: hasUncaughtExceptionCaptureCallback],
  emitWarning: [Function: emitWarning],
  nextTick: [Function: nextTick],
  _tickCallback: [Function: runNextTicks],
  _debugProcess: [Function: _debugProcess],
  _debugEnd: [Function: _debugEnd],
  _startProfilerIdleNotifier: [Function (anonymous)],
  _stopProfilerIdleNotifier: [Function (anonymous)],
  stdout: [Getter],
  stdin: [Getter],
  stderr: [Getter],
  abort: [Function: abort],
  umask: [Function: wrappedUmask],
  chdir: [Function (anonymous)],
  cwd: [Function: wrappedCwd], //프로세스가 실행되는 위치 
  env: {  //환경변수 - 자바같은 거 설치할 때 설정해주는 환경변수 이런것들이 process env안에 들어있다. 
    ALLUSERSPROFILE: 'C:\\ProgramData',
    APPDATA: 'C:\\Users\\hjsim\\AppData\\Roaming',
    CHROME_CRASHPAD_PIPE_NAME: '\\\\.\\pipe\\crashpad_8228_THCEFJZXPEMINSQL',
    CommonProgramFiles: 'C:\\Program Files\\Common Files',
    'CommonProgramFiles(x86)': 'C:\\Program Files (x86)\\Common Files',
    CommonProgramW6432: 'C:\\Program Files\\Common Files',
    COMPUTERNAME: 'DESKTOP-9C6H7I0',
    ComSpec: 'C:\\Windows\\system32\\cmd.exe',
    configsetroot: 'C:\\Windows\\ConfigSetRoot',
    DriverData: 'C:\\Windows\\System32\\Drivers\\DriverData',
    HOMEDRIVE: 'C:',
    HOMEPATH: '\\Users\\hjsim',
    LOCALAPPDATA: 'C:\\Users\\hjsim\\AppData\\Local',
    LOGONSERVER: '\\\\DESKTOP-9C6H7I0',
    NUMBER_OF_PROCESSORS: '8',
    OneDrive: 'C:\\Users\\hjsim\\OneDrive',
    OneDriveConsumer: 'C:\\Users\\hjsim\\OneDrive',
    ORIGINAL_XDG_CURRENT_DESKTOP: 'undefined',
    OS: 'Windows_NT',
    Path: 'C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\nodejs\\;C:\\Users\\hjsim\\AppData\\Local\\Microsoft\\WindowsApps;;C:\\Users\\hjsim\\AppData\\Roaming\\npm',  
    PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC',
    PROCESSOR_ARCHITECTURE: 'AMD64',
    PROCESSOR_IDENTIFIER: 'Intel64 Family 6 Model 140 Stepping 1, GenuineIntel',
    PROCESSOR_LEVEL: '6',
    PROCESSOR_REVISION: '8c01',
    ProgramData: 'C:\\ProgramData',
    ProgramFiles: 'C:\\Program Files',
    'ProgramFiles(x86)': 'C:\\Program Files (x86)',
    ProgramW6432: 'C:\\Program Files',
    PROMPT: '$P$G',
    PSModulePath: 'C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules',
    PUBLIC: 'C:\\Users\\Public',
    SESSIONNAME: 'Console',
    SystemDrive: 'C:',
    SystemRoot: 'C:\\Windows',
    TEMP: 'C:\\Users\\hjsim\\AppData\\Local\\Temp',
    TMP: 'C:\\Users\\hjsim\\AppData\\Local\\Temp',
    USERDOMAIN: 'DESKTOP-9C6H7I0',
    USERDOMAIN_ROAMINGPROFILE: 'DESKTOP-9C6H7I0',
    USERNAME: 'hjsim',
    USERPROFILE: 'C:\\Users\\hjsim',
    windir: 'C:\\Windows',
    __COMPAT_LAYER: 'DetectorsAppHealth',
    TERM_PROGRAM: 'vscode',
    TERM_PROGRAM_VERSION: '1.62.2',
    LANG: 'ko_KR.UTF-8',
    COLORTERM: 'truecolor'
  },
  title: 'C:\\Windows\\System32\\cmd.exe - node',
  argv: [ 'C:\\Program Files\\nodejs\\node.exe' ],
  execArgv: [],
  pid: 884,//프로세스 아이디 서버 죽일 때, 즉 프로세스 죽일 때 쓰는 것 
  ppid: 9240,
  execPath: 'C:\\Program Files\\nodejs\\node.exe',
  debugPort: 9229,
  hrtime: [Function: hrtime] { bigint: [Function: hrtimeBigInt] },
  argv0: 'node',
  _preload_modules: [],
  setSourceMapsEnabled: [Function: setSourceMapsEnabled],
  [Symbol(kCapture)]: false
}
process.env
시스템 환경 변수들이 들어있는 객체
비밀키를 보관하는 용도로 쓰인다.
환경변수는 process.env로 접근이 가능하다.
일부 환경변수는 노드실행시 영향을 미친다.
백그라운드에서 많이 돌아간다고 해도 스레드는 보통 4개 돌아간다.
그런데 부족하다 싶으면 UV_THREADPOOL_SIZE를 이용해 스레드를 늘릴 수도 있다.
```jsx
C:\deepsea\study\node>node
Welcome to Node.js v16.13.0.
Type ".help" for more information.
process.uptime()
  7.7482404
process.uptime()
  13.6747411
process.exit(0);
  C:\deepsea\study\node>








3-7 os와 path
OS
운영체제의 정보를 담고 있음
cpus() 는 중요하다
나중에 서버띄울 때 노드는 싱글쓰레드이기 때문에 나의 경우 8개의 코어가 있는데, 1개의 cpu만 사용이 된다.
이럴 경우 효율적인 서버 구성을 하기 위해서 서버를 7개를 더 띄워야 하는데, 이때 필요하다. 
```jsx
const os  = require('os');
console.log(os.cpus());
/*
C:\deepsea\study\node\chat-app\bin>node os
[
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 1540593,
   nice: 0,
   sys: 2304546,
   idle: 59657390,
   irq: 487546
 }
},
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 1406343,
   nice: 0,
   sys: 1213390,
   idle: 60882656,
   irq: 28093
 }
},
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 2739875,
   nice: 0,
   sys: 1935046,
   idle: 58827468,
   irq: 39046
 }
},
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 1899437,
   nice: 0,
   sys: 1345390,
   idle: 60257562,
   irq: 26500
 }
},
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 2213828,
   nice: 0,
   sys: 1723859,
   idle: 59564671,
   irq: 35390
 }
},
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 1663015,
   nice: 0,
   sys: 1300875,
   idle: 60538484,
   irq: 27046
 }
},
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 1813828,
   nice: 0,
   sys: 1655734,
   idle: 60032828,
   irq: 30359
 }
},
{
 model: '11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz',
 speed: 2419,
 times: {
   user: 1546546,
   nice: 0,
   sys: 1329765,
   idle: 60626062,
   irq: 26515
 }
}
]
 */

 - OS 모듈 메서드( 이미지 말고 API를 봐라)

 ![image.png](attachment:4db86404-e353-475e-9493-887fcef943cb:image.png)

 https://nodejs.org/dist/latest-v17.x/docs/api/ → nodejs API ( 한글 번역도 잘 된다 ) 

 1. path 
     1. 경로를 찾을 때 중요하다.
     2. 운영체제마다 다르기 때문에 경로처리할 때 써라.
     3. join과 resolve 의 차이
         1. join은 파일에 슬래쉬가 있든 없든 앞의 경로를 무시하지 않는다. → 상대경로로 처리
         2. resolve는 슬래쉬가 있다면 앞의 경로를 무시한다. → 절대경로로 처리 
     4. 상대경로와 절대경로
         1. 상대경로 : 현재 파일 기준. 같은 경로면 점 하나. 한 단위 상위 경로면 점 두개.
         2. 절대경로는 루트 폴더나 노드 프로세스가 실행되는 위치가 기준
     5. \\와 \ 차이 
         - \는 윈도우 경로 구분자
         - \\는 자바스크립트 문자열 안에서 사용
             - \가 이미 사용되고 있어 \\로 이스케이프 해줌

         ![image.png](attachment:4517b3ed-d5bb-412a-aedb-719a035402e9:image.png)

     - 이렇게 // \\\\ 같은 중구난방인 경로를 normalize함수로 깨끗이 정리할 수 있다.
     - 읽어보라

     ![image.png](attachment:4af01602-c135-4b1e-96c1-38a1749c2a86:image.png)




3-8 url 과 querystring
url
WHATWG와 노드에서 부르는 URL 각각의 명칭이 다르다.
https://nodejs.org/dist/latest-v17.x/docs/api/url.html
외우지 말고 둘 다 많이 쓰인다.  자주 봐라.
대신 WHATWG가 아니라 기존 방식을 써야만 인식이 되는 경우가 있다.
searchParams
쿼리스트링은 ? 부터 시작되는 부분, 그 부분 즉 주소에는 데이터가 담겨있다.
문자열이다 보니 자바스크립트에서는 저 쿼리스트링이 불편하다.
그래서 그 주소를 객체화하는데 searchParams가 돕는다.
→ WHATWG 방식에서 쿼리스트링을 객체화해서 도와주는 객체  
const { URL } = require('url');

const myURL = new URL('http://www.github.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams', myURL.searchParams);
//myURL 이라는 주소를 객체화하였음 

// C:\deepsea\study\node\chat-app\bin>node searchParams
// searchParams URLSearchParams {
//   'page' => '3',
//   'limit' => '10',
//   'category' => 'nodejs',
//   'category' => 'javascript' }

console.log('searchParams.getAll(): ', myURL.searchParams.getAll('category'));
3-9 crypto와 utill
crypto
cpu를 많이 잡아먹어서 멀티 쓰레드
암호화 : 평문을 암호로
복호화 : 암호를 평문으로
단방향 암호화의 대표주자는 해시 기법
문자열을 고정된 길이의 다른 문자열로 바꾸낟.
abcde → qvew(항상)
알고리즘만 잘 선택하면 굉장히 안전
Hash  사용하기(sha512)
md5와 sha1 은 이미 취약점이 발견되었음
명령어
createHash : 사용할 해시 알고리즘을 넣는다.
update(문자열) : 변환할 문자열을 넣어준다.
digest(인코딩) : 인코딩할 알고리즘을 넣어준다.
base64가 많이 쓰이고 어차피 아래와 같이 복호화 되기 때문에 해커들이 시도조차 하지 않는다. 

pdkdf2
sha512 취약해지면 sha3으로 넘어갈 것
pdkdf2에는 salt라는게 있다 → 비밀번호 + salt(소금) ⇒ 해시화
그냥 해독을 더 복잡하게 하기 위해서 사용하는데, 자주 쓰이지는 않음
양방향 암호화
대칭형 암호화
key가 사용됨
암호화할 때 복호화할 때 같은 key를 이용
나와 상대방이 같은 key를 갖는다는게 근데 취약점이 있다.
프론트와 서버같은 한 쪽이 공개된 상황에서 쓸 수 없다
개발자도구에서 다 볼 수 있기 때문
그래서 cryto.js 같은 걸 사용하는 것을 추천
단방향 - sha512
양방향 - AES
비대칭 암호화 - RSA
cf) AWS Key manager 참고
util
각종 편의 기능을 모아둔 모듈
deprecated 와 promisefy가 자주 쓰임
잘못 만든 코드가 있을 때 기존 코드를 지우면 안되는 상황
잘못만든 코드에 대해서 알려줄 때 감싸주는게 deprecated

노드에서 프로미스를 지원안하는 애들이 많다.
콜백은 async,await을 지원안해서 불편할 때가 많은데, 그런 애들을 promisify하면 then 대신 await을 붙이며 프로미스처럼 쓸 수 있다.

3-10 worker threads (node 14버전 부터) (8분~)
노드에서 멀티스레드 방식으로 작업할 때 사용한다.
isMainThread : 현재 코드가 메인 스레드에서 실행되는 지, 워커 스레드에서 실행되는 지 구분
메인 스레드에서는 new Worker를 통해 현재 파일을 워커 스레드에서 실행시킴
worker.postMessege 로 부모에서 워커로 데이터 보냄
parentPort.on('messeage')로 부모로부터 데이터를 받고 postMessege로 데이터를 보냄
이러한 멀티 스레드는 메인이 되어서는 안됨
사용할 수 있게만 해둔 것임
const { Worker, isMainThread, parentPort } = require('worker_threads'); //worker threads를 불러온다.

if(isMainThread) { //메인 스레드 - 분기처리 
    const worker = new Worker(__filename);//파일의 경로를 Worker() 안에 넣어준다. 
    worker.on('messege', (value) => console.log('워커로부터',value));
    worker.on('exit', () => console.log('워커 끝~'));
    worker.postMessage('ping');
}else{ //워커 스레드 - 분기처리 (같은 파일)
    parentPort.on('messege', (value) => {
        console.log('부모로부터', value);
        parentPort.postMessage('pong');
        parentPort.close();
    });
}
//8.1.0 현재버전 8이라 멀티 스레드 안됨
//14 버전 이후 라면?
/*
부모로부터 ping
워커로부터 pong
워커 끝~ 
*/
3-11 child process(당장 멀티쓰레드 구현할 일이 없음)
멀티 쓰레드를 할 때 왠만하면 node를 피하는 것이 좋다
그렇다면 어떻게 해야하는가?
다른 언어 호출...
3-12 파일 시스템 사용하기
fs 
파일 시스템에 접근하는 모듈 
해커가 읽어가지 않도록 조심하자
 
c. 콜백헬 방지 프로미시스 ( 제로초는 이걸 많이 쓴다 ) 

![image.png](attachment:e8f17f31-a43e-466e-9500-27254be9e95e:image.png)


당장 X
3-13 버퍼와 스트림 이해하기
3-14 pipe와 스트림 메모리 효율 확인
3-15 스레드풀과 커스텀 이벤트
3-16 에러처리하기




4️⃣ 장
4-1 HTTP 서버 만들기
server.js
const http = require('http');

//http라는 모듈을 사용해서 코드를 작성하면 노드 프로그램을 돌릴 수 있음.
//http 요청에 응답하는 노드 서버 -> createServer로 요청 이벤트에 대기  

//비동기에도 에러가 날 수 있기 때문에 
const server  = http.createServer((req, res) => {
    //어떻게 응답할 지 적는 공간
    //html처럼 보낼 수 있다.
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello Deepsea</p>');
    //스트림이기 때문에 write써주다가 마지막에 end
})
    //서버도 프로그램
    //프로세스를 올려야한다.

    //이때 포트 하나를 잡아먹는다.

    //8080 포트를 잡아먹게 할것이다. 

    //listen에 대한 콜백
    //8080과 연결이 되었다면 
    .listen(8080);/* () => {
        console.log('8080번 서버에서 대기 중입니다.'); //이 부분이 실행 
    }*/ //요 콜백을 뺄 수도 있어요.

        //listen 을 하는 경우 -> 서버를 실행하는 경우
        //터미널 하나를 잡아먹는다. 그 터미널은 8080번 포트와 연결이 된다.
        //즉 다른 일을 하지 못한다. 

//예외처리 
server.on('listening',  () => {
    console.log('8080번 서버에서 대기 중입니다.');
});
server.on('error', (error) => {
    console.error(error);
    console.log('에러인건가요');
});

/*
C:\deepsea\study\node\chat-app\bin>node server
Error: listen EADDRINUSE: address already in use :::8080
    at Server.setupListenHandle [as _listen2] (node:net:1334:16)
    at listenInCluster (node:net:1382:12)
    at Server.listen (node:net:1469:7)
    at Object.<anonymous> (C:\deepsea\study\node\chat-app\bin\server.js:21:6)
    at Module._compile (node:internal/modules/cjs/loader:1101:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'EADDRINUSE',
  errno: -4091,
  syscall: 'listen',
  address: '::',
  port: 8080
}
에러인건가요
*/
//주의 서버 코드 수정 시 껐다가 키는 것!

//포트 죽이면 잘 실행 된다. 
/*
C:\deepsea\study\node\chat-app\bin>node server
8080번 서버에서 대기 중입니다.
*/
서버 껐다 키는 법
cmd - netstat -ano
에러뜨는 포트번호의 PID 를 찾는다.
작업관리자 - 세부정보 - PID에 해당하는 작업 끝내기
다시 경로에서 node 파일명 하면 잘 실행된다.
우리가 알고 있는 모든 사이트는 포트가 존재한다.
https://www.naver.com:443 → https 는 443 으로, 생략가능
http://www.a-ha.io:80 → http 는 80 으로, 생략 가능
localhost의 포트번호는 생략 불가
localhost는 개인용 서버
포트의 좋은 점
도메인은 구입해야 한다.
도메인은 같되, 하나의 호스트에다가 포트번호만 다르게 하면 여러 프로그램을 동시에 연결할 수있다.
비동기는 에러처리한다.
코드를 수정했으면 항상 서버를 껐다가 다시 켜야한다.
4-2 fs로 HTML 읽어 제공하기
const http = require('http');

const server  = http.createServer((req, res) => {
        console.log('For safari');
        res.writeHead(200, {'Content-Type' : 'text/html; chatset=utf-8' });   
    res.write('<h1>Hello Node</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello Deepsea</p>');
})
      .listen(8080);/* () => {
        console.log('8080번 서버에서 대기 중입니다.'); //이 부분이 실행 
server.on('listening',  () => {
    console.log('8080번 서버에서 대기 중입니다.');
});

server.on('error', (error) => {
    console.error(error);
    console.log('에러인건가요');
});
safari 의 경우 write 의 문자열이 html인지 문자열인지 모른다.
res.writeHead(200, {'Content-Type' : 'text/html; chatset=utf-8' }); 을 적어서 html과 일반 문자열을 구분할 수 있도록 해줘야 한다.
보통 80번 포트는 많이 잡혀있어서 8080으로 많이들 한다.
80으로 잡힐 경우, localhost 로만 주소를 쳐줘도 접속이 된다.
서버 하나에 포트 하나 잡아먹으면 여러개 띄울 수도 있다.
  const http = require('http');

  //http라는 모듈을 사용해서 코드를 작성하면 노드 프로그램을 돌릴 수 있음.
  //http 요청에 응답하는 노드 서버 -> createServer로 요청 이벤트에 대기  

  //비동기에도 에러가 날 수 있기 때문에 
  const server  = http.createServer((req, res) => {
      //어떻게 응답할 지 적는 공간

      //html처럼 보낼 수 있다.

      console.log('For safari');
      res.writeHead(200, {'Content-Type' : 'text/html; chatset=utf-8' });   
      res.write('<h1>Hello Node</h1>');
      res.write('<p>Hello Server</p>');
      res.end('<p>Hello Deepsea</p>');
      //스트림이기 때문에 write써주다가 마지막에 end
  })
      //서버도 프로그램
      //프로세스를 올려야한다.
      //이때 포트 하나를 잡아먹는다.
      //8080 포트를 잡아먹게 할것이다. 
      //listen에 대한 콜백
      //8080과 연결이 되었다면 
      .listen(80);/* () => {
          console.log('8080번 서버에서 대기 중입니다.');
      }*/ //요 콜백을 뺄 수도 있어요.

  //--------------------------------------
  const server2  = http.createServer((req, res) => {
      console.log('For safari');
      res.writeHead(200, {'Content-Type' : 'text/html; chatset=utf-8' });   
  res.write('<h1>Hello Node2</h1>');
  res.write('<p>Hello Server2</p>');
  res.end('<p>Hello Deepsea2</p>');
  })
    .listen(7080);

  //예외처리 
  server.on('listening',  () => {
      console.log('8080번 서버에서 대기 중입니다.');
  });
  server.on('error', (error) => {
      console.error(error);
      console.log('에러인건가요');
  });
  //주의 서버 코드 수정 시 껐다가 키는 것!
기존 포트 80

새로운 포트 70804-3 RESTful API 서버 만들기 

그런데 res.write 또는 res.writeHead안에 html을 보내기는 비효율적, 지저분
  → html 파일을 따로 만든다.
그래서 html파일 따로, js 파일 따로 만든다.
  → fs로 파일을 불러오는 방법을 배웠으니 
fs를 promises화 해주고,
기존 있던 함수를 async로 바꿔주고, 
end를 작성해주면서 코드가 깔끔해졌다.
마지막으로 예외처리를 해준다.
const http = require('http');
//fs로 파일 읽는 것 배웠으니까 1
const fs = require('fs').promises;
//fs로 파일 읽는 것 배웠으니까 2 
//const server  = http.createServer((req, res) => {
const server = http.createServer(async (req, res) => {
  res.writeHead(200, {'Content-Type' : 'text/html; chatset=utf-8' });   
  const data = await fs.readFile('./server2.html');
  res.end(data);

})
  .listen(8080);

//예외처리 
server.on('listening',  () => {
  console.log('8080번 서버에서 대기 중입니다.');
});
server.on('error', (error) => {
  console.error(error);
  console.log('에러인건가요');
});
//주의 서버 코드 수정 시 껐다가 키는 것!
4-3 REST API 서버 만들기
서버에 요청을 보낼 때는 요청의 내용을 표현
서버가 이해하기 쉬운 주소를 쓰자!
REST API(Represental State Transfer) - 주소 정하는 규칙, 아키텍쳐
주소만 보고 요청을 알 수 있도록 구조화한 것 → 규칙을 찾기 쉽다 → 해킹에 악용할 가능성도 있다
서버의 자원을 정의 후 자원에 대한 주소를 지정하는 방법
HTTP 요청 메서드
GET(요청), POST(등록), PUT(수정-1), PATCH(수정-2), DELETE(삭제)...
PUT - 전체수정, PATCH -  부분수정
Restful - REST API를 사용한 주소 체계를 이용하는 서버
실습
깃허브에 따라 5개 파일을 만들었음
새로고침도 get/ 요청이다.
요청에 대한 데이터들이 이렇게 많이 주고받고 하는 구나 를 알 수 있음

4-4 POST, PUT, DELETE 요청 보내기
http 상태코드 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
200 성공
201 성공적으로 created
400 - 클라이언트에 오류가 있음
500 - 서버에 오류가 있음
요청을 보내보면 다음과 같다.

4-5 쿠키 이해하기
쿠키란
쿠키서버 만들기
writeHead : 요청 헤더에 입력하는 메서드
Set-cookie : 브라우저에게 쿠키를 설정하라고 명령
쿠키는 k, v
http 메시지
http 요청과 응답은 헤더와 바디가 있다.
헤더 : 요청과 응답에 대한 정보 → 쿠키는 부가적 정보기에 헤더에 저장
바디 : 실제 주고받는 데이터
브라우저를 끄지 않는 한 8083으로 들어온 반복되는 요청에 대해 브라우저는 쿠키를 알아서 서버로 보낸다

쿠키 시간이 지나고 로그인이 풀린다.
쿠키에는 옵션이 많다.
expires
max-ages
4-6 세션 사용하기
쿠키는 노출되고 수정되는 위험이 있다.
세션 사용 시 쿠키와 다르게 해커들이 알 수 없는 k,v값이 아닌

4-7  https, http2
보안이라 스킵
4-8 cluster
보안이라 스킵
5️⃣ 장
5-1 package.json
npm 이란? 
노드의 패키지 매니저 
package.json이란?
현재 프로젝트에 대한 정보와 사용 중인 패키지에 대한 정보를 담은 파일 
노드 프로젝트 시작 전 npm init을 통해서 package.json부터 만들고 시작 
같은 패키지라도 버전에 따라 기능이 다르므로 버전을 기록해야함
버전은 참 중요하다! 
직접 package.json을 만들어도 된다(npm init이 아니라)
5-2 node_module과 npx, SemVer
node_module은 무겁다.
그래서 배포할 때 지우고 배포한다.
node i rimraf -D : 지우는 명령어
npm rimraf node_modules (를 써주면 package.json에 기록된다.)
package.json 기록되지 않는 dependency에 기록되지 않는 것들 주의
5-3 npm 명령어들 알아보기
SemVer 버저닝 
노드 패키지의 버전은 SemVer(유의적 버저닝) 방식을 따름
Major, Minor, Patch
5-4 npm 명령어
https://docs.npmjs.com/cli/v8/commands
제로초가 알려주는 명령어 모음
npm outdated : 어떤 패키지에 기능변화가 생겼는 지
npm uninstall : 패키지 삭제
npm search 검색어 : npmjs.com 에서 검색하는 결과와 같이 나옴 
npm info 패키지명
npm adduser : npm 에 로그인을 하기 위한 명령어
npm whoami : 현재 사용자가 누구인지 알려줌
npm logout : 로그인한 계정을 로그아웃
npm version : package.json 버전을 올림 → 깃 커밋이 되기 때문에 편리하다.
npm deprecate : 패키지를 설치할 때 경고 메시지를 띄우게 함 ( 오류가 있는 패키지에 적용 ) 
npm publish : 자신이 만든 패키지 배포
1. 
npm unpublish : "" 배포 취소 (배포 72시간 내에만 가능)
6️⃣ 장
6-1 익스프레스 프로젝트 시작하기
express 프로젝트명 —view = ejs 혹은 npm i 를 해줘야 node_modules 같은게 생긴다.
수동으로 만든 폴더에 npm i를 했었는데 package.lock.json 파일만 생성되고 폴더가 삭제되지 않는 진귀한 광경이 펼쳐졌다.
VSCode를 껐다 키니 삭제가 잘 되었다.
VSCode 내의 버그인 듯,,,
nodemon app 시에 오류가 발생한다 → 해결못하고 있다
파일이 바뀔 시에 서버를 껐다 키는걸 알아서 프로젝트 폴더에 파일이 바뀌는 지 검사해서 알아서 재시작을 해준다.
About to write to C:\deepsea\study\node\ch6\6.1\package.json:

{
  "name": "learn-express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "hjsim",
  "license": "MIT"
}

Is this OK? (yes) yes

C:\deepsea\study\node\ch6\6.1>cd .. 

C:\deepsea\study\node\ch6>express expressServer --view=ejs

   create : expressServer\
   create : expressServer\public\
   create : expressServer\public\javascripts\
   create : expressServer\public\images\
   create : expressServer\public\stylesheets\
   create : expressServer\public\stylesheets\style.css
   create : expressServer\routes\
   create : expressServer\routes\index.js
   create : expressServer\routes\users.js
   create : expressServer\views\
   create : expressServer\views\error.ejs
   create : expressServer\views\index.ejs
   create : expressServer\app.js
   create : expressServer\package.json
   create : expressServer\bin\
   create : expressServer\bin\www

   change directory:
     > cd expressServer

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=expressserver:* & npm start

C:\deepsea\study\node\ch6>cd 6.1

C:\deepsea\study\node\ch6\6.1>npm i

added 50 packages, and audited 51 packages in 1s

found 0 vulnerabilities

C:\deepsea\study\node\ch6\6.1>node app
node:internal/modules/cjs/loader:936
  throw err;
  ^

Error: Cannot find module 'C:\deepsea\study\node\ch6\6.1\app'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

C:\deepseapsea\study\node\ch6\6.1>node app
node:internal/modules/cjs/loader:936
  throw err;
  ^

Error: Cannot find module 'C:\deepsea\study\node\ch6\6.1\app'
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

C:\deepsea\study\node\ch6\6.1>node app
익스프레스 서버 실행 
^C
C:\deepsea\study\node\ch6\6.1>^X^X^X^X^X^X^X^X
''은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>

C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>node app
익스프레스 서버 실행 
^C
C:\deepseapsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>

 오후 5:23:15에 2021. 11. 22.에서 복원된 세션 콘텐츠 

Microsoft Windows [Version 10.0.19041.1348]
(c) Microsoft Corporation. All rights reserved.

C:\deepsea\study\node>cd ch5

C:\deepsea\study\node\ch5>cd 6.1
지정된 경로를 찾을 수 없습니다.

C:\deepsea\study\node\ch5>cd ..

C:\deepsea\study\node>cd6
'cd6'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node>cd ch6

C:\deepsea\study\node\ch6>cd 6.1

C:\deepsea\study\node\ch6\6.1>node app
익스프레스 서버 실행 
^C
C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>node app
익스프레스 서버 실행 
^C
C:\deepsea\study\node\ch6\6.1>cd ..

C:\deepsea\study\node\ch6>npm run clean
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path C:\deepsea\study\node\ch6/package.json
npm ERR! errno -4058
npm ERR! enoent ENOENT: no such file or directory, open 'C:\deepsea\study\node\ch6\package.json'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\hjsim\AppData\Local\npm-cache\_logs\2021-11-22T08_27_54_454Z-debug.log

C:\deepsea\study\node\ch6>cd 6.1

C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>npm outdated

C:\deepsea\study\node\ch6\6.1>npm ls nodemon
learn-express@0.0.1 C:\deepsea\study\node\ch6\6.1
└── (empty)

C:\deepsea\study\node\ch6\6.1>npm install nodemon

added 116 packages, and audited 167 packages in 5s

15 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>npm fund
learn-express@0.0.1
└─┬ https://opencollective.com/nodemon
  │ └── nodemon@2.0.15
  ├─┬ https://github.com/yeoman/update-notifier?sponsor=1
  │ │ └── update-notifier@5.1.0
  │ ├─┬ https://github.com/sponsors/sindresorhus
  │ │ │ └── boxen@5.1.2, camelcase@6.2.1, cli-boxes@2.2.1, type-fest@0.20.2, is-installed-globally@0.4.0, global-dirs@3.0.0, is-npm@5.0.0, make-dir@3.1.0, get-stream@5.2.0
  │ │ └─┬ https://github.com/chalk/wrap-ansi?sponsor=1
  │ │   │ └── wrap-ansi@7.0.0
  │ │   └── https://github.com/chalk/ansi-styles?sponsor=1
  │ │       └── ansi-styles@4.3.0
  │ └── https://github.com/chalk/chalk?sponsor=1
  │     └── chalk@4.1.2
  └── https://github.com/sponsors/jonschlinkert
      └── picomatch@2.3.0

C:\deepsea\study\node\ch6\6.1>npm ls nodemon
learn-express@0.0.1 C:\deepsea\study\node\ch6\6.1
└── nodemon@2.0.15

C:\deepsea\study\node\ch6\6.1>node app
익스프레스 서버 실행 
^C
C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>npm run dev
npm ERR! Missing script: "dev"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\hjsim\AppData\Local\npm-cache\_logs\2021-11-22T08_41_20_138Z-debug.log

C:\deepsea\study\node\ch6\6.1>node app
익스프레스 서버 실행 
^C
C:\deepsea\study\node\ch6\6.1>nodemon app
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>npm run dev
npm ERR! Missing script: "dev"
npm ERR!
npm ERR! To see a list of scripts, run:
npm ERR!   npm run

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\hjsim\AppData\Local\npm-cache\_logs\2021-11-22T08_41_38_252Z-debug.log

C:\deepsea\study\node\ch6\6.1>nodemon -v
'nodemon'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.

C:\deepsea\study\node\ch6\6.1>npm install nodemon -g

added 116 packages, and audited 117 packages in 1s

15 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

C:\deepsea\study\node\ch6\6.1>nodemon -v
2.0.15

C:\deepsea\study\node\ch6\6.1>nodemon app
[nodemon] 2.0.15
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
익스프레스 서버 실행
→ 결국 if문을 쓰지 않아도 분기처리가 잘 되어있다. 
npm start == npm run start
6-2 자주 사용하는 미들웨어
중복 방지
6-1 app.js
const express = require('express'); //이걸 열어보면 내부에 http를 쓰고 있다. 

const app = express();

//일종의 전역변수 
app.set('port', process.env.PORT || 3000);

//request url과 와일드카드 
/*
주소를 나눠서 처리하면 코드가 깔끔해진다.
그렇지만 분리 시 공통적인 코드의 경우에 중복이 발생한다.
그래서 미들웨어가 나왔다. use()
*/

//(req 부터 next(); 까지 미들웨어 이며, use에 장착을 한 것이다. 

app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요');
    next(); // 이거를 안써주면 다음거로 넘어가지 않는다.
})

//get, post 이런거 하나하나 메서드와 주소가 있는 애들 다 라우터 

//res.send~ 도 미들웨어 이다.
app.get('/category/:name', (req, res) => {
//    res.send('hello ${req.params.name}');
    res.send('hello wildcard');

});

app.post('/category/Javascript', (req, res) => {
    res.send('hello express');
}); 

app.get('/abouta', (req, res) => {
    res.send('hello express');
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행 ');
});
이렇기 때무에 모든 와일드카드는 아래에 있어야 한다.
app.get('*', ~) 같은 범위가 넓은 애들도 아래에 있어야 한다.
에러 발생 시 - 익스프레스는 에러가 발생하면 알아서 에러 화면을 띄워준다.
위치도 친절하게 알려준다.
1 요청에 실행하고 싶어요
Error: 에러가 났어요
    at C:\deepsea\study\node\ch6\6.1\app.js:19:11
    at Layer.handle [as handle_request] (C:\deepsea\study\node\ch6\6.1\node_modules\express\lib\router\layer.js:95:5)
    at trim_prefix (C:\deepsea\study\node\ch6\6.1\node_modules\express\lib\router\index.js:317:13)
    at C:\deepsea\study\node\ch6\6.1\node_modules\express\lib\router\index.js:284:7
    at Function.process_params (C:\DEEPSEA\study\node\ch6\6.1\node_modules\express\lib\router\index.js:335:12)
    at next (C:\deepsea\study\node\ch6\6.1\node_modules\express\lib\router\index.js:275:10)
    at C:\deepsea\study\node\ch6\6.1\app.js:17:5
    at Layer.handle [as handle_request] (C:\deepsea\study\node\ch6\6.1\node_modules\express\lib\router\layer.js:95:5)
    at trim_prefix (C:\deepsea\study\node\ch6\6.1\node_modules\express\lib\router\index.js:317:13)
    at C:\deepsea\study\node\ch6\6.1\node_modules\express\lib\router\index.js:284:7
→ app.js 19번째줄 
그런데 이런 구조가 클라이언트에게 노출되면 안되기 때문에 에러 처리를 해준다.
미들웨어 사용하기
미들웨어 특성 이해하기
req, res, next를 매개변수로 가지는 함수




const express = require('express'); //이걸 열어보면 내부에 http를 쓰고 있다. 

const app = express();

//일종의 전역변수 
app.set('port', process.env.PORT || 3000);

//request url과 와일드카드 
/*
주소를 나눠서 처리하면 코드가 깔끔해진다.
그렇지만 분리 시 공통적인 코드의 경우에 중복이 발생한다.
그래서 미들웨어가 나왔다. use()
*/

app.use((req, res, next) => {
    console.log('1 요청에 실행하고 싶어요');
    next(); // 이거를 안써주면 다음거로 넘어가지 않는다.
}, (req, res, next) => {
    throw new Error('에러가 났어요');
})

//get, post 이런거 하나하나 메서드와 주소가 있는 애들 다 라우터 
//express의 req, res는 http의 req,res는 다르다.
//그러니 res.sendFile(path.join(__dirname, 'index.html')); 쓰지말고
//res.setHeader('Content-Type', 'text/html');
app.get('/category/:name', (req, res) => {
//res.send('hello ${req.params.name}');
    res.send('hello wildcard');
    //한 라우터에서 res.send, res.sendFile, res.json, re.writeHead 같이 쓰면 오류난다. 
    //Cannot set headers after they are sent to the client... 이 오류가 뜬다! 
    //한번 응답 보내고 끝났는데 또 보내려고 하니 에러가 뜨는 것 

});

app.get('/', (req, res) => {
    res.json({ hello : 'zerocho'});
    console.log('hello zerocho');
});

app.post('/category/Javascript', (req, res) => {
    res.send('hello express');
}); 

app.get('/abouta', (req, res) => {
    res.send('hello express');
    //res.send('에러났지롱. 근데 안알려주지롱');
    //이거 여기있으면 계속 로딩중만 뜨게된다. 
});
//res 뒤에 status(200)이 생략되어있다. 
//1) 에러처리 미들웨어-라우터 뒤에 404 처리하는 애 
app.use((req, res, next) => {
    res.status(200).send('404'); //즉 300인데도 404라고 뻥칠 수 있다. -> 해커들이 뭐가 잘못됐는 지 모르게 할 수 있다. 
});

//2) 에러처리 미들웨어-커스텀 에러 
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('에러났지롱. 근데 안알려주지롱');
    //500번대 조심하기
    //200번대를 많이 쓴다 
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행 ');
});
next 사용법
라우터 내 ? next를 호출해야 다음으로 넘어간다.
api 만들 때 res.json~ 사용하고
웹서버 만들 때는 res.sendFile~ 사용하고
에러
throw new→ 대놓고 에러
try - catch → 은근히 에러
여기 개치문에 next('err') 하면 에러처리 미들웨어로 간다.
next('route') 는 해당 라우터 뒤 코드 무시하고 바로 다음 라우터 찾는다.
next() 로 분기 처리도 할 수 있다 - if  문 
morgan, bodyParser, cookieParser
morgan
bodyParser
요청의 본문을 해석해주는 미들웨어
bodyParser 쓰면 옛날 사람!
static 미들웨어
express.static(path.join(__dirname, 'public')) 이어야 한다.
public?
미들웨어 간 순서도 중요하다.
정적 파일(요청경로와 실제경로가 달라 보안에 좋다)
express-session 미들웨어
세션 관리용 미들웨어
세션 쿠키에 대한 설정
세션 쿠키는 앞에 s%3A가 붙은 후 암호화되어 프론트에 전송
app.js
const express = require('express'); //이걸 열어보면 내부에 http를 쓰고 있다. 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

//일종의 전역변수 
app.set('port', process.env.PORT || 3000);

app.use('/', express.static(__dirname, 'public'));
app.use(morgan('dev'));
app.use(cookieParser('zerochopassword'));
app.use(session({
  reseve : false, //요청이 왔을 때 수정사항이 생기지 않아도 다시 저장할 지 여부 
  saveUninitialized : false,
  secret : 'zerochopassword',//쿠키암호화
  cookie : {//쿠키옵션
      httpOnly : true, //자바스크립트에 에러 안생기기 위해 
  }, //세션일 때 세션쿠키를 쓴다. 
  //name : 'connect.sid' //기본값 

}));

//이 패턴 잘 외워두세요 - 알아두면 익스프레스 개발이 쉬워진다.! <미들웨어 확장법>
app.use('/', (req, res, next)=>{
  if(req.session.id){ //내가 로그인 했다면 세션에 id가 있다면 아래를 실행하고~ 즉 express static으로 파일이나 사진을 볼 수 있게 할 것이고.  
      express.static(__dirname, 'public')
  }else{
      next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//let hello;
app.use((req, res, next) => {
 // hello = 'zerocho계좌비번'; // 진짜 큰일나요
 //app.set('hello', 'zerocho계좌비번'); // 이것도 큰일나
 req.session.data = 'zerocho비번';

})
app.get('/', (req, res, next) => {
  req.session.data //zerocho 비번 
  //req.session//뭐 일일이 넣어줄 필요 없다. 요청을 보낸 사람의 개인의 저장공간이 생기는 것임
  res.sendFile(path.join(__dirname, 'index.html'))//단 세션이 계쏙 저장된 상태

  //그래서 req.session.data 아니고 req.data 쓰는 것을 추천 - 요청 한 번만 할 때 

})

app.post('/', (req, res) => {
  res.send('hello express!');
})
app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행 ');
});
그러나... 오류가 뜬다... 나중에 수정...
```jsx
[nodemon] restarting due to changes...
[nodemon] starting node app.js
node:internal/modules/cjs/loader:936
throw err;
^
Error: Cannot find module 'cookie-parser'
Require stack:
C:\DEEPSEA\study\node\ch6\6.1\app.js
  at Function.Module._resolveFilename (node:internal/modules/cjs/loader:933:15)
  at Function.Module._load (node:internal/modules/cjs/loader:778:27)
  at Module.require (node:internal/modules/cjs/loader:1005:19)
  at require (node:internal/modules/cjs/helpers:102:18)
  at Object. (C:\DEEPSEA\study\node\ch6\6.1\app.js:2:22)
  at Module._compile (node:internal/modules/cjs/loader:1101:14)
  at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
  at Module.load (node:internal/modules/cjs/loader:981:32)
  at Function.Module._load (node:internal/modules/cjs/loader:822:12)
  at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12) {
code: 'MODULE_NOT_FOUND',
requireStack: [ 'C:\DEEPSEA\study\node\ch6\6.1\app.js' ]
}
[nodemon] app crashed - waiting for file changes before starting...





multer - 이미지 관련
일단스킵
dontenv(다댄브)
비밀키 관리
다댄브가 털리면 끝이다.
다댄브는 소스코드 관리하는 곳에 올리면 안된다.
깃헙안된다.
권한 별로 일반 직원에게 작은 권한 주고 관리자에게 모든 권한을 주며 관리자가 퇴사할 때 비밀번호를 바꾸는 과정이 필요하다.
다댄브 소스코드 하드코드 하지 않는 것이 1차 보안 → 다댄브로 분리하라
이러한 비밀키를 관리하기 위해서는 철저한 연구가 필요하다.
설치를 해준다.
C:\DEEPSEA\study\node\chat-app>npm i dotenv

added 1 package, and audited 56 packages in 665ms

found 0 vulnerabilities

C:\DEEPSEA\study\node\chat-app>
6-3 라우터 객체로 라우팅 분리하기
라우터가 수백개가 되면 보기가 안좋다.  → 코드도 길어진다.
그래서 분리해야 한다.
즉 라우터 분리 → 앞에 붙는 주소를 조심해야한다!!!!!!!
묶이는 애들끼리 분리해준다.
라우트 매개변수 
:id 로 넣으면 req.params.id 로 받을 수 있음
동적으로 변하는 부분을 라우트 매개변수로 만듬 
일반 라우터보다 뒤에 위치해야함
와일드카드가 앞에 있으면 뒤에 있는 건 실행이 안된다. 
/users/123?limit=5&skip=10 주소 요청인 경우
{id:'123'} {limit: '5', skip:''10}
404 미들웨어  - 요청과 일치하는 라우터가 없는 경우에 만들기 
라우터 그룹화 - 주소는 같지만 메서드가 다른 코드 
6-4 req , res 객체
1) req
req.app : req 객체를 통해 app 객체에 접근한다.
ex) req.app.get('port');
req.body : body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체
req.cookies : cookie-parser 미들웨어가 만ㅁ드는 요청의 쿠키를 해석한 객체
req.ip : 요청의 ip 주소가 담겨있다.
req.params : 라우트 매개변수에 대한 정보가 담긴 객체
req.query : 쿼리스트링에 대한 정보가 담긴 객체
req.signedCookies : 서명된 쿠키들은 req.cookies 대신 여기에 담겨있습니다.
req.get(헤더 이름)  : 헤더의 값을 가져오고 싶을 때 사용하는 메서드
2) res - 응답은 한번만 보낼 수 있다.
res.app
res.cookie
res.clearCookie
res.end
res.json(JSON)
res.redirect - 302
res.render
res.send
res.sendFile
res.set(Header)
res.status
메서드 체이닝을 지원한다.
res
.status(201)
.cookie('test', 'test')
.redirect('/admin');
이외 구글링
nvm(Node Version Manager)
node.js를 업데이트하기 위해 사용한다.
ex) node.js로 구현되는 프로그램 혹은 사이트를 볼 때 프로그램마다 다른 노드 버전을 지원하는 것을 경험하는데 이 때 nvm으로 쉽게 다른 버전의 노드를 설치한다.
npm(Node Package Manager)
자바스크립트 패키지 매니저
NodeJS에서 사용할 수 있는 모듈을 패키지화 하여 모아둔 저장소 역할을 한다.
설치/관리를 수행할 수 있는 CLI를 제공한다.
CLI(Command-line interface, 커맨드 라인 인터페이스) - 명령 줄 인터페이스, 가상 터미널 또는 터미널을 통해 사용자와 컴퓨터가 상호 작용하는 방식
Express
Node.js 를 이용하여 서버를 개발하고자 하는 개발자들을 위하여 서버를 쉽게 구성할 수 있게 만든 프레임워크

[Read more](https://velog.io/@deepsea/Book-node)