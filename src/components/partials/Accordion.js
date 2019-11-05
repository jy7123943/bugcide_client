import React, { useState } from 'react';
import moment from 'moment';

const Accordion = ({ errorItem }) => {
  const {
    created_at: createdAt,
    duplicate_count: duplicateCount,
    name,
    message,
    filename,
    lineno,
    colno,
    stack
  } = errorItem;
  const [ isAccordionOpen, setAccordion ] = useState(false);
  const handleAccordion = () => {
    setAccordion(!isAccordionOpen);
  };

  return (
    <li className="time-list">
      <div className="accordion-parent">
        <div className="error-time">
          <div>
            {moment(createdAt).format('YYYY.MM.DD')}
          </div>
          <div>
            {moment(createdAt).format('hh:mm a')}
          </div>
        </div>
        <div className="error-info">
          <ul className="error-title">
            <li>
              <span className="badge">
                {duplicateCount || 1}
              </span>
              <span className="title">
                {name}
              </span>
            </li>
            <li className="message">{message}</li>
          </ul>
          <ul className="error-source">
            <li>{filename}</li>
            <li>{lineno}</li>
            <li>{colno}</li>
          </ul>
        </div>
        <button className="btn-more"
          onClick={handleAccordion}
        >
          +
        </button>
      </div>
      {isAccordionOpen && (
        <div className="accordion-child">
          {stack}
        </div>
      )}
    </li>
  );
};

export default Accordion;
