import React from 'react'

function Card(props) {
  return (
  
        <div className="grid grid-cols-1 gap-[70px] px-[80px] py-[40px] h-[200px]p-[50px] rounded-[20px]">
          <div className="grid grid-cols-3 gap-[20px] px-[120px] h-[300px] ">
            <div
              className="bg-cover bg-center rounded-[20px]"
              style={{
                backgroundImage:
                  "url('https://i.pinimg.co/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg')",
              }}
            ></div>

            <div className="col-span-2 rounded-[20px] bg-bg p-4">
              <h1 className="font-bold text-secondary text-[30px]">
                {props.name}
              </h1>
              <p className="text-text">
                {props.des}
              </p>
              <ul class="list-disc list-inside text-text">
                <li>breed : {props.breed}</li>
                <li>gender : {props.gender}</li>
              </ul>
              <div className="flex justify-end pt-3">
                <button className="rounded-[20px] w-[100px] h-[40px] border-[1px] bg-secondary text-white font-bold-sm ">
                  Adopt
                </button>
              </div>
            </div>
          </div>
        </div>
    
  )
}

export default Card