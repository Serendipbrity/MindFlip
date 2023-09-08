import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, LineChart, Legend, Line } from 'recharts';
import '../../css/stats.css';

const Stats = () => {
  const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},];

//   const [scores, setScores] = useState([]);

//   useEffect(() => {
//     const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
//     setScores(savedScores);
//   }, []);

//   const data = {
//     labels: scores.map(score => new Date(score.date).toLocaleDateString()), // Dates
//     datasets: [
//       {
//         label: 'Progress',
//         data: scores.map(score => score.score), 
//         fill: false,
//         backgroundColor: 'blue',
//         borderColor: 'blue',
//       },
//     ],
//   };


  return (
    <div id="statsParent">
      <h1 id="progress">Your Progress</h1>
      <LineChart id="lineChart" width={730} height={550} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
</LineChart>
    </div>
  );
};

export default Stats;
