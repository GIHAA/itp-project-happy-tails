import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bg from "../assets/Image.png";
import bg2 from "../assets/back2.png";
import { Link } from "react-router-dom";
import Home from "./Home";

function PortalHandler() {

  const { user } = useSelector((state) => state.auth);


  const renderPortals = (param) => {
    switch (param) {
      case 'USER':
        return <><Home/></>;
      case "EVENT_MANAGER":
        return <></>;
      case "SHELTER_MANAGER":
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <>
      {
        user ? renderPortals(user.role) : <Home/>
      }
    </>
  );
}

export default PortalHandler;
