import { Column, Heading, Meta, Schema, Text } from '@once-ui-system/core';
import { Projects } from '@/components/work/Projects';
import { about, baseURL, person, work } from '@/resources';

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function WorkPage() {
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading as="h1" style={{ display: 'none' }}>
        {work.title}
      </Heading>

      {/* Page header */}
      <Column fillWidth gap="8" marginBottom="48" horizontal="center" align="center">
        <p className="text-xs font-mono uppercase tracking-widest c-text-weak">
        Digital Playground
        </p>
        <Heading variant="display-strong-m" align="center">
          Ideas Brought to Life
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
          className="max-w-lg"
        >
          {work.description}
        </Text>
      </Column>

      <Projects layout="featured-first" />
    </Column>
  );
}
