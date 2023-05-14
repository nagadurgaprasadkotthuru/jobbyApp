import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {IoLocationSharp} from 'react-icons/io5'
import {FaBriefcase} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'

import Cookies from 'js-cookie'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJob from '../SimilarJob'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: '',
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const requestUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(requestUrl, options)
    const data = await response.json()
    if (response.ok) {
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const formattedSimilarJobsList = similarJobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      const formattedJobDetails = {
        id: jobDetails.id,
        companyLogoUrl: jobDetails.company_logo_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        companyWebsiteUrl: jobDetails.company_website_url,
        lifeAtCompany: jobDetails.life_at_company,
        packagePerAnnum: jobDetails.package_per_annum,
        skills: jobDetails.skills,
      }
      this.setState({
        jobDetails: formattedJobDetails,
        similarJobsList: formattedSimilarJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsView = () => {
    const {jobDetails, similarJobsList} = this.state
    const {
      lifeAtCompany,
      skills,
      companyLogoUrl,
      jobDescription,
      employmentType,
      location,
      rating,
      title,
      companyWebsiteUrl,
      packagePerAnnum,
    } = jobDetails
    const formattedLifeAtCompany = {
      imageUrl: lifeAtCompany.image_url,
      description: lifeAtCompany.description,
    }
    const {imageUrl, description} = formattedLifeAtCompany
    const formattedSkillsList = skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-details-logo-role-container">
            <img
              className="job-details-logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="job-details-role-rating-container">
              <h3 className="job-details-role">{title}</h3>
              <p className="job-details-rating">
                <img
                  className="job-details-star"
                  alt="stars"
                  src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
                />
                {rating}
              </p>
            </div>
          </div>
          <div className="job-details-location-employment-type-salary-container">
            <div className="job-details-location-employment-type-container">
              <p className="job-details-location">
                <IoLocationSharp className="job-details-location-icon" />
                {location}
              </p>
              <p className="job-details-location">
                <FaBriefcase className="job-details-location-icon" />
                {employmentType}
              </p>
            </div>
            <p className="job-details-salary">{packagePerAnnum}</p>
          </div>
          <hr className="job-details-horizontal-line" />
          <div className="description-visit-container">
            <h1 className="job-details-description-heading">Description</h1>
            <a className="anchor" href={companyWebsiteUrl}>
              Visit <FiExternalLink />
            </a>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h3 className="skills-heading">Skills</h3>
          <ul className="skills-container">
            {formattedSkillsList.map(eachSkill => (
              <Skills skillDetails={eachSkill} key={eachSkill.imageUrl} />
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description-image-container">
            <p className="life-at-company-description">{description}</p>
            <img
              className="life-at-company-image"
              alt="life at company"
              src={imageUrl}
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsList.map(eachJob => (
            <SimilarJob jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="job-details-failure-view-container">
      <img
        className="job-details-failure-view-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="job-details-failure-retry-button"
        type="button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="jobs-details-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSwitchView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-bg-container">
        <Header />
        {this.renderSwitchView()}
      </div>
    )
  }
}

export default JobDetails
