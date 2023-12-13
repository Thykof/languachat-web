import axios, { AxiosResponse } from 'axios';
import { Chat } from './types';
import { Language } from './classroom';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export enum SessionStatus {
  Active = 'active',
  Ended = 'ended',
}

export interface Session {
  _id: string;
  chat: Chat;
  status: SessionStatus;
}

interface CreateSessionDto {
  language: string;
}

export async function newSession(language: Language): Promise<Session> {
  const { data } = await api.post<Session, AxiosResponse<Session>, CreateSessionDto>('/sessions', {
    language,
  });
  return data;
}

export interface UpdateSessionDto {
  userMessage: string;
}

export async function updateSession(session: Session, userMessage: string): Promise<Session> {
  const { data } = await api.put<Session, AxiosResponse<Session>, UpdateSessionDto>(`/sessions/${session._id}`, {
    userMessage,
  });
  return data;
}
