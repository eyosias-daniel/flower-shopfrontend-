import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

const strapiApi = axios.create({
  baseURL: `${API_URL}/api`,
});

// Products
export const getProducts = async () => {
  const response = await strapiApi.get('/products?populate=*');
  return response.data.data;
};

export const getProduct = async (documentId) => {
  const response = await strapiApi.get(`/products/${documentId}?populate=*`);
  return response.data.data;
};

// Gift Baskets
export const getGiftBaskets = async () => {
  const response = await strapiApi.get('/gift-baskets?populate=*');
  return response.data.data;
};

export const createGiftBasket = async (basketData) => {
  const response = await strapiApi.post('/gift-baskets', { data: basketData });
  return response.data.data;
};

// Orders
export const createOrder = async (orderData) => {
  const response = await strapiApi.post('/orders', { data: orderData });
  return response.data.data;
};

export default strapiApi;
