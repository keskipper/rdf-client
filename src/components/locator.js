import React, { Component } from 'react';

export default class Locator extends Component {
    constructor() {
        super();

        this.state = {
            lat: '',
            lng: '',
            status: ''
        }
        
        this.getLocation = this.getLocation.bind(this);
    }

    getLocation() {
        if (!navigator.geolocation) {
          this.setState({status:'Geolocation is not supported by your browser'})
        } else {
            this.setState({status:'Locating...'})

          navigator.geolocation.getCurrentPosition((position) => {
              this.setState({
                  status:null,
                  lat:position.coords.latitude,
                  lng:position.coords.longitude
              })

          }, () => {
            this.setState({
                status:'Unable to retrieve your location'})
          });
        }

        this.setState({

        })
      }

    render() {
        return (
            <div className="locator">
            <h1>Coordinates</h1>
            <button onClick={this.getLocation}>Get Location</button>
            
            <p>{this.state.status}</p>
            {this.state.lat && <p>Latitude: {this.state.lat}</p>}
            {this.state.lng && <p>Longitude: {this.state.lng}</p>}
          </div>
        );
    }
}