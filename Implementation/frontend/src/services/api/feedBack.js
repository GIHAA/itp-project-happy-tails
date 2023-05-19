import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_API}api/feedback/`;

const view = async (userData) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const add = async (userData) => {
  const response = await axios.post(API_URL, userData, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const update = async (userData) => {
  const response = await axios.put(API_URL + userData._id, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const deletefeedback = async (userData) => {
  const response = await axios.delete(API_URL + userData._id, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  });

  return response.data;
};

const feedbackServices = {
  view,
  add,
  update,
  deletefeedback,
};

export default feedbackServices;
