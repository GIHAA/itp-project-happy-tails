import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/bgimg.jpg";
import axios from "axios";
import VSideBar from "./VSideBar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";



export default function AddAvailability() {
  const [plateNo, setPlateNo] = useState("");
  const [reason, setReason] = useState("");
  const [since, setSince] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const{user} = useSelector ((state) => state.auth);


  function addAvailability(e) {
    e.preventDefault();

    
    axios
      .get(`http://localhost:8080/api/availability/${plateNo}`,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        if (response.data.length === 0) {
          addNewAvailability();
        } else {
          const hasDifferentStatus = response.data.some(
            (availability) => availability.status !== status
          );
          if (hasDifferentStatus) {
            toast.error(`Cannot insert!! ${plateNo} already exists with a different status!!`, { position: toast.POSITION.TOP_RIGHT });

            
          } else {
            addNewAvailability();
          }
        }
      })
      .catch((err) => {
        addNewAvailability();
      });
  }

  function addNewAvailability() {
    const newAvailability = {
      plateNo,
      reason,
      since,
      to,
      status,
    };

    axios
      .post("http://localhost:8080/api/availability/", newAvailability ,{
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        toast.success("Maintenance record added successfully", { position: toast.POSITION.TOP_RIGHT });

      })
      .catch((err) => {
        toast.error(`Maintenance record insert unsuccessful ${err}`, { position: toast.POSITION.TOP_RIGHT });
        
      });
      
      
  }
  

  return (
    //Main container
    <div className="flex scroll-smooth">
      <VSideBar />
      {/*Right Side container start*/}
      <div className="bg-[#d9d9d9] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            ADD AVAILABILTY
          </h1>

          <div className=" flex p-5">
            <Link
              to="/addavailability"
              className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
            >
              +ADD
            </Link>
          </div>
        </div>

        {/*Body Part*/}
        <div
          style={{ backgroundImage: `url(${bgimg})` }}
          className="bg-cover bg-center h-screen w-full fixed"
        >
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
            <div className="w-[800px] h-[400px] mx-auto rounded-2xl bg-white mt-8">
              <h1 className=" text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md">
                Enter Details
              </h1>

              <div className=" pl-5">
                <form className="mx-auto" onSubmit={addAvailability}>
                  <div className="flex mb-6">
                    <div>
                      <label className="">Plate Number :</label>
                      <input
                        type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setPlateNo(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div>
                      <label className="">Reason :</label>
                      <input
                        type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setReason(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex mb-6">
                    <div className=" w-[50%]  ">
                      <label className="">Since :</label>
                      <input
                        type="date"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setSince(e.target.value);
                        }}
                        required
                      />
                    </div>

                    <div className=" w-[50%]  ">
                      <label className="">To :</label>
                      <input
                        type="date"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setTo(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex mb-6">
                    <div className=" w-[50%]  ">
                    <label>Availability : (AVAILABLE or UNAVAILABLE)</label>
                      <input
                        type="text"
                        pattern="(AVAILABLE|UNAVAILABLE)"
                        title="Please enter either 'AVAILABLE' or 'UNAVAILABLE'"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>


                  <div className="flex mt-24 h-10">
                    <button className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[100px]">
                      <Link to="/availability">Cancel</Link>
                    </button>

                    <button
                      type="submit"
                      className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-5.5 text-center ml-[130px]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/*Right Side container end*/}
    </div> //Main container end
  );
}
