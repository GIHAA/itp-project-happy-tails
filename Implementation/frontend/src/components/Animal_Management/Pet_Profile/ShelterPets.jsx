import React, { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';


const GetBooking = () => {

  const [payData, setpayData] = useState([]);
  const [isError, setIsError] = useState("");
  const [petCount, setPetCount] = useState(0);
  const [petCountsByIndex, setPetCountsByIndex] = useState([]);


  function refreshPage() {
    setTimeout(function () {
      window.location.reload(false);
    }, 2000);
  }


  useEffect(() => {
    axios.get('http://localhost:5000/api/booking')
      .then(response => {
        const data = response.data;
        console.log(response);
        setpayData(data);
        const petCounts = data.map(item => item.mini.length);
        const totalPetCount = petCounts.reduce((a, b) => a + b, 0);
        setPetCount(totalPetCount);
        setPetCountsByIndex(petCounts);
      })
      .catch(error => setIsError(error.message));
  }, []);


  function filterContent(book, searchTerm) {
    console.log(book)
    console.log(searchTerm)
    const result = book.filter(
      (r) =>
        r.
        cus_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setpayData(result);
  }

  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value;
    axios.get("http://localhost:5000/api/booking").then((res) => {
      if (res.data) {
        filterContent(res.data, searchTerm);
      }
    });
  };


  return (

    <>

      <div class='overflow-x-auto w-full mt-32 max-h-[500px] ml-[128px]'>
      <form class="flex items-center ml-7">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-[300px] ml-[230px]">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="simple-search"  onChange={handleTextSearch} class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by ID or Name" required/>
    </div>
    </form>
        <table class='mx-auto mt-10 max-w-5xl shadow-2xl w-full whitespace-nowrap rounded-lg bg-gray-300 divide-y divide-gray-300 overflow-hidden table-auto'>
          <thead class="bg-[#2E4960] sticky top-0">
            <tr class="text-white text-left">
              <th class="font-semibold text-sm uppercase text-center px-6 py-4"> Booking ID </th>
              <th class="font-semibold text-sm uppercase text-center px-6 py-4"> Customer Name</th>
              <th class="font-semibold text-sm uppercase text-center px-6 py-4"> Price Status </th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Pet Count </th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center">Pet Id's </th>
              <th class="font-semibold text-sm uppercase px-6 py-4 text-center">ACTION</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-400">
            {payData.filter(data => data.status === "SHELTERED" || data.status === "CLOSED").map((data) => {

              const { _id, cus_id,cus_name,bid, contactNumbers, description, petCount, status, mini } = data;

              const notify = () => toast.success('The Sheltering Closed ', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",

              });

              <div>

              </div>


              const count = 0;
              function updateTransaction() {
                const updatedTransaction = {
                  status: 'CLOSED',
                  cus_id: cus_id,
                  contactNumbers: contactNumbers,
                  description: description,
                };

                axios.put(`http://localhost:5000/api/booking/${_id}`, updatedTransaction)
                  .then(response => {

                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }


              return (
                <tr class="text-black text-left" key={_id}>
                  <td class="py-3 px-6 text-center">{bid}</td>
                  <td class="py-3 px-6 text-center">{cus_name}</td>
                  <td class="text-center px-14 py-3 text-sm">{status}</td>
                  <td class=" text-center px-14 py-3 text-sm">{petCount}</td>
                  <td class="text-center px-14 py-3 text-sm">

                    {data.mini.map((miniitem) => (<><p>{miniitem.pid}</p></>))}
                  </td>

                  <td class="px-14 py-4 text-sm">
                    <button class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100" onClick={() => { notify(); refreshPage(); updateTransaction(); }}> Closed  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>

  );

};

export default GetBooking;