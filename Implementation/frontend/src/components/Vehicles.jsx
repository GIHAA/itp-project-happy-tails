import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/bgimg.jpg";
import axios from "axios";
import VSideBar from "./VSideBar";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Vehicle() {
  const [Vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/vehicle/")
      .then((res) => {
        setVehicles(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  
  function toggleAvailability(id, isAvailable) {
    axios.put(`http://localhost:8080/api/vehicle/${id}`, {status: isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'})
      .then(res => {
        setVehicles(prevVehicles => {
          return prevVehicles.map(vehicle => {
            if (vehicle._id === id) {
              return {...vehicle, status: isAvailable ? 'UNAVAILABLE' : 'AVAILABLE'}
            } else {
              return vehicle;
            }
          });
        });
      })
      .catch(err => alert(err))
  }
  
  




  function generatePDF() {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "Plate Number",
          "Driver ID",
          "Agent ID",
          "Vehicle Model",
          "Insurance Expiration Date",
        ],
      ],
      body: Vehicles.map((vehicle) => [
        vehicle.plateNo,
        vehicle.driverId,
        vehicle.agentId,
        vehicle.vModel,
        vehicle.insuranceExpirationDate,
      ]),
    });
    doc.save("All-vehicles-report.pdf");
  }

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

                    <thead className=" bg-[#FF9F00] text-white sticky top-0">
                        <tr>
                        <th className="p-3">Plate Number</th>
                        <th className="p-3">Vehicle Model</th>
                        <th className="p-3">Insurance Expiration Date</th>
                        <th className="p-3">Availability</th> 
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
               
                    }).map((vehicle) => (
                      <TableDataRow 
                          key={vehicle._id}
                          id={vehicle._id}
                          VehiclePlateNo={vehicle.plateNo}
                          VehicleVModel={vehicle.vModel}
                          VehicleInsuranceExpirationDate={vehicle.insuranceExpirationDate}
                          VehicleStatus={vehicle.status}
                          toggleAvailability={toggleAvailability}
                          isAvailable={vehicle.status === 'AVAILABLE'}
                    />

                    ))}


                  
                    </tbody>
                

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <button className="px-3 py-1 bg-[#1ab427] rounded-full" style={{ color: "white" }}
                              onClick={() => generatePDF()}>
                        Generate Report
                      </button>

                    </div>

                </div>

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
      
  );
}

function TableDataRow(props){
  

  return (
    <>
      <tr>
        <td className="p-3">{props.VehiclePlateNo}</td>
        <td className="p-3">{props.VehicleVModel}</td>
        <td className="p-3">{props.VehicleInsuranceExpirationDate}</td>
        <td className="p-3"><button
          onClick={() => props.toggleAvailability(props.id, props.isAvailable)}
          style={{ backgroundColor: props.isAvailable ? 'red' : 'green' }}
        >
          {props.isAvailable ? 'uav' : 'av'}
        </button></td>



        

      
        

        <td className="p-3">
          <button
            className="px-3 py-1 mr-5 bg-[#2E4960] rounded-full"
            style={{ color: "white" }}
          >
            <Link to={`/editvehicle/${props.id}`}>EDIT</Link>
          </button>

          <button
            className="px-3 py-1 bg-[#b41a1a] rounded-full "
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

  axios.delete(`http://localhost:8080/api/vehicle/${id}`)
  .then((res) => {
      alert("vehicle deleted")
  })
  .catch(err => alert(err))

}

