import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = (props) => {
  const form = useRef();
  const [ status, setStatus ] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_7n248dh', 'contact_us', form.current, 'TbEs-ltkeKCBnY1g2')
      .then((result) => {
          console.log(result.text);
          flashStatus("Message sent!")
      }, (error) => {
          console.log(error.text);
          flashStatus("Sorry, there was an error sending your message.")
      });
  };

  function flashStatus(newStatus){
    setStatus(newStatus);
    setTimeout(() => props.closeModal(), 4000);
  }

  return (
    <div className="contact-wrapper">
      <div className='form-item'>
      <h1>Found a bug?</h1>
      </div>
      <div className='form-item'>
        <h3>Tell me about it!</h3>
      </div>
      <div className='form-note'>
        Please note this is a spare-time project and I won't get back to you right away.
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-item">
        <label htmlFor="user_name">Name</label><br/>
        <input type="text" name="user_name" />
        </div>
        <div className="form-item">
        <label htmlFor="user_email">Email</label><br/>
        <input type="email" name="user_email" />
        </div>
        <div className="form-item">
        <label htmlFor="message">Message</label><br/>
        <textarea name="message" />
        </div>
        <div className="form-item">
        <div style={{ color: 'green', fontWeight: '700' }}>{status}</div>
        </div>
        <div className="form-item">
        <input type="submit" value="Send" className="btn btn-theme" />
        </div>
      </form>
    </div>
  );
};