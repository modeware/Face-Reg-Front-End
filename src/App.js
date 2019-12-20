import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'


import './App.css';

const particlesOptions=
  {
    particles: {
      number:{
        value:50,
        density:{
          enable:true,
          value_area:500
        }
      }
      
    }
  }

  const app = new Clarifai.App({
    apiKey: '49a57e00e3e144059eacfecbb51c0dfe'
   });

class App extends React.Component {
  constructor(){
    super()
    this.state={
      input:'',
      imageUrl:'',
      box:[],
      route:'signin',
      isSignedIn:false,
      user:{
        id: '',
        name: "",
        email: "",
        entries: 0,
        joined:""
      }
    }
  }

loadUser=(data)=>{
  this.setState({
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
  })
}
  processBoundingBox=(resp)=>{
        const clarifaiFace=resp.outputs[0].data.regions
        const clarifaiFacesDetails=clarifaiFace.map(faceBox=>faceBox.region_info.bounding_box)
        return clarifaiFacesDetails
 }

 calculateDetails=(boxDetail)=>{
  const image=document.getElementById('inputimage')
  const width=Number(image.width)
  const height=Number(image.height)
   return({
    leftCol:boxDetail.left_col*width,
    topRow:boxDetail.top_row*height,
    rightCol:width-(boxDetail.right_col*width),
    bottomRow:height-(boxDetail.bottom_row*height)
   })
 }

  calculateFaceLocation=(response)=>{
    // const clarifaiFace=response.outputs[0].data.regions[0].region_info.bounding_box
        const clarifaiFace=this.processBoundingBox(response)


    const faceBoxDetails=clarifaiFace.map(box=>this.calculateDetails(box))
    
    return(faceBoxDetails)

  }

  displayFaceBox=(box)=>{
    this.setState({
      box:box
    })

  }

  onInputChange=(event)=>{
    this.setState(
        {input:event.target.value}
      )
  }

  onSubmit=()=>{
    this.setState({
      imageUrl:this.state.input
    })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input)
       .then( (response) => {
         fetch("https://enigmatic-earth-24952.herokuapp.com/image",{
           method:"put",
           headers:{'Content-Type':'application/json'},
           body:JSON.stringify({
             id:this.state.user.id
           })
         }).then(resp=>resp.json()).then(count=>{
           this.setState({user:{
             ...this.state.user,
             entries:count
           }})
         })
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err =>console.log(err))
        // there was an error
      
      }
    
    onDeleteAccount=(currentUser)=>{
      fetch("https://enigmatic-earth-24952.herokuapp.com/delete",{
        method:'delete',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email:this.state.user.email
        })
      }).then(resp=>resp.json()).then(someValue=>{
        if (someValue === "deleted successfully"){
          this.onRouteChange('signout')
        }

      }).catch(err=>console.log(err))
    }

    onRouteChange=(route)=>{
      if(route==='signout'){
        this.setState({
          isSignedIn: false,
        })
      }
      else if(route==='home'){
        this.setState({
          isSignedIn: true,
        })
      }
      this.setState({
        route:route,
      })
    }

  render(){
  return (
    <div className="App">
     <Particles  className="particles"
              params={particlesOptions}

            />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} currentUser={this.state.email} onDeleteAccount={this.onDeleteAccount}/>
{this.state.route==='home'
?<div><Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>

        <ImageLinkForm onButtonSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
        
        
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :(
            this.state.route==='signin'?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />


        )

}     
    </div>
  );
      }
}

export default App;
