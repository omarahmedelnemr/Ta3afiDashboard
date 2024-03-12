// src/components/PieChart.js
import React from "react";
import { Pie as PieJS } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <PieJS
        data={chartData}
        options={{
          plugins: {
           
            legend: {
              position: 'right'

            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;