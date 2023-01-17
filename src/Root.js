import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./App.css";

function Root() {
  return (
    <div className="app_body">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Root;
