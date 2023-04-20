import axios from 'axios'
import React, { useState,useRef,useEffect  } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddEvent() {

  
  const [eventName,setEName] = useState("")
  const [event,setEvent] = useState([])
  const [name,setName] = useState("")
  const [description,setDesc] = useState("")
  const [startTime,setStart] = useState("")
  const [endTime,setEnd] = useState("")
  const [date,setDate] = useState("")
  const [venue,setVenue] = useState("")
  const [price,setPrice] = useState("")
  const [status,setStatus] = useState("Pending")
  const [eid, setId] = useState("");
  const [nextId,setNextId] = useState("")
  const [image,setImage] = useState('');
  const [size,setSize] = useState("")
  const [firstId, setFirstId] = useState("");

  useEffect(() => {
    async function getEvents() {
      try {
        const res = await axios.get("http://localhost:8080/api/event/getEvents");
        // const eids = res.data.allevents.map((event) => event.eid);
        // const lastId = parseInt(eids[eids.length - 1], 10);
        // setId(eids);
        // console.log(lastId);
        // setlastId(lastId)
      } catch (err) {
        toast.error(err);
      }
    }
    
      getEvents();
    }, []);
    
    useEffect(() => {
      async function getEventAmounts() {
        try {
          const res = await axios.get("http://localhost:8080/api/eventamount/geteamounts");
          const eids = res.data.alleamount.map((event) => event.eid);
          if(!eids.length) {
            setId("E1");
          } else {
            const lastId = eids[eids.length - 1];
            const nextId = "E" + (parseInt(lastId.slice(1)) + 1);
            setId(nextId);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getEventAmounts();
    }, []);
    
      console.log(firstId);
  function addEvent(e){

    e.preventDefault();
 
    // const newid = lastId+1;
    const newevent = {
      eid:eid,   
      name,
      description,
      startTime,
      endTime,
      date,
      venue,
      price,
      status,
      image,
      size
          
    }
    const newamount = {
            eid:eid, 
            eventName,
            price,
            noOfTicket:0,
            totalIncome:0,
            totalExpense:0,
            result:'Not Stared',
            rate:0.0

    }
       // console.log(eid);
    Promise.all([
      axios.post("http://localhost:8080/api/event/addEvent", newevent,{
        headers:{
          "Content-Type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*"
        }
      }),
        axios.post("http://localhost:8080/api/eventamount/addeamount", newamount)
          ]).then(()=>{
       
        toast.success("Event added successfully");
        setEName("")
        setName ("")
        setDesc ("")
        setStart ("")
        setEnd("")
        setDate ("")
        setVenue ("")
        setPrice (0)
       setVenue ("")

     // Navigate to getEvents page after 5 seconds
    setTimeout(() => {
      window.location.href = "getEvents";
    }, 5000);
  })
  .catch(error => {
    //console.log(error);
    // Show error message
    toast.error("Error while adding event");
  });

  }

   
    
    
    useEffect(() => {
    
      const lastEvent = event.slice(-1)[0];
    
    }, [event]); 

    function convertToBase64(e) {
      console.log(e);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
      console.log(reader.result)
       setImage(reader.result)
    };
        reader.onerror = error => {
        console.log("Error: ", error)
    };
  
  }
  return (
    <>
    
    <div class="p-4 sm:ml-64" style={{marginTop:'20px'}}>
    <div className="flex justify-center items-center h-full w-full " style={{marginTop:'70px'}}>

    <div className="w-1/2 bg-white rounded-lg shadow-2xl p-8 m-4" style={{ backgroundColor: "#2E4960", alignSelf:'center' }}>
    <div class="flex flex-row-reverse space-x-4 space-x-reverse ...">
    <Link to="/eventdashboard/getEvents" style={{color:'white'}}>Back</Link>
    </div>
        <h1 class="block w-full text-center text-white text-2xl font-bold mb-6">Add Event</h1>
        <form onSubmit={addEvent} method="post" >
      
            <div class="flex flex-col mb-4 block">
                <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="name">Event Name</label>
                <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center' }} type="text" name="name" id="name" required onChange={(e)=>{
                setName(e.target.value);setEName(e.target.value)}}/>
            </div>

            <div class="flex flex-col mb-4">
                <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="description">Description</label>
                <textarea className="w-full border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center'  }} type="text" name="description" id="description" required onChange={(e)=>{
                setDesc(e.target.value)}}/>
            </div>

            <div class="flex flex-col mb-4">
            <label class="mb-2 text-lg text-white" style={{ marginLeft: '17.5%' }} for="startTime">Start Time </label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: '65%', alignSelf: 'center' }} type="time" name="startTime" id="startTime" required
            onChange={(e) => {
            const timeString = e.target.value; // get the time string in the format "HH:MM"
            const timeArray = timeString.split(':'); // split the time string into hours and minutes
            let hours = parseInt(timeArray[0]); // parse the hours as an integer
            let amOrPm = 'AM'; // set the default to "AM"
            if (hours >= 12) {
              hours = hours - 12; // convert to 12-hour format
              amOrPm = 'PM'; // set to "PM"
            }
            if (hours === 0) {
              hours = 12; // handle the case of midnight (0 hours)
            }
             const formattedTime = `${hours}:${timeArray[1]} ${amOrPm}`; // create the formatted time string
             setStart(formattedTime); // set the state to the formatted time string
             }}/>
            </div>

            <div class="flex flex-col mb-4">
            <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="endTime">End Time</label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center'  }} type="time" name="endTime" id="endTime" required
            onChange={(e)=>{
            const timeString = e.target.value; // get the time string in the format "HH:MM"
            const timeArray = timeString.split(':'); // split the time string into hours and minutes
            let hours = parseInt(timeArray[0]); // parse the hours as an integer
            let amOrPm = 'AM'; // set the default to "AM"
            if (hours >= 12) {
            hours = hours - 12; // convert to 12-hour format
            amOrPm = 'PM'; // set to "PM"
            }
            if (hours === 0) {
              hours = 12; // handle the case of midnight (0 hours)
            }
            const formattedTime = `${hours}:${timeArray[1]} ${amOrPm}`; // create the formatted time string
            setEnd(formattedTime); // set the state to the formatted time string
             }}/>
            </div>

            <div class="flex flex-col mb-4" >
            <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="date">Date</label>
             <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center'  }} type="date" name="date" id="date" required onChange={(e)=>{
            setDate(e.target.value)}}/>
            </div>

            <div class="flex flex-col mb-4">
            <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="venue">Venue</label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center'  }} type="text" name="venue" id="venue" required onChange={(e)=>{
             setVenue(e.target.value)}}/>
            </div>

            <div class="flex flex-col mb-4">
            <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="price">Price</label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center'  }} type="number" min="0" step="1" name="price" id="price" required onChange={(e)=>{
            setPrice(e.target.value)}}/>
            </div>

             <div class="flex flex-col mb-4">
            <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="size">Participant Size</label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg" style={{ width: "65%", alignSelf:'center'  }} type="text" name="size" id="size" required placeholder='If unlimited, type unlimited or type exact number' onChange={(e)=>{
             setSize(e.target.value)}}/>
            </div>

            <div class="flex flex-col mb-4">
            <label class="mb-2 text-lg text-white" style={{marginLeft:'17.5%'}} for="image">Add Image</label>
            <input class="border py-2 px-3 text-grey-800 rounded-lg text-white" type="file" style={{marginLeft:'17.5%',width: "65%"}}  onChange={convertToBase64}/>
            {image == "" || image == null ? "" : <img width={100} height={100} src={image} style={{marginLeft:'17.5%',marginTop:'10px'}} />}
           </div>

            <button style={{ backgroundColor: '#F2994A' }} className="block bg-teal-400 hover:bg-teal-600 text-white font-bold uppercase text-lg mx-auto p-2 rounded-lg" type="submit">Create Event</button>
          
        </form>
       
    </div>
</div>
    
</div>
 </>
  )
}

export default AddEvent