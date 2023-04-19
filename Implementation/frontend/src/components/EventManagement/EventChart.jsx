import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventChart = () => {
  const [eventAmount, setEventAmount] = useState([]);
  const [event, setEvent] = useState([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/eventamount/geteamounts');
        console.log(res);
        setEventAmount(res.data.alleamount);
      } catch (err) {
        toast.error(err);
      }
    };
    const allEvents = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/event/getEvents');
        console.log(res.data.allevents);
        setEvent(res.data.allevents);
      } catch (err) {
        toast.error(err);
      }
    };
    getEvents();
    allEvents();
  }, []);

  const chartData = eventAmount.map(({ eventName, rate }) => ({ name: eventName, Rate: rate }));

  return (
    <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="Rate" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </div>
  );
};

export default EventChart;
