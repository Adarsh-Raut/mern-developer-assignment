import React from "react";
import ReactFlowPage from "./component/ReactFlowPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CreateUser from "./component/CreateUser";
import SignIn from "./component/SignIn";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/react-flow" element={<ReactFlowPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
