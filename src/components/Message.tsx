import React from 'react';
import { Message, Roles } from '../service/chat';
import { PlayCircle } from './icons/PlayCircle';
import { play } from '../service/utils';

interface MessageProps {
  message: Message;
}

export const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const chatClass = message.role === Roles.User ? 'chat-end' : 'chat-start';
  const chatBubbleClass = message.role === Roles.User ? 'chat-bubble-primary' : 'chat-bubble-accent';

  const replay = () => {
    play(message.speech?.data!);
  };

  return (
    <div className={`chat ${chatClass}`}>
      <div className={`chat-bubble ${chatBubbleClass}`}>{message.content}</div>
      {message.speech && (
        <div className="chat-footer opacity-50 p-1">
          <button onClick={replay}>
            <PlayCircle />
          </button>
        </div>
      )}
    </div>
  );
};
