import "./styles/theme.scss";
import "./styles/global.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./services/firebase";
import "./styles/theme.scss";
import { ConfigProvider } from "./contexts/ConfigContext";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
