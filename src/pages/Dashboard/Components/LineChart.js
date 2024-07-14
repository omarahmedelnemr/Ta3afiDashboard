import React from 'react';
import { Line as LineJS } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

// Ensure you register any necessary scales or plugins
Chart.register(CategoryScale);

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <LineJS
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: 'bottom' // Set legend position to right
            }
          },
          responsive: true,
          maintainAspectRatio: false // Disable aspect ratio to allow the canvas to fill the container
        }}
      />
    </div>
  );
}

export default LineChart;
