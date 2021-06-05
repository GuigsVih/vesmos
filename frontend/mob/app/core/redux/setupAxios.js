import AsyncStorage from "@react-native-community/async-storage";

export default function setupAxios(axios) {
  axios.interceptors.request.use(
    (config) => {
      AsyncStorage.getItem('token')
        .then((authToken) => {
          if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
          }
        });

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
       if (error.response.status === 403) {
          (async () => await AsyncStorage.removeItem('token'));
       } else {
          return Promise.reject(error);
       }
    },
 );
}