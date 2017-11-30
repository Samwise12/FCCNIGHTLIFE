import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import LoginForm from '../forms/LoginForm';
import { loginAction } from '../../actions/auth';
import setAuthorizationHeader from '../../utils/setAuthorizationHeader';

class LoginContainer extends Component {
  submit = data => {
    	const { loginAction, history} = this.props;
      return loginAction(data)
      .then(() => {
            if(localStorage.nightJWT) return setAuthorizationHeader(localStorage.nightJWT);
            }
        )
      .then(()=> history.push("/"));
    };
    
  render() {
    return (
      <div>
      <h1>LoginPage</h1>
        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot Password?</Link>
      </div>
        )
  }
}

LoginContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  loginAction: PropTypes.func.isRequired
};

export default connect(null, { loginAction })(LoginContainer);