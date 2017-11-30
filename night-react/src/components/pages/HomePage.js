import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import * as actions from '../../actions/auth';
import * as userActions from '../../actions/venuesActions';
import AppPage from './AppPage';

const HomePage = ({ isAuthenticated, logout, addDestination, isConfirmed }) => {
 const going = e => {
  console.log(e);
    addDestination(e)
  }
  return (
      <div>
      <h1>HomePage</h1>
      { isAuthenticated ? ( 
        <button onClick={() => logout()}>Logout</button> 
        ) : (
          <div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></div>
        )}
        <br/><br/>
        <AppPage going={going} isConfirmed={isConfirmed}/>
      </div>
  )}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  addDestination: PropTypes.func.isRequired,
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps, { 
 logout: actions.logout,
 addDestination: userActions.addDestination
  })(HomePage);


