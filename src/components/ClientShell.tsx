'use client';

import dynamic from 'next/dynamic';
import { vmBotConfig } from '@/config/chatConfig';

const ChatBot = dynamic(() => import('@/components/Chatbot'), { ssr: false });
const ScrollProgress = dynamic(
  () =>
    import('@/components/ScrollProgress').then(m => ({
      default: m.ScrollProgress,
    })),
  { ssr: false }
);

export function ClientShell() {
  return (
    <>
      <ScrollProgress />
      <ChatBot botName={vmBotConfig.botName} />
    </>
  );
}
