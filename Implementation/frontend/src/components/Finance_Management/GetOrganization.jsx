import React, { useState, useEffect } from "react";
import axios from "axios";
import AddOrganization from "./AddOrganization";

const GetOrganization = () => {
  const [orgnzData, setorgnzData] = useState([]);
  const [isError, setIsError] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const income = orgnzData.reduce(
    (total, { tran_amount }) => total + tran_amount,
    0
  );
  const newestOrganization = orgnzData[orgnzData.length - orgnzData.length];
  const amount = newestOrganization ? newestOrganization.tran_amount : 0;
  const balance = income - amount;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/organization")

      .then((response) => {
        setorgnzData(response.data);
      })

      .catch((error) => setIsError(error.message));
  }, []);

  const deleteOrganization = (id) => {
    axios
      .delete(`http://localhost:8080/api/organization/${id}`)
      .then((res) => {
        alert("Delete organization ?");

        refreshPage();
      })

      .catch((err) => {
        alert(err);
      });

    function refreshPage() {
      window.location.reload(false);
    }
  };

  const updateOrganization = (id, data) => {
    axios
      .put(`http://localhost:8080/api/organization/${id}`, data)
      .then((res) => {
        refreshPage();
      })
      .catch((err) => {
        alert(err);
      });

    function refreshPage() {
      window.location.reload(false);
    }
  };

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.onload = () => {
      const base64Image = btoa(reader.result);
      setorgnzData((prevData) => ({
        ...prevData,
        org_logo: base64Image,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    reader.readAsBinaryString(e.target.files[0]);
  }

  return (
    <>
      {isError !== "" && <h2>{isError}</h2>}

      <p class=" mt-24 flex ml-80 ">
        <button
          type="button"
          class="   my-12 border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add organization
        </button>
        {openModal && <AddOrganization closeModal={setOpenModal} />}
      </p>
      <div className="text-left ml-72 grid  grid-cols-1 gap-0 ">
        {/* {orgnzData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).reverse().map((data) => { */}

        {orgnzData.map((data) => {
          console.log(data);

          const {
            _id,
            org_name,
            org_place,
            org_email,
            org_type,
            org_amount,
            org_Resources,
            org_description,
            org_logo,
          } = data;

          // const imageUrl = `data:image/jpeg;base64,${org_logo}`;

          return (
            <div
              class=" flex items-stretch   h-30 font-medium text-gray-600 dark:text-gray-400 p-4 mt-2 border-solid border-2 mr-1 bg-gray-100 dark:bg-gray-800 border-sky-500 mb-3 ml-2 rounded-md"
              key={_id}
            >
              <div class=" w-40 items-center">
                <img src={`data:image/png;base64,${org_logo}`} />
              </div>

              <div class="px-12 ">
                <h2 class="text-xl">{org_name}</h2>
                <hr class="mt-4 mb-4"></hr>
                <p>Location : {org_place}</p>
                <p> Email : {org_email}</p>
                <p> Type : {org_type}</p>

                <p>Resources : {org_Resources}</p>
                <p>Description : {org_description}</p>
              </div>

              <br />
              <div class="ml-72 float-right mt-28">
                <button
                  class="border border-red-500 bg-red-500 text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => deleteOrganization(_id)}
                >
                  {" "}
                  Delete{" "}
                </button>
                <button
                  class="border-green-500 bg-green-500  text-white rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                  onClick={() => {
                    setSelectedData(data);
                    setShowUpdateForm(true);
                  }}
                >
                  {" "}
                  Update
                </button>
              </div>

              <div>
                {showUpdateForm && (
                  <div className="z-50 fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                    <form
                      className="w-3/6 font-medium text-gray-400 dark:text-gray-400 p-4 mt-2 border-solid border-2 mr-1 bg-gray-100 dark:bg-gray-800 border-sky-500 mb-3 ml-48 rounded-md "
                      onSubmit={(e) => {
                        e.preventDefault();

                        const data = {
                          // _id: e.target.id.value,

                          org_name: e.target.name.value,
                          org_place: e.target.place.value,
                          org_email: e.target.email.value,
                          org_type: e.target.type.value,

                          org_Resources: e.target.Resources.value,
                          org_description: e.target.description.value,
                          org_logo: e.target.logo.value,
                        };

                        updateOrganization(selectedData._id, data);
                      }}
                    >
                      <div key={selectedData?._id}>
                        <div>
                          <h2 className="text-4xl my-14 flex justify-center">
                            Update Organization Form
                          </h2>
                        </div>
                        <div class="mb-3 justify-center -mx-2 flex items-start">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Organization Name{" "}
                            <input
                              type="text"
                              name="name"
                              defaultValue={selectedData.org_name}
                              class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Location{" "}
                            <input
                              type="text"
                              name="place"
                              defaultValue={selectedData.org_place}
                              class="w-3/6 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <br />
                          {/* <select name="type" defaultValue={selectedData.tran_type} class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" id="tran_type">
                                                            <option value="INCOME">INCOME</option>
                                                            <option value="EXPENSE">EXPENSE</option>
                                                        </select> </label>{" "} <br /> */}
                        </div>

                        <div class="mb-3 justify-center ml-48 -mx-2 ">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Email{" "}
                            <input
                              type="email"
                              name="email"
                              defaultValue={selectedData.org_email}
                              class="w-3/6 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <div className=" mb-3 justify-center -mx-2 flex items-end ">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Organization Logo{" "}
                            <input
                              type="file"
                              name="logo"
                              // defaultValue={selectedData.org_logo}
                              onChange={convertToBase64}
                              class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <div className=" mb-3 justify-center -mx-2 flex items-end ">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Organization Type{" "}
                            <select
                              name="type"
                              defaultValue={selectedData.org_type}
                              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                              <option value="Regional">Regional</option>
                              <option value="Global">Global</option>
                            </select>{" "}
                          </label>{" "}
                          <br />
                          <br />
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Organization Resources{" "}
                            <select
                              name="Resources"
                              defaultValue={selectedData.org_Resources}
                              className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                              <option value="Small">Small</option>
                              <option value="Medium">Medium</option>
                              <option value="Large">Large</option>
                            </select>{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <div class="mb-3 justify-center ml-48 -mx-2 ">
                          <label class="font-medium text-sm mb-2 ml-1">
                            {" "}
                            Description{" "}
                            <input
                              type="text"
                              name="description"
                              defaultValue={selectedData.org_description}
                              class="w-3/6 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                            />{" "}
                          </label>{" "}
                          <br />
                        </div>

                        <div class="float-right">
                          <button
                            type="submit"
                            class=" border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                          >
                            Update Data
                          </button>
                          <button
                            onClick={() => setShowUpdateForm(false)}
                            class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                          >
                            {" "}
                            CLOSE
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GetOrganization;
