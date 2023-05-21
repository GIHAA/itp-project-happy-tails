import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_API}api/userspets/`;

const view = async (userData) => {
  const response = await axios.get(API_URL + "update", userData, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const add = async (userData) => {
  const response = await axios.post(API_URL + "update", userData, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const update = async (userData) => {
  const response = await axios.post(API_URL + "update", userData, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const deleteup = async (userData) => {
  const response = await axios.post(API_URL + "update", userData, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const userpetservices = {
  view,
  add,
  update,
  deleteup,
};

export default userpetservices;
