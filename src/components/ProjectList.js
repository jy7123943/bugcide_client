
import React from 'react';
import { Link } from 'react-router-dom';
import './css/style.scss';
import './css/project_list.scss';

const ProjectList = (props) => {
  console.log('ProjectList page props: ', props);
  return (
    <div className="app-content">
      <div className="content-header">
        <h2 className="content-title">My Projects</h2>
        <button
          type="button"
          className="btn-basic sm"
        >
          Create New Project
        </button>
      </div>
      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="no-data">
            <td colSpan={2}>
              <p>Empty List!</p>
              <p>
                Click "Create New Project" to start.
              </p>
            </td>
          </tr>
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
