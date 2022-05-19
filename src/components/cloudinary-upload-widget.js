import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CloudinaryUploadWidget = (props) => {
    let navigate = useNavigate();

    function loadScript() {
        const script = document.createElement('script');
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        document.body.appendChild(script);

        return new Promise((res, rej) => {
          script.onload = function() {
            res();
          }
          script.onerror = function () {
            rej();
          }
        });
      }

    loadScript()
    .then(() => {
      startWidget();
    })
    .catch(() => {
      console.error('Script loading failed! Handle this error');
    });


    function startWidget(){
      var myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "rollerderbyfinder",
          uploadPreset: "zgewmw5t",
          timeout: 10000
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            savePictureLink(result.info.public_id.substring(6, result.info.public_id.length));
          }
        }
      );
      document.getElementById("upload_widget").addEventListener("click", function(event) {
          event.preventDefault();
          myWidget.open();
        },
        false
      );
    }


    function savePictureLink(filename){
        if(filename.length > 0){
            axios({
                method: 'PUT',
                url: `https://rdf-server.herokuapp.com/api/users/${props.userId}`,
                data: {
                    imgName: filename
                }
              }
              ).then(response => {
                if(response.status === 200) {
                  props.updateViewerUser();
                }
              }).catch(error => {
                  console.log("error in saveFileName(): ", error.response);
              });
        }
    }


    return (
      <button id="upload_widget" className="btn btn-theme" type='button' form="">
        <FontAwesomeIcon icon="fa-solid fa-image" /> Upload new image
      </button>
    );
}

export default CloudinaryUploadWidget;