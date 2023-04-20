import React, {useState,useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditBooking(){


    const param =  useParams();
    const id = param.id
    console.log(id)

    const [event,setEvent] = useState([]);
    const [Register,setRegister] = useState([]);
    const [eventName,setEName] = useState("")
    const [cusName,setCName] = useState("")
    const [noOfTicket,setTicket] = useState(0)
    const [total,setTotal] = useState(0)
    const [email,setEmail] = useState("")
    const [phoneNumber,setNumber] = useState("")
    const [dbprice,setDPrice] = useState("")
    const [oldCount,setOldTicketCount] = useState(0)
    const [oldTotal,setOldTotal] = useState(0)
    const [eid,setID] = useState("")
    const [amountId,setAmountID] = useState("")
    const [amountOID, setAmountOID] = useState(null);

    const [amountName,setAmountName] = useState("")
    const [amountPrice,setAmountPrice] = useState("")
    const [amountTicket,setAmountTicket] = useState("")
    const [amountIncome,setAmountIncome] = useState("")
    const [amountExpense,setAmountExpense] = useState("")
    const [amountResult,setAmountResult] = useState("")
    const [amountRate,setAmountRate] = useState("")
    const [eventAmount,setEventAmount] = useState({});
    

        useEffect(()=>{

        async function getbooking(){
            try{
            const res = await axios.get(`http://localhost:8080/api/eventregister/getbooking/${id}`)
           console.log(res.data.book)
            setRegister(res.data.book)
            
           


          const amountRes = await axios.get("http://localhost:8080/api/eventamount/geteamounts");
          const allEventAmounts = amountRes.data.alleamount;
          const amount = allEventAmounts.filter((ea) => ea.eid === res.data.book.eid)[0];
          console.log(amount)
          setEventAmount(amount)
          
          const a = amount._id;
          console.log(a);
          setAmountOID(a);
                
            }catch(err){

                toast.error(err)

            }
        } 

        getbooking()
        },[])

        useEffect(() => {
          setID(Register.eid)
          setEName(Register.eventName);
          
            setOldTicketCount(Register.noOfTicket)
            setOldTotal(Register.total);
            setCName(Register.cusName);
            setTicket(Register.noOfTicket);
            setTotal(Register.total);
            setEmail(Register.email);
            setNumber(Register.phoneNumber);
       // console.log(event.startTime);
      }, [Register]);

      useEffect(() => {
        async function getEvent() {
          try {
            const res = await axios.get(`http://localhost:8080/api/event/getEvents`);
            console.log(res.data.allevents);
            setEvent(res.data.allevents);
      
            if (eventName) {
              const targetEvent = res.data.allevents.find((e) => e.name === eventName);
              if (targetEvent) {
                setDPrice(targetEvent.price);
                console.log(targetEvent);
                setTotal(targetEvent.price * noOfTicket);
              }
            }
          } catch (err) {
            toast.error(err);
          }
        }
      
        getEvent();
      }, [eventName, noOfTicket]);

      



      useEffect(() => {
        setAmountOID(eventAmount._id)
       setAmountID(eventAmount.eid)
       setAmountName(eventAmount.eventName);
       setAmountPrice(eventAmount.price);
       setAmountTicket(eventAmount.noOfTicket);
       setAmountIncome(eventAmount.totalIncome);
       setAmountExpense(eventAmount.totalExpense);
       setAmountResult(eventAmount.result);
       setAmountRate(eventAmount.rate);
       console.log(eventAmount.eventName)
     }, [eventAmount]);


      async function EditBooking(e){

        

        e.preventDefault();

        try{

        const newBooking = {
            eid,
            eventName,
            cusName,
            noOfTicket,
            total,
            email,
            phoneNumber
        }
       
        var expense = amountExpense
        if(oldCount !== noOfTicket){
         
            var ticket = Number(amountTicket)-Number(oldCount)
            ticket = Number(ticket)+Number(noOfTicket)
            console.log(ticket);
        
        
        
        var totaltic = Number(amountIncome) - Number(oldTotal);
        totaltic = Number(dbprice*noOfTicket) + Number(totaltic);
        console.log(totaltic);
     
        var finalResult;
        var finalRate;
     
        if (amountExpense === 0 || totaltic === 0) {
         finalResult = "Not started";
         finalRate = 0;
       } else {
         finalResult = totaltic > amountExpense ? "Profit" : "Loss";
         finalRate = ((totaltic - amountExpense) / amountExpense) * 100;
       }
      }
       console.log(amountOID)
        const newamount = {
          eid: eid,
          eventName: eventName,
          price: amountPrice,
          noOfTicket: ticket,
          totalIncome: totaltic,
          totalExpense: expense,
          result: finalResult,
          rate: finalRate
        };
        Promise.all([
        axios.put(`http://localhost:8080/api/eventregister/editBooking/${id}`,newBooking),
       axios.put(`http://localhost:8080/api/eventamount/editeamount/${amountOID}`, newamount)
      ])
        toast.success("Booking Updated Successfully")
        setTimeout(() => {
          window.location.href = "/eventdashboard/eventbooking";
        }, 5000);
       
       }catch (err){
        toast.error(err);
      }

    }



      
          
return(

    <>
    
    <div class="p-4 sm:ml-64"  style={{marginTop:'20px'}}>
   
    <div className="flex justify-center items-center h-full w-full " style={{marginTop:'70px'}}>
    <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4" style={{ backgroundColor: "#2E4960", alignSelf:'center' }}>
      
        <div class="flex flex-row-reverse space-x-4 space-x-reverse ...">
    <Link to="/eventdashboard/eventbooking" style={{color:'white'}}>Back</Link>
    </div>
    <h1 class="block w-full text-center text-white text-2xl font-bold mb-6">Edit Booking</h1>

   
    
   

    <form onSubmit={EditBooking}>
        {/* <div class="flex flex-col mb-4 block">
                <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="cusName">Event Name</label>
                <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center' }} type="text" name="eventName" id="eventName" value={eventName}  required onChange={(e)=>{
        setEName(e.target.value)}}/>
        </div> */}
        <div class="flex flex-col mb-4 block">
  <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="eventName">Event Name</label>
  <select class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center' }} name="eventName" id="eventName" value={eventName} onChange={(e) => setEName(e.target.value)}>
    <option value="">Select an event</option>
    {event.map((event) => (
      <option key={event.id} value={event.id}>{event.name}</option>
    ))}
  </select>
</div>
            <div class="flex flex-col mb-4 block">
                <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="cusName">Customer Name</label>
                <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center' }} type="text" name="cusName" id="cusName" value={cusName} required onChange={(e)=>{
        setCName(e.target.value)}}
        onKeyPress={(e) => {                                           /* to restrict other character and accept only integer*/
        const charCode = e.which ? e.which : e.keyCode;
        if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
          e.preventDefault();
          alert('Name must be in alphabets')
          console.log('Name must be in alphabets');
        }
      }}/>
            </div>
            <div className="flex mb-4" style={{marginLeft: '17.5%',marginRight:'17.5%'}}>
  <div className="w-1/2 pr-2">
    <label className="block text-lg text-white mb-2" htmlFor="noOfTicket">Tickets</label>
    <select className="border py-2 px-3 text-grey-800 rounded-lg w-full" name="noOfTicket" id="noOfTicket" value={noOfTicket} required onChange={(e) => setTicket(e.target.value)
    }>
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
    <label className="block text-lg text-white mb-2" htmlFor="total">Total</label>
    <input className="border py-2 px-3 text-grey-800 rounded-lg w-full" type="text" name="total" id="total" value={dbprice * noOfTicket} disabled onChange={(e) => setTotal(e.target.value)} />
 
  </div>
</div>

            


            <div class="flex flex-col mb-4">
                <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="email">Email</label>
                <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center' }} type="email" name="email" id="email" value={email} onChange={(e)=>{
        setEmail(e.target.value)}}/>
            </div>
            <div class="flex flex-col mb-4">
  <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="phoneNumber">Phone Number</label>
  <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center' }} type="tel" maxLength={10} minLength={10} name="phoneNumber" id="phoneNumber" value={phoneNumber} required onChange={(e)=>{
    if (e.target.value.length !== 10) {
      e.target.setCustomValidity('Phone number must be 10 digits');
    } else {
      e.target.setCustomValidity('');
      setNumber(e.target.value);
    }
  }} onKeyPress={(e) => {                                           /* to restrict other character and accept only integer*/
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
      console.log('Please enter only 10 numbers');
    }
  }} />
</div>




 
            <button style={{ backgroundColor: '#F2994A' }} className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text-lg mx-auto p-2 rounded" type="submit">Update Booking</button>
          
        </form>
</div>
</div>
</div>

</>  

);
};




