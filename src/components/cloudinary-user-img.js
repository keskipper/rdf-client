import React from 'react';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

function CloudinaryUserImage(props) {

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'rollerderbyfinder'
    }
  });

  // Instantiate a CloudinaryImage object
  const myImage = cld.image(`users/${props.filename}`); 

  // Apply the transformation.
  myImage
  .resize(thumbnail().width(150).height(150))  // Crop the image
  .roundCorners(byRadius(20));    // Round the corners.

  // Render the image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
};

export default CloudinaryUserImage