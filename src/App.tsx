import { Outlet, Route, Router } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <div id="content" className="p-4">
        <Outlet />
      </div>
    </>
  );
}

export default App;
