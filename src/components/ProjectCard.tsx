'use client';

import { SmartLink, Tag, Text } from '@once-ui-system/core';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AvatarGroupHover } from './work/AvatarGroupHover';

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  tag?: string;
  avatars: {
    src: string;
    name: string;
    description: string;
    role: string;
    linkedin: string;
  }[];
  link: string;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  tag,
  avatars,
  link,
  featured = false,
}) => {
  const cover = images[0];
  const showAvatars = avatars.length > 1;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl border c-border c-surface overflow-hidden hover:border-[var(--brand-border-medium)] transition-colors duration-300"
    >
      {/* Image area */}
      <Link href={href} className="relative block overflow-hidden" tabIndex={-1} aria-hidden>
        <div className={`relative overflow-hidden ${featured ? 'aspect-[21/9]' : 'aspect-video'} bg-neutral-950`}>
          {cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--brand-alpha-weak)] to-transparent">
              <span className="text-4xl font-bold c-text-weak select-none">
                {title.charAt(0)}
              </span>
            </div>
          )}
          {/* Gradient overlay (only meaningful on dark covers) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* Hover glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--brand-alpha-weak)] to-transparent" />
        </div>
      </Link>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tag */}
        {tag && (
          <div>
            <Tag size="s">{tag}</Tag>
          </div>
        )}

        {/* Title */}
        <Link href={href} className="group/title">
          <h2 className={`font-semibold c-text-strong group-hover/title:text-[var(--brand-on-background-medium)] transition-colors duration-200 leading-snug ${featured ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
            {title}
          </h2>
        </Link>

        {/* Description */}
        {description?.trim() && (
          <Text
            variant="body-default-s"
            onBackground="neutral-weak"
            className="line-clamp-2 leading-relaxed"
          >
            {description}
          </Text>
        )}

        {/* Avatars */}
        {showAvatars && (
          <div className="mt-1">
            <AvatarGroupHover avatars={avatars} size="s" />
          </div>
        )}

        {/* Footer links */}
        <div className="flex items-center gap-5 mt-auto pt-3 border-t c-border">
          {content?.trim() && (
            <SmartLink
              suffixIcon="arrowRight"
              style={{ margin: '0', width: 'fit-content' }}
              href={href}
            >
              <Text variant="label-default-s">Case study</Text>
            </SmartLink>
          )}
          {link && (
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: '0', width: 'fit-content' }}
              href={link}
            >
              <Text variant="label-default-s">View project</Text>
            </SmartLink>
          )}
        </div>
      </div>
    </motion.article>
  );
};
