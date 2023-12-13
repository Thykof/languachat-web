import React from 'react';
import { play } from '../service/utils';
import { Session, newSession } from '../service/sessions';
import { Language } from '../service/classroom';

interface ClassroomSelectorProps {
  setSession: (session: Session) => void;
}

export const ClassroomSelector: React.FC<ClassroomSelectorProps> = ({ setSession }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<Language | null>(null);
  const [startActive, setStartActive] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const start = async () => {
    if (selectedLanguage === null) {
      console.error('No language selected');
      return;
    }
    setStartActive(false);
    setLoading(true);
    const session = await newSession(selectedLanguage);
    play(session.chat.messages[0].speech?.data!);
    setSession(session);
    setLoading(false);
  };

  const languageSelected = (language: string) => () => {
    if (!(Object.values(Language) as unknown[]).includes(language)) {
      console.error(`Invalid language: ${language}`);
    }
    setSelectedLanguage(language as Language);
    setStartActive(true);
  };

  // language, coach, level, topic

  return (
    <>
      <div className="flex flex-col pb-4">
        <div className="flex flex-wrap justify-center pb-2">
          {Object.values(Language).map((language) => (
            <button
              key={language}
              className={`btn ${
                selectedLanguage === null || selectedLanguage === language ? '' : 'btn-disabled'
              } btn-secondary mr-2 mb-2`}
              onClick={languageSelected(language)}
            >
              {language}
            </button>
          ))}
        </div>
        <div className="text-center">
          <button className={`btn ${startActive ? '' : 'btn-disabled'} btn-primary`} onClick={start}>
            Start
          </button>
        </div>
      </div>
      {loading && <span className="loading loading-dots loading-md"></span>}
    </>
  );
};
