import React from 'react';
import { Message, Roles } from '../service/chat/types';

interface MessageProps {
  message: Message;
}

export const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  if (message.role === Roles.System) return null;

  const chatClass = message.role === Roles.User ? 'chat-end' : 'chat-start';
  const chatBubbleClass = message.role === Roles.User ? 'chat-bubble-primary' : 'chat-bubble-accent';

  return (
    <div className={`chat ${chatClass}`}>
      <div className={`chat-bubble ${chatBubbleClass}`}>{message.content}</div>
    </div>
  );
};
