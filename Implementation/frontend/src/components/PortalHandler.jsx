import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import bg from "../assets/Image.png";
import bg2 from "../assets/back2.png";
import { Link } from "react-router-dom";
import Home from "./Home";
import FinaDashBoard from "./Finance_Management/FinaDashBoard";
import Dashboard from "./Animal_Management/Dashboard/Dashboard";
import InvDashboard from "./InvDashboard";
import EventDashboard from "./EventManagement/EventDashboard";
import SupplierList from "./SupplierList";
import VHome from "./VHome";
import Header from "./common/PortalHeader";
import PortalHeader from "./common/PortalHeader";
import FinaLeftBar from "./portals/FinaHeader_SB";
import EventPortal from "./portals/EventPortal";
import VetPortal from "./portals/VetPortal";
import Admin from "./admin/Admin";


function PortalHandler() {
  const { user } = useSelector((state) => state.auth);

  const renderPortals = (param) => {
    switch (param) {
      case "ADMIN":
        return (
          <>
            <Admin />
          </>
        );
      case "USER":
        return (
          <>
            <Home />
          </>
        );
      case "EVENT_MANAGER":
        return (
          <>
            <EventPortal />
            <EventDashboard />
          </>
        );
      case "INVENTORY_MANAGER":
        return (
          <>
            <InvDashboard />
          </>
        );
      case "VEHICLE_MANAGER":
        return (
          <>
            <VHome />{" "}
          </>
        );
      case "ANIMAL_MANAGER":
        return (
          <>
            <VetPortal />
            <Dashboard />{" "}
          </>
        );
      case "FINANCIAL_MANAGER":
        return (
          <>
            <PortalHeader />
            <FinaLeftBar />
            <FinaDashBoard />
          </>
        );
      case "SUPPLIER_MANAGER":
        return (
          <>
            <PortalHeader />
            <SupplierList />
          </>
        );
      case "":
        return (
          <>
            <Home />
          </>
        );
      default:
        return (
          <>
            <Home />
          </>
        );
    }
  };

  return <>{user ? renderPortals(user.role) : <Home />}</>;
}

export default PortalHandler;
