import axios from 'axios';


//will change this url at some point, just the dev one at port 3000
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const createGame = async () => {
  const response = await api.post('/game/create');
  return response.data;
};

export const joinGame = async (gameId: string, username: string) => {
  const response = await api.post('/game/join', { gameId, username });
  return response.data;
};

export const updateNewsArticles = async () => {
  const response = await api.post('/game/updateArticles');
  return response.data;
};

export const startGame = async (gameId: string) => {
  const response = await api.post('/game/start', { gameId });
  return response.data;
};


export default api;