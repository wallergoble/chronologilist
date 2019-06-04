import React from "react";
import ReactDOM from "react-dom";
import AsdfQwer from "./asdf-qwer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AsdfQwer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
