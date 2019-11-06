import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from './partials/Loading';
import Manual from './partials/Manual';
import Accordion from './partials/Accordion';
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
    match: { params }
  } = props;

  const ERROR_LIST_LIMIT = 20;

  const [ istimelineTabOpened, setTimelineTab ] = useState(true);
  const [ isGraphTabOpened, setGraphTab ] = useState(false);
  const [ isSorting, setSorting ] = useState(false);

  useEffect(() => {
    onProjectDetailLoad(jwtoken, params.token);
  }, [ jwtoken, onProjectDetailLoad, params ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app-content">
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
            <div className="tab-content">Graph</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
