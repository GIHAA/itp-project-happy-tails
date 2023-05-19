import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import VSideBar from "./VSideBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export default function PendingBookings() {
  const [transports, setTransports] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}api/transport/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setTransports(
          res.data.map((transport) => ({
            ...transport,
            vehicleId: "",
            assigned: false,
          }))
        );
      })
      .catch((err) => alert(err));

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}api/vehicle/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setVehicles(
          res.data.filter((vehicle) => vehicle.status === "AVAILABLE")
        );
      })
      .catch((err) => alert(err));
  }, []);

  const handleAccept = (id, vehicleId) => {
    axios
      .put(
        `http://localhost:8080/api/transport/${id}`,
        {
          status: "ACCEPTED",
          vehicleId: vehicleId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        const updatedTransport = res.data;
        setTransports((prevState) => {
          const updatedTransports = prevState.map((transport) => {
            if (transport._id === id) {
              return updatedTransport;
            }
            return transport;
          });
          return updatedTransports;
        });
      })
      .catch((err) => alert(err));
  };

  console.log();

  const handleReject = (id, vehicleId) => {
    axios
      .put(
        `http://localhost:8080/api/transport/${id}`,
        {
          status: "REJECTED",
          vehicleId: vehicleId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        const updatedTransport = res.data;
        setTransports((prevState) => {
          const updatedTransports = prevState.map((transport) => {
            if (transport._id === id) {
              return updatedTransport;
            }
            return transport;
          });
          return updatedTransports;
        });
      })
      .catch((err) => alert(err));
  };

  const filterAccepted = () => {
    setTransports((prevState) => {
      const filteredTransports = prevState.filter(
        (transport) => transport.status === "ACCEPTED"
      );
      return filteredTransports;
    });
  };

  const filterRejected = () => {
    setTransports((prevState) => {
      const filteredTransports = prevState.filter(
        (transport) => transport.status === "REJECTED"
      );
      return filteredTransports;
    });
  };

  const filterPending = () => {
    setTransports((prevState) => {
      const filteredTransports = prevState.filter(
        (transport) => transport.status === "PENDING"
      );
      return filteredTransports;
    });
  };

  return (
    <div className="flex scroll-smooth">
      <VSideBar />

      {/*Right Side container start*/}
      <div className="bg-[#FFF7DC] flex-[85%]">
        {/*Header Part*/}
        <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">
            PENDING & ACCEPTED REQUESTS
          </h1>

          <div className="flex">
            <div className=" flex p-5">
              <button
                type="button"
                className="ml-2 bg-[#14b359] rounded-xl text-sm px-3 py-2 text-white hover:text-black hover:bg-gray-500"
                onClick={() => filterAccepted()}
              >
                Accepted
              </button>

              <button
                type="button"
                className="ml-9 bg-[#b31436] rounded-xl text-sm px-3 py-2 text-white hover:text-black hover:bg-gray-500"
                onClick={() => filterPending()}
              >
                Pending
              </button>

              <button
                type="button"
                className="ml-9 bg-[#000000] rounded-xl text-sm px-3 py-2 text-white hover:text-black hover:bg-gray-500"
                onClick={() => filterRejected()}
              >
                Rejected
              </button>
            </div>

            {/*Search*/}
            <div className="flex h-10 w-200 mt-3">
              <input
                type="text"
                className=" rounded-3xl py-2.5 px-5 w-[40vh] ml-[800px] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                placeholder="Search request"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div>
          {transports.length > 0 &&
            transports
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.userName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  val._id.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val;
                } else {
                  return null;
                }
              })
              .map((transport) => (
                <article
                  key={transport._id}
                  className="border w-2/4 mx-auto border-gray-400 rounded-lg md:p-4 bg-[#EFF0F6] sm:py-3 py-4 px-2 m-10"
                  style={{ borderRadius: "30px" }}
                  data-article-path="#"
                  data-content-user-id="112962"
                >
                  <div role="presentation">
                    <div>
                      <div className="m-2">
                        <div className="flex items-center">
                          <div>
                            <p>
                              {new Date(transport.date).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                            <p>{transport.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="pl-12 md:pl-10 xs:pl-10">
                        <h2 className="text-2xl font-bold mb-2  leading-7">
                          BOOKING ID : {transport._id}
                        </h2>
                        <br />
                        <div className="mb-2">
                          <span className="text-opacity-50">
                            <ul style={{ listStyleType: "none" }}>
                              <li style={{ display: "inline-block" }}>
                                <h4 className="text-ml font-bold mb-2  leading-7">
                                  Pick-up : {transport.plocation}
                                </h4>
                              </li>
                              <br></br>

                              <li style={{ display: "inline-block" }}>
                                <h4 className="text-ml font-bold mb-2  leading-7">
                                  Mail : {transport.email}
                                </h4>
                              </li>
                              <br></br>

                              <li style={{ display: "inline-block" }}>
                                <h4 className="text-ml font-bold mb-2  leading-7">
                                  Contact Number : {transport.phone}
                                </h4>
                              </li>
                              <br></br>
                            </ul>

                            <ul
                              style={{
                                listStyleType: "none",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              <li style={{ display: "inline-block" }}>
                                User Name : {transport.userName}
                              </li>

                              <li
                                style={{
                                  display: "inline-block",
                                  marginLeft: "40px",
                                }}
                              >
                                Number of pets : {transport.count}
                              </li>
                            </ul>
                            <br></br>
                          </span>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="ml-2 bg-[#FF9F00] rounded-xl text-sm px-3 py-2 text-white hover:text-black hover:bg-gray-500"
                            onClick={() => handleAccept(transport._id)}
                            disabled={
                              transport.status === "ACCEPTED" ||
                              transport.status === "REJECTED"
                            }
                          >
                            <span>
                              {transport.status === "ACCEPTED"
                                ? "ACCEPTED"
                                : "ACCEPT"}
                            </span>
                          </button>

                          <button
                            type="button"
                            className="ml-2 bg-[#2E4960] rounded-xl text-sm px-3 py-2 text-white hover:text-black hover:bg-gray-500"
                            onClick={() => handleReject(transport._id)}
                            disabled={
                              transport.status === "REJECTED" ||
                              transport.status === "ACCEPTED"
                            }
                          >
                            <span>
                              {transport.status === "REJECTED"
                                ? "REJECTED"
                                : "REJECT"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </div>
  );
}
