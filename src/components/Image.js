import React, { useEffect, useState } from 'react';
import './styles/Image.css';


function ImageBox({imgSrc,imgID,alt}) {

    return (
        <div className="ImageBox" id={imgID}>
            <img src={imgSrc}/>
        </div>
  );
}

export default ImageBox;