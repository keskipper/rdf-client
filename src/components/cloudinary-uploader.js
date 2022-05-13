import React from 'react';

import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget'

const CloudinaryUploader = () => {
  return (
    <>
      <WidgetLoader /> 
      {/* // add to top of file. Only use once. */}
      <Widget
        sources={['local', 'url', 'camera', 'google_drive', 'facebook']}
        sourceKeys={{dropboxAppKey: '1dsf42dl1i2', instagramClientId: 'd7aadf962m'}} // add source keys
        // and ID's as an object. More information on their use can be found at
        // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
        resourceType={'image'} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
        cloudName={'rollerderbyfinder'} 
        uploadPreset={'zgewmw5t'} // check that an upload preset exists and check mode is signed or unisgned
        buttonText={'New image'} // default 'Upload Files'
        style={{
              color: '#372e29',
              border: 'none',
              width: '120px',
              backgroundColor: '#ecca73',
              borderRadius: '4px',
              height: '25px',
              cursor: 'pointer',
              borderRadius: '3px',
              fontFamily: 'Rubik, sans-serif',
              border: '2px solid #ecb939'
            }} // inline styling only or style id='cloudinary_upload_button'
        folder={'users'} // set cloudinary folder name to send file
        cropping={false} // set ability to crop images -> default = true
        // https://support.cloudinary.com/hc/en-us/articles/203062071-How-to-crop-images-via-the-Upload-Widget-#:~:text=Click%20on%20the%20%22Edit%22%20link,OK%22%20and%20Save%20the%20changes.
        // more information here on cropping. Coordinates are returned or upload preset needs changing
        multiple={false} // set to false as default. Allows multiple file uploading
        // will only allow 1 file to be uploaded if cropping set to true
        autoClose={true} // will close the widget after success. Default true
        onSuccess={console.log("success! now add a callback")} // add success callback -> returns result
        onFailure={console.log("error")} // add failure callback -> returns 'response.error' + 'response.result'
        logging={false} // logs will be provided for success and failure messages,
        // set to false for production -> default = true
        customPublicId={'sample'} // set a specific custom public_id.
        // To use the file name as the public_id use 'use_filename={true}' parameter
        eager={null} // add eager transformations -> deafult = null
        use_filename={false} // tell Cloudinary to use the original name of the uploaded
        // file as its public ID -> default = true,

        widgetStyles={{
            palette: {
                window: "#FFFFFF",
                windowBorder: "#726255",
                tabIcon: "#BF8900",
                menuIcons: "#372E29",
                textDark: "#372E29",
                textLight: "#FFFFFF",
                link: "#ECB939",
                action: "#FF620C",
                inactiveTabIcon: "#372E29",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#F5E4BB"
            },
          fonts: {
            default: null,
            "'Fira Sans', sans-serif": {
              url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
              active: true
            }
          }
        }} // ability to customise the style of the widget uploader
        destroy={true} // will destroy the widget on completion

      />
    </>
  )
}

export default CloudinaryUploader