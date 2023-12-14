import React from 'react';
import { publish } from '../../service/event';
import { Level } from '../../service/classroom';

export const EVENT_LEVEL_SELECTED = 'level-selected';

export interface LevelSelectedEvent {
  level: Level;
}

interface LevelSelectorProps {
  level: Level | null;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ level: selectedLevel }) => {
  const levelSelected = (level: string) => () => {
    if (!(Object.values(Level) as unknown[]).includes(level)) {
      console.error(`Invalid level: ${level}`);
    }
    publish(EVENT_LEVEL_SELECTED, { level });
  };

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
