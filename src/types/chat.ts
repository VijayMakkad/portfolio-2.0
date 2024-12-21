export type MessageRole = 'user' | 'bot';

export interface Message {
  role: MessageRole;
  content: string;
}

export interface ChatConfig {
  initialPrompt: string;
  modelConfig: {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
  botName: string;
  modelName: string;
}