import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './sign-in.css';

const SignInPage = (props: any) => {
  const [email, setEmail] = useState('');
  const [ok, setOk] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setError('');
        navigate('/Groups');
        setOk(true);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        setOk(false);
        alert("please make sure to enter valid email or password !")
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
      <div className="click">Enter Your Email & Password</div>
      <div className="SignUpButton">
        <div>
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <label className='my-label'>Email:</label>
              <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label className='my-label'>Password:</label>
              <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button className='sign-in ' type='submit'>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;