import { NextResponse } from 'next/server';
import { isContactConfigured, env } from '@/lib/env';

export const runtime = 'nodejs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isContactConfigured()) {
    return NextResponse.json(
      {
        error: 'unconfigured',
        message:
          'Contact form is not configured. Add RESEND_API_KEY and CONTACT_TO_EMAIL.',
      },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      website?: string;
    };

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    const { Resend } = await import('resend');
    const resend = new Resend(env.resendApiKey);

    await resend.emails.send({
      from: env.contactFromEmail,
      to: env.contactToEmail!,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
