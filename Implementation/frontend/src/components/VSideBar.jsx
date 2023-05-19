import React from "react";
import logo from "../assets/logo.png";
import v from "../assets/v.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoutImg from "../assets/logout.png";
import { logout, reset } from "../services/auth/authSlice";

function VSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className=" bg-[#FF9F00] h-[100vh] flex-[15%] sticky top-0">
      <div>
        <img
          src={logo}
          alt="logo"
          className=" w-[150px] h-[100px] mx-auto"
        ></img>
        <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
          VEHICLE MANAGEMENT
        </h3>
      </div>

      <div className="my-6 ">
        <NavLink
          to="/vhome"
          activeClassName=" bg-[#797979]"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >
          HOME
        </NavLink>

        <NavLink
          to="/vehicles"
          activeClassName=" bg-[#797979]"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >
          VEHICLES
        </NavLink>

        <NavLink
          to="/availability"
          activeClassName=" bg-[#797979]"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >
          VEHICLE MAINTENANCE
        </NavLink>

        <NavLink
          to="/pending"
          activeClassName=" bg-[#797979]"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >
          BOOKING REQUESTS{" "}
        </NavLink>

        <NavLink
          to="/vbudgets"
          activeClassName=" bg-[#797979]"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >
          BUDGET REQUESTS{" "}
        </NavLink>
      </div>

      <div>
        <button
          onClick={onLogout}
          className="flex items-center px-5 py-1 ml-14 mr-5 mt-[150px] bg-[#ffffff] text-[#2E4960] shadow-lg font-semibold hover:bg-[#818181] hover:text-white rounded-xl"
        >
          <img src={logoutImg} alt="Logout" className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default VSideBar;
