import React from "react";
import temp from "../../assets/temp.jpg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import updateUser from "../../services/api/user";
import { logout, login, reset } from "../../services/auth/authSlice";
import bookingServices from "../../services/api/booking";
import jsPDF from "jspdf";
import logo from "../../assets/logo.png";
import { AiFillEdit } from "react-icons/ai";

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
      const response = updateUser(formDataWithImage)
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

  const genarateUserData = () => {
    bookingServices.getUserBookings(user).then((res) => {
      setbookings(res);
    });
    const doc = new jsPDF("portrait", "px", "a4", false);

    doc.addImage(logo, "png", 170, 10, 100, 100);
    doc.setFont("calibri ", "bold");
    doc.setFontSize(10);

    bookings.forEach((booking, index) => {
      //doc.addPage()

      doc.text(60, 80, "Description : ");
      doc.text(60, 100, "start_time : ");
      doc.text(60, 120, "end_time : ");
      doc.text(60, 140, "status: : ");
      doc.text(60, 160, "createdAt : ");
      doc.text(60, 180, "updatedAt : ");

      doc.setFont("Helvertica", "normal");
      doc.text(200, 80, booking.description);
      doc.text(200, 100, booking.start_time);
      doc.text(200, 120, booking.end_time);
      doc.text(200, 160, booking.status);
      doc.text(200, 180, booking.createdAt);
      doc.text(200, 200, booking.updatedAt);
    });
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
            <div>
              <pre>User ID - {user._id}</pre>{" "}
            </div>
            <div>
              <pre>
                Member Since -{" "}
                {user.createdAt.substring(0, 10) +
                  " " +
                  user.createdAt.substring(11, 16) +
                  " UTC"}
              </pre>{" "}
            </div>
            <div>
              <pre>
                Last Edited -{" "}
                {user.updatedAt.substring(0, 10) +
                  " " +
                  user.updatedAt.substring(11, 16) +
                  " UTC"}
              </pre>{" "}
            </div>
            <h3 className="text-center mb-5 mt-5 text-[22px] font-bold">
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
            <input
              id="address"
              name="address"
              value={address}
              onChange={onChange}
              placeholder={user.address}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

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
