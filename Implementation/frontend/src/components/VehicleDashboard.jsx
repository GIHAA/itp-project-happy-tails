import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";
import { Chart as ChartJS } from "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const moment = require("moment");

const COLORS = ["#0088FE", "#00C49F"];

const VehicleDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transport/count")
      .then((response) => {
        const acceptedCount = response.data.filter(
          (request) => request.status === "ACCEPTED"
        ).length;
        const pendingCount = response.data.filter(
          (request) => request.status === "PENDING"
        ).length;
        setData([
          { name: "Accepted", value: acceptedCount },
          { name: "Pending", value: pendingCount },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h2>Transport Requests</h2>
      <div className="chart">
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default VehicleDashboard;
