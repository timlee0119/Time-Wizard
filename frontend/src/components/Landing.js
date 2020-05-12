import React from 'react';

const Landing = () => {
  return (
    <>
      <h1 className="ui teal">
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
