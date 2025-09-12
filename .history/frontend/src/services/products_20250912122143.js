import API from './api';

export const getOpenProducts = () => API.get('/products/open');
// export const getClosedProducts = () => API.get('/admin/products/closed');
export const getClosedProducts = () => API.get('/products/closed');
export const getProduct = (id) => API.get(`/products/${id}`);
// export const createProduct = (productData) => API.post('/admin/products', productData);
export const AddProduct = (productData) => API.post('/admin/products', productData);
export const updateProduct = (id, productData) => API.put(`/admin/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/admin/products/${id}`);

