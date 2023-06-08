import { GoogleLogin } from '@react-oauth/google'
import './sign-in.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const SignInPage = (props: any) => {
  const [res, setRes] = useState("");

  const navigate = useNavigate();
  const responseMessage = (response: any) => {
    console.log(response);
    setRes(response);
    console.log("hello");

  };

  useEffect(() => {
    res && navigate('/Home');

  }, [res])

  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <div className="container1">
      <div className="ImageSignUpPage">
        <img src="logo.png" alt="ppu" />
      </div>
      <div className="SignUpButton">
        <GoogleLogin  onSuccess={responseMessage} onError={() => errorMessage || undefined} />
      </div>

    </div>
  )
}

export default SignInPage
