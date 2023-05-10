import asynchandler from "express-async-handler";
import axios from "axios";

const API_URL = "http://localhost:8080/api/vet/";

const getAll = asynchandler(async (userData) => {
  const response = await axios.get(API_URL + "getallprofile", userData);

  return response.data;
});

const updateOne = asynchandler(async (userData) => {

  const response = await axios.put(
    API_URL + "bookedmarkStatusUpdate/" + userData.petId,
    userData,
    {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }
  );
  return response.data;
});

const deleteOne = asynchandler(async (userData) => {});

const adpotServices = {
  getAll,
  updateOne,
  deleteOne,
};

export default adpotServices;
