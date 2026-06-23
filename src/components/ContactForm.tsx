'use client';

import { useState } from 'react';
import { Button, Column, Input, Text, Textarea } from '@once-ui-system/core';
import { person } from '@/resources';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (!res.ok) {
        setErrorMessage(
          data.message ?? data.error ?? 'Failed to send message.'
        );
        setState('error');
        return;
      }

      setState('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMessage('Network error. Please try again.');
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <Column gap="m" padding="l" background="neutral-alpha-weak" radius="l">
        <Text variant="heading-strong-l">Message sent!</Text>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Thanks for reaching out. I&apos;ll get back to you at the email you
          provided.
        </Text>
        <Button
          variant="secondary"
          size="s"
          onClick={() => setState('idle')}
        >
          Send another message
        </Button>
      </Column>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Column gap="m" fillWidth>
        <input
          type="text"
          name="website"
          value={website}
          onChange={e => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />
        <Input
          id="contact-name"
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <Input
          id="contact-email"
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Textarea
          id="contact-message"
          label="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          lines={5}
          required
        />
        {state === 'error' && errorMessage && (
          <Text variant="body-default-s" onBackground="danger-weak">
            {errorMessage}
          </Text>
        )}
        <Button
          type="submit"
          variant="primary"
          size="m"
          disabled={state === 'loading'}
        >
          {state === 'loading' ? 'Sending...' : 'Send message'}
        </Button>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Or email directly at{' '}
          <a href={`mailto:${person.email}`} className="underline">
            {person.email}
          </a>
        </Text>
      </Column>
    </form>
  );
}
