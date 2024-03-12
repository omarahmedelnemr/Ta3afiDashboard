import './styles/overviewBoxes.css'
function OverviewBoxes({title,icon,color,value}) {
    return (
                
        <div className={'contentBoxSize1'}>
            <div className='boxIcon' style={{backgroundColor:color}}>
                {icon}
            </div>
            <div className='boxTitle'>
                <p>{title}</p>
            </div>
            <div className='boxValue'>
                <h2>{value}</h2>
            </div>
            
        </div>

                
    );
}

export default OverviewBoxes;
