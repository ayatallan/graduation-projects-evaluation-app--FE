import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import './sign-in.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const SignInPage = (props: any) => {
  const [res, setRes] = useState('');

  const navigate = useNavigate();

  const responseMessage = async (response: any) => {
    try {
      console.log(response);

      const user = {
        id: response.id,
        name: response.name,
        email: response.email,
      };

      const res = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        setRes(response);
        console.log('User created successfully');
        navigate('/groups');
      } else {
        console.log('Error occurred while creating the user');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    res && navigate('/Groups');
  }, [res]);

  const errorMessage = (error: any) => {
    console.log(error);
  };


  return (
    <div className="container1">
      <div className="ImageSignUpPage">
        <img src="logo.png" alt="ppu" />
        <h3 className="ppu">Palestine Polytechnic University</h3>
        <span className="about">
          Graduation Projects Evaluation App is designed to provide an easy-to-use platform for evaluating graduation
          projects on specific criteria.
        </span>
      </div>
      <div className="click">Click Here To Login</div>
      <div className="SignUpButton">
        <div>
          <GoogleOAuthProvider clientId={'17534540626-lvfagtcvme0aj8cpv83cbund5akg6cqs.apps.googleusercontent.com'}>
            <GoogleLogin onSuccess={responseMessage} onError={() => errorMessage || undefined} />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;