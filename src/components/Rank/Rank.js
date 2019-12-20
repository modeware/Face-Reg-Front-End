import React from 'react'

const Rank= ({name,entries})=>{
    return(
  
        <div>
            <div className="white f3">
                {`${name}, Your current counter is....`}
            </div>
            <div className="white f5">
                {entries}
            </div>
        </div>
    )
}

export default Rank