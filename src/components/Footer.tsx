import { Row, IconButton, Text, Line } from '@once-ui-system/core';
import { person, social } from '@/resources';
import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth direction="column" horizontal="center">
      <Line fillWidth background="brand-alpha-weak" />
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="16"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        fillWidth
        s={{
          direction: 'column',
          horizontal: 'center',
        }}
      >
        <Row direction="column" gap="4">
          <Text variant="body-default-s" onBackground="neutral-strong">
            <Text onBackground="neutral-weak">© {currentYear} /</Text>
            <Text paddingX="4">{person.name}</Text>
          </Text>
          <Text variant="body-default-s" onBackground="neutral-strong">
            Software engineer · Bangalore, India
          </Text>
        </Row>
        <Row gap="16">
          {social.map(
            item =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                  {...(item.name === 'Resume'
                    ? { target: '_blank' as const }
                    : {})}
                />
              )
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
