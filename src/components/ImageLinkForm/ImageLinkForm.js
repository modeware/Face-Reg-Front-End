import React from 'react'
import "./ImagLinkForm.css"

const ImageLinkForm= (props)=>{
    return(
  
        <div>
            <p className='f3'> 
                {"Detect Faces from your pictures"}
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form center">
                    <input className='f4 pa2 w-70 center' type="tex" onChange={props.onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-red' onClick={props.onButtonSubmit}>Detect</button>
                </div>

            </div>
        </div>
    )
}

export default ImageLinkForm