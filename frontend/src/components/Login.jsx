import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import GoogleLogin from './GoogleLogin';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async ({ credential }) => {
    const profileObj = jwt_decode(credential);
    localStorage.setItem('user', JSON.stringify(profileObj));
    const { name, sub: googleId, picture: imageUrl } = profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl
    };

    await client.createIfNotExists(doc);
    navigate('/', { replace: true });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleLogin onGoogleSignIn={handleGoogleSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
