import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddHealth() {
  const [petId, setPetId] = useState("");
  const param = useParams();
  const descri = param.des;
  const healthState = param.state;
  const [currentHealthStatus, setCurrentHealthStatus] = useState(healthState);
  const [description, setDes] = useState(descri);
  const [vaccinations, setVaccinations] = useState([]);
  const pid = param.id;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newDescription = description || "No description";

    const newreport = {
      petId,
      currentHealthStatus,
      description: newDescription,
      vaccinations,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/health/addvac/${pid}`,
        newreport
      );
      toast.success("Report saved successfully", {
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.href = `/petprofile/displayhealth/${pid}`;
      }, 1500);
    } catch (error) {
      console.log(error);
      alert("Failed to save report");
    }
  };

  const handleVaccinationChange = (index, event) => {
    const newVaccinations = [...vaccinations];
    newVaccinations[index][event.target.name] = event.target.value;
    setVaccinations(newVaccinations);
  };

  const handleAddVaccination = () => {
    setVaccinations([
      ...vaccinations,
      { name: "", dateGiven: "", expirationDate: "" },
    ]);
  };

  const handleRemoveVaccination = (index) => {
    const newVaccinations = [...vaccinations];
    newVaccinations.splice(index, 1);
    setVaccinations(newVaccinations);
  };

  return (
    <>
      <div className="absolute top-62 left-386 w-[900px] h-936 bg-[#2F333624] rounded-3xl  shadow-2xl ml-[29%] mt-[10%]">
        <h1 class="text-center text-3xl mt-5 font-bold">
          Inserting New Vaccination Record
        </h1>
        <form className="flex flex-col gap-4 p-8" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="petId"
              className=" mb-2 w-[89px] h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
            >
              Pet ID :
            </label>
            <input
              type="text"
              id="petId"
              name="petId"
              value={pid}
              onChange={(event) => setPetId(event.target.value)}
              className="py-2 px-3 w-[819px] h-[45px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your pet's ID"
            />

            <label
              htmlFor="pet-id"
              className="mt-2 mb-2 w-[89px] h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
            >
              Status:
            </label>

            <select
              name="currentHealthStatus"
              value={currentHealthStatus}
              onChange={(event) => setCurrentHealthStatus(event.target.value)}
              id="currentHealthStatus"
              class="py-2 px-3 w-[819px] h-[45px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option selected>{healthState}</option>
              <option value="Normal">Normal</option>
              <option value="Critical">Critical</option>
            </select>

            <label
              htmlFor="descri"
              className=" mb-2 w-[89px] mt-3 h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
            >
              Description :
            </label>
            <textarea
              id="descri"
              name="descri"
              value={description}
              onChange={(event) => setDes(event.target.value)}
              className="py-2 px-3 w-[819px] h-[85px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Description"
            ></textarea>
          </div>

          {vaccinations.map((vaccination, index) => (
            <div key={index} class="flex flex-row items-center space-x-10 ">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className=" mb-2 w-[89px] h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
                >
                  Vaccine :
                </label>
                <input
                  type="text"
                  name="name"
                  value={vaccination.name}
                  onChange={(event) => handleVaccinationChange(index, event)}
                  className="py-2 px-3 w-[300px] h-[45px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter Vaccination Name"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="dateGiven"
                  className=" mb-2 w-[100px] h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
                >
                  Date Given :
                </label>
                <input
                  type="date"
                  name="dateGiven"
                  value={vaccination.dateGiven}
                  onChange={(event) => handleVaccinationChange(index, event)}
                  className="py-2 px-3 w-[150px] h-[45px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your pet's ID"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="expirationDate"
                  className=" mb-2 w-[150px] h-[20px] left-[526px] top-[268px] font- not-italic font-[700] text-[16px] leading-[29px] text-black "
                >
                  Expiration Date:
                </label>
                <input
                  type="date"
                  name="expirationDate"
                  value={vaccination.expirationDate}
                  onChange={(event) => handleVaccinationChange(index, event)}
                  className="py-2 px-3 w-[150px] h-[45px] left-[671px] top-[265px]  mt-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your pet's ID"
                />
              </div>

              <button
                onClick={() => handleRemoveVaccination(index)}
                className="bg-red-600 rounded-[10px] mt-10 h-10 w-[90px] hover:bg-red-800 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
              >
                Remove
              </button>
            </div>
          ))}

          <div class="relative ml-[200px]">
            <button
              type="button"
              onClick={handleAddVaccination}
              className="bg-green-600 rounded-[10px] mt-5 h-10 w-[200px] m-auto hover:bg-green-700 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
            >
              ADD VACCINATION
            </button>
          </div>

          <div class="relative -mt-[76px] ml-[430px]">
            <button
              type="submit"
              className="bg-blue-600 rounded-[10px] mt-5 h-10 w-[200px] m-auto hover:bg-blue-700 text-white font-bold py-2 px-4 shadow focus:outline-none focus:shadow-outline"
            >
              SAVE RECORDS
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddHealth;
