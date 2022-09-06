/* @jsx createElement */
// react는 React.createElement로 디폴트로 변환해줌

import { render, createElement, Component } from "./react.js";

class YourTitle extends Component {
  render() {
    return <h1>클래스는 어떻게 할래?</h1>;
  }
}

function Title() {
  return (
    <div>
      <YourTitle />
      <h2>정말 동작할까?</h2>
      <p>잘 동작하는지 확인합니다.</p>
    </div>
  );
}

render(<Title />, document.getElementById("root"));
