import React from 'react';
import { Chat } from '../components/Chat';
import { Session } from '../service/sessions';
import { ClassroomSelector } from '../components/ClassroomSelector';

export const Home: React.FC = () => {
  const [session, setSession] = React.useState<Session | null>(null);

  return (
    <>
      <div className="m-4">
        <h1 className="p-4 text-5xl text-primary font-bold text-center">Welcome to the language coach!</h1>
        <div className="flex flex-col justify-center pb-6">
          <ClassroomSelector setSession={setSession} />
          {session && <Chat session={session} />}
        </div>
      </div>
      <footer className="flex flex-row justify-around p-4 bg-neutral text-neutral-content">
        <p>
          Powered by{' '}
          <a className="underline" href="https://openai.com">
            OpenAI
          </a>
        </p>
        <p>
          Make with ❤️ by{' '}
          <a className="underline" href="https://github/thykof">
            Nathan
          </a>
          !
        </p>
      </footer>
    </>
  );
};
