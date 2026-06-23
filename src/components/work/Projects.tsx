import { getPosts } from '@/utils/utils';
import { ProjectCard } from '@/components';

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  /** Show the first card as a wide featured card and the rest in a 2-col grid */
  layout?: 'featured-first' | 'grid' | 'list';
}

export function Projects({ range, exclude, layout = 'featured-first' }: ProjectsProps) {
  let allProjects = getPosts(['src', 'app', 'work', 'projects']);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter(post => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) =>
    new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (displayedProjects.length === 0) return null;

  if (layout === 'list') {
    return (
      <div className="w-full flex flex-col gap-6">
        {displayedProjects.map((post, index) => (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            tag={post.metadata.tag}
            avatars={
              post.metadata.team?.map(member => ({
                name: member.name,
                description: member.description,
                src: member.avatar,
                role: member.role,
                linkedin: member.linkedIn,
              })) || []
            }
            link={post.metadata.link || ''}
          />
        ))}
      </div>
    );
  }

  if (layout === 'grid') {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayedProjects.map((post, index) => (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            tag={post.metadata.tag}
            avatars={
              post.metadata.team?.map(member => ({
                name: member.name,
                description: member.description,
                src: member.avatar,
                role: member.role,
                linkedin: member.linkedIn,
              })) || []
            }
            link={post.metadata.link || ''}
          />
        ))}
      </div>
    );
  }

  // featured-first: first card full-width, rest in 2-col grid
  const [first, ...rest] = displayedProjects;

  return (
    <div className="w-full flex flex-col gap-6">
      <ProjectCard
        priority
        key={first.slug}
        href={`/work/${first.slug}`}
        images={first.metadata.images}
        title={first.metadata.title}
        description={first.metadata.summary}
        content={first.content}
        tag={first.metadata.tag}
        avatars={
          first.metadata.team?.map(member => ({
            name: member.name,
            description: member.description,
            src: member.avatar,
            role: member.role,
            linkedin: member.linkedIn,
          })) || []
        }
        link={first.metadata.link || ''}
        featured
      />

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {rest.map((post, index) => (
            <ProjectCard
              priority={index < 2}
              key={post.slug}
              href={`/work/${post.slug}`}
              images={post.metadata.images}
              title={post.metadata.title}
              description={post.metadata.summary}
              content={post.content}
              tag={post.metadata.tag}
              avatars={
                post.metadata.team?.map(member => ({
                  name: member.name,
                  description: member.description,
                  src: member.avatar,
                  role: member.role,
                  linkedin: member.linkedIn,
                })) || []
              }
              link={post.metadata.link || ''}
            />
          ))}
        </div>
      )}
    </div>
  );
}
