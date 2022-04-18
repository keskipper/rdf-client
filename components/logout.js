import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId =
  '42213248029-8nqid08p4rohj9i57t3vpuj02mhtffm2.apps.googleusercontent.com';

function Logout(props) {
  const onSuccess = () => {
        props.handleSuccessfulLogout();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;