import { api } from './api';

export async function getTopics() {
  const { data } = await api.get('/topics');
  return data;
}
