import React from "react";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Admin = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const chartData1 = {
    labels: [
      "Admin",
      "Event managers",
      "Iventory managers",
      "Vehicle managers",
      "grooming-equipments",
      "other",
    ],
    datasets: [
      {
        label: "Number of Datas",
        data: [
          // Data.filter(Data => Data.role === 'USER').length,
          Data.filter((Data) => Data.role === "ADMIN").length,
          Data.filter((Data) => Data.role === "EVENT_MANAGER").length,
          Data.filter((Data) => Data.role === "INVENTORY_MANAGER").length,
          Data.filter((Data) => Data.role === "VEHICLE_MANAGER").length,
          Data.filter((Data) => Data.role === "FINANCIAL_MANAGER").length,
          Data.filter((Data) => Data.role === "SUPPLIER_MANAGER").length,
        ],

        backgroundColor: [
          "#B9EDDD",
          "#F2E3DB",
          "#DDFFBB",
          "#B9E9FC",
          "#F3E8FF",
          "#E5D1FA",
          "#EDDBC7",
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      {/* <Header /> */}

      <div className="flex scroll-smooth">
        <SideBar />

        <div className=" flex-[85%]">
          <div className="bg-cover bg-center h-screen w-full fixed">
            <div className=" w-full h-full bg-white shadow-lg rounded-xl">
              <div className="flex flex-col items-center justify-center h-[80px] bg-[#2E4960]"></div>
              <div>
                <div className="flex scroll-smooth">
                  <div className=" flex-[85%]">
                    {/*Body Part*/}
                    <div className="bg-cover bg-center h-screen w-full fixed">
                      <div className=" bg-[#2E4960] flex place-content-around w-[85%]">
                        <h1 className=" text-center text-4xl text-slate-50 p-8">
                          EMPLOYEE MANAGEMENT DASHBOARD
                        </h1>
                      </div>

                      {/*White box*/}
                      <div
                        id="canvas"
                        className=" bg-[#ffffff] w-[85%] h-[100%] absolute overflow-scroll"
                      >
                        <div className="mt-4 ml-4">
                          <div className=" flex place-content-around h-[350px] mt-5">
                            {
                              <div className=" w-[900px] h-full bg-white p-20 shadow-lg rounded-xl">
                                <b>
                                  <h2>Data roles of Happy Tails</h2>
                                </b>
                                <br></br>
                                <Bar data={chartData1} options={options} />
                              </div>
                            }
                          </div>

                          <div className=" h-52"></div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/*Right Side container end*/}
                </div>{" "}
                //Main container end
              </div>
            </div>
          </div>

          <div className=" h-"></div>
        </div>
      </div>
    </>
  );
};

export default Admin;
