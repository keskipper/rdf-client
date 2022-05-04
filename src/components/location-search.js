import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PlaceListItem from './place-list-item';

function LocationSearch(props) {
    const [ place, setPlace ] = useState({
        venueName: props.venueName,
        rendered: 0,
        placeList: [],
        show: false,
        timeOfLastSearch: Date.now()
    })


    function search(event){
        event.preventDefault();
        let diff = Number(Date.now()) - Number(place.timeOfLastSearch);

        if(place.venueName.length >= 3 && diff > 1000){
            setPlace(prevPlace => ({ ...prevPlace, timeOfLastSearch: Date.now() }))
            const endpoint = `https://api.locationiq.com/v1/autocomplete.php?key=pk.cdd03354d0919d4f569728b50bfb3552&q=${place.venueName}`;

            axios({
                method: "get",
                url: endpoint
            }).then(response => {
                setPlace(prevPlace => ({
                    ...prevPlace, placeList: response.data
                }))
            }).catch(error => {
                console.log("Error in LocationSearch search(): ", error)
            })
        }
    }


    useEffect(() => {
        if(place.rendered >= 2) {
          search(window.event);
        }
        setPlace(prevPlace => ({
          ...prevPlace,
          rendered: prevPlace.rendered + 1
        }))
      }, [place.venueName]
    )



    function selectPlace(place){
        setPlace(prevPlace => ({
            ...prevPlace,
            venueName: place.address.name,
            show: false
        }));
        getTimeZone(place.lat, place.lon);
        props.passPlace(place);
    }



    function getTimeZone(lat, lon){
        const endpoint = `https://us1.locationiq.com/v1/timezone.php?key=pk.cdd03354d0919d4f569728b50bfb3552&lat=${lat}&lon=${lon}`;

        axios({
            method: "get",
            url: endpoint
        }).then(response => {
            props.passTimezone(response.data.timezone);
        }).catch(error => {
            console.log("Error in LocationSearch getTimeZone(): ", error)
        })
    }



  return (
    <div>
        <div className="form-item">
            <label htmlFor="venueName">Venue name</label><br/>
            <input 
                role="presentation"
                onChange={(event) => {setPlace(prevPlace => ({
                    ...prevPlace, venueName: event.target.value, show: true
                }))}} 
                type="text"
                name="venueName"
                placeholder="Venue name"
                maxLength={200}
                value={place.venueName}
            />
        </div>

        <div className="locations-list" style={{ display: place.show? "block" : "none" }}>
            {place.placeList.map(p => (
                <PlaceListItem
                  key={p.place_id}
                  place={p}
                  selectPlace={selectPlace}
                />
              ))}
        </div>

    </div>
  )
}

export default LocationSearch