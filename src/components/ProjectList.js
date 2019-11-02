
import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.scss';

const ProjectList = (props) => {
  console.log('ProjectList page props: ', props);
  return (
    <div className="app-content">
      <h2>My Projects</h2>
      <button
        type="button"
        className="btn-modern"
      >
        Create New Project
      </button>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link
                to="/project/projectToken"
              >
                CoupleLab
              </Link>
            </td>
            <td>2019.10.31 14:00pm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
