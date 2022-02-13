import api from "./api";

export const fetchPaymentMethods = () => {
  return api.get("/payment");
}

export const fetchPaymentById = (params) => {
  return api.get(`/payment/${params.type}/${params.id}`);
}