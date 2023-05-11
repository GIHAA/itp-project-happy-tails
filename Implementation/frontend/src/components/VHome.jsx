import axios from "axios";
import React, { useState, useEffect, PureComponent } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import VSidebar from "./VSideBar"
import { useSelector } from "react-redux";



export default function VHome() {

  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [unavailableCount, setUnavailableCount] = useState(0);
  const{user} = useSelector ((state) => state.auth);

  



  useEffect(() => {
    async function transportBookingCounts() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/transport/count",{
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setPendingCount(response.data.pendingCount);
        setAcceptedCount(response.data.acceptedCount);
        setRejectedCount(response.data.rejectedCount);

      } catch (err) {
        console.error(err);
      }
    }
    transportBookingCounts();
  }, []);
  

  const data = [
    { name: "Pending Requests", value: pendingCount },
    { name: "Accepted Requests", value: acceptedCount },
    { name: "Rejected Requests", value: rejectedCount },   
  ];

  const COLORS = ["#f55363", "#f57953", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  

  return (
  <div className="flex scroll-smooth"> 
      <VSidebar /> 
      
   
    <div className="bg-[#FFF7DC] flex-[85%]">


    <div className="bg-[#2E4960] h-40 w-full">
            <h1 style={{textAlign: 'center'}} className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">DASHBOARD OF VEHICLE MANAGEMENT</h1>

            <div className="flex"></div>
    </div>
      
      
      <div id="wrapper" class="ml-[250px] mt-[70px] px-4 py-4 mx-auto">
        <div class="sm:grid sm:h-32 mr-[50px] sm:grid-flow-row sm:gap-4 sm:grid-cols-5 ">
          <div
            id="jh-stats-positive"
            class="flex flex-col justify-center px-4 py-4  bg-gray-200 shadow-md border border-gray-300 rounded"
            style={{ width: "300px", marginRight: "200px" }}
          >
            <div>
              <div>
                <p class="flex items-center justify-end text-[#131313] text-md">
                  <span class="font-bold"></span>
                </p>
              </div>
              <p class="text-3xl font-semibold text-center text-gray-800">
                {pendingCount}
              </p>
              <p class="text-lg pt-2 text-center text-black-500">
                Pending Transport Requests
              </p>
            </div>
          </div>
  
          <div
            id="jh-stats-positive"
            class="flex flex-col justify-center px-4 py-4 bg-gray-200 shadow-md border border-gray-300 rounded"
            style={{ width: "300px", marginLeft: "100px", marginRight:"100px" }}
          >
            <div>
              <div>
                <p class="flex items-center justify-end text-green-500 text-md">
                  <span class="font-bold"></span>
                </p>
              </div>
              <p class="text-3xl font-semibold text-center text-gray-800">
                {acceptedCount}
              </p>
              <p class="text-lg text-center pt-2 text-black-500">
                Acceptted Transport Requests
              </p>
            </div>
          </div>

          <div
            id="jh-stats-positive"
            class="flex flex-col justify-center px-4 py-4 bg-gray-200 shadow-md border border-gray-300 rounded"
            style={{ width: "300px", marginLeft: "200px" }}
          >
            <div>
              <div>
                <p class="flex items-center justify-end text-green-500 text-md">
                  <span class="font-bold"></span>
                </p>
              </div>
              <p class="text-3xl font-semibold text-center text-gray-800">
                {rejectedCount}
              </p>
              <p class="text-lg text-center pt-2 text-black-500">
                Rejected Transport Requests
              </p>
            </div>
          </div>

        </div>
  
        <PieChart width={400} height={400} style={{marginLeft: "250px"}}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={150}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  </div>
  );
  
}