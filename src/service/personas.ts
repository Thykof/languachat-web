import { api } from './api';

export interface Persona {
  _id: string;
  name: string;
  description: string;
}

export async function getPersonas(): Promise<Persona[]> {
  const { data } = await api.get<Persona[]>('/personas');
  return data;
}
