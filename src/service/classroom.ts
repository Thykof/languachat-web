import { AxiosResponse } from 'axios';
import { api } from './api';
import { Persona } from './personas';
import { Topic } from './topics';

export enum Language {
  English = 'english',
  Spanish = 'spanish',
  French = 'french',
  German = 'german',
  Italian = 'italian',
  Portuguese = 'portuguese',
}

export enum Level {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}

export interface Classroom {
  _id: string;
  name: string;
  topic: Topic;
  language: Language;
  level: Level;
  persona: Persona;
}

export interface CreateClassroomDto {
  name: string;
  topicId?: string;
  language: string;
  level: string;
  personaId: string;
}

export async function getClassroom(): Promise<Classroom[]> {
  const { data } = await api.get<Classroom[]>('/classrooms');
  return data;
}

export async function findOrCreateClassroom(language: Language, persona: Persona, level: Level): Promise<Classroom> {
  const classrooms = await getClassroom();
  const classroom = classrooms.find(
    (c) => c.language === language && c.persona.name === persona.name && c.level === level,
  );
  if (classroom) {
    return classroom;
  }

  const { data } = await api.post<Classroom, AxiosResponse<Classroom>, CreateClassroomDto>('/classrooms', {
    name: `${persona.name} - ${language} - ${level}`,
    language,
    level,
    personaId: persona._id,
  });
  return data;
}
