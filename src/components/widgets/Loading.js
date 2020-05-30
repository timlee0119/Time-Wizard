import React from 'react';
import '../../styles/Loading.css';

export default () => {
  return (
    <div style={{ margin: 'auto' }}>
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
