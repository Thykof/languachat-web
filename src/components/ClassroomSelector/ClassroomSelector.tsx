import React, { useEffect } from 'react';
import { play } from '../../service/utils';
import { Session, newSession } from '../../service/sessions';
import { Language, Level, findOrCreateClassroom } from '../../service/classroom';
import { subscribe, unsubscribe } from '../../service/event';
import { EVENT_LANGUAGE_SELECTED, LanguageSelectedEvent, LanguageSelector } from './LanguageSelector';
import { Persona } from '../../service/personas';
import { EVENT_PERSONA_SELECTED, PersonaSelectedEvent, PersonaSelector } from './PersonaSelector';
import { EVENT_LEVEL_SELECTED, LevelSelector } from './LevelSelector';
import { EVENT_TOPIC_SELECTED, TopicSelector } from './TopicSelector';
import { Topic } from '../../service/topics';

interface ClassroomSelectorProps {
  setSession: (session: Session) => void;
}

export const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({ setSession }) => {
  const [startActive, setStartActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<Language | null>(null);
  const [persona, setPersona] = React.useState<Persona | null>(null);
  const [level, setLevel] = React.useState<Level | null>(null);
  const [topic, setTopic] = React.useState<Topic | null>(null);

  const updateStartActive = () => {
    setStartActive(language !== null && persona !== null && level !== null && topic !== null);
  };

  const languageListener = (evt: CustomEvent<LanguageSelectedEvent>) => {
    setLanguage(evt.detail.language);
  };
  const personaListener = (evt: CustomEvent<PersonaSelectedEvent>) => {
    setPersona(evt.detail.persona);
  };
  const levelListener = (evt: CustomEvent<{ level: Level }>) => {
    setLevel(evt.detail.level);
  };
  const topicListener = (evt: CustomEvent<{ topic: Topic }>) => {
    setTopic(evt.detail.topic);
  };

  useEffect(() => {
    subscribe(EVENT_LANGUAGE_SELECTED, languageListener);
    subscribe(EVENT_PERSONA_SELECTED, personaListener);
    subscribe(EVENT_LEVEL_SELECTED, levelListener);
    subscribe(EVENT_LEVEL_SELECTED, levelListener);
    subscribe(EVENT_TOPIC_SELECTED, topicListener);
    return () => {
      unsubscribe(EVENT_LANGUAGE_SELECTED, () => languageListener);
      unsubscribe(EVENT_PERSONA_SELECTED, () => personaListener);
      unsubscribe(EVENT_LEVEL_SELECTED, () => levelListener);
      unsubscribe(EVENT_TOPIC_SELECTED, () => topicListener);
    };
  }, []);

  useEffect(() => {
    updateStartActive();
  }, [language, persona, level, topic]);

  const start = async () => {
    if (language === null || persona === null || level === null) {
      console.error('some  info not selected');
      return;
    }
    setStartActive(false);
    setLoading(true);
    const classroom = await findOrCreateClassroom(language, persona, level);
    const session = await newSession(classroom._id);
    play(session.chat.messages[0].speech?.data!);
    setSession(session);
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col pb-4">
        <div className="text-center">
          <LanguageSelector language={language} />
          <PersonaSelector persona={persona} />
          <LevelSelector level={level} />
          <TopicSelector topic={topic} />
          <button className={`btn ${startActive ? '' : 'btn-disabled'} btn-primary`} onClick={start}>
            Start
          </button>
        </div>
      </div>
      {loading && <span className="loading loading-dots loading-md"></span>}
    </>
  );
};
