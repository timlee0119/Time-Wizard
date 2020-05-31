import React from 'react';
import ReactTooltip from 'react-tooltip';

export default ({ id, icon, content, place }) => {
  return (
    <>
      <span
        className="material-icons"
        style={{ cursor: 'pointer', color: 'var(--main-dark-color)' }}
        data-tip
        data-for={id}
      >
        {icon}
      </span>
      <ReactTooltip id={id} place={place || 'bottom'} effect="solid">
        {content}
      </ReactTooltip>
    </>
  );
};
