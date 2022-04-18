import React from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';


const clientId =
  '42213248029-8nqid08p4rohj9i57t3vpuj02mhtffm2.apps.googleusercontent.com';

function Login(props) {
  const onSuccess = (res) => {
    //console.log('Login Success: currentUser:', res.profileObj);
    refreshTokenSetup(res);
    props.handleSuccessfulLogin();
  };

  const onFailure = (res) => {
    //console.log('Login failed: res:', res);
    props.handleUnsuccessfulLogin();
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />

    </div>
  );
}

export default Login;