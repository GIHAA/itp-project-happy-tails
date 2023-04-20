
import React from 'react';
import Axios from 'axios';
import { useState } from "react";




function AddOrganization({ closeModal }) {
    const url = "http://localhost:8080/api/organization"

    const [data, setData] = useState({

        org_name: "",
        org_place: "",
        org_email: "",
        org_type: "",
        org_amount: "",
        org_Resources:"",
        org_description: "",
        org_logo: "",
    })






    function submit(e) {
        e.preventDefault();
        Axios.post(url, {

            org_name: data.org_name,
            org_place: data.org_place,
            org_email: data.org_email,
            org_type: data.org_type,
            org_amount: data.org_amount,
            org_Resources:data.org_Resources,
            org_description: data.org_description,
            org_logo: data.org_logo,
        })

            .then(res => {
                console.log(res.data)
                refreshPage();
            });

    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    function refreshPage() {
        window.location.reload(false);
    };




    return (



        <div className='fixed inset-0 bg-[#2E4960] bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>



            <form className=" w-3/6 font-medium text-gray-400 dark:text-gray-400 p-4 mt-2 border-solid border-2 mr-1 bg-gray-100 dark:bg-gray-800 border-sky-500 mb-3 ml-48 rounded-md " onSubmit={(e) => submit(e)}>
                <button class="float-right">X</button>
                <div>

                    <h2 className="text-4xl my-14 flex justify-center">Organization Form</h2>

                </div>
                <div class="mb-3 justify-center -mx-2 flex items-end">
                    <label class="font-medium text-sm mb-2 ml-1">Organization Name
                        <input type="text" size="15px" required class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" onChange={(e) => handle(e)} id="org_name" value={data.org_name}>
                        </input> </label>


                      <label class="font-medium text-sm mb-2 ml-1">Location
                        <input type="text" size="15px" required class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" onChange={(e) => handle(e)} id="org_place" value={data.org_place}>
                        </input> </label>   

                    {/* <label class="font-medium text-sm mb-2 ml-1">Transaction Type
                        <select required class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" id="org_place" onChange={(e) => handle(e)}  >
                            <option value="INCOME" selected={data.org_place === "INCOME"} > INCOME   </option>
                            <option value="EXPENSES" selected={data.org_place === "EXPENSES"} > EXPENSES </option>

                        </select> </label>  <br></br> */}
                </div>

                <div class="mb-3 ml-8 justify-start -mx-20  flex items-end" >
                    <label class="font-medium text-sm mb-2 ml-1 ">Email <br></br>
                        <input type="email" required size="15px" onChange={(e) => handle(e)} id="org_email" value={data.org_email} class="w-60 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"></input> </label> <br></br>
                    {/* <label class="font-medium text-sm mb-2 ml-1">Amount <input type="number" size="15px" required onChange={(e) => handle(e)} id="org_amount" value={data.org_amount} class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"></input> </label> <br></br> */}
                    <label class="font-medium text-sm mb-2 ml-1">Type
                        <select id="org_type" className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" onChange={(e) => handle(e)} >
                            <option value="Regional" selected={data.org_type === "Regional"}>Regional</option>
                            <option value="Global" selected={data.org_type === "Global"}>Global</option>

                        </select> </label> <br></br>
                    <label class="font-medium text-sm mb-2 ml-1">Resources
                        <select id="org_Resources" required className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer" onChange={(e) => handle(e)}>
                           
                            <option value="Small" selected={data.org_Resources === "Small"}> Small</option>
                            <option value="Medium" selected={data.org_Resources === "Medium"}>Medium</option>
                            <option value="Large" selected={data.org_Resources === "Large"}>Large</option>
                        </select>
                    </label>
                </div>

              


                <div className=" mb-3 justify-center -mx-2 flex items-end ">

                </div>
                <div className=" mb-3 justify-center -mx-2 flex items-end ">
                    <label class="font-medium text-sm mb-2 ml-1">Logo <input type="text" size="15px" required onChange={(e) => handle(e)} id="org_logo" value={data.org_logo} class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors">
                        </input> </label> 
                    <label class="font-medium text-sm mb-2 ml-1">Description
                        <input type="text" size="15px" height="30px" required class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" onChange={(e) => handle(e)} id="org_description" value={data.org_description}>
                        </input> </label>
                        
                    
                </div>

                
                <div class="mb-3 justify-center -mx-2 flex items-end">
                    
                </div>

                <div class="float-right">

                    <button class=" border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline">Submit</button>
                    <button class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={() => closeModal(false)}> Close</button>

                </div>
            </form>



        </div>







    )
}

export default (AddOrganization);