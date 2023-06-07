import React from 'react'
import { Link } from 'react-router-dom'
import Buttons from '../../components/common/buttons/buttons'

const FormsPage = (props: any) => {
  return (
    <>
      <p className='path'>{props.path}</p>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-7">
            <p>Select the form that you want to evaluate  : </p>
          </div>
        </div>


        <Link to={'/Evaluation'}><Buttons text='Presentation '></Buttons></Link>
        <Link to={'/Evaluation'}><Buttons text='Software report  '></Buttons></Link>
      </div>
    </>

  )
}

export default FormsPage
