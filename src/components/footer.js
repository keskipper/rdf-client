import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { ContactUs } from '../modals/contact-us';

function Footer() {
  const [ showModal, setShowModal ] = useState(false);

  function getYear(){
    const yr = new Date().getFullYear();
    return yr;
  }

  function handleCloseModal(){
    setShowModal(false);
  }

  return (
    <div className="footer-wrapper">
        <div className="footer-content">
            Copyright &copy; {getYear()} Katherine Skipper (Criminal Wrecker) |
        </div>
        <div className="footer-content">
          <button onClick={() => setShowModal(true)} type='button' className="btn-theme">Bug report</button>
        </div>

        <ReactModal 
          isOpen={showModal}
          contentLabel="Contact us"
          ariaHideApp={false}            
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          onRequestClose={handleCloseModal}
          className="modal"
          overlayClassName="overlay"
          >
            <ContactUs 
              closeModal={handleCloseModal}
            />
        </ReactModal>
    </div>
  )
}

export default Footer