import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function GameSearch() {
  return (
    <div className="form-wrapper">
      <form id="game-search">
        <div className="searchBar">
          <label htmlFor=''>Search <FontAwesomeIcon icon="fa-magnifying-glass" /></label><br/>
          <input
            type="text"
            placeholder='Find games!'
            name="searchBar"
          />
        </div>
      </form>
    </div>
  )
}

export default GameSearch