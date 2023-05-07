import React from "react";
import SideBar from "./SideBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import editImg from "../../assets/edit.png";
import deleteImg from "../../assets/delete.png";
import { useSelector, useDispatch } from "react-redux";

const Users = () => {


  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    sub : "" ,
    email : "",
    message : "",
  });

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [id, setId] = useState("");
  let [emailData , setEmailData] = useState({})

  const { sub , email , message } = formData;


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/feedback/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const refreshPage = () => {
    axios.get("http://localhost:8080/api/feedback/").then((res) => {
      setData(res.data);
    });
  };


  const onDelete = (id) => {
    const res = axios.delete(`http://localhost:8080/api/feedback/${id}`);
    toast.success("feedback deleted successfully");

    setTimeout(function () {
      refreshPage();
    }, 3000);
  };

  const emailUser = () => {
    const userData =  { ...formData , email: emailData.email }
    axios.post("http://localhost:8080/api/sendEmail", userData).then((res) => {
        toast.success("Email sent successfully");
    });
  };
;


  return (
    <>
      <div className="flex ">
        <SideBar />

        <div className=" flex-[85%]">
          <div style={{}} className="bg-cover bg-center h-screen w-full fixed">
            <div className=" w-full h-screen shadow-lg rounded-xl">
              <div className="flex flex-col items-center justify-center h-[80px] bg-[#2E4960]"></div>

      
              <div className="h-[500px] overflow-y-scroll ">
  <table className="mx-auto w-[980px] mt-10 h-auto ml-[100px] ">
    <thead className="bg-[#2E4960] text-white sticky top-0">
      <tr>
        <th className="p-3 w-[350px]">Name</th>
        <th className="p-3">Email</th>
        <th className="p-3">message</th>
        <th className="p-3">Action</th>
      </tr>
    </thead>

    <tbody className="bg-white text-center border-black ">
      {data.map((item) => {
        return (
          <tr className="hover:bg-[#efeeee] border-[2px]">
            <td className="p-3">{item.name}</td>
            <td className="p-3 w-[250px]">{item.email}</td>
            <td className="p-3 w-[150px]">{item.message}</td>
            <td className="p-3">
              <div className="flex ml-12">
                <button
                  onClick={() => {   
                    setShowEmailModal(true);
                    setEmailData(item);
                  }}
                  className="items-center px-5 py-1 mr-5 bg-[#2E4960] w-[125px] text-white font-semibold hover:bg-[#1b3348] rounded-xl"
                >
                  <span className="flex">
      
                    Email user
                  </span>
                </button>
                <button
                  className="flex px-5 py-1 mr-5 bg-[#d11818] text-white font-semibold hover:bg-[#760d0d] rounded-xl"
                  onClick={() => onDelete(item._id)}
                >
                  <img
                    src={deleteImg}
                    alt=""
                    className="w-4 h-4 mr-2 mt-1"
                  />
                  Delete
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>


              <div></div>
            </div>
          </div>
        </div>
      </div>

    

{showEmailModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-lg font-bold mb-4 ">
              Send mail to user
            </h2>
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Email</label>
              <input  id="email" name="email" value={emailData.email} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Subject</label>
              <input  id="sub" name="sub" value={sub} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />


 
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Add Message</label>
              <input  id="message" name="message" value={message} onChange={onChange} type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />

<div className="flex mt-5">
                <button className="" onClick={() => setShowEmailModal(false)}>
                  Close
                </button>
                <button className="ml-auto" onClick={() => emailUser(id)}>
                  Submit
                </button>
</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
