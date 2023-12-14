import React, { useEffect } from 'react';
import { play } from '../../service/utils';
import { Session, newSession } from '../../service/sessions';
import { Language, findOrCreateClassroom } from '../../service/classroom';
import { subscribe, unsubscribe } from '../../service/event';
import { EVENT_LANGUAGE_SELECTED, LanguageSelectedEvent, LanguageSelector } from './LanguageSelector';
import { Persona } from '../../service/personas';
import { EVENT_PERSONA_SELECTED, PersonaSelectedEvent, PersonaSelector } from './PersonaSelector';

interface ClassroomSelectorProps {
  setSession: (session: Session) => void;
}

export const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({ setSession }) => {
  const [startActive, setStartActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState<Language | null>(null);
  const [persona, setPersona] = React.useState<Persona | null>(null);

  const updateStartActive = () => {
    setStartActive(language !== null && persona !== null);
  };

  const languageListener = (evt: CustomEvent<LanguageSelectedEvent>) => {
    setLanguage(evt.detail.language);
  };
  const personaListener = (evt: CustomEvent<PersonaSelectedEvent>) => {
    setPersona(evt.detail.persona);
  };

  useEffect(() => {
    subscribe(EVENT_LANGUAGE_SELECTED, languageListener);
    subscribe(EVENT_PERSONA_SELECTED, personaListener);
    return () => {
      unsubscribe(EVENT_LANGUAGE_SELECTED, () => languageListener);
      unsubscribe(EVENT_PERSONA_SELECTED, () => personaListener);
    };
  }, []);

  useEffect(() => {
    updateStartActive();
  }, [language, persona]);

  const start = async () => {
    if (language === null || persona === null) {
      console.error('Language or persona not selected');
      return;
    }
    setStartActive(false);
    setLoading(true);
    const classroom = await findOrCreateClassroom(language, persona);
    const session = await newSession(classroom._id);
    play(session.chat.messages[0].speech?.data!);
    setSession(session);
    setLoading(false);
  };

  // level, topic

  return (
    <>
      <div className="flex flex-col pb-4">
        <div className="text-center">
          <LanguageSelector language={language} />
          <PersonaSelector persona={persona} />
          <button className={`btn ${startActive ? '' : 'btn-disabled'} btn-primary`} onClick={start}>
            Start
          </button>
        </div>
      </div>
      {loading && <span className="loading loading-dots loading-md"></span>}
    </>
  );
};
