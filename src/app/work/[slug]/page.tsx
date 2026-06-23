import { notFound } from 'next/navigation';
import { getPosts } from '@/utils/utils';
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Text,
  SmartLink,
  Row,
  Line,
} from '@once-ui-system/core';
import { baseURL, about, person, work } from '@/resources';
import { formatDate } from '@/utils/formatDate';
import { ScrollToHash, CustomMDX, ProfileMedia } from '@/components';
import type { Metadata } from 'next';
import { Projects } from '@/components/work/Projects';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(['src', 'app', 'work', 'projects']);
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join('/')
    : routeParams.slug || '';

  const posts = getPosts(['src', 'app', 'work', 'projects']);
  const post = posts.find(p => p.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image:
      post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join('/')
    : routeParams.slug || '';

  const post = getPosts(['src', 'app', 'work', 'projects']).find(
    p => p.slug === slugPath
  );

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map(member => ({
      src: member.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image ||
          `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text
          variant="body-default-xs"
          onBackground="neutral-weak"
          marginBottom="12"
        >
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && post.metadata.team.length > 0 && (
            <>
              {post.metadata.team[0]?.avatar?.endsWith('.mp4') ? (
                <ProfileMedia src={post.metadata.team[0].avatar} size="s" />
              ) : (
                <AvatarGroup reverse avatars={avatars} size="s" />
              )}
            </>
          )}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{' '}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <div className="w-full rounded-2xl overflow-hidden border border-neutral-800/70 aspect-video bg-neutral-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.metadata.images[0]}
            alt={post.metadata.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <Column style={{ margin: 'auto' }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="32" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="8">
          More projects
        </Heading>
        <Projects exclude={[post.slug]} range={[1, 3]} layout="grid" />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
