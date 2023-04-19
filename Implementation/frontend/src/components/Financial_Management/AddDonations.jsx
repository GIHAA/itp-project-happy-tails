
import React from 'react';
import Axios from 'axios';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


function AddDonation({ closeModal }) {
    const url = "http://localhost:8080/api/cusDonation"

    const [data, setData] = useState({

        cus_id: "",
        description: "",
        price: "",
        payment_date: "",
        payment_time: "",
        status: "",

    })





    function submit(e) {
        e.preventDefault();
        Axios.post(url, {

            cus_id: data.cus_id,
            price: data.price,
            payment_time:data.payment_time,
            payment_date:data.payment_date,
            description: data.description,
            status: data.status,

        })

            .then(res => {
                console.log(res.data)
                //refreshPage();
            });

    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function refreshPage() {
        setTimeout(function () {
            window.location.reload(false);
        }, 2000);
    }


    const notify = () => toast.success('cusDonation Added ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",

    });


    return (



        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>



            <form className=" w-3/6 font-medium text-gray-400 dark:text-gray-400 p-4 mt-2 border-solid border-2 mr-1 bg-gray-100 dark:bg-gray-800 border-sky-500 mb-3 ml-48 rounded-md " onSubmit={(e) => submit(e)}>
                <button class="float-right">X</button>
                <div>
                    {/* <h1>{max}</h1> */}
                    <h2 className="text-4xl my-14 flex justify-center">cusDonation Form</h2>

                </div>
                <div class="mb-3 justify-center -mx-2 flex items-end">
                    <label class="font-medium text-sm mb-2 ml-1">Name
                        <input type="text" size="15px" required class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" onChange={(e) => handle(e)} id="cus_id" value={data.cus_id}>
                        </input> </label>

                    <label class="font-medium text-sm mb-2   ">Amount <br></br>
                        <input type="number" required size="15px" onChange={(e) => handle(e)} id="price" value={data.price} class="w-5/6 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"></input> </label> <br></br>
                    <br></br>
                </div>

                {/* <div class="mb-3 justify-center -mx-2 flex items-end " >
                    <label class="font-medium text-sm mb-2   ">cusDonation Amount <br></br>
                        <input type="number" required size="15px" onChange={(e) => handle(e)} id="price" value={data.price} class="w-5/6 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"></input> </label> <br></br>

                    <label class="font-medium text-sm mb-2 ml-1">cusDonation Target
                        <select id="tran_target" required className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" onChange={(e) => handle(e)}>
                           
                            <option value="Event Management" selected={data.tran_target === "Event Management"}> Event Management</option>
                            <option value="Vehicle Management" selected={data.tran_target === "Vehicle Management"}>Vehicle Management</option>
                            <option value="Supplier Management" selected={data.tran_target === "Supplier Management"}>Supplier Management</option>
                        </select>
                    </label>
                </div> */}

                <div className=" mb-3 justify-center -mx-2 flex items-end ">
                    <label class="font-medium text-sm mb-2 ml-1">Donation Date <input type="date" size="15px" required onChange={(e) => handle(e)} id="payment_date" value={data.payment_date} class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"></input> </label> <br></br>
                    <label class="font-medium text-sm mb-2 ml-1">Donation Time <input type="time" size="15px" required onChange={(e) => handle(e)} id="payment_time" value={data.payment_time} class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"></input> </label> <br></br>
                </div>

                <div className=" mb-3 justify-center -mx-2 flex items-end ">
                    <label class="font-medium text-sm mb-2 ml-1">cusDonation Status
                        <select id="status" className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" onChange={(e) => handle(e)} >
                            <option value="CANCEL" selected={data.status === "CANCEL"}>Select</option>
                            <option value="PAID" selected={data.status === "PAID"}>PAID</option>

                        </select> </label>
                        
                        
                        
                        <label class="font-medium text-sm mb-2 ml-1">Description
                        <input type="text" size="15px" height="30px" required class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" onChange={(e) => handle(e)} id="description" value={data.description}>
                        </input> </label> <br></br>


                </div>

                <div class="float-right">

                    <button class=" border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline" onClick={notify}>Submit</button>
                    <button class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={() => closeModal(false)}> Close</button>

                </div>
            </form>



        </div>







    )
}

export default (AddDonation);