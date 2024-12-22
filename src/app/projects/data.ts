import { Bot, MonitorCheck, Hand, Video, QrCode } from 'lucide-react';
import { Project } from '../../types/project';

export const projects: Project[] = [
  {
    id: 1,
    name: "Human Emotion Classifier",
    description:
      "Developed using TensorFlow and Keras with a sequential model. Integrated Flask and React for processing codex images (JPG, PNG, JPEG, MPEG). A complete ML project.",
    tags: ["React", "TensorFlow", "Python"],
    icon: Bot,
    color: "bg-violet-600",
    liveLink: "https://github.com/VijayMakkad/Human-emotion-classifier",
    githubRepo: "https://github.com/VijayMakkad/Human-emotion-classifier",
  },
  {
    id: 2,
    name: "IdeaClinic",
    description:
      "Forum website built for DEI, SRMIST to facilitate innovation and entrepreneurship programs. Powered by Next.js, TypeScript, and Tailwind.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase"],
    icon: MonitorCheck,
    color: "bg-black",
    liveLink: "https://ideaclinic-forum.vercel.app/",
    githubRepo: "https://github.com/founder-srm/ideaclinic_forum",
  },
  {
    id: 3,
    name: "Turn Out",
    description:
      "Mobile scanner app built with React Native. Features seamless interactivity, history management, database connection, and event setup capabilities.",
    tags: ["ReactNative", "Supabase", "Tamagui", "Tailwind"],
    icon: QrCode,
    color: "bg-orange-600",
    liveLink: "https://github.com/VijayMakkad/TurnOut",
    githubRepo: "https://github.com/VijayMakkad/TurnOut",
  },
  {
    id: 4,
    name: "Hand Gesture Detection",
    description:
      "Built with Python and TensorFlow, this project detects letters and shapes from hand gestures, showcasing advanced machine learning capabilities.",
    tags: ["React", "TensorFlow", "Python"],
    icon: Hand,
    color: "bg-orange-200",
    liveLink: "https://github.com/VijayMakkad/Hand-gesture-detection",
    githubRepo: "https://github.com/VijayMakkad/Hand-gesture-detection",
  },
  {
    id: 5,
    name: "Makkad Meet",
    description:
      "A web-based meeting application with features comparable to Zoom. Built using Next.js, Tailwind, and Clerk for authentication.",
    tags: ["NextJs", "Tailwind", "Clerk", "Video Stream"],
    icon: Video,
    color: "bg-blue-700",
    liveLink: "https://meeting-web-app-nine.vercel.app",
    githubRepo: "https://github.com/VijayMakkad/meeting-web-app",
  },
];
