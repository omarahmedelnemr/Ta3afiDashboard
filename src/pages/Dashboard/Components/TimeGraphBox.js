import { useEffect, useState } from 'react';
import './styles/TimeGraphBox.css'
import PieChart from './PieChart';
import LineChart from './LineChart';

function TimeGraphBox({title}) {
    

    const [chartValues,setChartValue] = useState([50,7,8])
    const chartData = {
        labels: [  'Done','Pending', 'Canceled' ],
        datasets: [
            {
              label: 'Popularity of colours',
              data: chartValues,
              backgroundColor: [ 'lightgreen', "#EFEE8F" , "#ff00007a"],
              borderWidth: 0,
            }
        ]
    }
    const labels = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July"
        
      ];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'Yellow',
    tension: 0.1
  },{
    label: 'My First Dataset',
    data: [10, 20, 30, 23, 15, 25, 66],
    fill: false,
    borderColor: 'red',
    tension: 0.1
  },{
    label: 'My First Dataset',
    data: [10, 20, 30, 40, 45, 52, 60],
    fill: false,
    borderColor: 'green',
    tension: 0.1
  }]
};
    return (
        <div className="TimeGraphBox">
            <h3 className='BoxTitle'>{title}</h3>
            <hr/>
            <LineChart chartData={data}/>
        </div>
    );
}

export default TimeGraphBox;
