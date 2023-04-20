import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import inv from "../assets/inv.jpg"
import axios from 'axios'
import InventorySideBar from "./InventorySideBar";

function InvItemUpdate() {

    const param =  useParams();
    const id = param.id
    console.log(id)

    const [item, setItem] = useState({})
    const [item_code,setItemCode] = useState("")
    const [item_name,setItemName] = useState("")
    const [item_brand,setItemBrand] = useState("")
    const [category,setItemCategory] = useState("")
    const [qty,setItemQty] = useState("")

    async function getItem() {
      try {
        const res = await axios.get(`http://localhost:8080/api/inventory/items/${id}`);
        const oneItem = res.data.item;
        console.log(oneItem);
        setItem(oneItem)

      } catch (err) {
        console.error(err);
      }
    }

  useEffect(()=>{

      getItem()
   

  },[])


  useEffect(() => { 
    setItemCode(item.item_code) 
    setItemName(item.item_name)
    setItemBrand(item.item_brand)
    setItemCategory(item.category)
    setItemQty(item.qty)

  },[item])




  async function UpdateItem(e){
    console.log("clicked")

    e.preventDefault();

    try{
      const newItem = {
        item_code,
        item_name,
        item_brand,
        category,
        qty
    }

      await axios.put(`http://localhost:8080/api/inventory/items/${id}`, newItem)
      alert("item Updated !!")

    }catch (err){
      console.error(err);
  }

}


  return (
    //Main container
     <div className="flex scroll-smooth">
         <InventorySideBar />

     {/*Right Side container start*/}
     <div className="bg-[#d9d9d9] flex-[85%]">

       {/*Header Part*/}
       <div className="bg-[#2E4960] h-100 w-full">
         <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 h-[70px]">EDIT ITEM</h1>

       </div>

       {/*Body Part*/}
       <div 
         style={{ backgroundImage: `url(${inv})` }}
         className="bg-cover bg-center h-screen w-full fixed" >

                <div className=" bg-white bg-opacity-90 w-[85%] h-full top-5 left-[80px] overflow-scroll">        

                 <div className="w-[800px] mx-auto rounded-2xl bg-white mt-20">

                 <h1 
                 className=" text-[#ffffff] bg-[#FF9F00] rounded-t-2xl font-bold text-3xl h-20 mb-4 pt-5 text-center drop-shadow-md"
                 >Edit Item Details</h1>

                     <form className="mx-auto" onSubmit={UpdateItem}>
                         <div className=" px-4">

                             <div className="flex mb-6">
                                 <div>
                                     <label className="">Item Code :</label>
                                     <input type="text" 
                                     className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#a6b0c4] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                     value={item_code}
                                     readOnly/>                        
                                 </div>

                                 <div>
                                     <label className="">Item Name :</label>
                                     <input type="text"
                                     className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                     value={item_name}
                                     onChange={(e)=>{
                                         setItemName(e.target.value)}} required />                        
                                 </div>
                             </div>

                             <div className="flex mb-6">
                                 <div className=" w-[50%]  ">
                                     <label className="">Item Brand :</label>
                                     <input type="text" 
                                     className=" rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                     value={item_brand}
                                     onChange={(e)=>{
                                         setItemBrand(e.target.value)}} required />                        
                                 </div>

                                 <div className=" w-[50%]  ">
                                     <label className="">Item Category :</label>
                                     <select 
                                     className="block rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] "
                                     value={category}
                                     onChange={(e)=>{
                                         setItemCategory(e.target.value)}} >
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
                                 className="rounded-3xl py-2.5 px-5 w-[50vh] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" 
                                 value={qty}
                                 onChange={(e)=>{
                                     setItemQty(e.target.value)}}
                                 required />                        
                             </div>
                     </div>

                             <button type="submit" 
                             className="text-white bg-[#FF9F00] hover:bg-[#2E4960] mb-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-3xl text-l sm:w-auto px-12 py-2.5 text-center ml-[300px]"
                             >UPDATE</button>
                     </form>

                 </div>
                
             </div>
 
       </div>

     </div> {/*Right Side container end*/}
   </div> //Main container end

 )
}

export default InvItemUpdate