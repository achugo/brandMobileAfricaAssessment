import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
      <Route path="/" render={() => <App />} />
    </BrowserRouter>
  </Provider>,
  rootElement
);
