import React from 'react'
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import './topNavbar.css'

export const TopNavbar = (props) => {
  const nav = useNavigate();
  const { isAuthenticated, userHasAuthenticated } = props

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    nav("/login");
  }

  return (
    <div className='top-navbar'>
      <div>
        <Link to="/dashboard">
          <div className="fw-bold text-muted">VenueVista</div>
        </Link>
      </div>

      <div className="justify-content-end">
        <div activeKey={window.location.pathname}>
          {isAuthenticated ? (
            <button className='btn-link' onClick={handleLogout}>Logout</button>
          ) : (
            <div>
              <Link to="/signup">
                Signup
              </Link>
              <Link to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}