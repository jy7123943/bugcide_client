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
    onProjectDetailLoad,
    totalErrorListLength,
    match: { params }
  } = props;
  console.log(project);

  const [ istimelineTabOpened, setTimelineTab ] = useState(true);
  const [ isGraphTabOpened, setGraphTab ] = useState(false);

  useEffect(() => {
    onProjectDetailLoad(jwtoken, params.token);
  }, []);

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
              <ul className="timeline-list">
                {errorList.map(errorItem => (
                  <Accordion
                    key={errorItem._id}
                    errorItem={errorItem}
                  />
                ))}
              </ul>
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
