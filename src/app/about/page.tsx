import {
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Meta,
  Row,
  Schema,
  Tag,
  Text,
} from '@once-ui-system/core';
import TableOfContents from '@/components/about/TableOfContents';
import { ExperienceTimeline } from '@/components/about/ExperienceTimeline';
import { SkillsShowcase } from '@/components/about/SkillsShowcase';
import { ProfileMedia } from '@/components/ProfileMedia';
import styles from '@/components/about/about.module.scss';
import { slugify } from '@/lib/slugify';
import { about, baseURL, person, skillCategories, social } from '@/resources';

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function AboutPage() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map(experience => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map(institution => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: skillCategories.map(category => category.label),
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading as="h1" style={{ display: 'none' }}>
        {about.title}
      </Heading>
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: 'column' }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: 'relative', style: { top: 'auto' } }}
            xs={{ style: { top: 'auto' } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <ProfileMedia src="/images/avatar.jpg" size='xl' />
            <Row gap="8" vertical="center">
              <Icon onBackground="neutral-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map(language => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={slugify(about.intro.title)}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            <Row
              className={styles.blockAlign}
              paddingTop="12"
              horizontal="center"
              fitWidth
            >
              <Tag size="l">
                Currently · Software Engineer @ Cloudera
              </Tag>
            </Row>
            <Column
              className={styles.blockAlign}
              paddingTop="16"
              paddingBottom="8"
              marginTop="8"
              paddingX="16"
              paddingY="12"
              background="neutral-alpha-weak"
              radius="l"
              maxWidth={36}
            >
              <Text
                variant="body-default-m"
                onBackground="neutral-weak"
                className={styles.textAlign}
              >
                Building production systems at the intersection of full-stack
                engineering, ML, and platform reliability.
              </Text>
            </Column>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {/* Desktop: labeled buttons */}
                <Row s={{ hide: true }} gap="8" wrap>
                  {social
                    .filter(item => item.essential && item.link)
                    .map(item => (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        weight="default"
                        variant="secondary"
                        {...(item.name === 'Resume' ? { target: '_blank' as const } : {})}
                      />
                    ))}
                </Row>
                {/* Mobile: icon-only buttons */}
                <Row hide s={{ hide: false }} gap="8">
                  {social
                    .filter(item => item.essential && item.link)
                    .map(item => (
                      <IconButton
                        key={item.name}
                        size="l"
                        href={item.link}
                        icon={item.icon}
                        variant="secondary"
                        {...(item.name === 'Resume' ? { target: '_blank' as const } : {})}
                      />
                    ))}
                </Row>
              </Row>
            )}
          </Column>

          {about.intro.display && (
            <Column
              textVariant="body-default-l"
              fillWidth
              gap="m"
              marginBottom="xl"
            >
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading
                as="h2"
                id={slugify(about.work.title)}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.work.title}
              </Heading>
              <Column fillWidth marginBottom="40">
                <ExperienceTimeline experiences={about.work.experiences} />
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={slugify(about.studies.title)}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4"
                  >
                    <Text
                      id={slugify(institution.name)}
                      variant="heading-strong-l"
                    >
                      {institution.name}
                    </Text>
                    <Text
                      variant="heading-default-xs"
                      onBackground="neutral-weak"
                    >
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={slugify(about.technical.title)}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="24" zIndex='0'>
                <SkillsShowcase />
              </Column>
              <Column
                fillWidth
                gap="12"
                padding="l"
                background="neutral-alpha-weak"
                radius="l"
                marginBottom="40"
              >
                <Text variant="heading-strong-s">Achievements & certifications</Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  Rank 1 — Techknow 2023 · AWS ML Foundations · Alteryx Designer
                  Core · GitHub Foundations · Research paper under review
                  (ICACECS 2025)
                </Text>
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}
