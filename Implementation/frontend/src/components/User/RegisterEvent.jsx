import axios from "axios";
import React, { useState, useEffect, startTransition } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";
import "react-toastify/dist/ReactToastify.css";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { useSelector } from "react-redux";

function RegisterEvent() {


  const { user } = useSelector((state) => state.auth);
  const param = useParams();
  const id = param.id;
  //console.log(id)
  const [cusName, setName] = useState("");
  const [noOfTicket, setTic] = useState("");
  const [total, setTotal] = useState("");
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhone] = useState(user.phone);
  const [eid, setEventId] = useState("");
  const [eventName, setEventname] = useState("");

  const [dbprice, setDPrice] = useState("");
  //  const [text, setText] = useState([cusName,noOfTicket]);
  //   const [src, setSrc] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeSrc, setQRCodeSrc] = useState("");
  const [eventAmount, setEventAmount] = useState({});
  const [amountName, setAmountName] = useState("");
  const [amountPrice, setAmountPrice] = useState("");
  const [amountTicket, setAmountTicket] = useState("");
  const [amountIncome, setAmountIncome] = useState("");
  const [amountExpense, setAmountExpense] = useState("");
  const [amountResult, setAmountResult] = useState("");
  const [amountRate, setAmountRate] = useState("");
  const [amountOID, setAmountOID] = useState(null);
  const [amountId, setAmountID] = useState("");
  const [size, setSize] = useState("");
  const [remaining, setRemaining] = useState("");
  const [bookid, setBookId] = useState("");
  const [button, setButton] = useState(true);



  useEffect(() => {
    async function getevent() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/event/getEvent/${id}`
        );

        setEventname(res.data.even.name);
        setDPrice(res.data.even.price);
        setEventId(res.data.even.eid);
        setSize(res.data.even.size);
        // setTotal(dbprice * noOfTicket);

        const amountRes = await axios.get(
          "http://localhost:8080/api/eventamount/geteamounts"
        );
        const allEventAmounts = amountRes.data.alleamount;
        const amount = allEventAmounts.filter(
          (ea) => ea.eid === res.data.even.eid
        )[0];
        // console.log(amount)
        setEventAmount(amount);
        const a = amount._id;
        //console.log(a);
        setAmountOID(a);
      } catch (err) {
        toast.error(err);
      }
    }

    getevent();
  }, []);

  useEffect(() => {
    async function getbookings() {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/eventregister/getbooking"
        );
        const eids = res.data.allbooking.map((event) => event.bookid);
        if (!eids.length) {
          setBookId("R1");
        } else {
          const lastId = eids[eids.length - 1];
          const nextId = "R" + (parseInt(lastId.slice(1)) + 1);
          setBookId(nextId);
        }
      } catch (err) {
        toast.error(err);
      }
    }
    getbookings();
  }, []);

  useEffect(() => {
    setAmountOID(eventAmount._id);
    setAmountID(eventAmount.eid);
    setAmountName(eventAmount.eventName);
    setAmountPrice(eventAmount.price);
    setAmountTicket(eventAmount.noOfTicket);
    setAmountIncome(eventAmount.totalIncome);
    setAmountExpense(eventAmount.totalExpense);
    setAmountResult(eventAmount.result);
    setAmountRate(eventAmount.rate);
  }, [eventAmount]);
  console.log(amountId);

  var ticket = Number(noOfTicket) + Number(amountTicket);
  // console.log(ticket);

  var totaltic = Number(dbprice * noOfTicket) + Number(amountIncome);
  // console.log(totaltic);

  var finalResult;
  var finalRate;

  if (amountExpense === 0 || totaltic === 0) {
    finalResult = "Not started";
    finalRate = 0;
  } else {
    finalResult = totaltic > amountExpense ? "Profit" : "Loss";
    finalRate = ((totaltic - amountExpense) / amountExpense) * 100;
  }

  function addbooking(e) {
    e.preventDefault();


    const isNumberAndTenDigit = (str) => {
      return /^\d{10}$/.test(str);
    };

    if (!isNumberAndTenDigit(phoneNumber)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const newregister = {
      eid,
      bookid: bookid,
      eventName,
      cusName : user.name,
      noOfTicket,
      total: dbprice * noOfTicket,
      email : user.email,
      phoneNumber : phoneNumber,
    };

    const newamount = {
      eid: eid,
      eventName: eventName,
      price: dbprice,
      noOfTicket: ticket,
      totalIncome: totaltic,
      totalExpense: amountExpense,
      result: finalResult,
      rate: finalRate,
    };

    Promise.all([
      axios.post(
        "http://localhost:8080/api/eventregister/addbooking",
        newregister
      ),
      axios.put(
        `http://localhost:8080/api/eventamount/editeamount/${amountOID}`,
        newamount
      ),
    ])
      .then(() => {
        // const text = `${eid} \n ${bookid} \n  \n Dear ${cusName} \n You have successfully registered for the ${eventName} event\n Total = Ticket count * Price \n Total = ${noOfTicket} * ${dbprice} \n Total = ${
        //   noOfTicket * dbprice
        // } \n Thank you`;
        const text = `http://localhost:8080/qr/event/${bookid}`
        QRCode.toDataURL(text).then((data) => {
          setQRCodeSrc(data);
          setShowQRCode(true);
        });
        toast.success("Event registered successfully");

        setName("");
        setTic("");
        setTotal("");
        setEmail("");
        setPhone(0);
        setEventname("");
        setDPrice("");

        // setTimeout(() => {
        //   window.location.href = "events";
        // }, 5000);
      })
      .catch((err) => {
        toast.error(`Please fill all fields`);
      });
  }

  const handleDownloadQRCode = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeSrc;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  /* const handleQRCodeModalClose = () => {
      setShowQRCode(false);
    };*/
  const QRCodeContent = ({
    cusName,
    eventName,
    noOfTicket,
    dbprice,
    total,
  }) => {
    return (
      <html>
        <head>
          <title>QR Code Content</title>
          <style>
            {`
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
              }
              .content {
                max-width: 600px;
                margin: 0 auto;
              }
              `}
          </style>
        </head>
        <body>
          <div className="content">
            <h3>{eid},</h3>
            <p>Dear {cusName},</p>
            <p>You have successfully registered for the {eventName} event.</p>
            <p>Total = Ticket count * Price</p>
            <p>
              Total = {noOfTicket} * {dbprice}
            </p>
            <p>Total = {total}</p>
            <p>Thank you.</p>
          </div>
        </body>
      </html>
    );
  };

  //     useEffect(async() => {

  // }, []);

  async function checkavailable(event, selectedValue) {
    const response = await axios.get(
      "http://localhost:8080/api/eventregister/getbooking"
    );
    const allBookings = response.data.allbooking;
    const filteredBookings = allBookings.filter(
      (booking) => booking.eid === eid
    );

    const totalNoOfTickets = filteredBookings.reduce(
      (acc, booking) => acc + booking.noOfTicket,
      0
    );
    const remaining = size - totalNoOfTickets;
    setRemaining(remaining);
    console.log(remaining);
    if (remaining < 0) {
      toast.error("No more tickets available.");
      setButton(false);
      return;
    }

    if (selectedValue > remaining) {
      if (remaining <= 10) {
        toast.warning(
          `Only ${remaining} tickets are available. Please select a smaller number.`
        );
        setButton(false);
      } else {
        toast.warning(`Only ${remaining} tickets are available.`);
      }
      return;
    }
    setButton(true);
  }

  return (
    <>
      <Header />

      <div className="flex justify-center items-center h-full w-full my-[50px]">
        <div
          className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4"
          style={{ backgroundColor: "#2E4960" }}
        >
          <h1 class="block w-full text-center text-white text-2xl font-bold mb-6">
            Register Event
          </h1>
          <form onSubmit={addbooking} method="post">
            <div class="flex flex-col mb-4 block">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="cusName"
              >
                Event Name
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="text"
                name="eventName"
                id="eventName"
                value={eventName}
                disabled
              />
            </div>
            <div class="flex flex-col mb-4 block">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="cusName"
              >
                Customer Name
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="text"
                name="cusName"
                id="cusName"
                value={user.name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                onKeyPress={(e) => {
                  /* to restrict other character and accept only integer*/
                  const charCode = e.which ? e.which : e.keyCode;
                  if (
                    (charCode < 65 || charCode > 90) &&
                    (charCode < 97 || charCode > 122)
                  ) {
                    e.preventDefault();
                    toast.error("Name must be in alphabets");
                    console.log("Name must be in alphabets");
                  }
                }}
              />
            </div>

            {/* { remaining < 10 && noOfTicket > remaining && (
                <div className="flex mb-4" style={{marginLeft: '17.5%',marginRight:'17.5%'}}>
      <div style={{ color: "red" }}>
        Only {remaining} tickets are available. Please select a smaller number.
      </div></div>
    )} */}

            <div
              className="flex mb-4"
              style={{ marginLeft: "17.5%", marginRight: "17.5%" }}
            >
              <div className="w-1/2 pr-2">
                <label
                  className="block text-lg text-white mb-2"
                  htmlFor="noOfTicket"
                >
                  Tickets
                </label>

                <select
                  className="border py-2 px-3 text-grey-800 rounded-lg w-full"
                  name="noOfTicket"
                  id="noOfTicket"
                  required
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setTic(selectedValue);
                    checkavailable(e, selectedValue);
                  }}
                >
                  <option selected></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="w-1/2 pl-2">
                <label
                  className="block text-lg text-white mb-2"
                  htmlFor="total"
                >
                  Total
                </label>
                <input
                  className="border py-2 px-3 text-grey-800 rounded-lg w-full"
                  type="text"
                  name="total"
                  id="total"
                  value={dbprice * noOfTicket}
                  disabled
                  onChange={(e) => setTotal(e.target.value)}
                />
              </div>
            </div>

            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="email"
              >
                Email
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div class="flex flex-col mb-4">
              <label
                class="mb-2 text-lg text-white"
                style={{ marginLeft: "17.5%" }}
                for="phoneNumber"
              >
                Phone Number
              </label>
              <input
                class="border py-2 px-3 text-grey-800 rounded-lg"
                style={{ width: "65%", alignSelf: "center" }}
                type="tel"
                maxLength={10}
                minLength={10}
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                required
                onChange={(e) => {
                  // if (e.target.value.length !== 10) {
                  //   e.target.setCustomValidity(
                  //     "Phone number must be 10 digits"
                  //   );
                  // } else {
                    // e.target.setCustomValidity("");
                    setPhone(e.target.value);
                  }}
                // }}
                // onKeyPress={(e) => {
                //   /* to restrict other character and accept only integer*/
                //   const charCode = e.which ? e.which : e.keyCode;
                //   if (charCode < 48 || charCode > 57) {
                //     e.preventDefault();
                //     toast.error("Please enter only 10 numbers");
                //     console.log("Please enter only 10 numbers");
                //   }
                // }}
              />
            </div>

            <button
 
              className="block bg-[#F2994A] hover:opacity-90 rounded-full text-white font-bold uppercase text-lg mx-auto p-2 w-[200px]"
              type="submit"
              disabled={!button}
            >
              Register Event
            </button>
          </form>
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
                   <a href={`/events`}>Close</a>
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
        </div>
      </div>

      <Footer />
    </>
  );
}

export default RegisterEvent;
