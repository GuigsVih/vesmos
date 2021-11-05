import api from './api';

export const fetchPaymentMethods = () => {
  return api.get('/payment');
}