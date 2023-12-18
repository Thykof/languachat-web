import React from 'react';
import { publish } from '../../service/event';
import { Level } from '../../service/classroom';

export const EVENT_LEVEL_SELECTED = 'level-selected';

export interface LevelSelectedEvent {
  level: Level;
}

interface LevelSelectorProps {
  hide: boolean;
  level: Level | null;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ hide, level: selectedLevel }) => {
  const levelSelected = (level: string) => () => {
    if (!(Object.values(Level) as unknown[]).includes(level)) {
      console.error(`Invalid level: ${level}`);
    }
    publish(EVENT_LEVEL_SELECTED, { level });
  };

  if (hide) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center pb-2">
      {Object.values(Level).map((level) => (
        <button
          key={level}
          className={`btn ${
            selectedLevel === null || selectedLevel === level ? '' : 'btn-disabled'
          } btn-secondary mr-2 mb-2`}
          onClick={levelSelected(level)}
        >
          {level}
        </button>
      ))}
    </div>
  );
};
