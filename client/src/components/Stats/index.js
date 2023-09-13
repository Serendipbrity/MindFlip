import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Legend,
  Line,
} from "recharts";
import MindFlip from "../MindFlip";
import "../../css/stats.css";

const Stats = () => {
  // const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},];

  // Inside Stats component
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    setScores(savedScores);
  }, []);

  const data = scores.map((score) => ({
    name: new Date(score.date).toLocaleDateString(),
    uv: score.score,
    pv: score.score,
    amt: score.score,
  }));

  // Your existing LineChart component

  return (
    <>
      <MindFlip />
      <div id="statsParent">
        <h1 id="progress">Your Progress</h1>
        <div id="lineChart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Stats;
