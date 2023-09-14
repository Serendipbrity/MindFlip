import React, { useState, useEffect } from "react";
import {
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ComposedChart,
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
    score: score.score,
    total: score.total,
    // amt: score.score,
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
            <ComposedChart data={newData}>
              {/* progress data line */}
              <Area
                id="lines"
                type="monotone"
                dataKey="total"
                fill="#fb8500"
                stroke="#ffb703"
                fillOpacity={.7}
              />
              <Area
                id="lines"
                type="monotone"
                dataKey="score"
                fill="#023047"
                stroke="#219ebc"
                fillOpacity={1}
              />
              {/* center line */}
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              {/* hosizontal line */}
              <XAxis dataKey="name" stroke="#023047" tickMargin={17} />
              {/* vertical line */}
              <YAxis stroke="#023047" id="yAxis" tickMargin={20} />
              <Tooltip />
            </ComposedChart>
          </ResponsiveContainer>
          <Legend
            wrapperStyle={{
              bottom: 50,
              right: 50,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "30px",
              width: "30%",
            }}
            payload={[
              {
                value: "Total Cards",
                type: "line",
                id: "total",
                color: "#fb8500",
              },
              {
                value: "Score",
                type: "line",
                id: "score",
                color: "#023047"
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default Stats;
