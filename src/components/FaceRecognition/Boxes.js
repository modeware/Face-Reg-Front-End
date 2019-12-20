import React from 'react'

const Boxes=(props)=>(
    <div className='bounding-box' style={{top:props.box.topRow,right:props.box.rightCol,bottom:props.box.bottomRow,left:props.box.leftCol}}></div>
)

export default Boxes