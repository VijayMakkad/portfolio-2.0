import { Bot, MonitorCheck, Hand, Video, QrCode, Mic, FileText, MessageCircle } from 'lucide-react';
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
    name: "SpeakEasy App",
    description:
      "Real-time voice translator with 95% speech recognition accuracy, 98% translation accuracy, dark/light themes, and support for 100+ languages.",
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "Python"],
    icon: Mic, 
    color: "bg-orange-600",
    liveLink: "https://github.com/VijayMakkad/voice-translator",
    githubRepo: "https://github.com/VijayMakkad/voice-translator",
  },
  {
    id: 4,
    name: "AI Text Summarization App",
    description:
      "Abstractive text summarizer using fine-tuned BART model with FastAPI backend, GPU optimization, and real-time React.js frontend.",
    tags: ["FastAPI", "HuggingFace", "BART", "React.js"],
    icon: FileText, // replace with your document/text icon component
    color: "bg-orange-200",
    liveLink: "https://github.com/VijayMakkad/text-summarization-app",
    githubRepo: "https://github.com/VijayMakkad/text-summarization-app"
  },
  {
    id: 6,
    name: "MingleMate",
    description:
      "Real-time chat app supporting 100+ concurrent users with secure JWT authentication, optimized MongoDB queries, and responsive Tailwind CSS UI.",
    tags: ["React.js", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
    icon: MessageCircle, // replace with your preferred chat/message icon component
    color: "bg-green-600",
    liveLink: "https://chat-app-7pwc.onrender.com/",
    githubRepo: "https://github.com/VijayMakkad/Chat-App",
  },
];

