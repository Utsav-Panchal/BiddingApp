import API from './api';

export const getWinners = () => API.get('/admin/winners');
export const getUserWonProducts = () => API.get('/user/won-products');

