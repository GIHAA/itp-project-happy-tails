import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import bookingServices from "../../services/api/booking";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

const Booking = (props) => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDescriptonModal, setShowDescriptonModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bookingServices.getAllBookings(user).then((res) => {
      setData(res);
    });

    setFormData((prevFormData) => ({
      ...prevFormData,
      token: user.token,
    }));
    setIsLoading(false);
  }, []);

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  const handleDescription = (booking) => {
    setSelectedBooking(booking);
    setShowDescriptonModal(true);
  };

  const handleDelete = (booking) => {
    const response = bookingServices.deleteBooking(formData);
    console.log(response);

    if (response) toast.success("Booking deleted successfully");
  };

  const handleMainInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      id: selectedBooking._id,
      token: user.token,
    }));
    console.log(formData);
  };

  const handleEditSubmit = async (e) => {
    const response = bookingServices.updateBooking(formData);
    setShowEditModal(false);
    if (response) toast.success("Booking updated successfully");
  };

  return (
    <div>
      <div className="w-full bg-bgsec  pb-[80px]">
        <div className=" mx-auto rounded-[20px] bg-[#FFBE52] p-16 flex h-[830px]  w-[1000px]">
          <div className="w-full ">
            <h1 className="text-center text-[20px] font-bold mb-5">
              My Bookings
            </h1>

            {isLoading ? ( 
        <Spinner />
      ) : (

            <table className="w-full bg-bgsec rounded-[10px]" id="myTable">
              <thead className="bg-secondary rounded-[10px] text-white">
                <tr className="h-[40px]">
                  <th className="w-[20%]">Booking ID</th>
                  <th className="">Number of pets</th>
                  <th className="">Start-date</th>
                  <th className="">End-date</th>
                  <th className="">status</th>
                  <th className="">Edit</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item._id}
                    className="h-[55px] border-[1px] border-gray-400"
                  >
                    <td onClick={() => handleDescription(item)}>{item.id}</td>
                    <td className="text-center">{item.petCount}</td>
                    <td className="text-center">
                      {item.startDate.substring(0, 10)}
                    </td>
                    <td className="text-center">
                      {item.endDate.substring(0, 10)}
                    </td>
                    <td className="text-center rounded-[100px] text-white">
                      <p className="bg-green-600 h-[27px] rounded-[30px]">
                        {item.status}
                      </p>
                    </td>
                    <td className="text-center">
                      {item.status === "BOOKED" ? (
                        <button onClick={() => handleEdit(item)}>Edit</button>
                      ) : (
                        <button></button>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        onFocus={() =>
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            id: item._id,
                          }))
                        }
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">Edit Booking Details</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="grid w-[500px] gap-5">
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  variant="outlined"
                  value={formData.description}
                  onChange={handleMainInputChange}
                />

                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  id="start"
                  value={new Date().toISOString().substr(0, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().substr(0, 10),
                  }}
                  onChange={handleMainInputChange}
                />

                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  id="start"
                  value={new Date().toISOString().substr(0, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    min: new Date().toISOString().substr(0, 10),
                  }}
                  onChange={handleMainInputChange}
                />
              </div>
            </form>
            <br />
            <div className="flex">
              <button onClick={() => setShowEditModal(false)}>Close</button>
              <button onClick={handleEditSubmit} className="ml-auto">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showDescriptonModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">
              Booking ID {selectedBooking.description}
            </h2>

            <button className="" onClick={() => setShowDescriptonModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
