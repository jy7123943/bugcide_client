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
