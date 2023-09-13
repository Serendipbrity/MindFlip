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
      {/* title */}
      <MindFlip />
      <div id="statsParent">
        <h1 id="progress">Your Progress</h1>
        <div id="lineChart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              {/* progress data line */}
              <Line id="lines" type="monotone" dataKey="uv" stroke="#023047" />
              {/* center line */}
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              {/* hosizontal line */}
              <XAxis dataKey="name" stroke="#023047" tickMargin={17} />
              {/* vertical line */}
              <YAxis stroke="#023047" id="yAxis" tickMargin={20}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Stats;
