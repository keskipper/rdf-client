import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ReverseGeocoder(props) {
    const [ address, setAddress ] = useState({
        locString: ""
    })

    const verb = "get";
    const lat = props.lat;
    const lng = props.lng;
    const endpoint = "https://us1.locationiq.com/v1/reverse.php?key=pk.cdd03354d0919d4f569728b50bfb3552&lat="+lat+"&lon="+lng+"&format=json";


    const getCommonName = () => {
        axios({
            method: verb,
            url: endpoint
        }).then(response => {
            setAddress({
                locString: response.data.address.city +', '+ response.data.address.state +' '+ response.data.address.postcode
            })
        }).catch(error => {
            console.log("Error in getCommonName():", error);
        })
    }

    useEffect(() => {
        getCommonName();
    }, [])

  return (
    <div className="reverse-geocoder-result">
        {address.locString
        ? '('+address.locString+')'
        : 'Error getting location name.'
        }
    </div>
  )
}

export default ReverseGeocoder