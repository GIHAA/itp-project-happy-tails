import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/bgimg.jpg";
import axios from "axios";
import VSideBar from "./VSideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Availabilities() {
  const [availabilities, setAvailabilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/availability/")
      .then((res) => {
        setAvailabilities(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  function generatePDF() {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Plate Number", "Reason", "Since", "To", "Availability"]],
      body: availabilities.map((availability) => [
        availability.plateNo,
        availability.reason,
        availability.since,
        availability.to,
        availability.status,
      ]),
    });
    doc.save("Maintenance-report.pdf");
  }

  console.log(availabilities);

  return (
    //Main container
    <div className="flex scroll-smooth">
      <VSideBar />
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            MAINTENANCE & AVAILABILITIES
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <Link
                to="/addavailability"
                className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
              >
                +ADD
              </Link>
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
                  <th className="p-3">Reason</th>
                  <th className="p-3">Since</th>
                  <th className="p-3">To</th>
                  <th className="p-3">Availabilities</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white text-center">
                {availabilities
                  .filter((val) => {
                    if (searchTerm == "") {
                      return val;
                    } else if (
                      val.plateNo
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((availability) => {
                    return (
                      <TableDataRow
                        id={availability._id}
                        AvailabilityPlateNumber={availability.plateNo}
                        AvailabilityReason={availability.reason}
                        AvailabilitySince={availability.since}
                        AvailabilityTo={availability.to}
                        AvailabilityStatus={availability.status}
                      />
                    );
                  })}
              </tbody>
            </table>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="px-3 py-1 bg-[#1ab427] rounded-full"
                style={{ color: "white" }}
                onClick={() => generatePDF()}
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}

function TableDataRow(props) {
  return (
    <>
      <tr>
        <td className="p-3">{props.AvailabilityPlateNumber}</td>
        <td className="p-3">{props.AvailabilityReason}</td>
        <td className="p-3">{props.AvailabilitySince}</td>
        <td className="p-3">{props.AvailabilityTo}</td>
        <td className="p-3">{props.AvailabilityStatus}</td>

        <td className="p-3">
          <button
            className="px-3 py-1 mr-5 bg-[#2E4960] rounded-full"
            style={{ color: "white" }}
          >
            <Link to={`/editavailability/${props.id}`}>EDIT</Link>
          </button>

          <button
            className="px-3 py-1 bg-[#b41a1a] rounded-full"
            style={{ color: "white" }}
            onClick={() => onDelete(props.id)}
          >
            DELETE
          </button>
        </td>
      </tr>
      <hr className="border-2" />
    </>
  );
}

function onDelete(id) {
  axios
    .delete(`http://localhost:8080/api/availability/${id}`)
    .then((res) => {
      alert("availability deleted");
    })
    .catch((err) => alert(err));
}
