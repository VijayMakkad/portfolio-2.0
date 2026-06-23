import {
  Badge,
  Button,
  Column,
  Heading,
  Line,
  Meta,
  RevealFx,
  Row,
  Schema,
} from '@once-ui-system/core';
import { Projects } from '@/components/work/Projects';
import { ProfileMedia } from '@/components/ProfileMedia';
import { ContactSection } from '@/components/ContactSection';
import { BlurInHeadline, SublineWithGradient } from '@/components/ui/hero-21st';
import { ProjectShowcase } from '@/components/ui/project-showcase';
import { StatsGrid } from '@/components/ui/StatsGrid';
import { TestimonialMarquee } from '@/components/ui/testimonial-v2';
import { about, baseURL, home, person, testimonials, work } from '@/resources';

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const headlineText =
    typeof home.headline === 'string'
      ? home.headline
      : 'Code. Create. Scale.';

  const sublineText = `Software engineer passionate about full-stack development, distributed systems, AI, and building things people love to use.`;

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading as="h1" style={{ display: 'none' }}>
        {home.title}
      </Heading>

      {/* ── Hero ─────────────────────────────────────────── */}
      <Column fillWidth gap="l" horizontal="center">
        {/* Featured badge */}
        {home.featured.display && (
          <RevealFx fillWidth horizontal="center" paddingBottom="8">
            <Badge
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
        )}

        {/* Headline */}
        <RevealFx fillWidth horizontal="center">
          <BlurInHeadline
            text={headlineText}
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center c-text-strong"
          />
        </RevealFx>

        {/* Subline */}
        <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center">
          <SublineWithGradient
            text={sublineText}
            roleWords={home.roleWords}
            className="max-w-xl text-center mx-auto"
          />
        </RevealFx>

        {/* Stats row */}
        <RevealFx translateY="8" delay={0.3} fillWidth horizontal="center">
          <StatsGrid />
        </RevealFx>

        {/* CTA buttons */}
        <RevealFx delay={0.4} horizontal="center">
          <Row gap="12" wrap horizontal="center">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center">
                {about.avatar.display && (
                  <ProfileMedia src={person.avatar} size="m" mirror />
                )}
                {about.label}
              </Row>
            </Button>
            <Button
              href={work.path}
              variant="primary"
              size="m"
              weight="default"
              arrowIcon
            >
              View work
            </Button>
          </Row>
        </RevealFx>
      </Column>

      {/* ── Selected Work list ───────────────────────────── */}
      <RevealFx translateY="16" delay={0.5} fillWidth>
        <ProjectShowcase projects={home.showcaseProjects} />
      </RevealFx>

      {/* ── Featured project card ────────────────────────── */}
      <RevealFx translateY="16" delay={0.55} fillWidth>
        <Column fillWidth gap="16">
          <p className="text-xs font-mono uppercase tracking-widest c-text-weak">
            Featured project
          </p>
          <Projects range={[1, 1]} layout="featured-first" />
        </Column>
      </RevealFx>

      {/* ── More projects grid ───────────────────────────── */}
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth gap="24" marginBottom="l">
          <Line fillWidth />
          <Row fillWidth horizontal="between" vertical="center">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              More projects
            </Heading>
            <Button href={work.path} variant="tertiary" size="s" arrowIcon>
              View all
            </Button>
          </Row>
          <Projects range={[2, 5]} layout="grid" />
        </Column>
      </RevealFx>

      {/* ── Testimonials ─────────────────────────────────── */}
      {testimonials.display && (
        <RevealFx translateY="16" delay={0.65} fillWidth>
          <TestimonialMarquee items={testimonials.items} />
        </RevealFx>
      )}

      {/* ── Contact ──────────────────────────────────────── */}
      <RevealFx translateY="16" delay={0.7} fillWidth id="contact">
        <Column fillWidth gap="0" marginBottom="xl">
          <ContactSection />
        </Column>
      </RevealFx>
    </Column>
  );
}
