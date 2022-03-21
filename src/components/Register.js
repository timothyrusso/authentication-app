import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth.js';
import * as data from '../data.js';
import './styles/Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      calGoal: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCals = this.handleChangeCals.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleChangeCals = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      auth.register(this.state.username, this.state.password, this.state.email, this.state.calGoal).then((res) => {
        if (res) {
          this.props.history.push('/login');
        } else {
          console.log('Something went wrong.');
        }
      });
    }
  }

  render() {
    return (
      <div className="register">
        <p className="register__welcome">
          Please register.
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label htmlFor="username">
            Username:
          </label>
          <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label htmlFor="email">
            Email:
          </label>
          <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <label htmlFor="password">
            Password:
          </label>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <label htmlFor="confirmPassword">
            Confirm password:
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
          <label htmlFor="calGoal">
            Daily calorie goal:
          </label>
          <select name="calGoal" value={this.state.calGoal} onChange={this.handleChangeCals}>
            {
              data.calData.map((item, i) => {
                return (
                  <option value={item.id} key={i}>{item.calGoal}</option>
                )
              })
            }
          </select>
          <div className="register__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="register__link">Sign up</button>
          </div>
        </form>

        <div className="register__signin">
          <p>Already have an account??</p>
          <Link to="login" className="register__login-link">Log in here</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);