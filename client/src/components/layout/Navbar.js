import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { logout } from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout}) => {
  // variables for guest and auth Links
  const authLinks = (
    <ul>
      <li><a onClink={logout} href='#!'>Logout</a></li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  )
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'><i className='fas fa-book-reader'></i>MERN Application</Link>
      </h1>
      {!loading && (<div>{isAuthenticated ? authLinks : guestLinks}</div>)}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect (mapStateToProps, { logout })(Navbar);
