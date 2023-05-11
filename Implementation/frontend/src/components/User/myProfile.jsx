import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userServices from "../../services/api/user";
import { logout, login, reset } from "../../services/auth/authSlice";
import bookingServices from "../../services/api/booking";
import jsPDF from "jspdf";
import logo2 from "../../assets/logo2.png";
import { GrMapLocation } from "react-icons/gr";

const Profile = (props) => {
  const { user } = useSelector((state) => state.auth);

  // if (!user) {
  //   const user = {};
  // }

  const [bookings, setbookings] = useState([]);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    confirmpassword: "",
    token: user.token,
    image: "",
    _id: user._id,
  });

  const { name, email, address, phone, password, password2, confirmpassword } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    const formDataWithImage = { ...formData, image: image };
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else if (formData.confirmpassword === "") {
      toast.error("Please enter your password to confirm changes");
    } else {
      const response = userServices
        .updateUser(formDataWithImage)
        .then(() => {
          toast.success("Profile updated successfully");

          //login logic
          let email = formData.email ? formData.email : user.email;
          let password = formData.password
            ? formData.password
            : confirmpassword;

          dispatch(login({ email, password }));

          setFormData({
            name: "",
            email: "",
            password: "",
            password2: "",
            confirmpassword: "",
            image: "",
            token: user.token,
            _id: user._id,
          });

          //dispatch(reset());
          navigate("/user");
        })
        .catch((err) => {
          toast.error("An error occurred while updating profile");
          console.log(err);
        });

      console.log(response.data);
    }
  };

  useEffect(() => {
    bookingServices.getAllBookings(user).then((res) => {
      setbookings(res);
      console.log(res);
    });
  }, []);

  const genarateUserData = () => {
    const title = "User Data Report";
    const doc = new jsPDF();
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    // Set document font and color
    doc.setFont("helvetica");
    doc.setTextColor("#000000");

    // Add title and date
    doc.setFontSize(24);
    doc.text(title, 20, 30);
    doc.setFontSize(12);
    doc.setTextColor("#999999");
    doc.text(`Generated on ${date}`, 20, 40);

    // Add logo and company details
    doc.addImage(logo2, "JPG", 20, 60, 40, 40);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#000000");
    doc.text("Happy Tails", 70, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#999999");
    doc.text("Tel: +94 11 234 5678", 70, 80);
    doc.text("Email: info@happytails.com", 70, 85);
    doc.text("Address: No 221/B, Peradeniya Road, Kandy", 70, 90);

    doc.line(20, 110, 190, 110);

    doc.addImage(user.image, "PNG", 20, 120, 40, 40);
    doc.text(`User ID: ${user._id}`, 70, 123);
    doc.text(`Name: ${user.name}`, 70, 130);
    doc.text(`Email: ${user.email}`, 70, 137);
    doc.text(`Address: ${user.address}`, 70, 144);
    doc.text(`Phone: ${user.phone}`, 70, 151);
    doc.text(`User since: ${user.createdAt.substring(0, 10)}`, 70, 158);
    doc.text(`Last updated: ${user.updatedAt.substring(0, 10)}`, 70, 165);

    // doc.line(20, 20, 180, 20);
    doc.setTextColor("#5A5A5A");
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`Booking History`, 83, 190);

    // Add table with data
    doc.setTextColor("#999999");
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.autoTable({
      startY: 200,
      head: [
        [
          "Date",
          "Bid",
          "Customer name",
          "Contact",
          "Number of pets",
          "Status",
          "Price",
        ],
      ],
      body: bookings.map((request) => [
        request.createdAt
          .toLocaleString("en-US", { timeZone: "Asia/Colombo" })
          .substring(0, 10),
        request.bid,
        request.cus_name,
        request.contactNumbers,
        request.petCount,
        request.status,
        request.price,
      ]),
      theme: "grid",
    });

    // Save the document
    doc.save("userreport.pdf");
  };

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
            width *= MAX_HEIGHT / height;a
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
              console.log(data);
              const address = data.results[0].formatted_address;
              setFormData((prevData) => ({ ...prevData, address }));
            })
            .catch((error) => console.log(error));
        },
        (error) => console.log(error)
      );
    }
  };

  return (
    <>
      <div className="w-full bg-bgsec">
        <div className=" mx-auto rounded-[20px] bg-[#FFBE52] p-16 flex h-[1050px]  w-[1200px]">
          <div className="w-1/3 h-full ">
            <label className="relative w-[270px] h-[270px]">
              <img
                src={user.image}
                className="rounded-[50%] w-[270px] h-[270px]  border-bg border-[5px]"
              />
            </label>
          </div>

          <div className="w-2/3  h-64">

            <h3 className="text-center mb-5 mt-5 text-gray-800 text-[22px] font-bold">
              Update profile
            </h3>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder={user.name}
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
              placeholder={user.email}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Location
            </label>
            <div className="flex">
              <input
                id="address"
                name="address"
                value={address}
                onChange={onChange}
                placeholder={user.address}
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <div
                className="flex rounded-lg content-center border h-[40px] bg-white m-1 cursor-pointer"
                onClick={handleMapClick}
              >
                <GrMapLocation className="m-[15px]" />
              </div>
            </div>

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder={user.phone}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              New password
            </label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Repeat Password
            </label>
            <input
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Old Password
            </label>
            <input
              id="confirmpassword"
              name="confirmpassword"
              value={confirmpassword}
              onChange={onChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              required
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Add Image
            </label>
            <input
              className="w-full h- py-5 pb-8 file:rounded-full file:h-[45px] file:w-[130px] file:bg-secondary file:text-white "
              accept="image/*"
              type="file"
              onChange={convertToBase64}
            />

            <div className="flex mt-7">
              <button
                onClick={genarateUserData}
                type="button"
                className="transition mr-auto w-[35%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5  text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">genarate user data</span>
              </button>
              <button
                onClick={onSubmit}
                type="button"
                className="transition w-[25%] rounded-[100px] duration-200 bg-[#2E4960] hover:bg-[#2E4960] focus:bg-[#2E4960] focus:shadow-sm focus:ring-4 focus:ring-opacity-50 text-white py-2.5 text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">update details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100px] bg-bgsec"></div>
    </>
  );
};

export default Profile;
