import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-2">
            <SideBar />
          </div>
          <main className="col-10">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
