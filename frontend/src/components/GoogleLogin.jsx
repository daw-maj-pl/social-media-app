import { useRef } from 'react';
import useScript from '../hooks/useScript';

const GoogleLogin = ({ onGoogleSignIn = () => {} }) => {
  const googleSignInButton = useRef(null);

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn
    });

    window.google.accounts.id.renderButton(googleSignInButton.current, {});
  });

  return <div ref={googleSignInButton}></div>;
};

export default GoogleLogin;
