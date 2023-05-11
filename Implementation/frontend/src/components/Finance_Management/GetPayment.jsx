import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddPayment from "./AddPayment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import name from "../../assets/logo2.png";



const GetPayment = () => {
  const [payData, setpayData] = useState([]);
  const [isError, setIsError] = useState("");
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [pdfData, setpdfData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPayData, setFilteredPayData] = useState([]);

  function refreshPage() {
    setTimeout(function () {
      window.location.reload(false);
    }, 2000);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/payment")

      .then((response) => {
        console.log(response);
        setpayData(response.data);
        filterPayments(response.data);
        setpdfData(response.data);
      })

      .catch((error) => setIsError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteTransaction = (id) => {
    axios
      .delete(`http://localhost:8080/api/payment/${id}`)
      .then((res) => {


        refreshPage();
      })

      .catch((err) => {
        alert(err);
      });

    function refreshPage() {
      window.location.reload(false);
    }
  };

  const updateTransaction = (id, data) => {
    axios
      .put(`http://localhost:8080/api/payment/${id}`, data)
      .then((res) => {
        //refreshPage();
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });

    // function refreshPage() {
    //     setTimeout(function () {
    //         window.location.reload(false);
    //     }, 2000);
    // }
  };

  // const updateTransaction = (id) => {
  //     const newData = { ...selectedData };
  //     axios
  //       .put(`http://localhost:8080/api/payment/${id}`, newData)
  //       .then((res) => {
  //         //refreshPage();
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   };

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "px", "a4", false);

    if (pdfData.length > 0) {
      const headers = ["Customer Name", "Pet ID", "Payment", "Status"];
      const rows = pdfData.map((payment) => {
        const paymentStr = String(payment.payment);
        return [payment.cus_id, payment.pet_id, paymentStr, payment.status];
      });

      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1
        }-${today.getDate()}`;


      const title = "Customer Payment Report";

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
      doc.addImage(name, "JPG", 20, 60, 40, 40);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#000000");
      doc.text("Happy Tails", 70, 70);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor("#999999");
      doc.text("Tel: +94 11 234 5678", 70, 80);
      doc.text("Email: info@happytails.com", 70, 90);
      doc.text("Address: No 221/B, Peradeniya Road, Kandy", 70, 100);

      // doc.setFontSize(10);
      // doc.text(`Pyment Report Generated ${dateTime}`, 470, 45);

      // doc.addImage(name, "JPG", 65, 20, 100, 100);
      // doc.setFontSize(20);
      // doc.text(180, 45, "Happy Tails");
      // doc.setFontSize(10);
      // doc.text(180, 65, "Address : Happy tails shelter,\nNew Kandy road,\nMalabe");
      // doc.text(180, 95, "Tel : 01123457689");

      doc.setFontSize(18);
      const textWidth =
        (doc.getStringUnitWidth("CUSTOMER PAYMENTS") *
          doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const textOffset = (doc.internal.pageSize.width - textWidth) / 2;
      doc.text("CUSTOMER PAYMENTS", textOffset, 120);



      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 140,

      });

      doc.setFontSize(12);
      doc.setTextColor("#121212");
      doc.text(`Total Payments: Rs. ${max}`, 470, doc.autoTable.previous.finalY + 28);


      doc.save("PaymentReports.pdf");

    }
  };

  function calculatePayment() {
    const income = payData

      .filter(({ status }) => status === "Verified")
      .reduce((total, { payment }) => total + payment, 0);

    return income;
  }
  const max = calculatePayment();

  const notify = () =>
    toast.success("Payment Verified ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    const notify2 = () =>
    toast.success("Payment Updated ", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  function filterPayments(data) {
    const filtered = data.filter((payment) =>
      payment.cus_id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPayData(filtered);
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredPayData(payData);
    } else {
      filterPayments(payData);
    }
  }

  return (
    <>
      {/* //BALANCE BAR */}

      <div class="flex ml-48 justify-center flex-cols-1 gap-4 mt-24 ">
        <div class="bg-[#2E4960] shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
          <div class=" flex justify-center items-center gap-4 w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
            <svg
              width="80"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              ></path>
            </svg>
          </div>
          <div class="text-right">
            <p class="text-2xl">&nbsp; Rs. {max}</p>
            <p>Payments</p>
          </div>
        </div>
      </div>

      <div class="flex -mt-24">
        <div class="flex ml-80 -mb-4 ">
          <button
            type="button"
            class="   my-12 border border-gray-700 bg-[#2E4960] text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Create Payment
          </button>
          {openModal && <AddPayment closeModal={setOpenModal} />}

          <button
            onClick={generatePDF}
            className="my-12 border border-gray-700 bg-[#2E4960] text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          >
            PDF
          </button>
        </div>

        <div class="flex -mb-4 "></div>

        <form class="flex items-center ml-40 ">
          <label for="simple-search" class="sr-only">
            Search
          </label>
          <div class=" w-5/6 ml-80">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by Customer name"
              value={searchTerm}
              onChange={handleSearch}
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </form>
      </div>

      {isError !== "" && <h2>{isError}</h2>}

      <div class="mt-2 mb-16 mr-8 rounded-lg">
        <div class="w-full overflow-hidden  shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="table-auto rounded-lg ml-80">
              <thead>
                <tr class="text-base font-semibold tracking-wide  text-gray-500 uppercase border-b dark:border-gray-900 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-8  py-3">Customer Name</th>
                  <th className="px-8  py-3">Pet ID</th>
                  <th className="px-8  py-3">Payment</th>
                  <th className="px-8  py-3">Payment Status</th>
                  <th className="px-8  py-3">Update</th>
                  <th className="px-8  py-3">Delete</th>
                  <th className="px-8  py-3">Action</th>
                </tr>
              </thead>

              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {filteredPayData.map((data) => {
                  const { _id, cus_id, pet_id, payment, status } = data;

                  const notify = () =>
                    toast.success("Payment Verified ", {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                    });

                  function updateTransaction() {
                    const updatedTransaction = {
                      status: "Verified",
                      cus_id: cus_id,
                      pet_id: pet_id,
                      payment: payment.toString(),
                    };

                    axios
                      .put(
                        `http://localhost:8080/api/payment/${_id}`,
                        updatedTransaction
                      )
                      .then((response) => {
                        // console.log(response.data);
                        calculatePayment();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }

                  return (
                    <tr
                      key={_id}
                      class="font-semibold bg-gray-50 dark:bg-gray-100 hover:bg-gray-100 dark:hover:bg-gray-400 text-gray-100 dark:text-gray-900"
                    >
                      <td class="px-8 py-2">
                        <div class="flex items-center px-10 py-3 text-sm">
                          <div>
                            <p class="font-semibold">{cus_id}</p>
                          </div>
                        </div>
                      </td>

                      <td class="px-8 text-center py-3 text-sm">{pet_id}</td>

                      <td class="px-8 text-center py-3 text-sm ">{payment}</td>
                      <td class="px-8 text-center py-3 text-sm">{status}</td>

                      <td class="px-8 text-center py-3 text-sm">
                        <button
                          class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-green-100 rounded-full dark:bg-yellow-700 dark:text-green-100"
                          onClick={() => {
                            setSelectedData(data);
                            setShowUpdateForm(true);
                          }}
                        >
                          {" "}
                          Update{" "}
                        </button>
                      </td>
                      <td class="px-8 items-center py-3 text-sm">
                        <button
                          class="px-2 py-1 font-semibold leading-tight text-red-700 bg-green-100 rounded-full dark:bg-red-700 dark:text-green-100"
                          onClick={() => deleteTransaction(_id)}
                        >
                          {" "}
                          Delete{" "}
                        </button>
                      </td>
                      <td class="px-8 items-center py-3 text-sm">
                        <button
                          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                          onClick={() => {
                            notify();
                            updateTransaction();
                            refreshPage();
                          }}
                        >
                          {" "}
                          Verify{" "}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div>
              {showUpdateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
                  <form
                    className="w-3/6 font-medium text-gray-400 dark:text-gray-400 p-4 mt-2 border-solid border-2 mr-1 bg-gray-100 dark:bg-gray-800 border-sky-500 mb-3 ml-48 rounded-md "
                    onSubmit={(e) => {
                      e.preventDefault();

                      const data = {
                        // _id: e.target.id.value,

                        cus_id: e.target.title.value,
                        pet_id: e.target.id.value,
                        payment: e.target.pay.value,
                        status: e.target.target.value,
                      };

                      updateTransaction(selectedData._id, data);
                    }}
                  >
                    <div key={selectedData?._id}>
                      <div>
                        <h2 className="text-4xl my-14 flex justify-center">
                          Update Payment Form
                        </h2>
                      </div>
                      <div class="mb-3 justify-center -mx-2 flex items-start">
                        <label class="font-medium text-sm mb-2 ml-1">
                          {" "}
                          Customer Name {console.log(selectedData.cus_id)}
                          <input
                            type="text"
                            name="title"
                            defaultValue={selectedData.cus_id}

                            class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          />{" "}
                        </label>{" "}
                        <label class="font-medium text-sm mb-2 ml-1">
                          {" "}
                          Pet ID{" "}
                          <input
                            type="text"
                            name="id"
                            defaultValue={selectedData.pet_id}
                            class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          />{" "}
                        </label>{" "}
                      </div>

                      <div className=" mb-3 justify-center -mx-2 flex items-end ">
                        <label class="font-medium text-sm mb-2 ml-1">
                          {" "}
                          Payment{" "}
                          <input
                            type="number"
                            name="pay"
                            defaultValue={selectedData.payment}
                            class="w-3/6 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          />{" "}
                        </label>{" "}
                        <br />
                        <br />
                        <label class="font-medium text-sm mb-2 ml-1">
                          {" "}
                          Status{" "}
                          <select
                            name="target"
                            defaultValue={selectedData.status}
                            className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                          >
                            <option value="CANCELED">CANCELED</option>
                            <option value="PAID">PAID</option>
                          </select>{" "}
                        </label>{" "}
                        <br />
                      </div>

                      <div class="float-right">
                        <button
                          type="submit"
                          class=" border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                          onClick={() => {
                            notify2();
                            
                            refreshPage();
                          }}
                        >
                          Update Data
                        </button>
                        <button
                          onClick={() => setShowUpdateForm(false)}
                          class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                         
                        >
                          {" "}
                          CLOSE
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetPayment;
