import React from 'react';
import NoSkating from '../static/404.png';

function Error404() {
  return (
    <div className="error-404">
        <h2>404! No skating here!</h2>
        <img src={NoSkating} alt="roller skate with red circle and slash" />
    </div>
  )
}

export default Error404