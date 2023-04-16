import React from 'react';
import temp from "../../assets/temp.jpg";
import { useState, useEffect } from "react";
import axios from "axios";


const Events = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/items')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className="w-full bg-bgsec">
        <div className="max-w-2xl mx-auto bg-white p-16 flex">
          <div className="w-1/3  h-64">
            <img src={temp} className="rounded-[50%] border-bg border-[5px]" />
          </div>
          <div className="w-2/3  h-64 ">
            <h1>Events</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;