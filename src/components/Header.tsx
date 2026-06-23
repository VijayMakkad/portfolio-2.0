'use client';

import {
  Dialog,
  Fade,
  Flex,
  IconButton,
  Line,
  Row,
  StylePanel,
  ThemeSwitcher,
  ToggleButton,
} from '@once-ui-system/core';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { about, display, person, routes, work } from '@/resources';
import { MonoToggle } from './MonoToggle';
import styles from './Header.module.scss';

function TimeDisplay({
  timeZone,
  locale = 'en-GB',
}: {
  timeZone: string;
  locale?: string;
}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
}

export const Header = () => {
  const pathname = usePathname() ?? '';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Fade
        s={{ hide: true }}
        fillWidth
        position="fixed"
        height="80"
        zIndex={9}
      />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{ position: 'fixed' }}
      >
        <Row
          paddingLeft="12"
          fillWidth
          vertical="center"
          textVariant="body-default-s"
        >
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center" zIndex='10'>
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row
              gap="4"
              vertical="center"
              textVariant="body-default-s"
              suppressHydrationWarning
            >
              {routes['/'] && (
                <ToggleButton
                  prefixIcon="home"
                  href="/"
                  selected={pathname === '/'}
                />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes['/about'] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      label={about.label}
                      selected={pathname === '/about'}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="person"
                      href="/about"
                      selected={pathname === '/about'}
                    />
                  </Row>
                </>
              )}
              {routes['/work'] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      label={work.label}
                      selected={pathname.startsWith('/work')}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="grid"
                      href="/work"
                      selected={pathname.startsWith('/work')}
                    />
                  </Row>
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <MonoToggle />
                  <Dialog
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Theme"
                  >
                    {isOpen && <StylePanel />}
                  </Dialog>
                  <Row s={{ hide: true }}>
                    <IconButton
                      icon="moon"
                      variant="secondary"
                      onClick={() => setIsOpen(true)}
                    />
                  </Row>
                  <Row
                    hide
                    s={{ hide: false }}
                    m={{ hide: true }}
                    l={{ hide: true }}
                    xl={{ hide: true }}
                  >
                    <ThemeSwitcher />
                  </Row>
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone="Asia/Kolkata" />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
