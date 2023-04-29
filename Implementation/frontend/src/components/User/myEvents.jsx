import React from "react";
import temp from "../../assets/temp.jpg";

const Events = (props) => {
  return (
    <div>
      <div className="w-full bg-bgsec">
        <div className="max-w-2xl mx-auto bg-white p-16 flex">
          <div className="w-1/3  h-64">
            <img src={temp} className="rounded-[50%] border-bg border-[5px]" />
          </div>
          <div className="w-2/3  h-64"></div>
        </div>
      </div>
    </div>
  );
};

export default Events;
