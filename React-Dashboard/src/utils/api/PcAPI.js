import axiosClient from "./axiosClient";

const END_POINT = {
  PC: "PC/GetListByAdmin",
};

export const getPcAPI = () => {
  return axiosClient.get(`${END_POINT.PC}`);
};

export const createPcAPI = () => {
  return axiosClient.post(`${END_POINT.PC}`);
};
export const deletePcAPI = (id) => {
  return axiosClient.delete(`${END_POINT.PC}/${id}`);
};

export const editPcAPI = (id) => {
  return axiosClient.put(`${END_POINT.PC}/${id}`);
};
