export interface Speech {
  type: 'Buffer';
  data: number[] | undefined;
}

export interface Message {
  content: string;
  role: Roles;
  speech?: Speech;
}

export enum Roles {
  User = 'user',
  Assistant = 'assistant',
}

export interface Chat {
  messages: Message[];
}
