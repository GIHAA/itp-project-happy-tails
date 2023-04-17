import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import inv from "../assets/inv.jpg"
import InventorySideBar from "./InventorySideBar";

function InvRequestStock() {

    const [item_code,setItemCode] = useState("")
    const [item_name,setItemName] = useState("")
    const [item_brand,setItemBrand] = useState("")
    const [category,setItemCategory] = useState("")
    const [qty,setItemQty] = useState("")

    const [canceled, setCanceled] = useState(false);
    const [Items , setItems] = useState([]);


      useEffect(()=>{

        axios.get("http://localhost:8080/api/inventory/items/")
        .then((res) => {
          setItems(res.data)
        })
        .catch(err => alert(err))

    }, []) 
    
  
    function requestStock(e) {
      e.preventDefault();

      if (canceled) {
        return;
      }

      const newRequest = {
          item_code,
          item_name,
          item_brand,
          category,
          qty
      }

      axios.post("http://localhost:8080/api/inventory/stockrequest",newRequest)
      .then(()=>{
          alert("stock request successful")

     }).catch((err)=>{
              alert(`stock request unsuccessful ${err}`)
     })


  }

  const handleReset = () => {
    setCanceled(true);
  };


  const handleItemCodeChange = (e) => {
    const itemCode = e.target.value;
    const selectedItem = Items.find((item) => item.item_code === itemCode);
    console.log(selectedItem)


    setItemCode(selectedItem.item_code)
    setItemName(selectedItem.item_name)
    setItemBrand(selectedItem.item_brand)
    setItemCategory(selectedItem.category)
  };


  return (
    //Main container
    <div className="flex scroll-smooth">
    <InventorySideBar />


  {/*Right Side container start*/}
  <div className="bg-[#d9d9d9] flex-[85%]">

    {/*Header Part*/}
    <div className="bg-[#2E4960] h-100 w-full">
      <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">REQUEST STOCKS</h1>

      <div className="flex">

          <div className=" flex p-5">

          <Link to='/requeststock' 
          className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
          >REQUEST</Link> 

          <Link to='/requestedstock' 
          className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] mr-2"
          >REQUESTED STOCKS</Link> 

          </div>
        </div>
    </div>

    {/*Body Part*/}
    <div 
      style={{ backgroundImage: `url(${inv})` }}
      className="bg-cover bg-center h-screen w-full fixed" >
          {/*White box*/}
          <div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">

          <div className="w-[800px] h-[450px] mx-auto rounded-2xl bg-white mt-8">

        <h1 
        className=" text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md"
        >Enter Stock Details</h1>

        <div className=" pl-5">
        <form className="mx-auto" onSubmit={requestStock} onReset={handleReset}>

                <div className="flex mb-6">
                    <div>
                        <label className="">Item Code :</label>

                        <select name="itemCode" onChange={handleItemCodeChange}
                         className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-8">
                          <option>SELECT ITEM CODE</option>
                          {Items.map((item) => (
                          <option value={item.item_code}>
                            {item.item_code}
                          </option>
                        ))}
                      </select>
                       
                    </div>
                    

                    <div>
                        <label className="">Item Name :</label>
                        <input type="text"
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                        value={item_name} readOnly/>                        
                    </div>
                </div>

                <div className="flex mb-6">
                    <div className=" w-[50%]  ">
                        <label className="">Item Brand :</label>
                        <input type="text" 
                        className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                        value={item_brand} readOnly/>                        
                    </div>

                    <div className=" w-[50%]  ">
                        <label className="">Item Category :</label>
                        <select 
                        value={category}
                        className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                        readOnly>
                              <option>Select a category</option>
                              <option value="food">FOOD</option>
                              <option value="medicine">MEDICINE</option>
                              <option value="toys">TOYS</option>
                              <option value="bathroom-essentials">BATHROOM ESSENTIALS</option>
                              <option value="grooming-equipments">GROOMING EQUIPMENTS</option>
                              <option value="event-items">EVENT ITEMS</option>
                              <option value="other">OTHER</option>
                        </select>
                                            
                    </div>

                </div>

                <div className=" w-[50%] mb-6 ">
                    <label className="">Item Quantity :</label>
                    <input type="number"
                    min={1}
                    className="rounded-3xl py-2.5 px-5 w-[50vh] 
                    text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 
                    appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]"
                    onChange={(e)=>{
                      setItemQty(e.target.value)}} />
                </div>
                    

                <div className="flex mt-14">

                    <button type="reset"
                    className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-20 py-.5 text-center ml-[130px]"
                    >Cancel </button>

                    <button type="submit" 
                    className="text-white bg-[#FF9F00] hover:bg-[#2E4960] focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-14 py-2 text-center ml-[100px]"
                    >Send Request</button>


                </div>
        </form>
        </div>

</div>




          </div>

    </div>

  </div> {/*Right Side container end*/}
</div> //Main container end
  )
}



export default InvRequestStock