import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './partials/Loading';
import Manual from './partials/Manual';
import Accordion from './partials/Accordion';
import Modal from './partials/Modal';
import BubbleChart from './partials/BubbleChart';
import moment from 'moment';
import './css/project_detail.scss';

const ProjectDetail = (props) => {
  console.log('ProjectDetail page props: ', props);
  const {
    jwtoken,
    isLoading,
    isError,
    errorList,
    project,
    currentPageNo,
    isDescSorting,
    onProjectDetailLoad,
    totalErrorListLength,
    onProjectDelete,
    match: { params }
  } = props;

  const ERROR_LIST_LIMIT = 20;

  const [ istimelineTabOpened, setTimelineTab ] = useState(true);
  const [ isGraphTabOpened, setGraphTab ] = useState(false);
  const [ isModalOpened, setModal ] = useState(false);
  const [ projectName, setProjectName ] = useState('');
  const [ isProjectNameWrong, matchProjectName ] = useState(false);

  useEffect(() => {
    onProjectDetailLoad(jwtoken, params.token);
  }, [ jwtoken, onProjectDetailLoad, params ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app-content">
      {isModalOpened && (
        <Modal
          onModalClose={() => {
            setModal(false);
          }}
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
            {!!isProjectNameWrong && (
              <span className="label-info txt-red">
                Project Name not matched!
              </span>
            )}
            <span className="label-info">
              Please type in the name of the project to confirm.
            </span>
            <span className="label-info">
              Once you delete a project, there is no going back. Please be certain.
            </span>
          </label>
          <button
            type="button"
            className="btn-basic btn-orange"
            onClick={() => {
              if (projectName !== project.name) {
                matchProjectName(true);
                return;
              }
              onProjectDelete(jwtoken, params.token);
            }}
          >
            Are you absolutely sure?
          </button>
        </Modal>
      )}
      <div className="content-header">
        {project && (
          <>
            <div>
              <h2 className="content-title">
                {project.name}
                <span className="project-date">
                  {moment(project.created_at).format('YYYY.MM.DD')}
                </span>
              </h2>
              <p className="project-token">
                Project Token: {project.token}
              </p>
            </div>
            <div className="align-right">
              <button
                type="button"
                className="btn-basic btn-delete sm"
                onClick={() => {
                  setModal(true);
                }}
              >
                DELETE
              </button>
              <Link
                to="/"
                className="btn-basic sm"
              >
                LIST
              </Link>
            </div>
          </>
        )}
      </div>
      {errorList.length === 0 && (
        <Manual
          projectToken={params.token}
        />
      )}
      {errorList.length > 0 && (
        <div className="detail-content">
          <ul className="tab-header">
            <li>
              <button
                type="button"
                className={istimelineTabOpened ? "btn-tab active" : "btn-tab"}
                onClick={() => {
                  setTimelineTab(true);
                  setGraphTab(false);
                }}
              >
                Timeline
              </button>
            </li>
            <li>
              <button
                type="button"
                className={isGraphTabOpened ? "btn-tab active" : "btn-tab"}
                onClick={() => {
                  setTimelineTab(false);
                  setGraphTab(true);
                }}
              >
                Graph
              </button>
            </li>
          </ul>
          {istimelineTabOpened && (
            <div className="tab-content">
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="sortingCheck"
                  defaultChecked={isDescSorting}
                  onChange={() => {
                    const sort = isDescSorting ? 'asc' : 'desc';
                    onProjectDetailLoad(jwtoken, params.token, 0, sort);
                  }}
                />
                <label htmlFor="sortingCheck">
                  <span className="toggle-track"></span>
                </label>
              </div>
              <ul className="timeline-list">
                {errorList.map(errorItem => (
                  <Accordion
                    key={errorItem._id}
                    errorItem={errorItem}
                  />
                ))}
              </ul>
              {totalErrorListLength > ERROR_LIST_LIMIT && (
                <div className="pagination">
                  <button
                    type="button"
                    className={currentPageNo === 0 ? 'btn-page disabled' : 'btn-page'}
                    onClick={() => {
                      if (currentPageNo === 0) {
                        return;
                      }
                      const sort = isDescSorting ? 'desc' : 'asc';
                      onProjectDetailLoad(jwtoken, params.token, currentPageNo - 1, sort);
                    }}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className={totalErrorListLength / ERROR_LIST_LIMIT <= currentPageNo + 1 ? 'btn-page disabled' : 'btn-page'}
                    onClick={() => {
                      const pageLimit = totalErrorListLength / ERROR_LIST_LIMIT;
                      if (pageLimit <= currentPageNo + 1) {
                        return;
                      }
                      const sort = isDescSorting ? 'desc' : 'asc';
                      onProjectDetailLoad(jwtoken, params.token, currentPageNo + 1, sort);
                    }}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
          {isGraphTabOpened && (
            <div className="tab-content">
              <BubbleChart
                data={[
                  { "id": 1,
                    "title": "TypeError",
                    "count": 29
                  },
                  { "id": 2,
                    "title": "Error",
                    "count": 69
                  },
                  { "id": 3,
                    "title": "RangeError",
                    "count": 14
                  },
                  { "id": 4,
                    "title": "SyntaxError",
                    "count": 56
                  }
                ]}
                width={500}
                height={500}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
