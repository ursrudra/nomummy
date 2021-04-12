import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./hooks/useAuth";
import { StateProvider } from "./globalState/StateProvider";
import rootReducer from "./globalState/rootReducer";

const initialState = {
  theme: {
    primary: "green",
  },
  user: null,
  store: localStorage.getItem("store")
    ? JSON.parse(localStorage.getItem("store"))
    : [],
};

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <StateProvider initialState={initialState} reducer={rootReducer}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StateProvider>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
