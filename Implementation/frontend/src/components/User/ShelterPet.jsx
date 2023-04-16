import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
//import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import bookingServices from "../../services/api/booking";
import axios from "axios";
import { toast } from "react-toastify";

// const useStyles = makeStyles({
//   root: {
//     width: 400,
//     margin: "auto",
//   },
//   customColor: {
//     color: "#808080",
//     "& .MuiSlider-thumb": {
//       backgroundColor: "#808080",
//     },
//     "& .MuiSlider-track": {
//       backgroundColor: "#808080",
//     },
//   },
// });

function ShelterPet() {
  const { user } = useSelector((state) => state.auth);

  const [pid, setPid] = useState(0);
  const [bid, setBid] = useState(0);
  const [total , setTotal] = useState(0);

  const fetchData = async () => {
    const result = await axios.post("http://localhost:8080/api/counter"); // replace <API URL> with the URL of your API
    setPid(result.data.count);
    setBid(result.data.count);
  };

  const getid = () => {
    fetchData();
    return pid;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    cus_id: user._id,
    token: user.token,
    bid: 0,
    petCount: 1,
    mini: [{ name: "", description: "", type: "cat", pid: 0 }],
    contactNumbers: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
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
    }));

    calculateTotal();
  };

  const handleMainInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    calculateTotal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const rememberChecked = document.getElementById("remember").checked;

    if (rememberChecked) {
      try {

        setFormData((prevFormData) => ({ ...prevFormData, bid: "B"+ bid , price: total}));
        bookingServices.addBooking(formData);
        toast.success("Booking added successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Please agree to the terms and conditions");
    }
  };

  // const classes = useStyles();

  const calculateTotal = () => {
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotal(diffDays * formData.petCount * 2000);

  }

  return (
    <>
      <div className="w-full bg-bgsec pt-[60px] pb-[70px]">
        <div className="max-w-2xl mx-auto bg-white p-16 border-[2px] rounded-[15px]">
          <p>Name : {user.name} </p>
          <p>Email : {user.email} </p>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 mt-4 lg:grid-cols-1">
              <TextField
                id="outlined-basic"
                label="Contact numbers"
                name="contactNumbers"
                variant="outlined"
                value={formData.contactNumbers}
                onChange={handleMainInputChange}
              />

              <TextField
                id="outlined-basic"
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
            {<h2>Number of pets: {formData.petCount}</h2>}

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
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </label>
                  <div></div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="md">Entimated price:  Rs:{
              total
              }</h2>
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
              type="submit"
              className="flex ml-auto text-[15px] w] rounded-[30px] text-white bg-[#FF9F00] hover:bg-[#E38E00] font-bold text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ShelterPet;