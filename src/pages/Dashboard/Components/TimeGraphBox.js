import { useEffect, useState } from 'react';
import './styles/TimeGraphBox.css'
import PieChart from './PieChart';
import LineChart from './LineChart';

function TimeGraphBox({title,postsData, articlesData,appointmentsData}) {
    

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
    const labels =  postsData.map(item => item.month);

    const postsColor = "rgb(244, 192, 117)"
    const articlessColor = "#8ee9ff"
    const appointmentsColor =  "rgb(215, 152, 235)"
    const data = {
      labels: labels,
      datasets: [{
        label: 'posts',
        data: postsData.map(item => item.count),
        fill: false,
        backgroundColor:postsColor,
        borderColor: postsColor,
        tension: 0.1
      },{
        label: 'Articles',
        data: articlesData.map(item => item.count),
        fill: false,
        backgroundColor:articlessColor,
        borderColor: articlessColor,
        tension: 0.1
      },{
        label: 'Appointments',
        data: appointmentsData.map(item => item.count),
        fill: false,
        backgroundColor:appointmentsColor,
        borderColor: appointmentsColor,
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
