import React from 'react';
import { firebaseAuth } from './FirebaseInit';
import { navigate } from '@reach/router';
import GoogleSignIn from './GoogleSignIn';
import FacebookSignIn from './FacebookSignIn';

class SignUp extends React.Component {
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    return (
      <div className='auth-container marg-t-xxl'>
        <form className='auth-form'>
          <GoogleSignIn sendErr={this.getErr} />
        </form>
      </div>
    );
  }
}

export default SignUp;
