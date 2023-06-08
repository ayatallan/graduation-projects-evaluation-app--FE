import React from 'react'
import './group.css'
import { Link } from 'react-router-dom'
import Buttons from '../../components/common/buttons/buttons'
const GroupsPage = (props: any) => {
  return (
    <>
      <p className='path'>{props.path}</p>
      <div className="container">
        <div className="row">
          <div className="col-sm-4 col-md-7">
            <p>Select the group that you want to evaluate it's members : </p>
          </div>
        </div>


        <Link to={'/Forms'}><Buttons text='Group 1 '></Buttons></Link>


        
        <Link to={'/Forms'}><Buttons text='Group 2 '></Buttons></Link>
      </div>
    </>

  )
}

export default GroupsPage
