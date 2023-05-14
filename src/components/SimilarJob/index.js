import {IoLocationSharp} from 'react-icons/io5'
import {FaBriefcase} from 'react-icons/fa'

import './index.css'

const SimilarJob = props => {
  const {jobDetails} = props
  const {
    title,
    rating,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = jobDetails
  return (
    <li className="similar-job-list-element">
      <div className="similar-job-logo-role-container">
        <img
          className="similar-job-logo"
          alt="similar job company logo"
          src={companyLogoUrl}
        />
        <div className="similar-job-role-rating-container">
          <h3 className="similar-job-role">{title}</h3>
          <p className="similar-job-rating">
            <img
              className="similar-job-star"
              alt="stars"
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            />
            {rating}
          </p>
        </div>
      </div>
      <h4 className="similar-job-description-heading">Description</h4>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-employment-type-container">
        <p className="similar-job-location">
          <IoLocationSharp className="similar-job-location-icon" />
          {location}
        </p>
        <p className="similar-job-employment-type">
          <FaBriefcase className="similar-job-location-icon" />
          {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJob
