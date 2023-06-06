import { GoogleLogin } from '@react-oauth/google'
import './sign-in.css'

const SignInPage = (props : any) => {
  const responseMessage = (response:any) => {
    console.log(response);
};
const errorMessage = (error:any) => {
    console.log(error);
};

  return (
    <div className="container1">
      <div className="ImageSignUpPage">
        <img src="logo.png" alt="ppu" />
      </div>
      <div className="SignUpButton">
            <GoogleLogin onSuccess={responseMessage} onError={() => errorMessage || undefined} />
      </div>
    </div>
  )
}

export default SignInPage
