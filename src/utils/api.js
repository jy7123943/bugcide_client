import axios from 'axios';

export const userLoginApi = userInfo => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_SERVER_URL}/login`,
    data: userInfo
  })
    .then(res => res.data)
    .catch(err => err.response.data);
};

export const getProjectListApi = (token, page = 0) => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/project?page=${page}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.data)
    .catch(err => err.response.data);
};
