import asynchandler from "express-async-handler";
import axios from "axios";

const API_URL = "http://localhost:8080/event/vet/";

const getAll = asynchandler(async (userData) => {
  const response = await axios.get(API_URL + "getEvents");

  return response.data;
});

const updateOne = asynchandler(async (userData) => {
  console.log(userData._id);
  const response = await axios.put(
    API_URL + "updateprofile/" + userData._id,
    userData,
    {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    }
  );
  return response.data;
});

const adpotServices = {
  getAll,
  updateOne,
};

export default adpotServices;
