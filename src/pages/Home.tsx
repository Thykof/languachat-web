import React from 'react';
import { Chat } from '../components/Chat';
import { Session, newSession } from '../service/languachat';

export const Home: React.FC = () => {
  const [session, setSession] = React.useState<Session | null>(null);
  const startActive = session ? 'btn-disabled' : '';

  const start = async () => {
    setSession(await newSession());
  };

  return (
    <div>
      <h1 className="p-4 text-5xl text-primary font-bold text-center">Welcome to the language coach!</h1>
      <div className="flex justify-center">
        <button className={`btn ${startActive} btn-primary`} onClick={start}>
          Start
        </button>
        {session && <Chat session={session} />}
      </div>
    </div>
  );
};
