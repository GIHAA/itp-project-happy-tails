import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import bookingServices from "../../services/api/booking";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../common/Header";
import Footer from "../common/Footer";
import QRCode from "qrcode";

function ShelterPet() {
  const { user } = useSelector((state) => state.auth);

  const [pid, setPid] = useState(0);
  const [bid, setBid] = useState(0);
  const [total, setTotal] = useState(0);
  const [isDateValid, setIsDateValid] = useState(false);
  const [showaskTransportModal, setshowaskTransportModal] = useState(false);
  const [showTransportModal, setshowTransportModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeSrc, setQRCodeSrc] = useState("");

  const fetchPid = async () => {
    const result = await axios.post("http://localhost:8080/api/counter");
    setPid(result.data.count);
  };

  const fetchBid = async () => {
    const result = await axios.post("http://localhost:8080/api/counter");
    setBid(result.data.count);
  };

  const getid = () => {
    fetchPid();
    return pid;
  };

  useEffect(() => {
    fetchPid();
    fetchBid();
  }, []);

  const [formData, setFormData] = useState({
    cus_id: user._id,
    cus_name: user.name,
    bid,
    token: user.token,
    bid: 0,
    petCount: 1,
    mini: [{ name: "", description: "", type: "cat", pid: 0 }],
    contactNumbers: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    total,
  });

  const [tformData, settFormData] = useState({
    userName: user.name,
    date: new Date(),
    plocation: "",
    phone: "",
    time: "",
    email: user.email,
    count: 2
  });

  const handleSliderChange = (event) => {
    const { value } = event.target;
    const numMiniForms = parseInt(value);
    const miniForms = formData.mini.slice(0, numMiniForms);
    while (miniForms.length < numMiniForms) {
      miniForms.push({ name: "", description: "", type: "cat" });
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      petCount: numMiniForms,
      mini: miniForms,
      total: total,
    }));

    calculateTotal();
  };

  const handleMainInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      total: total,
    }));

    calculateTotal();
  };

  const handleTransportChange = (event) => {
    const { name, value } = event.target;
    settFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rememberChecked = document.getElementById("remember").checked;

    const isNumberAndTenDigit = (str) => {
      return /^\d{10}$/.test(str);
    };

    if(formData.petCount === 0 ){
      toast.error("Number of pets can't be zero")
      return
    }
      if (rememberChecked) {
        if (!isNumberAndTenDigit(formData.contactNumbers)) {
          toast.error("Please enter a valid contact number");
          return;
        }
        if (!isDateValid) {
          toast.error("Please enter a valid date range");
          return;
        }
        try {
          bookingServices.addBooking(formData);
          toast.success("Booking added successfully");
          setshowaskTransportModal(true);

          setFormData({
            cus_id: user._id,
            cus_name: user.name,
            bid,
            token: user.token,
            bid: 0,
            petCount: 0,
            mini: [{ name: "", description: "", type: "cat", pid: 0 }],
            contactNumbers: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
          });
          setTotal(0);
        } catch (error) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Please agree to the terms and conditions");
      }

    
  };

  const submitTransportation = () => {
    const isNumberAndTenDigit = (str) => {
      return /^\d{10}$/.test(str);
    };

    const { userName, plocation, time, phone } = tformData;
    console.log(phone);
    if (userName && plocation && time && phone) {
      console.log(phone);

      if (isNumberAndTenDigit(tformData.phone)) {
        axios
          .post("http://localhost:8080/api/transport/", tformData)
          .then((res) => {
            toast.success("Transportation Request sent");
            genarateQRcode()
          })
          .catch((err) => alert(err));
        setshowTransportModal(false);
      } else {
        toast.error("Please enter a valid contact number");
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const calculateTotal = () => {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (startDate > endDate) setIsDateValid(false);
    else setIsDateValid(true);

    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotal(diffDays * formData.petCount * 2000);
  };

  const handleMapClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;
          fetch(apiURL)
            .then((response) => response.json())
            .then((data) => {
              const address = data.results[0].formatted_address;
              settFormData((prevData) => ({ ...prevData, plocation: address }));
              console.log(tformData);
            })
            .catch((error) => console.log(error));
        },
        (error) => console.log(error)
      );
    }
  };

  const handleDownloadQRCode = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeSrc;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const genarateQRcode = () => {
    const text = `http://localhost:8080/qr/booking/B${bid}`
    QRCode.toDataURL(text).then((data) => {
      setQRCodeSrc(data);
      setShowQRCode(true);
    });
  };

  return (
    <>
      <Header />
      <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
        <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
          <p>Name : {user.name} </p>
          <p>Email : {user.email} </p>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">
              <TextField
                id="outlined-basic"
                label="Contact number"
                name="contactNumbers"
                variant="outlined"
                type="phone"
                value={formData.contactNumbers}
                onChange={handleMainInputChange}
                required={true}
              />

              <TextField
                id="outlined-basic"
                name="description"
                label="Description"
                variant="outlined"
                value={formData.description}
                onChange={handleMainInputChange}
                required={true}
              />

              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                id="start"
                value={new Date(formData.startDate).toISOString().substr(0, 10)}
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
                value={new Date(formData.endDate).toISOString().substr(0, 10)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().substr(0, 10),
                }}
                onChange={handleMainInputChange}
              />
            </div>
            {/* {
              <h2>
                Start date set to :{" "}
                {formData.startDate.toString().substring(0, 16)}{" "}
              </h2>
            }
            {
              <h2>
                End date set to : {formData.endDate.toString().substring(0, 16)}
              </h2>
            } */}
            {formData.startDate > formData.endDate ? (
              <>
                <p className="text-red-600">Invalid dates selected</p>
              </>
            ) : (
              <></>
            )}
            {<h2 className="mt-5">Number of pets: {formData.petCount}</h2>}

            <div>
              <Slider
                aria-label="Temperature"
                defaultValue={0}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={4}
                value={formData.petCount}
                onChange={handleSliderChange}
              />
            </div>

            <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-2">
              {[...Array(formData.petCount)].map((_, index) => (
                <div key={index} className="grid gap-4">
                  <label>
                    <TextField
                      id="outlined-basic"
                      label="Enter Name"
                      variant="outlined"
                      required={true}
                      value={formData.mini[index]?.name || ""}
                      onChange={(event) =>
                        setFormData((prevFormData) => {
                          const miniForms = [...prevFormData.mini];
                          miniForms[index].name = event.target.value;
                          miniForms[index].pid = getid();
                          return { ...prevFormData, mini: miniForms };
                        })
                      }
                      style={{ width: "100%" }}
                    />
                  </label>

                  <label>
                    <TextField
                      id="outlined-basic"
                      value={formData.mini[index]?.description || ""}
                      label="Enter description"
                      variant="outlined"
                      onChange={(event) =>
                        setFormData((prevFormData) => {
                          const miniForms = [...prevFormData.mini];
                          miniForms[index].description = event.target.value;
                          return { ...prevFormData, mini: miniForms };
                        })
                      }
                      style={{ width: "100%" }}
                    />
                  </label>

                  <label>
                    <FormControl fullWidth>
                      <InputLabel id="mini-form">Type</InputLabel>
                      <Select
                        labelId="mini-form-type-label"
                        id="demo-simple-select"
                        value={formData.mini[index]?.type || ""}
                        label="Type"
                        onChange={(event) =>
                          setFormData((prevFormData) => {
                            const miniForms = [...prevFormData.mini];
                            miniForms[index].type = event.target.value;
                            return { ...prevFormData, mini: miniForms };
                          })
                        }
                      >
                        <MenuItem value="cat">Cat</MenuItem>
                        <MenuItem value="dog">Dog</MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                  <div></div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="md">Entimated price: Rs:{total}</h2>
            </div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
              </div>
              <label
                for="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                I agree with the{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>
            <button
              onFocus={() =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  bid: "B" + bid,
                  price: total,
                }))
              }
              type="submit"
              className="flex ml-auto text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />

      {showTransportModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-[500px]">
            <h2 className="text-lg font-bold mb-4">
              Add Transportation Details
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <TextField
                id="outlined-basic"
                label="Customer name"
                name="userName"
                variant="outlined"
                value={user.name}
                onChange={handleTransportChange}
                required={true}
              />
              <TextField
                label="Date of pickyp"
                name="date"
                type="date"
                id="start"
                value={new Date(tformData.date).toISOString().substr(0, 10)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: new Date().toISOString().substr(0, 10),
                }}
                onChange={handleTransportChange}
              />
              <TextField
                id="outlined-basic"
                label="Contact number"
                name="phone"
                variant="outlined"
                value={tformData.phone}
                onChange={handleTransportChange}
                required={true}
              />
              <TextField
                id="outlined-basic"
                label="Pick up time"
                name="time"
                variant="outlined"
                type="time"
                onChange={handleTransportChange}
                required={true}
              />

              <div className="flex">
                <TextField
                  id="outlined-basic"
                  label="Pick up location"
                  name="plocation"
                  variant="outlined"
                  value={tformData.plocation}
                  onChange={handleTransportChange}
                  required={true}
                  className="w-[300px]"
                />
                <button
                  onClick={handleMapClick}
                  className="ml-auto text-[15px] rounded-[8px] text-white bg-[#2E4960] hover:bg-[#1c2c3a] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                >
                  locate me
                </button>
              </div>
            </div>
            <div className="flex mt-7">
              <button
                onClick={() => {setshowTransportModal(false)
                  genarateQRcode()}}
                type="submit"
                className="flex ml-auto text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => {
                  submitTransportation();
                }}
                className="flex ml-[20px] text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showaskTransportModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4">a
              Would you like to request Transport for your pets
            </h2>
            <div className="flex">
              <button
              onClick={() => {setshowaskTransportModal(false)
                genarateQRcode()
              }}
                type="submit"
                className="flex ml-auto text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Skip
              </button>
              <button
                type="submit"
                onClick={() => {
                  setshowTransportModal(true);
                  setshowaskTransportModal(false);
                }}
                className="flex ml-[20px] text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

{showQRCode && (
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded-lg">
          <div class="text-black text-center">
            QR Code for your booking
          </div>
          <div class="text-red text-center">
            Please take photo or download QR code
          </div>
          <div class="flex justify-center">
            <img src={qrCodeSrc} alt="QR code" />
          </div>
          <div class="flex justify-center mt-4">
          <button className="flex ml-[20px] text-[15px] w] rounded-[30px] text-white bg-[#ff5900] hover:bg-[#ff3c00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              <a href={`/`}>Close</a>
            </button>
            <button
             className="flex ml-[20px] text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={handleDownloadQRCode}
            >
              Download QR Code
            </button>
       
          </div>
        </div>
      </div>
    )}
    </>
  );
}

export default ShelterPet;
