import http from '../http-common';

const getYearMonth = () => {
  return http.get('/api/transaction/findYearMonth');
};

const getFromPeriod = (period) => {
  const url = `/api/transaction?period=${period.toString()}`;
  return http.get(url);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

// const get = (id) => {
//   return http.get(`/grade/${id}`);
// };

const create = (data) => {
  return http.post('/api/transaction/', data);
};

const update = (id, data) => {
  return http.put(`/api/transaction/${id}`, data);
};

// const removeAll = () => {
//   return http.delete(`/grade`);
// };

// const findByName = (name) => {
//   return http.get(`/grade?name=${name}`);
// };

export default {
  getYearMonth,
  getFromPeriod,
  // get,
  create,
  update,
  remove,
  // removeAll,
  // findByName,
};
