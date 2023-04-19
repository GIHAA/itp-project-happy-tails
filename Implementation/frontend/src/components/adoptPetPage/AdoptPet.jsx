import React from "react";
import Card from "./Card";

function Adoptpet() {
  const test = [
    {
      name: "name 1",
      des: "des 1",
      fee: "fee 1",
      breed: "DOG",
      gender: "male",
    },
    {
      name: "name 2",
      des: "des 2",
      fee: "fee 2",
      breed: "cat",
      gender: "male",
    },
    {
      name: "name 2",
      des: "des 2",
      fee: "fee 2",
      breed: "cat",
      gender: "male",
    },
    {
      name: "name 2",
      des: "des 2",
      fee: "fee 2",
      breed: "cat",
      gender: "male",
    },
    {},
  ];
  return (
    <>
      <div className="h-full overflow-y-scrollf bg-bgsec">
      {test.map((card, index) => (
        <Card
          key={index}
          name={card.name}
          des={card.des}
          fee={card.fee}
          breed={card.breed}
          gender={card.gender}
        />
      ))}
      </div>
    </>
  );
}

export default Adoptpet;
