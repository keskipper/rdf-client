import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CloudinaryUploadWidget = (props) => {
    let navigate = useNavigate();

    useEffect(() => {
        const script = document.createElement('script');
      
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.async = true;
      
        document.body.appendChild(script);
      
        return () => {
          document.body.removeChild(script);
        }
      }, []);


    useEffect(() => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "rollerderbyfinder",
        uploadPreset: "zgewmw5t"
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          saveFileName(result.info.public_id.substring(6, result.info.public_id.length));
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
    }, []);


    function saveFileName(filename){
        if(filename.length > 0){
            axios({
                method: 'PUT',
                url: `http://localhost:8080/api/users/${props.userId}`,
                data: {
                    imgName: filename
                }
              }
              ).then(response => {
                if(response.status === 200) {
                  navigate("/profile");
                }
              }).catch(error => {
                  console.log("error in saveFileName(): ", error.response);
              });
        }
    }


    return (
      <button id="upload_widget" className="btn btn-theme">
        Upload new image
      </button>
    );
}

export default CloudinaryUploadWidget;