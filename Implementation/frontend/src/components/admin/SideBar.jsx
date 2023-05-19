import React from "react";
import logo from "../../assets/logo2.png";
import logoutImg from "../../assets/logout.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../../services/auth/authSlice";
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";

function InventorySideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const exportEmployee = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    const title = "Employee List Report ";
    const headers = [["Name", "Email", "Phone", "roles"]];
    const emp = data.map((Employee) => [
      Employee.name,
      Employee.email,
      Employee.phone,
      Employee.role,
    ]);
    let content = {
      startY: 50,
      head: headers,
      body: emp,
    };
    doc.setFontSize(20);
    doc.text(title, marginLeft, 40);
    require("jspdf-autotable");
    doc.autoTable(content);
    doc.save("Employee-list.pdf");
  };

  return (
    <div className=" bg-[#FF9F00] h-[100vh] flex-[15%] sticky top-0">
      <div className="mt-4">
        <img
          src={logo}
          alt="logo"
          className=" w-[100px] h-[100px] mx-auto object-contain"
        ></img>
        <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
          Employee management
        </h3>
      </div>

      <div className="my-6 ">
        <NavLink
          to="/"
          activeclassname="active"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employee"
          activeclassname="active"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >
          Employee
        </NavLink>

        <NavLink
          to="/feedback"
          activeclassname="active"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >
          Feedback
        </NavLink>

        <button
          onClick={exportEmployee}
          activeclassname=" bg-[#797979]"
          className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >
          Genarate Report
        </button>
      </div>

      <div className="">
        <button
          onClick={onLogout}
          className="flex items-center px-5 py-1 ml-12 mr-5 mt-[100px] bg-[#ffffff] text-[#2E4960] shadow-lg font-semibold hover:bg-[#818181] hover:text-white rounded-xl"
        >
          <img src={logoutImg} alt="Logout" className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default InventorySideBar;
