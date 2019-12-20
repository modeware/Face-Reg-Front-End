import React from 'react'
import Boxes from './Boxes'
import './FaceRecognition.css'

const FaceRecognition= (props)=>{

    return(
      <div className='center ma'>
          <div className='absolute mt2'>
          <img id='inputimage' src={props.imageUrl} alt="" width="400px" height="auto"/>
            {props.box.map(box=><Boxes box={box} key={Math.floor(Math.random() * 1000)}/>)}
          </div>
      </div>
    )
}

export default FaceRecognition