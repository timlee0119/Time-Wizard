import React from 'react';
import logo from '../logo.svg';

const Landing = () => {
  return (
    <>
      <h1 className="ui teal">
        <img src={logo} alt="logo" />
        <div className="content">Intervention</div>
      </h1>
      <form className="ui large form">
        <div className="ui raised segment">
          <div className="ui fluid large teal submit button">
            <i className="google icon"></i>
            Login with Google
          </div>
        </div>
      </form>
    </>
  );
};

export default Landing;
