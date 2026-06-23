import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import './globals.css';

import {
  Background,
  Column,
  Flex,
  type opacity,
  type SpacingToken,
} from '@once-ui-system/core';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import type { Metadata } from 'next';
import { Footer, Header, Providers } from '@/components';
import { ClientShell } from '@/components/ClientShell';
import { env } from '@/lib/env';
import {
  dataStyle,
  effects,
  fonts,
  home,
  person,
  style,
} from '@/resources';

export async function generateMetadata(): Promise<Metadata> {
  const siteTitle = `${person.firstName}'s Portfolio`;
  const absoluteImageUrl = `${env.baseUrl}${home.image}`;

  return {
    metadataBase: new URL(env.baseUrl),
    title: {
      default: home.title,
      template: `%s | ${siteTitle}`,
    },
    description: home.description,
    applicationName: siteTitle,
    generator: 'Next.js',
    keywords: [
      person.name,
      person.role,
      person.firstName,
      'portfolio',
      'full-stack developer',
      'machine learning',
      'SRMIST',
    ],
    authors: [{ name: person.name, url: env.baseUrl }],
    creator: person.name,
    publisher: person.name,
    alternates: {
      canonical: home.path,
    },
    openGraph: {
      title: home.title,
      description: home.description,
      url: env.baseUrl,
      siteName: siteTitle,
      locale: 'en_US',
      type: 'website',
      images: [{ url: absoluteImageUrl, alt: home.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: home.description,
      images: [absoluteImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [{ url: '/favicon.ico?v=2' }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeConfig = {
    brand: style.brand,
    accent: style.accent,
    neutral: style.neutral,
    solid: style.solid,
    'solid-style': style.solidStyle,
    border: style.border,
    surface: style.surface,
    transition: style.transition,
    scaling: style.scaling,
    'viz-style': dataStyle.variant,
  };

  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable
      )}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const config = ${JSON.stringify(themeConfig)};
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  const savedTheme = localStorage.getItem('data-theme');
                  root.setAttribute('data-theme', resolveTheme(savedTheme));
                  Object.keys(config).forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) root.setAttribute('data-' + key, value);
                  });
                  const savedMono = localStorage.getItem('data-mono');
                  if (savedMono === 'true') root.setAttribute('data-mono', 'true');
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: '100vh' }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <Flex fill fillWidth position="absolute" zIndex={0}>
            <Background
              mask={{
                x: effects.mask.x,
                y: effects.mask.y,
                radius: effects.mask.radius,
                cursor: effects.mask.cursor,
              }}
              gradient={{
                display: effects.gradient.display,
                opacity: effects.gradient.opacity as opacity,
                x: effects.gradient.x,
                y: effects.gradient.y,
                width: effects.gradient.width,
                height: effects.gradient.height,
                tilt: effects.gradient.tilt,
                colorStart: effects.gradient.colorStart,
                colorEnd: effects.gradient.colorEnd,
              }}
              dots={{
                display: effects.dots.display,
                opacity: effects.dots.opacity as opacity,
                size: effects.dots.size as SpacingToken,
                color: effects.dots.color,
              }}
              grid={{
                display: effects.grid.display,
                opacity: effects.grid.opacity as opacity,
                color: effects.grid.color,
                width: effects.grid.width,
                height: effects.grid.height,
              }}
              lines={{
                display: effects.lines.display,
                opacity: effects.lines.opacity as opacity,
                size: effects.lines.size as SpacingToken,
                thickness: effects.lines.thickness,
                angle: effects.lines.angle,
                color: effects.lines.color,
              }}
            />
          </Flex>
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              {children}
              <Analytics />
              <SpeedInsights />
            </Flex>
          </Flex>
          <Footer />
          <ClientShell />
        </Column>
      </Providers>
    </Flex>
  );
}
