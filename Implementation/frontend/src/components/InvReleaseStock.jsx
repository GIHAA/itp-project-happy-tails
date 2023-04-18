import React, {useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import inv from "../assets/inv.jpg"
import axios from 'axios'
import InventorySideBar from "./InventorySideBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function InvReleaseStock() {

  const [Items , setItems] = useState([]);
  const [newQty, setNewQty] = useState(0);
  const [searchTerm , setSearchTerm] = useState("");


  useEffect(()=>{

        axios.get("http://localhost:8080/api/inventory/items/")
        .then((res) => {
          setItems(res.data)
          console.log(Items)
        })
        .catch(err => alert(err))

  }, []) 


  async function handleRelease ({item_code, item_name, item_brand, category, qty}, newQty) {
    console.log(newQty)
    if(qty < 1) {
        alert('Cannot release, item is out of stock')
    
    }else if(newQty < 1){
        alert('please enter valid qty')

    }else if(qty < newQty){
        alert('Cannot release, insufficient qty')

    }else{

        //creating object record
        const item = {
            item_code,
            item_name,
            item_brand,
            category,
            qty,
            newQty
        }


        //sending the item object to the releasestock backend
        await axios.post("http://localhost:8080/api/inventory/releasestock", item)
        .then(()=>{
            toast.success(`Sucessfully released ${newQty} ${item_brand} ${item_name}s`, {position: toast.POSITION.BOTTOM_RIGHT,})

        }).catch((err)=>{
                    alert(`${err.response.data.message}`)
                    console.log(err)
        })

        //creating the object to send the item to backend to update qty
        const obj = {
            item_code,
            release_qty : newQty
        }

        console.log(obj)


        //sending the object to the item backend to update the qty
        await axios.put(`http://localhost:8080/api/inventory/items/subtractqty` , obj)
        .then(()=>{ 

          const updatedQty = qty - newQty 
            // Update the state variable to reflect the updated quantity
            setItems(Items.map(item => {
              
              if (item.item_code === item_code) {
                return { ...item, qty: updatedQty };
                
                
              } else {
                return item;
              }
            }))
            

            if(updatedQty === 0){
              toast.error(`${item_code} is out of stock`, {position: toast.POSITION.BOTTOM_RIGHT,})
  
            }

        }).catch((err)=>{
            console.error(err);
        })



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
            <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">RELEASE STOCKS</h1>

            <div className="flex">

                <div className=" flex p-5">

                <Link to='/releasestock' 
                className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
                >RELEASE</Link> 


                </div>
                
                  {/*Search*/}
                  <div className="flex h-10 w-100 mt-3">

                    <input type="text" 
                    className=" rounded-3xl py-2.5 px-5 w-[40vh] ml-[800px] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                    placeholder="Search item" 
                    onChange={(e) => {setSearchTerm(e.target.value)}}/> 

                  </div>
                 

                
              </div>
          </div>
  
          {/*Body Part*/}
          <div 
            style={{ backgroundImage: `url(${inv})` }}
            className="bg-cover bg-center h-screen w-full fixed" >
                {/*White box*/}
                <div className=" bg-white bg-opacity-90 w-[85%] h-full top-5 left-[80px] overflow-scroll">                    {/*Table*/}
                    <table className="mx-auto my-10 w-[1250px]">

                    <thead className=" bg-[#FF9F00] text-white sticky top-0">
                        <tr>
                        <th className="p-3">item_code</th>
                        <th className="p-3">item_name</th>
                        <th className="p-3">item_brand</th>
                        <th className="p-3">category</th>
                        <th className="p-3">available qty</th>
                        <th className="p-3">release qty</th>
                        <th className="p-3">action</th>
                        </tr>
                    </thead>
                    
                    <tbody  className="bg-white text-center">

                    {Items.filter((val)=>{
                      if(searchTerm == "") {
                        return val;
                      }else if(val.item_name.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }else if(val.item_code.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }
                    }).map((item) => {
                      return(

                        <>
                        <tr className="hover:bg-[#efeeee]">
                          <td className="p-3">{item.item_code}</td>
                          <td className="p-3">{item.item_name}</td>
                          <td className="p-3">{item.item_brand}</td>
                          <td className="p-3">{item.category}</td>
                          <td className="p-3">{item.qty}</td>
                          <td className="p-3">
                            <input type="number"
                            placeholder="Enter quantity.." 
                            onChange={(e)=> {
                                setNewQty(e.target.value)
                            }}
                            className=" bg-[#E4EBF7]  text-gray-900 border-0 border-b-2 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00]" /
                            >
                          </td>
                        
                          <td className="p-3">
                  
                              <button className="px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#ffc05a] rounded-xl "
                              onClick={() => handleRelease(item, newQty) }>Release</button>
                          </td>
                        
                        </tr>
                        
                        </>

                      )
                    })}

                  
                    </tbody>
                    </table>
                    <div className=" h-96"></div>

                </div>

          </div>

        </div> {/*Right Side container end*/}
      </div> //Main container end

    )
}


