/* @jsx createElement */
// react는 React.createElement로 디폴트로 변환해줌
import { render, createElement, Component } from "./react.js";

class YourTitle extends Component {
  render() {
    return createElement("h1", null, "\uD074\uB798\uC2A4\uB294 \uC5B4\uB5BB\uAC8C \uD560\uB798?");
  }

}

function Title() {
  return createElement("div", null, createElement(YourTitle, null), createElement("h2", null, "\uC815\uB9D0 \uB3D9\uC791\uD560\uAE4C?"), createElement("p", null, "\uC798 \uB3D9\uC791\uD558\uB294\uC9C0 \uD655\uC778\uD569\uB2C8\uB2E4."));
}

render(createElement(Title, null), document.getElementById("root"));