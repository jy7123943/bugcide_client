

import React from 'react';
import './css/style.scss';

const ProjectDetail = (props) => {
  console.log('ProjectDetail page props: ', props);
  return (
    <div className="app-content">
      <h2>My Projects</h2>
      Project Detail
      <div className="pagination">
        <button
          type="button"
          className="btn-page"
        >
          Prev
        </button>
        <button
          type="button"
          className="btn-page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
