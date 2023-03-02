// Hooks are new in React 16.8.  A Hook is a special type of function that allows us to hook into React features.
// useState is a Hook that allows us to add React state to function components. Prior to Hooks, if we were to write a function 
// component and later had to add state to it, we had to convert it to a class, but now we can use a Hook inside the function component.
import React, { useState } from 'react';
//import { Link, Redirect } from 'react-router-dom';
//Redirect has been replaced with Navigate
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({login, isAuthenticated}) => {
  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // onChange handler configured to handle change for all fields
  const onChange = e => updateFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
   // console.log('awesome!');
   login({email, password});
  };

  //redirect when logged in
  if(isAuthenticated){
    return <Navigate to='/welcome' />;
  }

  return (
    <div>
      <h1 className="large text-primary">Log in</h1>
      <p className="cta"><i className="fas fa-sign-in-alt"></i> Log in to your account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" value={password} onChange={e => onChange(e)} minLength="4" />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="m">
        Not registered yet? <Link to='/register'>Register now</Link>
      </p>
    </div>
  )
};

Login.prototypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);