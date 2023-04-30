import React from "react";
import { content } from "../User/RegisterEvent.jsx";

const QRCodeContent = ({ content }) => {
  return (
    <div className="content">
      <p>{`Dear ${content.cusName},`}</p>
      <p>{`You have successfully registered for the ${content.eventName} event.`}</p>
      <p>{`Total = Ticket count * Price`}</p>
      <p>{`Total = ${content.noOfTicket} * ${content.dbprice}`}</p>
      <p>{`Total = ${content.total}`}</p>
      <p>{`Thank you.`}</p>
    </div>
  );
};

export default QRCodeContent;
