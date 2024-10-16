import React from "react";
import { Provider } from "react-redux";
import { store } from "../toolkit/Store";

export default function TU() {
  return (
    <div>
      <Provider store={store}></Provider>
    </div>
  );
}
