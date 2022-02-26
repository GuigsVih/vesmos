export const env = {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://192.168.0.109:8080'
        : ''
};