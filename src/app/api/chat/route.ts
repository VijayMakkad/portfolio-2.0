import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { vmBotConfig } from '@/config/chatConfig';
import { isGeminiConfigured, env } from '@/lib/env';

export const runtime = 'nodejs';

type ChatMessage = { role: 'user' | 'bot'; content: string };

export async function GET() {
  return NextResponse.json({ configured: isGeminiConfigured() });
}

export async function POST(request: Request) {
  if (!isGeminiConfigured()) {
    return NextResponse.json(
      {
        error: 'unconfigured',
        message:
          'Chat is not configured. Add GEMINI_API_KEY to your environment.',
      },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      message?: string;
      history?: ChatMessage[];
    };

    const message = body.message?.trim();
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(env.geminiApiKey!);
    const model = genAI.getGenerativeModel({
      model: vmBotConfig.modelName,
      generationConfig: vmBotConfig.modelConfig,
    });

    const history = (body.history ?? []).slice(-10).map(msg => ({
      role: msg.role === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: vmBotConfig.initialPrompt }] },
        {
          role: 'model',
          parts: [{ text: 'I am now ready to function as VM Bot!' }],
        },
        ...history,
      ],
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Handle Gemini API 503 high demand errors gracefully
    if (error.message && error.message.includes('503 Service Unavailable')) {
      return NextResponse.json({ 
        reply: "Oops, my AI backend (Google Gemini) is experiencing unusually high traffic right now! 😅 Please try asking me again in a few seconds." 
      });
    }

    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
