import React from 'react';

function PlaceListItem(props) {
    function selectPlace(){
        props.selectPlace(props.place);
    }

  return (
    <div onClick={selectPlace} className="place-list-item">
        {props.place.address.name} ({props.place.address.road}, {props.place.address.city}, {props.place.address.state} {props.place.address.postcode})
    </div>
  )
}

export default PlaceListItem