import axios from 'axios';

export const getImagesByQuery = async query => {
  const API_KEY = '54567653-327de5fba17dc16d91ee3d6a6';
  const BASE_URL = 'https://pixabay.com/api/';

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const response = await axios.get(BASE_URL, { params });

  return response.data;
};
