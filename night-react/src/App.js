import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import LoginPage from "./components/pages/LoginPage";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import SignupPage from "./components/pages/SignupPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";

import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const App = ({ location }) => (
  <div className="ui container">
    {/*<div className="ui two item menu">
<NavLink className="item" exact to="/">Search Movies</NavLink>
    </div>*/}
    <Route location={location} path="/" exact component={HomePage} />
    <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />    
    <Route location={location} path="/login" exact component={LoginPage} />
    <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
    <GuestRoute location={location} path="/forgot_password" exact component={ForgotPasswordPage} />    
    <GuestRoute location={location} path="/reset_password/:token" exact component={ResetPasswordPage} />        
    <Route location={location} path="/signup" exact component={SignupPage} />
  </div>
  )

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
