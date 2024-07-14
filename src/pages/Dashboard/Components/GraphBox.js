import { useEffect, useState } from 'react';
import './styles/GraphBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../public Func/axiosAuth';
import Global from '../../../public Func/globalVar';
import PieChart from './PieChart';

function GraphBox({title, Data}) {
    

    const chartValues= [Data['completed'],Data['canceled'],Data['scheduled']]
    console.log(Data)
    var chartData = {
        labels: [  'Completed','Canceled', 'Scheduled' ],
        datasets: [
            {
              label: 'Popularity of colours',
              data: chartValues,
              backgroundColor: [ 'lightgreen', "#ff00007a" , "#EFEE8F"],
              borderWidth: 2,
            }
        ]
    }
    if (!Data.length){
        chartData = {
            labels: [  'No Appointment Yet' ],
            datasets: [
                {
                  label: 'Popularity of colours',
                  data: [100],
                  backgroundColor: [  "gray"],
                  borderWidth: 2,
                }
            ]
        }
    }
    return (
        <div className="GraphBox">
            <h3 className='BoxTitle'>{title}</h3>
            <hr/>
            <PieChart chartData={chartData}/>
        </div>
    );
}

export default GraphBox;
