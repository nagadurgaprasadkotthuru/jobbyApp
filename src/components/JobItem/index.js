import {Link} from 'react-router-dom'

import {IoLocationSharp} from 'react-icons/io5'
import {FaBriefcase} from 'react-icons/fa'

import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    id,
    location,
    title,
    rating,
    packagePerAnnum,
    companyLogoUrl,
    employmentType,
    jobDescription,
  } = jobItemDetails
  return (
    <li className="job-item-list-element">
      <Link to={`/jobs/${id}`} className="nav-link">
        <div className="job-logo-role-container">
          <img className="job-logo" alt="company logo" src={companyLogoUrl} />
          <div className="job-role-rating-container">
            <h1 className="role">{title}</h1>
            <p className="rating">
              <img
                className="star"
                alt="stars"
                src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              />
              {rating}
            </p>
          </div>
        </div>
        <div className="job-location-employment-type-salary-container">
          <div className="job-location-employment-type-container">
            <p className="location">
              <IoLocationSharp className="location-icon" />
              {location}
            </p>
            <p className="employment-type">
              <FaBriefcase className="location-icon" />
              {employmentType}
            </p>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
