import React, {Component} from 'react'

class NewFacility extends Component{
    constructor(props){
        super(props)
        this.state = {
            name : "",
            address : "",
            latitude : "",
            longitude : "",
            description : "",
            station_ID : ""
        }
    }

    //ON CHANGE HANDLERS
    handleNameChange = (event) => {
        this.setState({name : event.target.value})
    }

    handleAddressChange = (event) => {
        this.setState({Address : event.target.value})
    }

    handleDescriptionChange = (event) => {
        this.setState({Address : event.target.value})
    }

    //SUBMIT HABNDLER
    handleSubmit = (event) =>{
        event.preventDefault()
    }
    
    //GET COORDINATES
    getLocation = (event) => {
        event.preventDefault()
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) =>{
            this.setState({latitude : position.coords.latitude,
                            longitude : position.coords.longitude})
          })
        } else { 
          alert('error')//please add proper biz logic
        }
      }
      
    //JSX RENDERING
    render(){
        return(
        <form>
        <h4> Add a New Facility</h4>
            <p><b>Name</b></p>
            <input type='text' name='name' placeholder = "Facility Name"/>
            <p><b>Address</b></p>
            <input type='text' name='address' placeholder = "Facility Address"/>
            <p><b>Description</b></p>
            <input type='text' name='description' onChange={this.handleChange} placeholder = "Facility Description"/>
            <p><b>Longitude</b></p>
            <input type='text' name='latitude'  placeholder = {this.state.latitude}/>
            <p><b>latitude</b></p>
            <input type='text' name='longitude'  placeholder = {this.state.longitude}/>

            <br></br>
            <button onClick = {this.getLocation}>Get Coordinates</button>
            <button onClick = {this.handleSubmit}>Add Facility</button> 
        </form> 
        )
    }

}

export default NewFacility


