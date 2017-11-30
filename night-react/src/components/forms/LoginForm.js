import React, { Component } from 'react';
// import axios from 'axios';
import { Form, Button, Message } from "semantic-ui-react";
import Validator from 'validator';
import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class LoginForm extends Component {
    state = {
      data: {
        email: '',
        password: ''
      },
      loading: false,
      errors: {}
    };    
    onChange = e => {
      this.setState({
          data: {...this.state.data, [e.target.name]: e.target.value}
        });
    };

    onSubmit = () => {
      const { data } = this.state;
      const errors = this.validate(data);
      this.setState({ errors });
      if (Object.keys(errors).length === 0) {
        this.setState({ loading: true });
        this.props
            .submit(data)
            .catch(err => this.setState({ errors: err.response.data.errors
                                        ,loading: false }));
      }
    };
    validate = data => {
      const errors = {};
      if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
      if (!data.password) errors.password = "Can't be blank";
      return errors;
    };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
          )}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" id="email"
            name="email" value={data.email}
            placeholder="enter email" onChange={this.onChange}/>
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" id="password"
            name="password" value={data.password}
            placeholder="enter password" onChange={this.onChange}/>
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

      <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default LoginForm;
