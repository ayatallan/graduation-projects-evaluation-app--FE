import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './sign-in.css';
import { User } from '../../interface';

const SignInPage = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3002/users');
        if (response.ok) {
          const users = await response.json();
          const matchedUser = users.find((user:User) => user.email === email && user.password === password);
          if (matchedUser) {
            setError('');
            navigate('/Groups');
          } else {
            setError('Invalid email or password');
          }
        } else {
          setError('Error fetching users');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error fetching users');
        alert("invalid email or password")
      }
    };

    fetchUsers();
  }, [email, password, navigate]);

  const handleEmailChange = (event :any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // No need for the fetch request here since it's handled in the useEffect
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