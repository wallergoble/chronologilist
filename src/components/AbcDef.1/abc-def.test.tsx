import React from "react";
import ReactDOM from "react-dom";
import AbcDef from "./abc-def";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AbcDef />, div);
  ReactDOM.unmountComponentAtNode(div);
});
