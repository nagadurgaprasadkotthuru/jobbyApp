import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'
import FilterGroups from '../FilterGroups'
import Profile from '../Profile'
import JobItem from '../JobItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    typeOfEmployment: [],
    salary: '',
    searchTitle: '',
    searchInput: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {typeOfEmployment, salary, searchTitle} = this.state
    const employmentType = typeOfEmployment.join(',')
    const jwtToken = Cookies.get('jwt_token')
    const requestUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salary}&search=${searchTitle}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(requestUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {jobs} = data
      const formattedJobsList = jobs.map(eachJob => ({
        id: eachJob.id,
        location: eachJob.location,
        title: eachJob.title,
        rating: eachJob.rating,
        packagePerAnnum: eachJob.package_per_annum,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
      }))
      this.setState({
        jobsList: formattedJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onChangeEmploymentType = event => {
    const isChecked = event.target.checked
    const {value} = event.target
    if (isChecked) {
      this.setState(
        prevState => ({
          typeOfEmployment: [...prevState.typeOfEmployment, value],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          typeOfEmployment: prevState.typeOfEmployment.filter(
            eachType => eachType !== value,
          ),
        }),
        this.getJobs,
      )
    }
  }

  onChangeSalary = value => this.setState({salary: value}, this.getJobs)

  onChangeSearchTitle = () => {
    const {searchInput} = this.state
    this.setState({searchTitle: searchInput}, this.getJobs)
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-retry-button"
        type="button"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobsView = () => {
    const {jobsList} = this.state
    if (jobsList.length !== 0) {
      return (
        <ul className="jobs-container">
          {jobsList.map(eachJob => (
            <JobItem jobItemDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-view-container">
        <img
          className="no-jobs-img"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  switchAllJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobsView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList, searchInput} = this.props
    return (
      <div className="jobs-basic-view-container">
        <Header />
        <div className="content-container1">
          <div className="content-container2">
            <div className="search-element-search-icon-container">
              <input
                className="search-input-element"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                data-testid="searchButton"
                className="search-icon-button"
                type="button"
                onClick={this.onChangeSearchTitle}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <Profile />
            <FilterGroups
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeEmploymentType={this.onChangeEmploymentType}
              onChangeSalary={this.onChangeSalary}
            />
          </div>
          <div className="content-container3">
            <div className="search-element-search-icon-container-lg">
              <input
                className="search-input-element"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                data-testid="searchButton"
                className="search-icon-button"
                type="button"
                onClick={this.onChangeSearchTitle}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.switchAllJobsView()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
