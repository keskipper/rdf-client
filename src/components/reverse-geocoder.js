import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ReverseGeocoder(props) {
    const [ address, setAddress ] = useState({
        lat: props.lat,
        lng: props.lng,
        locString: ""
    })

    const verb = "get";
    const endpoint = "https://us1.locationiq.com/v1/reverse.php?key=pk.cdd03354d0919d4f569728b50bfb3552&lat="+address.lat+"&lon="+address.lng+"&format=json";

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
        if((address.lat && address.lng) && (address.lat !== "00.0000") && (address.lng !== "00.0000")){
            getCommonName();
        } else {
            // console.log("There was a problem with coordinates:", address.lat, address.lng);
        }
    }, [address.lat])

  return (
    <div>
        {address.locString
        ? address.locString
        : 'Error getting location name.'
        }
    </div>
  )
}

export default ReverseGeocoder