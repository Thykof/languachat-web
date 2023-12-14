import { api } from './api';

export interface Topic {
  _id: string;
  name: string;
  description: string;
}

export async function getTopics(): Promise<Topic[]> {
  const { data } = await api.get<Topic[]>('/topics');
  return data;
}
