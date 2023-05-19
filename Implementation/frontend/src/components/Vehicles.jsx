import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/bgimg.jpg";
import logo2 from "../assets/logo2.png";
import deleteImg from "../assets/delete.png";
import editImg from "../assets/edit.png";
import axios from "axios";
import VSideBar from "./VSideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function Vehicle() {
  const [Vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/vehicle/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const genarateReport = () => {
    const title = "All Vehicles";
    const doc = new jsPDF();
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    // Set document font and color
    doc.setFont("helvetica");
    doc.setTextColor("#000000");

    // Add title and date
    doc.setFontSize(24);
    doc.text(title, 20, 30);
    doc.setFontSize(12);
    doc.setTextColor("#999999");
    doc.text(`Generated on ${date}`, 20, 40);

    // Add logo and company details
    doc.addImage(logo2, "JPG", 20, 60, 40, 40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("Happy Tails", 70, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text("Tel: +94 11 234 5678", 70, 80);
    doc.text("Email: info@happytails.com", 70, 85);
    doc.text("Address: No 221/B, Peradeniya Road, Kandy", 70, 90);

    // Add table with data
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.autoTable({
      startY: 110,
      head: [
        [
          "Plate Number",
          "Vehicle Model",
          "Type of Fuel",
          "Insurance Expiration Date",
        ],
      ],
      body: Vehicles.map((vehicle) => [
        vehicle.plateNo,
        vehicle.vModel,
        vehicle.fuelType,
        vehicle.insuranceExpirationDate,
      ]),
      theme: "grid",
    });

    // Save the document
    doc.save("All Vehicles.pdf");
  };

  console.log(Vehicles);

  return (
    //Main container
    <div className="flex scroll-smooth">
      <VSideBar />
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            VEHICLES
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/addnvehicle"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                +ADD
              </Link>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="px-3 py-1 bg-[#1ab427] rounded-full"
                  style={{ color: "white" }}
                  onClick={() => genarateReport()}
                >
                  Generate Report
                </button>
              </div>
            </div>

            {/*Search*/}
            <div className="flex h-10 w-200 mt-3">
              <input
                type="text"
                className=" rounded-3xl py-2.5 px-5 w-[40vh] ml-[800px] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                placeholder="Search vehicle"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {/*Body Part*/}
        <div
          style={{ backgroundImage: `url(${bgimg})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          {/*White box*/}
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            {/*Table*/}
            <table className="mx-auto my-10 w-[1000px]">
              <thead className=" bg-[#FF9F00] text-white sticky top-0">
                <tr>
                  <th className="p-3">Plate Number</th>
                  <th className="p-3">Vehicle Model</th>
                  <th className="p-3">Type of Fuel</th>
                  <th className="p-3">Insurance Expiration Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {Vehicles.filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (
                    val.plateNo.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  } else if (
                    val.insuranceExpirationDate
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                }).map((vehicle) => {
                  return (
                    <TableDataRow
                      id={vehicle._id}
                      VehiclePlateNo={vehicle.plateNo}
                      VehicleVModel={vehicle.vModel}
                      VehicleFuelType={vehicle.fuelType}
                      VehicleInsuranceExpirationDate={
                        vehicle.insuranceExpirationDate
                      }
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ToastContainer />
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}

function TableDataRow(props) {
  return (
    <>
      <tr>
        <td className="p-3">{props.VehiclePlateNo}</td>
        <td className="p-3">{props.VehicleVModel}</td>
        <td className="p-3">{props.VehicleFuelType}</td>
        <td className="p-3">{props.VehicleInsuranceExpirationDate}</td>

        <td className="p-3">
          <div className="flex ml-12">
            <button
              className=" items-center px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
              style={{ color: "white" }}
            >
              <Link to={`/editvehicle/${props.id}`} className="flex">
                <img
                  src={editImg}
                  alt="editimage"
                  className="w-4 h-4 mr-2 mt-1"
                />
                EDIT
              </Link>
            </button>

            <button
              className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl "
              style={{ color: "white" }}
              onClick={() => onDelete(props.id)}
            >
              <img
                src={deleteImg}
                alt="deleteimage"
                className="w-4 h-4 mr-2 mt-1"
              />
              DELETE
            </button>
          </div>
        </td>
      </tr>
      <hr className="border-2" />
    </>
  );
}

function onDelete(id) {
  axios
    .delete(`http://localhost:8080/api/vehicle/${id}`)
    .then((res) => {
      toast.success("Vehicle record deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    })
    .catch((err) => alert(err));
}
