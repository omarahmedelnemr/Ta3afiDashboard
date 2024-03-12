import { useEffect, useState } from 'react';
import './styles/GraphBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../../public Func/axiosAuth';
import Global from '../../../public Func/globalVar';
import PieChart from './PieChart';

function GraphBox({title}) {
    

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
    return (
        <div className="GraphBox">
            <h3 className='BoxTitle'>{title}</h3>
            <hr/>
            <PieChart chartData={chartData}/>
        </div>
    );
}

export default GraphBox;
