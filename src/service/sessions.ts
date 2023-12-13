import { AxiosResponse } from 'axios';
import { Chat } from './chat';
import { Language } from './classroom';
import { api } from './api';
import { Persona } from './personas';

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
  personaId: string;
}

export async function newSession(language: Language, persona: Persona): Promise<Session> {
  const { data } = await api.post<Session, AxiosResponse<Session>, CreateSessionDto>('/sessions', {
    language,
    personaId: persona._id,
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
