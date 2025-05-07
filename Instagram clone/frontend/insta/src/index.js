// src/index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authContext"; // ✅ Auth Context
import { Provider } from "react-redux"; // ✅ Redux Provider
import { store, persistor } from "./redux/store"; // ✅ Redux Store with Persistor
import { PersistGate } from "redux-persist/integration/react"; // ✅ PersistGate

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
