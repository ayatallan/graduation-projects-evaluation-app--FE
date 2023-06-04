import { Link } from 'react-router-dom';
import Buttons from '../../components/common/buttons/buttons';

const MajorPage = (props : any) => {
    return (
      <div>
       <p className='path'>{props.path}</p>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-7">
            <p>Select Majors that the team members belong to  : </p>
          </div>
        </div>
                check boxes 

      </div>

      </div>
    )
  }
  
  export default MajorPage ;
  