const hooks = [];

//  함수형 컴포넌트의 갯수
//  useState와 createElement는 서로 함수여도 독립적이야 근데 Fn Componenet가 실행될 때 useState가 실행되어야하는데
// 독립적이라 뭐가 뭔지 알 수가 없음.
// 그래서 함수형 컴포넌트의 수를 세는 변수가 필요함
// 다시 말하면 컴포넌트 갯수가 바뀌면 절대 hook을 사용할 수 없음.
let currentComponent = -1;
export class Component {}

export function useState(initValue) {
  const captioningComponent = currentComponent;
  //최초 호출이면 이니셜 값을 넣고 그게 아니면 패스
  //의사 코드임
  //만약 저 값이 0이면 다시 넣으니까 실제론
  // undefined
  if (!hooks[captioningComponent]) {
    hooks[captioningComponent] = initValue;
  }
  return [
    value,
    (nextValue) => {
      hooks[captioningComponent] = nextValue;
    },
  ];
}

function renderRealDOM(virtualDOM) {
  if (typeof virtualDOM === "string") {
    return document.createTextNode(virtualDOM);
  }
  if (virtualDOM === undefined) return;
  const $el = document.createElement(virtualDOM.tagName);
  virtualDOM.children.map(renderRealDOM).forEach((node) => {
    $el.appendChild(node);
  });
  return $el;
}

// 클로저를 만들어서 이전 virtualDom과 이후 virtaulDOM의 값들을 비교해서 업데이트 하기
export const render = (function () {
  let prevDom = null;
  return function (nextDOM, container) {
    console.log(nextDOM);
    if (prevDom === null) prevDom = nextDOM;
    //diff
    container.appendChild(renderRealDOM(nextDOM));
  };
})();

//virtual Dom을 만드는 역할!
// 자바스크립트 입장에선 클래스인지 함수인지 구별할 방법이 없다.
// 그래서 상위 클래스를 만들어서 상속받게 만들어서 prototype에 있는지 확인함.
// 왜 클래스 컴포넌트와 함수 컴포넌트의 상태를 관리하는 방법이 다른가를 알 수 있음
// 클래스 컴포넌트 같은 경우는 인스턴스를 한 번만 만들고 라이프사이클을 돌림.
// 함수 컴포넌트 같은 경우 React hook을 사용함.
export const createElement = (tagName, props, ...children) => {
  if (typeof tagName === "function") {
    if (tagName.prototype instanceof Component) {
      //class
      const instance = new tagName({ ...props, children });
      return instance.render();
    } else {
      //Fn
      currentComponent++;

      return tagName.apply(null, [props, ...children]);
    }
  }
  return { tagName, props, children };
};
