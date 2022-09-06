react babel만을 갖고 jsx => virtual Dom => real Dom에 추가하는 작업

src/react.js

Fn createElement
jsx => virtual Dom형태로 만들기 위해서 Built-in tag와 사용자 생성 Component를 obj 형식으로 반환

class 컴포넌트와
Fn 컴포넌트를 구분하기 위해 class 컴포넌트 위에 상위 클래스를 만들고 prototype instanceof 를 통해 확인 후 처리

virtual Dom =
{
tagName:div,
props:{}
children:[위의 구조 N번 반복],
}

virtual Dom => real Dom
src/react.js

Fn renderRealDOM
createElement을 통해 반환된 obj룰 재귀형식으로
$ = document.createElement(tagName) => 실제 엘리먼트
appendChild($) => 실제 엘리먼트 추가

Fn render
index.html에 만들어져 있던 #root 태그와 버츄얼 돔을 통해 생성한 실제 돔을 연결

\***\*\*\*\*\*\*\*** 리액트 훅 \***\*\*\*\*\*\*\***
class 컴포넌트는 인스턴스를 생성하고 유지하면서 그 안에서 상태관리나 라이프 사이클을 관리할 수 있음.
but Fn 컴포넌트는 특정 값을 기억하거나 라이프 사이클을 관리할 수 없음. 실제 => 결과니까.
일단 js 에서는 함수로 감싸서 closure를 통해서 관리하지만 react는 hook을 통해서 상태나 라이프 사이클을
관리하길 원함.

Fn Component + hook >= class Component

기존 클래스 컴포넌트가 가진 라이프 사이클의 모호함이나 다루기 까다로움 점을 해소해줌

(실제로는 리액트가 상태를 만들어주고 함수한테 제공해 주는 구조)

**\*** 리액트 훅(김민태님의 생각)
어차피 버츄얼 돔을 갖고 리얼 돔을 랜더링할 때 함수형 컴포넌트는 항상 순서가 똑같잖아. 그럼 어딘가에 상태 값을 저장해 놓고 해당하는 함수가 호출될 때 그 값을
넣어주면 될 거 아닌가?

**\***React open 문서에 hook
Fn안에서만 사용하고
Conditional안에는 훅을 절대 사용하지 마라!
항상 동일하게 랜더링되는 컴포넌트만

왜냐면 hook Fn와 ren Fn는 독립적인 관계임 그래서 컴포넌트의 갯수를 뭐가 뭔지 확인하는 과정을 갖기 때문.
=> 항상 18번째 의 함수 컴포넌트는 쟤야 ! 컨디셔널한 컴포넌트에서 훅을 사용해 버리면 index가 꼬여서 이상한 데이터가 다른 컴포넌트로 들어갈 수 있음.
