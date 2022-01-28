export const env = {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://192.168.15.138:8080'
        : ''
};