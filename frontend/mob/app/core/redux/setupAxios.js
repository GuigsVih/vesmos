import { actions } from './Auth';
 
export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
       if (error.response.status === 401) {
          store.dispatch(actions.logout());
       } else {
          return Promise.reject(error);
       }
    },
 );
}