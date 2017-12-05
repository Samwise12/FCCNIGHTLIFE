import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import * as actions from '../../actions/auth';
import * as userActions from '../../actions/venuesActions';
import AppPage from './AppPage';

class HomePage extends React.Component {
  going = e => this.props.addDestination(e);
  userVenues = e => this.props.userGoing(e);
  render() {
    const {isAuthenticated, isConfirmed } = this.props;
    // console.log(this.props)
    return(
      <div>
        <h1>HomePage</h1>
        { isAuthenticated ? ( 
          <button onClick={() => this.props.logout()}>Logout</button> 
          ) : (
            <div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></div>
          )}
          <br/><br/>
          <AppPage going={this.going} isConfirmed={isConfirmed} userVenues={this.userVenues}/>
      </div>
      )
  }

}

/*const HomePage = ({ isAuthenticated, logout, addDestination, userGoing, isConfirmed }) => {
 const going = e => {
  // console.log(e);
    addDestination(e)
  };
 const userVenues = (e) => {
  // console.log(e)
   userGoing(e)
  };
  return (
      <div>
      <h1>HomePage</h1>
      { isAuthenticated ? ( 
        <button onClick={() => logout()}>Logout</button> 
        ) : (
          <div><Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></div>
        )}
        <br/><br/>
        <AppPage going={going} isConfirmed={isConfirmed} userVenues={userVenues}/>
      </div>
  )}*/

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  addDestination: PropTypes.func.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  userGoing: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isConfirmed: !!state.user.confirmed
  }
}

export default connect(mapStateToProps, { 
 logout: actions.logout,
 addDestination: userActions.addDestination,
 userGoing: userActions.userGoing
  })(HomePage);


