import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import routerData from "./navigation";
import "./components/css/formikComp.css";
import { requestForToken } from "./services/firebase";
const App = () => {
  useEffect(() => {
    // Request permission to send notifications
    requestForToken();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {routerData.map((curElm) => (
          <Route key={curElm.id} path={curElm.path} element={curElm.element} />
        ))}
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
