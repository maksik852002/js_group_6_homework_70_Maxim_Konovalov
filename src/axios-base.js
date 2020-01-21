import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://api.tvmaze.com/'
});

export default axiosBase;
