import React from 'react'

const Navigation= (props)=>{
        if(props.isSignedIn)
        {
            return(
                <nav style={{display:'flex',justifyContent:'flex-end'}} >
                    <p onClick={()=>props.onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'> Sign Out</p>
                    <p onClick={()=>props.onDeleteAccount(props.currentUser)} className='f3 link dim black underline pa3 pointer'> Delete Account</p>

                </nav>)
        }

        else{
            return(
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <p onClick={() => props.onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'> Sign In</p>
                
                    <p onClick={()=>props.onRouteChange('register')} className='f3 link dim black underline pa3 pointer'> Register</p>
                </nav>
            )

        }
    
}

export default Navigation