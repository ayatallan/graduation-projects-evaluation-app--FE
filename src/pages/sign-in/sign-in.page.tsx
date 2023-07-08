import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './sign-in.css';

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

      const res = await fetch(`http://localhost:3002/users`);
    const data = await res.json();

    if (data.length > 0) {
      const signedInUser = data[0];
      setRes(signedInUser);
      props.setUser(signedInUser);

      console.log('User fetched successfully');
      navigate('/Groups');
    } else {
      console.log('User not found');
    }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3002/users');
      const data = await res.json();
      props.setUser(data);
    } catch (error) {
      console.log('An error occurred while fetching users:', error);
    }
  };
  
  useEffect(() => {
    if (res) {
      navigate('/groups');
    }
  }, [res, navigate]);
  
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