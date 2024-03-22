import { useEffect, useState, useRef } from 'react';
import './styles/Financials.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chart } from 'chart.js';


function FinancialsBox({title,Data}) {
    var barChartData = {
        labels:[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ],
        datasets: [
          
          {
            label: "Appointments",
            backgroundColor: "#75f4f4",
            borderColor: "#75f4f4",
            borderWidth: 0,
            data: [127, 35, 98, 74, 162, 55, 189, 18, 46, 123, 200, 85]
          },
          
          {
            label: "Chats",
            backgroundColor: "#d081ee",
            borderColor: "#f8ff78",
            borderWidth: 0,
            data: [55, 176, 33, 124, 97, 142, 20, 188, 63, 105, 11, 199]
          }
        ]
      };
      
      var chartOptions = {
        responsive: true,
        legend: {
          position: "top"
        },
        title: {
          display: false
        }
      }
      
    //   window.onload = function() {
    //     var ctx = document.getElementById("FinancialsCanvas").getContext("2d");
    //     window.myBar = new Chart(ctx, {
    //       type: "bar",
    //       data: barChartData,
    //       options: chartOptions
    //     });
    //   };

    const canvasRef = useRef(null); // Create a ref for the Canvas element

    useEffect(() => {
      // This code will run after the component has mounted
      const ctx = canvasRef.current.getContext('2d');
      const myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData, 
        options: chartOptions 
      });
  
      // Cleanup function
      return () => {
        myBar.destroy(); // Destroy the chart instance to prevent memory leaks
      };
    }, []);
    return (
        <div id="FinancialsBox" >
            <h3 className='BoxTitle'>{title}</h3>
            <hr></hr>
            <canvas id="FinancialsCanvas"  ref={canvasRef} ></canvas>
        </div>
    );
}

export default FinancialsBox;
