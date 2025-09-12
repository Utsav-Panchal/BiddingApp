import API from './api';

export const placeBid = (bidData) => API.post('/bids', bidData);
export const getUserBids = () => API.get('/user/bids');
export const getProductBids = (productId) => API.get(`/admin/products/${productId}/bids`);
export const updateBid = (id, bidData) => API.put(`/admin/bids/${id}`, bidData);
export const deleteBid = (id) => API.delete(`/admin/bids/${id}`);
export const getBids = () => API.get('/admin/bids');
console.log("Bids service loaded");
