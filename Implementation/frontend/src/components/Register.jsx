import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../services/auth/authSlice";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Header from "./common/Header";
import Footer from "./common/Footer";
import emailServices from "../services/api/emails/user";
import registrationbackground from "../assets/registrationbackground.png";
import { GrMapLocation } from "react-icons/gr";
import { Link } from "react-router-dom";

const Registration = () => {
  const [image, setImage] = useState("");

  const convertToBase64 = (e) => {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      const imgElement = document.createElement("img");
      imgElement.src = reader.result;
      imgElement.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 630;
        const MAX_HEIGHT = 630;
        let width = imgElement.width;
        let height = imgElement.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imgElement, 0, 0, width, height);
        const dataURL = canvas.toDataURL(e.target.files[0].type, 0.5);
        setImage(dataURL);
      };
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
    setFormData({ ...formData, image: image });
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
              console.log(data)
              const address = data.results[0].formatted_address;
              setFormData((prevData) => ({ ...prevData, address }));
            })
            .catch((error) => console.log(error));
        },
        (error) => console.log(error)
      );
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    phone: "",
    image: "",
  });

  const { name, email, password, password2, address, phone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const isNumberAndTenDigit = (str) => {
    return /^\d{10}$/.test(str);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
        address,
        phone,
        image,
        role: "USER",
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email)) {
        if (isNumberAndTenDigit(phone)) {
          dispatch(register(userData));
          emailServices.register(userData);
        } else toast.error("Phone number should be 10 digit number");
      } else {
        toast.error("The email address is invalid.");
      }
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Header />
      <div
        style={{ backgroundImage: `url(${registrationbackground})` }}
        className="min-h-screen bg-cover bg-gray-100 flex flex-col justify-center "
      >
        <div className="p-10 xs:p-0 mx-auto w-[700px]">
          <div className="bg-white drop-shadow-2xl shadow w-[500px] mx-auto rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <h1 className="font-bold text-center text-2xl mb-5">Register</h1>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Address
              </label>
              <div className="flex">
                <input
                  id="address"
                  name="address"
                  value={address}
                  onChange={onChange}
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                />
                <div
                  className="flex rounded-lg content-center border h-[40px] m-1 cursor-pointer"
                  onClick={handleMapClick}
                >
                  <GrMapLocation className="m-[15px]" />
                </div>
              </div>
              
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Add Image
              </label>
              <input
                className="w-full h-full py-5 pb-8 file:rounded-full file:h-[45px] file:w-[130px] file:bg-secondary file:text-white "
                accept="image/*"
                type="file"
                onChange={convertToBase64}
              />

              <button
                onClick={onSubmit}
                type="button"
                className="h-[45px] bg-primary rounded-full transition duration-200  hover:bg-[#E38E00] focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5  text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Register</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
            <div className="py-5">
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom	"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
