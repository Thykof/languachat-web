import React from 'react';
import { Chat } from '../components/Chat';
import { Session, newSession } from '../service/sessions';
import { play } from '../service/utils';

export const Home: React.FC = () => {
  const [session, setSession] = React.useState<Session | null>(null);
  const startActive = session ? 'btn-disabled' : '';

  const start = async () => {
    const session = await newSession();
    play(session.chat.messages[0].speech?.data!);
    setSession(session);
  };

  return (
    <div>
      <h1 className="p-4 text-5xl text-primary font-bold text-center">Welcome to the language coach!</h1>
      <div className="flex justify-center pb-6">
        <button className={`btn ${startActive} btn-primary`} onClick={start}>
          Start
        </button>
        {session && <Chat session={session} />}
      </div>
      <footer className="flex flex-row justify-around p-4 bg-neutral text-neutral-content">
        <p>
          Powered by <a href="https://openai.com">OpenAI</a>
        </p>
        <p>
          Make with &lt;3 by <a href="https://github/thykof">Nathan!</a>
        </p>
      </footer>
    </div>
  );
};
