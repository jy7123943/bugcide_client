
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Modal from './Modal';
import './css/style.scss';
import './css/project_list.scss';

const ProjectList = (props) => {
  const {
    jwtoken,
    projectList,
    totalProjectsLength,
    handleModalOpen,
    handleModalClose,
    isModalOpened,
    listCreateFailMessage,
    onProjectCreate
  } = props;

  const [ projectName, setProjectName ] = useState('');

  console.log('ProjectList page props: ', props);
  return (
    <>
      {isModalOpened && (
        <Modal
          onModalClose={handleModalClose}
        >
          <label>
            <span className="label-basic">
              Project Name
            </span>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              className="input-basic"
            />
            {!!listCreateFailMessage && (
              <span className="label-info txt-red">
                {listCreateFailMessage}
              </span>
            )}
            <span className="label-info">
              Upper, lower, numeric characters, single space allowed.
            </span>
            <span className="label-info">
              1-25 characters long.
            </span>
          </label>
          <button
            type="button"
            className="btn-basic"
            onClick={() => {
              if (!projectName.trim()) {
                return;
              }
              const newProject = {
                name: projectName,
                created_at: new Date()
              };
              onProjectCreate(jwtoken, newProject);
              setProjectName('');
            }}
          >
            SUBMIT
          </button>
        </Modal>
      )}
      <div className="app-content">
        <div className="content-header">
          <h2 className="content-title">My Projects</h2>
          <button
            type="button"
            className="btn-basic sm"
            onClick={handleModalOpen}
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
            {projectList.length === 0 && (
              <tr className="no-data">
                <td colSpan={2}>
                  <p>Empty List!</p>
                  <p>
                    Click "Create New Project" to start.
                  </p>
                </td>
              </tr>
            )}
            {projectList.length > 0 && (
              projectList.map(project => (
                <tr key={project.token}>
                  <td>
                    <Link
                      to={`/project/${project.token}`}
                    >
                      {project.name}
                    </Link>
                  </td>
                  <td>
                    {moment(project.created_at).format('YYYY.MM.DD hh:mm a')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectList;
