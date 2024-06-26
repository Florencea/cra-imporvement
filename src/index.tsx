import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  reportCLS,
  reportFCP,
  reportINP,
  reportLCP,
  reportTTFB,
} from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportCLS(console.log))
// or send to an analytics endpoint. Learn more: https://github.com/GoogleChrome/web-vitals
reportCLS();
reportFCP();
reportINP();
reportLCP();
reportTTFB();
