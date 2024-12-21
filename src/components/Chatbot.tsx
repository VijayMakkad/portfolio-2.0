'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, ChatConfig } from '../types/chat';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const glowStyles = `
  @keyframes glow {
    0% {
      box-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff, 0 0 20px #ffffff;
    }
    50% {
      box-shadow: 0 0 10px #ffffff, 0 0 15px #ffffff, 0 0 20px #ffffff, 0 0 25px #ffffff;
    }
    100% {
      box-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff, 0 0 20px #ffffff;
    }
  }

  .glow-effect {
    animation: glow 2s ease-in-out infinite;
  }
`;


interface ChatBotProps {
  config: ChatConfig;
}

const initialHistory: Message[] = [
  {
    role: 'bot',
    content:
      "Hello! I'm VM Bot, an AI assistant designed to provide information about Vijay Makkad. Ask me anything about his background, career, skills, hobbies, or interests!",
  },
];

const formatMessage = (text: string): string => {
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  formattedText = formattedText.replace(/(?:\n)?\s*\*\s+(.*?)(?=\n|$)/g, "<li>$1</li>");
  formattedText = formattedText.replace(/(<li>.*<\/li>)+/g, "<ul>$&</ul>");
  return formattedText;
};

const ChatBot: React.FC<ChatBotProps> = ({ config }) => {
  const [messages, setMessages] = useState<Message[]>(initialHistory);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);

  useEffect(() => {
    const initGemini = async () => {
      try {
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({
          model: config.modelName,
          generationConfig: {
            ...config.modelConfig,
          },
        });
        const session = model.startChat({
          history: [
            {
              role: 'user',
              parts: [{ text: config.initialPrompt }],
            },
            {
              role: 'model',
              parts: [{ text: "I am now ready to function as VM Bot!" }],
            },
          ],
        });
        setChatSession(session);
      } catch (error) {
        console.error('Error initializing Gemini:', error);
      }
    };
    initGemini();
  }, [config]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessage(userMessage);
      const response = await result.response;
      const botMessage = response.text();
      setMessages((prev) => [...prev, { role: 'bot', content: botMessage }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: "I apologize, but I'm having trouble responding right now. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <>
      {isChatOpen ? (
        <Card className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 flex flex-col shadow-lg rounded-none sm:rounded-3xl overflow-hidden sm:w-96 sm:h-[600px] md:w-[450px] lg:w-[350px] z-50">
          <CardHeader className="bg-primary text-primary-foreground py-2 sm:py-4">
            <CardTitle className="flex justify-between items-center text-lg sm:text-xl">
              <span>{config.botName}</span>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 sm:h-10 sm:w-10">
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-[calc(100vh-120px)] sm:h-full p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  />
                </div>
              ))}
              {isTyping && (
                <div className="text-left">
                  <div className="inline-block bg-secondary text-secondary-foreground p-3 rounded-lg">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-2 sm:p-4">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Vijay..."
                className="flex-grow h-12 text-sm sm:text-base"
                disabled={!chatSession}
              />
              <Button 
                type="submit" 
                disabled={!chatSession} 
                size="icon" 
                className="w-10 h-10 sm:w-12 sm:h-12"
              >
                <Send className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          className="fixed bottom-4 m-10 right-4 shadow-lg z-50 w-16 h-16 rounded-2xl bg-primary hover:bg-primary/90 transition-all duration-300 ease-in-out flex flex-col-reverse "
          size="icon"
          onClick={toggleChat}
        >
          <span className='font-bold'>BOT</span>
          <Bot className="h-10 w-10 text-primary-foreground" />
        </Button>
      )}
      <style jsx global>{glowStyles}</style>
    </>
  );
};

export default ChatBot;

