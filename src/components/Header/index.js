import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link className="nav-link" to="/">
        <img
          className="header-website-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      <ul className="icons-container">
        <li className="list-element">
          <button className="icon-button" type="button">
            <Link className="nav-link" to="/">
              <AiFillHome className="icon" />
            </Link>
          </button>
        </li>
        <li className="list-element">
          <button className="icon-button" type="button">
            <Link className="nav-link" to="/jobs">
              <BsFillBriefcaseFill className="icon" />
            </Link>
          </button>
        </li>
        <li className="list-element">
          <button className="icon-button" type="button" onClick={onLogout}>
            <FiLogOut className="icon" />
          </button>
        </li>
      </ul>
      <div className="home-jobs-container">
        <button className="home-button" type="button">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </button>
        <button className="home-button" type="button">
          <Link className="nav-link" to="/jobs">
            Jobs
          </Link>
        </button>
      </div>
      <button className="logout-button" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
