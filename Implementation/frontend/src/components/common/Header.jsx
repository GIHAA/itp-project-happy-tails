import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../services/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const onViewProfile = () => {
    navigate("/user");
  }



  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-primary">
      <div className="container flex flex-wrap items-center justify-start mx-auto ">
        <Link to="/" className="flex items-center"></Link>

        <div>
          <ul className="flex flex-col p-4 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li className="text-[15px] font-bold">
              <Link
                to="/"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
                aria-current="page"
              >
                Homepage
              </Link>
            </li>

            <li className="text-[15px] font-bold">
              <Link
                to="/shelterpet"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
              >
                Shelter pet
              </Link>
            </li>

            <li className="text-[15px] font-bold">
              <Link
                to="/adoptpet"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
              >
                Adopt pet
              </Link>
            </li>

            <li className="text-[15px] font-bold">
              <Link
                to="/events"
                className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
              >
                Events
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="hidden w-full md:block md:w-auto ml-auto"
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
            {user ? (
              // <li>
              //   <button className="btn" onClick={onLogout}>
              //     <FaSignOutAlt /> Logout
              //   </button>
              // </li>
              <div className="flex ">
                <div class="px-2 space-y-0.5 font-medium text-secondary text-[17px] text-left">
                  <button onClick={onViewProfile}>{user.name}</button><br/>
                  <button onClick={onLogout} class="text-sm font-light text-white">
                    Logout
                  </button>
                </div>
                <img
                  class="rounded-full w-9 h-9"
                  src={user.image}
                  alt="profile picture"
                />
              </div>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block py-2 pl-3 pr-4  text-secondary rounded hover:text-gray-800 md:bg-transparent md:p-0 "
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
