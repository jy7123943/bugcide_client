import React, { useEffect } from 'react';
import Loading from './partials/Loading';
import Manual from './partials/Manual';

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
              </h2>
              <div>Project Token: {project.token}</div>
            </div>
            <div>{project.created_at}</div>
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
          <ul>
            {errorList.map(errorItem => (
              <li key={errorItem._id}>
                <div>
                  <div>{errorItem.created_at}</div>
                  <ul>
                    <li>{errorItem.duplicate_count || 1}</li>
                    <li>{errorItem.name}</li>
                    <li>{errorItem.message}</li>
                  </ul>
                  <ul>
                    <li>{errorItem.filename}</li>
                    <li>{errorItem.lineno}</li>
                    <li>{errorItem.colno}</li>
                  </ul>
                </div>
                <div>
                  {errorItem.stack}
                </div>
              </li>
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
    </div>
  );
};

export default ProjectDetail;
