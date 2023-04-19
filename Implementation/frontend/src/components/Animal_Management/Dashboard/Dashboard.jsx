// In PetCounts.js

import axios from 'axios';
import React, { useState, useEffect,PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Sector, Cell, Legend,BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


function Dashboard() {
  const [normalCount, setNormalCount] = useState(0);
  const [avaCount, setAvaCount] = useState(0);
  const [adoCount,  setAdoCount] = useState(0);
  const [criticalCount, setCriticalCount] = useState(0);
  const [payData, setpayData] = useState([]);
  const [isError, setIsError] = useState("");
  const [petCount, setPetCount] = useState(0);
  const [petCountsByIndex, setPetCountsByIndex] = useState([]);
  const [lastbreeds, setLastBreed] = useState([]);
  const [lastPet, setLastPet] = useState([]);

  useEffect(() => {
    async function healthCounts() {
      try {
        const response = await axios.get('http://localhost:5000/api/petstatus/statuscount');
        setNormalCount(response.data.normalCount);
        setCriticalCount(response.data.criticalCount);
      } catch (err) {
        console.error(err);
      }
    }
    healthCounts();
  }, []);

  useEffect(() => {
    async function lastbreed() {
      try {
        const response = await axios.get('http://localhost:5000/api/petstatus/lastbreed');
        setLastBreed(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    lastbreed();
  }, []);

  useEffect(() => {
    async function lastPetProfile() {
      try {
        const response = await axios.get('http://localhost:5000/api/petstatus/lastpets');
        setLastPet(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    lastPetProfile();
  }, []);

  
  useEffect(() => {
    async function petStatusCounts() {
      try {
        const response = await axios.get('http://localhost:5000/api/petstatus/petcount')
        setAvaCount(response.data.avaCount);
        setAdoCount(response.data.adpCount);
      } catch (err) {
        console.error(err);
      }
    }
    petStatusCounts();
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/booking')
      .then(response => {
        const data = response.data;
        setpayData(data);
        const filteredData = data.filter(item => item.status === 'SHELTERED');
        const petCounts = filteredData.map(item => item.mini.length);
        const totalPetCount = petCounts.reduce((a, b) => a + b, 0);
        setPetCount(totalPetCount);
        setPetCountsByIndex(petCounts);
      })
      .catch(error => setIsError(error.message));
  }, []);


  const data = [
    { name: 'Normal Health', value: normalCount },
    { name: 'Critical Health', value: criticalCount },

  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };



  const speciescount = [
    {
      name: 'Shelter Pets',
      uv:32,
      pv: petCount,
      amt: petCount,
    },
    {
      name: 'Adopted Pets',
      uv: 32,
      pv: adoCount,
      amt: adoCount,
    },
    
  ];

  return (
    <div className='bg-gray-200'>
<div>.</div>
<div id="wrapper" class="ml-[300px] mt-[70px] px-4 py-4 mx-auto">
            <div class="sm:grid sm:h-32 mr-[50px] sm:grid-flow-row sm:gap-4 sm:grid-cols-5 ">
                <div id="jh-stats-positive" class="flex flex-col justify-center px-4 py-4 bg-[#f5f5f5] shadow-md border border-gray-300 rounded">
                    <div>
                        <div>
                            <p class="flex items-center justify-end text-green-500 text-md">
                                <span class="font-bold">6%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"/></svg>
                            </p>
                        </div>
                        <p class="text-3xl font-semibold text-center text-gray-800">{normalCount}</p>
                        <p class="text-lg pt-2 text-center text-gray-500">Normal Health</p>
                    </div>
                </div>

                <div id="jh-stats-positive" class="flex flex-col justify-center px-4 py-4 bg-[#f5f5f5] shadow-md border border-gray-300 rounded">
                    <div>
                        <div>
                            <p class="flex items-center justify-end text-green-500 text-md">
                                <span class="font-bold">6%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"/></svg>
                            </p>
                        </div>
                        <p class="text-3xl font-semibold text-center text-gray-800">{criticalCount}</p>
                        <p class="text-lg text-center pt-2 text-gray-500">Critical Health</p>
                    </div>
                </div>
    
                <div id="jh-stats-negative" class="flex flex-col justify-center px-4 py-4 mt-4 bg-[#f5f5f5] shadow-md border border-gray-300 rounded sm:mt-0">
                    <div>
                        <div>
                            <p class="flex items-center justify-end text-red-500 text-md">
                                <span class="font-bold">6%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                            </p>
                        </div>
                        <p class="text-3xl font-semibold text-center text-gray-800">{petCount}</p>
                        <p class="text-lg text-center text-gray-500">Shelterd Pets</p>
                    </div>
                </div>

                <div id="jh-stats-negative" class="flex flex-col justify-center px-4 py-4 mt-4 bg-[#f5f5f5] shadow-md border border-gray-300 rounded sm:mt-0">
                    <div>
                        <div>
                            <p class="flex items-center justify-end text-red-500 text-md">
                                <span class="font-bold">6%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"/></svg>
                            </p>
                        </div>
                        <p class="text-3xl font-semibold text-center text-gray-800">{adoCount}</p>
                        <p class="text-lg text-center text-gray-500">Adopted Pets</p>
                    </div>
                </div>

                <div id="jh-stats-neutral" class="flex flex-col justify-center px-4 py-4 mt-4 bg-[#f5f5f5] shadow-md border border-gray-300 rounded sm:mt-0">
                    <div>
                        <div>
                            <p class="flex items-center justify-end text-gray-500 text-md">
                                <span class="font-bold">0%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path class="heroicon-ui" d="M17 11a1 1 0 010 2H7a1 1 0 010-2h10z"/></svg>
                            </p>
                        </div>
                        <p class="text-3xl font-semibold text-center text-gray-800">{avaCount}</p>
                        <p class="text-lg text-center text-gray-500">Available Pets</p>
                    </div>
                </div>
            </div>
        </div>



        <div class="w-full mt-5 ml-[1000px] h-[500px] max-w-md  p-4 bg-[#f5f5f5] shadow-md border border-gray-200 rounded-lg  sm:p-8 ">
  <div class="flex items-center justify-between mb-4">
    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-Black">Latest Breeds</h5>
    <Link to='/petprofile/breed' class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
      View all
    </Link>
  </div>
  <div class="flow-root">
    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
      {lastbreeds.map(lbreed => (
        <li key={lbreed._id} class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-1 min-w-0">
              <div>
                <p class="text-lg font-bold text-gray-900 dark:text-Black">
                  {lbreed.breed}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-600">
                  ({lbreed.date})
                </p>
              </div>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-Black">
              {lbreed.species}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>


<div class="w-full mt-5 ml-[1000px] h-[500px] max-w-md  p-4 bg-[#f5f5f5] shadow-md border border-gray-200 rounded-lg  sm:p-8 ">
  <div class="flex items-center justify-between mb-4">
    <h5 class="text-xl font-bold leading-none text-Black ">Latest Pets</h5>
    <Link to='/petprofile/breed' class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
      View all
    </Link>
  </div>
  <div class="flow-root">
    <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
      {lastPet.map(lpet => (
        <li key={lpet._id} class="py-3 sm:py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
            <img className=' w-10  rounded-full   '  src={lpet.image} />
            </div>
            <div class="flex-1 min-w-0">
              <div>
                <p class="text-lg font-bold text-Black">
                  {lpet.petId} - {lpet.petName}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  ({lpet.systime})
                </p>
              </div>
            </div>
            <div class="inline-flex items-center text-base font-semibold text-black">
              {lpet.species}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>


<div className='-mt-[1015px] ml-[316px] h-[450px] bg-[#f5f5f5] shadow-md border border-gray-200 rounded-lg  w-[660px] '>
  <div className='ml-[80px]'>
  <PieChart width={500} height={400} class="bg-black z-1 ml-[100px]" >
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend />
  </PieChart>
  </div>
  </div>



  <div className='mt-[20px] ml-[316px] h-[550px] bg-[#f5f5f5] shadow-md border border-gray-200 rounded-lg  w-[660px] '>
  <div className='ml-[-30px] mt-[70px]'>
    <BarChart
      width={700}
      height={470}
      data={speciescount}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={50}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 450, right: 490 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
    </BarChart>
  </div>
</div>
<div>.</div>


    </div>
  );
}

export default Dashboard;
