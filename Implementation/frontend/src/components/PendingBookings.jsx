import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import VSideBar from "./VSideBar";



export default function PendingBookings() {
  const [transports, setTransports] = useState([]);
  const [searchTerm , setSearchTerm] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:8080/api/transport/")
      .then((res) => {
       setTransports(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const handleAccept = (_id) => {
    axios
      .put(`http://localhost:8080/api/transport/${_id}`, { status: "ACCEPTED" })
      .then((res) => {
        const updatedTransport = res.data;
        setTransports((prevState) => {
          const updatedTransports = prevState.map((transport) => {
            if (transport._id === _id) {
              return updatedTransport;
            }
            return transport;
          });
          return updatedTransports;
        });
      })
      .catch((err) => alert(err));
  };
  
  

  const handleReject = (_id) => {
    axios
      .delete(`http://localhost:8080/api/transport/${_id}`, { status: "REJECTED" })
      .then((res) => {
        setTransports([...transports.filter((transport) => transport._id !== _id)]);
      })
      .catch((err) => alert(err));
  };

  return (
    //Main container
    <div className="flex scroll-smooth">
        
        <VSideBar />


    {/*Right Side container start*/}
    <div className="bg-[#d9d9d9] flex-[85%]">

      {/*Header Part*/}
      <div className="bg-[#2E4960] h-100 w-full">
        <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">PENDING & ACCEPTED REQUESTS</h1>

        <div className="flex">

            <div className=" flex p-5">

            <Link to='/tbooking' 
            className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
            >+ADD</Link> 

            </div>
            
              {/*Search*/} 
                <div className="flex h-10 w-200 mt-3">

                  <input type="text" 
                    className=" rounded-3xl py-2.5 px-5 w-[40vh] ml-[800px] text-sm text-gray-900 bg-[#E4EBF7] border-0 border-b-2 border-gray-300 appearance-non focus:outline-none focus:ring-0 focus:border-[#FF9F00] mr-2"
                    placeholder="Search request" 
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                  /> 


            </div>

            
          </div>
      </div>
      
      
      <div>

      

                      {transports.length > 0 && transports.filter((val) => {
                        if (searchTerm === "") {
                            return val;
                        } else if (val.customerId.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        } else if (val._id.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val;
                        }
                    }).map((transport) => (
                        
                    
      

        
          <article
            key={transport.id}
            className="border w-2/4 mx-auto border-gray-400 rounded-lg md:p-4 bg-[#EFF0F6] sm:py-3 py-4 px-2 m-10"
            style={{ borderRadius: '30px' }}
            data-article-path="#"
            data-content-user-id="112962"
          >
            <div role="presentation" >
              <div>
                <div className="m-2">
                  <div className="flex items-center">
                    <div>
                      <p>{transport.customerId}</p>
                      <p>{transport.time}</p>
                    </div>
                  </div>
                </div>
                <div className="pl-12 md:pl-10 xs:pl-10">
                  <h2 className="text-2xl font-bold mb-2  leading-7">
                    BOOKING ID : {transport._id}
                  </h2>
                  <br />
                  <div className="mb-2">
                    <span className="text-opacity-50">
                      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li style={{ display: 'inline-block' }}>
                          *{transport.plocation}
                        </li>
                        <li style={{ display: 'inline-block', marginLeft: '10px' }}>
                          *{transport.dlocation}
                        </li>
                        <li style={{ display: 'inline-block', marginLeft: '10px' }}>
                          *{transport.petType}
                        </li>
                      </ul>

                      <br />

                      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        <li style={{ display: 'inline-block' }}>
                          *{transport.petGender}
                        </li>
                        <li style={{ display: 'inline-block', marginLeft: '10px' }}>
                          *{transport.vaccineStatus}
                        </li>
                        <li style={{ display: 'inline-block', marginLeft: '10px' }}>
                          *{transport.count}
                        </li>
                      </ul>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="bg-[#FF9F00] rounded-xl text-sm px-3 py-2 text-white hover:text-black hover:bg-gray-500"
                      onClick={() => handleAccept(transport._id)}
                      disabled={transport.status === 'ACCEPTED'}
                    >
                      <span>{transport.status === 'ACCEPTED' ? 'ACCEPTED' : 'ACCEPT'}</span>
                    </button>
                    <button
                      type="button"
                      className="ml-2 bg-[#2E4960] rounded-xl text-sm px-3 py-2 text-white hover:text-black hover:bg-gray-500"
                      onClick={() => handleReject(transport._id)}
                      disabled={transport.status === 'REJECTED' || transport.status === 'ACCEPTED'}
                    >
                      <span>{transport.status === 'REJECTED' ? 'REJECTED' : 'REJECT'}</span>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
    </div>
    </div>
    </div>
    
  );
      }
