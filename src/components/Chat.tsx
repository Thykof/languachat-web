import React from 'react';
import { MessageComponent } from './Message';
import { Session, SessionStatus, updateSession } from '../service/sessions';
import { Roles } from '../service/types';
import { play } from '../service/utils';

interface Props {
  session: Session;
}

export const Chat: React.FC<Props> = ({ session }) => {
  const [value, setValue] = React.useState('');
  const [messages, setMessages] = React.useState(session.chat.messages);

  async function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      setMessages([...messages, { content: value, role: Roles.User }]);
      setValue('');
      const newSession = await updateSession(session, value);
      const speech = newSession.chat.messages[newSession.chat.messages.length - 1].speech!;
      play(speech.data);
      setMessages(newSession.chat.messages);
    }
  }

  return (
    <div className="flex flex-col w-4/5">
      <div className="pb-4">
        {messages.map((message, index) => (
          <MessageComponent key={index} message={message} />
        ))}
      </div>
      <textarea
        className="m-4 textarea textarea-primary textarea-bordered textarea-lg w-full resize-none overflow-auto"
        rows={1}
        disabled={session.status === SessionStatus.Ended}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
