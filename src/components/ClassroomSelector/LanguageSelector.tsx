import React from 'react';
import { Language } from '../../service/classroom';
import { publish } from '../../service/event';

export const EVENT_LANGUAGE_SELECTED = 'language-selected';

export interface LanguageSelectedEvent {
  language: Language;
}

interface LanguageSelectorProps {
  hide: boolean;
  language: Language | null;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ hide, language: selectedLanguage }) => {
  const languageSelected = (language: string) => () => {
    if (!(Object.values(Language) as unknown[]).includes(language)) {
      console.error(`Invalid language: ${language}`);
    }
    publish(EVENT_LANGUAGE_SELECTED, { language });
  };

  if (hide) {
    return null;
  }

  return (
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
  );
};
