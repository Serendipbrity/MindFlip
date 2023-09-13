import React, { useState, useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  LineChart,
  Legend,
  Line,
} from "recharts";
import "../../css/stats.css";
import MindFlip from "../MindFlip";
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

  return (
    <>
      <MindFlip />
      <div id="statsParent">
        <h1 id="progress">Your Progress</h1>
        <div id="lineChart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line id="lines" type="monotone" dataKey="uv" stroke="#023047" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" stroke="#023047"tickMargin={17}/>
              <YAxis stroke="#023047" id="yAxis" tickMargin={20}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Stats;
