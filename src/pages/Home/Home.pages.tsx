import Buttons from "../../components/common/buttons/buttons";
import { Link } from "react-router-dom";
import './home.css'

const HomePage = (props: any) => {
console.log(props.path);

  return (
    <>
      <p className='path'>{props.path}</p>
      <div className="container">
        <Link to={'/Groups'}><Buttons text='Introduction To Graduation Project '></Buttons></Link>
        <Link to={'/Groups'}><Buttons text='Graduation Project '></Buttons></Link>
      </div>
    </>
  )
}

export default HomePage;
