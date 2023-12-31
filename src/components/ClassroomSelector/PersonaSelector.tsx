import React, { useEffect } from 'react';
import { publish } from '../../service/event';
import { Persona, getPersonas } from '../../service/personas';

export const EVENT_PERSONA_SELECTED = 'persona-selected';

export interface PersonaSelectedEvent {
  persona: Persona;
}

interface PersonaSelectorProps {
  hide: boolean;
  persona: Persona | null;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({ hide, persona: selectedPersona }) => {
  const [personas, setPersonas] = React.useState<Persona[]>([]);
  const personaSelected = (persona: Persona) => () => {
    publish(EVENT_PERSONA_SELECTED, { persona });
  };

  useEffect(() => {
    if (personas.length === 0) {
      getPersonas().then((personas) => setPersonas(personas));
    }
  });

  if (hide) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center pb-2">
      {personas.length === 0 ? (
        <button className="btn btn-secondary mr-2 mb-2">
          <span className="loading loading-spinner loading-xs"></span>
        </button>
      ) : (
        personas.map((persona) => (
          <button
            key={persona._id}
            className={`btn ${
              selectedPersona === null || selectedPersona._id === persona._id ? '' : 'btn-disabled'
            } btn-secondary mr-2 mb-2`}
            onClick={personaSelected(persona)}
          >
            {persona.name} {persona.description}
          </button>
        ))
      )}
    </div>
  );
};
