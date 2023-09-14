import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
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

  console.log(data);

  // Initialize an object to store the last occurrence index of each date.
  const lastOccurrences = {};

  // Loop through the data array.
  for (let i = 0; i < data.length; i++) {
    // Save the index of the last occurrence for each date in lastOccurrences object.
    lastOccurrences[data[i].name] = i;
  }

  // Create a new array by mapping over the original data array.
  const newData = data.map((entry, index) => {
    // Return a new object with the same properties as the original object.
    // Replace the 'name' field with an empty string if it's not the last occurrence.
    return {
      ...entry,
      name: lastOccurrences[entry.name] === index ? entry.name : "",
    };
  });

  return (
    <>
      {/* title */}
      <MindFlip />
      <div id="statsParent">
        <h1 id="progress">Your Progress</h1>
        <div id="lineChart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={newData}>
              {/* progress data line */}
              <Line id="lines" type="monotone" dataKey="uv" stroke="#023047" />
              {/* center line */}
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              {/* hosizontal line */}
              <XAxis dataKey="name" stroke="#023047" tickMargin={17} />
              {/* vertical line */}
              <YAxis stroke="#023047" id="yAxis" tickMargin={20} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Stats;
