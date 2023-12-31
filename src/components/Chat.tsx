import React, { useEffect, useRef } from 'react';
import { MessageComponent } from './Message';
import { Session, SessionStatus, updateSession } from '../service/sessions';
import { Roles } from '../service/chat';
import { play } from '../service/utils';

interface Props {
  session: Session;
}

export const Chat: React.FC<Props> = ({ session }) => {
  const textArea = useRef(null);
  const [value, setValue] = React.useState('');
  const [messages, setMessages] = React.useState(session.chat.messages);
  const [loading, setLoading] = React.useState(false);
  const [sessionEnded, setSessionEnded] = React.useState(false);

  async function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      setMessages([...messages, { content: value, role: Roles.User }]);
      setValue('');
      setLoading(true);
      const newSession = await updateSession(session, value);
      const speech = newSession.chat.messages[newSession.chat.messages.length - 1].speech!;
      play(speech?.data);
      setMessages(newSession.chat.messages);
      setLoading(false);
      setSessionEnded(newSession.status === SessionStatus.Ended);
    }
  }

  useEffect(() => {
    if (textArea.current) {
      // @ts-ignore
      textArea.current.focus();
    }
  }, [messages]);

  return (
    <div className="flex flex-col">
      <div className="pb-4">
        {messages.map((message, index) => (
          <MessageComponent key={index} message={message} />
        ))}
      </div>
      {loading && <span className="loading loading-dots loading-md"></span>}
      <textarea
        className="m-4 textarea textarea-primary textarea-bordered textarea-lg resize-none overflow-auto"
        rows={1}
        disabled={sessionEnded || loading}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        ref={textArea}
      />
    </div>
  );
};
