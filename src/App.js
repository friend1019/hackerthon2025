import React from "react";
import AppRouter from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop={false}
        theme="colored"
      />
      <AppRouter />
    </div>
  );
}

export default App;
