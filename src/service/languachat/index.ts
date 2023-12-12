import axios, { AxiosResponse } from 'axios';
import { Chat } from '../chat/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export enum SessionStatus {
  Active,
  Ended,
}

export interface Session {
  _id: string;
  chat: Chat;
  status: SessionStatus;
}

interface CreateSessionDto {
  classroomId: string;
}

export async function newSession(): Promise<Session> {
  const { data } = await api.post<Session, AxiosResponse<Session>, CreateSessionDto>('/sessions', {
    classroomId: import.meta.env.VITE_DEFAULT_CLASSROOM_ID,
  });
  return data;
}

export interface UpdateSessionDto {
  sessionId: string;
  userMessage: string;
}

export function updateSession(session: Session, userMessage: string): Promise<Session> {
  return api
    .put<Session, AxiosResponse<Session>, UpdateSessionDto>('/sessions', {
      sessionId: session._id,
      userMessage,
    })
    .then(({ data }) => data);
}
