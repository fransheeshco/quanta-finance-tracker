import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function NavBar() {
  return (
    <header className="relative z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="quanta-header mx-4">
            QUANTA
          </NavLink>
          <NavLink to="/about" className="mx-12">
            ABOUT
          </NavLink>
          <NavLink to="/contact" className="mx-4">
            CONTACT
          </NavLink>
        </div>
        <div className="flex items-center">
          <NavLink
            to="/login"
            className="border mx-4 p-5 w-[160px] flex justify-center items-center buttons-style rounded-full"
          >
            LOGIN
          </NavLink>
          <NavLink
            to="/signup"
            className="border mx-4 p-5 w-[160px] flex justify-center items-center buttons-style rounded-full"
          >
            GET STARTED
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
