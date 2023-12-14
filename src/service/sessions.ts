import { AxiosResponse } from 'axios';
import { Chat } from './chat';
import { api } from './api';

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
  classroomId: string;
}

export async function newSession(classroomId: string): Promise<Session> {
  const { data } = await api.post<Session, AxiosResponse<Session>, CreateSessionDto>('/sessions', {
    classroomId,
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
