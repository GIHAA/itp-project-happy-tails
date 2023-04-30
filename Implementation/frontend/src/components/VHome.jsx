import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import vhome from "../assets/vhome.jpg";

export default function Vehicle() {
  return (
    //Main container
    <div
      style={{ backgroundImage: `url(${vhome})` }}
      className="bg-cover bg-center h-screen w-full fixed"
    >
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            VEHICLE MANAGEMENT
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/vehicles"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                Vehicles
              </Link>

              <Link
                to="/availability"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                Maintenance
              </Link>

              <Link
                to="/pending"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                Bookings
              </Link>

              <Link
                to="/vbudget"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                Budget
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}
