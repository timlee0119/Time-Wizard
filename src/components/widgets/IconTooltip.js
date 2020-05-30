import React from 'react';
import ReactTooltip from 'react-tooltip';

export default props => {
  return (
    <>
      <span
        className="material-icons"
        style={{ cursor: 'pointer', color: 'var(--main-dark-color)' }}
        data-tip
        data-for={props.id}
      >
        {props.icon}
      </span>
      <ReactTooltip id={props.id} place="bottom" effect="solid">
        {props.content}
      </ReactTooltip>
    </>
  );
};
