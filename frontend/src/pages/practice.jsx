import { current } from '@reduxjs/toolkit';
import { useEffect, useState ,useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Practice = () => {
  const [data, setData] = useState([]);
  const [latestDate, setLatestDate] = useState('');
  const dateRef = useRef(null);
  const stockRef = useRef(null);
  const [symbols , setSymbols] = useState([]);


  
  const show = async (symb) => {
  try {
    console.log("Fetching data...");
    const res = await fetch(`http://localhost:3000/trade/intraday/${symb}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const rawData = await res.json();
    console.log("Raw data received:", rawData);
    const timeSeriesKey = Object.keys(rawData).find(k => k.startsWith("Time Series"));
    const timeSeries = rawData[timeSeriesKey];
    if (!timeSeries) return console.error("No time series found");

    const formattedData = Object.entries(timeSeries).map(([time, values]) => ({
      time,
      open: parseFloat(values["1. open"]),
      close: parseFloat(values["4. close"]),
    })).sort((a, b) => new Date(a.time) - new Date(b.time));

    // ✅ Check selected date
    let currentDate = dateRef.current?.value;
    console.log("Selected date:", currentDate);

    // ✅ If empty, fallback to latest
    if (!currentDate) {
      currentDate = formattedData[formattedData.length - 1].time.split(" ")[0];
      console.log("No date selected, using latest:", currentDate);
    }

    setLatestDate(currentDate);

    // ✅ Filter
    const oneDayData = formattedData.filter(d => d.time.startsWith(currentDate));
    console.log("Filtered data count:", oneDayData.length);

    if (oneDayData.length === 0) {
      console.warn("No data found for selected date:", currentDate);
    }

    setData(oneDayData);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
  
   const fetchSymbols = async () => {
    try {
      const res = await fetch(`http://localhost:3000/trade/search/${stockRef.current.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const symbolsData = await res.json();
      console.log("Fetched symbols:", symbolsData);
      setSymbols(symbolsData["bestMatches"].map(match => match["1. symbol"]));
    } catch (err) {
      console.error("Error fetching symbols:", err);
    } };

  const formatTime = (timeStr) => {
    return timeStr.split(' ')[1].slice(0, 5); // "HH:MM"
  };

  return (
    <>
    
    <div className='w-full flex items-center  justify-center mt-5'>
  <input 
    type="text" 
    placeholder='Enter Stock Symbol' 
    className='border-4 border-black px-2 mx-2 font-mono text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
    ref={stockRef}
    style={{imageRendering: 'pixelated'}}
  />
  <input 
    type="date" 
    className='border-4 border-black mx-2 bg-violet-500 font-mono text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
    ref={dateRef}
    style={{imageRendering: 'pixelated'}}
  />
  <button 
    onClick={fetchSymbols} 
    className='bg-amber-300 border-4 border-black px-3 py-1 font-mono font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'
  >
    SEARCH
  </button>
</div>
<div className='w-full flex items-center justify-center mt-5'>
  <div>
   {symbols.length > 0 &&
    symbols.map((symb, index) => (
      <span key={index}
      onClick={()=>show(symb)}
      className="mx-2 px-2 py-1 border-2 border-black bg-green-200 font-mono text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {symb}
      </span>
    ))
   }
  </div>
</div>
      {data.length === 0 && <div className='text-center text-red-600 font-bold'>No data available for {latestDate}</div>}

    <div className='w-full flex items-center mt-20 ml-30'>

    <ResponsiveContainer width="80%" height={400} >
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={formatTime} />
        <YAxis width="auto" />
        <Tooltip labelFormatter={formatTime} />
        <Legend />
        <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="close" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </div>
    </>
  );
}

export default Practice;

