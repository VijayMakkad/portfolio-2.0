import { InlineCode, Line, Row, Text } from '@once-ui-system/core';
import type {
  About,
  Home,
  Person,
  Social,
  Testimonials,
  Work,
} from '@/types';

const person: Person = {
  firstName: 'Vijay',
  lastName: 'Makkad',
  name: 'Vijay Makkad',
  role: 'Full-Stack & ML Engineer',
  avatar: '/profile.mp4',
  email: 'vijaymakkad0104@gmail.com',
  location: 'Asia/Kolkata',
  languages: ['English', 'Hindi'],
};

const social: Social = [
  {
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/VijayMakkad',
    essential: true,
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/vijay-makkad-1573681b3/',
    essential: true,
  },
  {
    name: 'Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/',
    essential: false,
  },
  {
    name: 'Resume',
    icon: 'document',
    link: '/Vijay_Makkad_Doc.pdf',
    essential: true,
  },
  {
    name: 'Email',
    icon: 'email',
    link: 'mailto:vijaymakkad0104@gmail.com',
    essential: true,
  },
];

const home: Home = {
  path: '/',
  image: '/profile.mp4',
  label: 'Home',
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software Engineer and Full-Stack Developer</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Deep Researcher</strong>{' '}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: '/work/deep-researcher-rag-system',
  },
  subline: (
    <>
      I&apos;m Vijay, a Software Engineer at Cloudera and a Computer Science graduate from{' '}
      <InlineCode>SRMIST</InlineCode>, Chennai (CGPA 9.71). I build full-stack
      applications and ML systems, and ship projects that push the
      limits of AI and real-time software.
    </>
  ),
  roleWords: ['Full-Stack', 'ML Engineer'],
  showcaseProjects: [
    {
      title: 'Deep Researcher RAG System',
      description:
        'Multi-agent research pipeline with FAISS vector store and LLM synthesis.',
      year: '2025',
      link: '/work/deep-researcher-rag-system',
      image: '/images/projects/deep-researcher-rag-system.svg',
    },
    {
      title: 'IdeaClinic Forum',
      description:
        'Full-featured forum platform for DEI, SRMIST with real-time Supabase updates.',
      year: '2024',
      link: '/work/ideaclinic-forum',
      image: '/images/projects/ideaclinic-forum.svg',
    },
    {
      title: 'MingleMate',
      description:
        'Real-time chat app supporting 100+ concurrent users with JWT auth.',
      year: '2024',
      link: '/work/minglemate',
      image: '/images/projects/minglemate.svg',
    },
  ],
};

const about: About = {
  path: '/about',
  label: 'About',
  title: `About - ${person.name}`,
  description: `I am ${person.name}, ${person.role} from Bangalore, India.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: 'mailto:vijaymakkad0104@gmail.com',
  },
  intro: {
    display: true,
    title: 'Introduction',
    description: (
      <>
        I&apos;m a Bangalore-based Software Engineer at Cloudera and a Computer Science graduate from SRM Institute of
        Science and Technology, Chennai, with a passion for full-stack development,
        machine learning, and building products that solve real-world problems.
        I excel at competitive programming (1700+ LeetCode rating), research
        internships, and shipping production-grade applications.
      </>
    ),
  },
  work: {
    display: true,
    title: 'Work Experience',
    experiences: [
      {
        company: 'Cloudera',
        timeframe: 'Jan 2026 – Present',
        role: 'Software Engineer',
        achievements: [
          'Building and operating large-scale data platform services across reliability and observability with Prometheus, Grafana, OpenTelemetry, and Docker.',
        ],
      },
      {
        company: 'Founders Club, SRMIST',
        timeframe: 'Oct 2023 – Aug 2025',
        role: 'Associate Technical Lead',
        achievements: [
          'Led a team of 3 developers to build multiple full-stack projects for the college, coordinating design reviews, sprint planning, and deployments.',
        ],
      },
      {
        company: 'Fuelemy',
        timeframe: 'Oct 2024 – Mar 2025',
        role: 'Backend Developer Intern',
        achievements: [
          'Designed scalable REST APIs with Hono/TypeScript, PostgreSQL, and Drizzle ORM. Reduced API response time by 60% and deployed with Docker/Bun achieving 99.5% uptime.',
        ],
      },
      {
        company: 'Samsung Prism',
        timeframe: 'Jul 2024 – Jan 2025',
        role: 'Project Intern',
        achievements: [
          'Developed CNN-based action recognition model using MovieNet architecture with 97% training accuracy. Co-authored research paper submitted to ICACECS 2025.',
        ],
      },
      {
        company: 'EasyGold Ltd.',
        timeframe: 'Jul 2024 – Oct 2024',
        role: 'Web Developer Intern',
        achievements: [
          'Developed Cart and Accounts pages using React and Java Spring Boot with integrated payment workflows and responsive UI components.',
        ],
      },
      {
        company: 'Jindal Steel and Power',
        timeframe: 'Jun 2024 – Jul 2024',
        role: 'Summer Intern',
        achievements: [
          'Built Night Vigilance Portal with React frontend and Java Spring Boot backend for real-time monitoring and surveillance reporting.',
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: 'Education',
    institutions: [
      {
        name: 'SRM Institute of Science and Technology',
        description: (
          <>B.Tech in Computer Science and Engineering — CGPA 9.71 (2022–2026)</>
        ),
      },
      {
        name: 'Sai International Residential School',
        description: (
          <>12th — 97% | 10th — 96%</>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: 'Technical Skills',
    skills: [
      {
        title: 'Languages',
        description: 'C++, C, Java, Python, JavaScript, TypeScript, SQL',
        tags: [
          { name: 'Python' },
          { name: 'TypeScript' },
          { name: 'C++' },
          { name: 'Java' },
        ],
      },
      {
        title: 'Web Development',
        description:
          'React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, React Native',
        tags: [
          { name: 'React', icon: 'javascript' },
          { name: 'Next.js' },
          { name: 'Node.js' },
        ],
      },
      {
        title: 'Machine Learning & AI',
        description:
          'TensorFlow, PyTorch, Keras, HuggingFace, LangChain, OpenCV, FastAPI, Flask',
        tags: [{ name: 'TensorFlow' }, { name: 'PyTorch' }, { name: 'LangChain' }],
      },
      {
        title: 'Tools & Platforms',
        description:
          'Docker, GitHub, VS Code, Postman, Google Colab, Jupyter, AWS ML Foundations',
        tags: [{ name: 'Docker' }, { name: 'GitHub', icon: 'github' }],
      },
    ],
  },
};

const work: Work = {
  path: '/work',
  label: 'Work',
  title: `Projects – ${person.name}`,
  description: `Selected projects and case studies by ${person.name}`,
};

const testimonials: Testimonials = {
  display: true,
  title: 'What people say',
  description: 'Feedback from mentors and collaborators',
  items: [
    {
      text: "Vijay's full-stack expertise delivered a seamless solution that revolutionized our night surveillance with real-time monitoring and efficiency.",
      name: 'Suraj Das',
      role: 'Project Head, Jindal Steel and Power',
    },
    {
      text: 'Working with Vijay was a pleasure. His technical skills are exceptional, and he consistently goes above and beyond to ensure project success.',
      name: 'Shreyans Bhargava',
      role: 'COO at Fuelemy',
    },
    {
      text: "Vijay's expertise in front-end and back-end development made him an invaluable asset to the organization.",
      name: 'Chandan Singh',
      role: 'Technical Head, EasyGold',
    },
  ],
};

export { about, home, person, social, testimonials, work };
