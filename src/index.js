import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "react-toastify/dist/ReactToastify.min.css"


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '../src/pages/jobadverts/JobAdverts.css'
import "./components/menu/styles/Menu.css";
import "./pages/homepage/homePage.css";
import 'tailwindcss/tailwind.css';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
reportWebVitals();
