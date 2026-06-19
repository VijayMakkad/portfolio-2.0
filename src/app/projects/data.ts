import {
  Bot,
  MonitorCheck,
  MessageCircle,
  Mic,
  FileText,
  Search,
  UtensilsCrossed,
  Video,
} from "lucide-react";
import { Project } from "../../types/project";

export const projects: Project[] = [
  // ★ Marquee Featured — Deep Researcher RAG System
  {
    id: 1,
    name: "Deep Researcher RAG System",
    description:
      "Multi-agent research pipeline with FAISS vector store, recursive web search, and LLM synthesis. Generates comprehensive research reports from a single query using RAG architecture.",
    tags: ["Python", "LangChain", "FAISS", "RAG", "Streamlit"],
    icon: Search,
    color: "bg-red-600",
    liveLink: "https://github.com/VijayMakkad/deep-researcher",
    githubRepo: "https://github.com/VijayMakkad/deep-researcher",
    stars: 2,
    featured: true,
  },
  // Supporting featured projects
  {
    id: 2,
    name: "IdeaClinic Forum",
    description:
      "Full-featured forum platform built for DEI, SRMIST to facilitate innovation and entrepreneurship programs. Real-time updates with Supabase.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    icon: MonitorCheck,
    color: "bg-emerald-600",
    liveLink: "https://ideaclinic-forum.vercel.app/",
    githubRepo: "https://github.com/founder-srm/ideaclinic_forum",
    featured: true,
  },
  {
    id: 3,
    name: "MingleMate",
    description:
      "Real-time chat application supporting 100+ concurrent users with secure JWT authentication, optimized MongoDB queries, and responsive UI.",
    tags: ["React.js", "Node.js", "Socket.io", "MongoDB"],
    icon: MessageCircle,
    color: "bg-blue-600",
    liveLink: "https://chat-app-7pwc.onrender.com/",
    githubRepo: "https://github.com/VijayMakkad/Chat-App",
    featured: true,
  },
  {
    id: 4,
    name: "SpeakEasy App",
    description:
      "Real-time voice translator with 95% speech recognition accuracy and 98% translation accuracy. Supports 100+ languages with dark/light themes.",
    tags: ["React Native", "Expo", "TypeScript", "Node.js", "Python"],
    icon: Mic,
    color: "bg-orange-600",
    liveLink: "https://github.com/VijayMakkad/voice-translator",
    githubRepo: "https://github.com/VijayMakkad/voice-translator",
  },
  {
    id: 5,
    name: "Human Emotion Classifier",
    description:
      "CNN-based emotion detection using TensorFlow/Keras. Processes images via Flask backend with React frontend for real-time classification.",
    tags: ["TensorFlow", "Keras", "Flask", "React"],
    icon: Bot,
    color: "bg-violet-600",
    liveLink: "https://github.com/VijayMakkad/Human-emotion-classifier",
    githubRepo: "https://github.com/VijayMakkad/Human-emotion-classifier",
  },
  {
    id: 6,
    name: "AI Text Summarization",
    description:
      "Abstractive text summarizer using fine-tuned BART model with FastAPI backend, GPU-optimized inference achieving sub-3s response time.",
    tags: ["FastAPI", "HuggingFace", "BART", "React.js"],
    icon: FileText,
    color: "bg-amber-600",
    liveLink: "https://github.com/VijayMakkad/text-summarization-app",
    githubRepo: "https://github.com/VijayMakkad/text-summarization-app",
  },
  {
    id: 7,
    name: "FoodOrdering System",
    description:
      "Full-stack food ordering platform with real-time order tracking, payment integration, and admin dashboard. Most starred personal project.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    icon: UtensilsCrossed,
    color: "bg-pink-600",
    liveLink: "https://github.com/VijayMakkad/FoodOrderingApp",
    githubRepo: "https://github.com/VijayMakkad/FoodOrderingApp",
    stars: 11,
  },
  {
    id: 8,
    name: "Video Action Recognition",
    description:
      "CNN-based action recognition model using MovieNet architecture for Samsung Prism. Achieved 97% training accuracy on compressed video datasets.",
    tags: ["TensorFlow", "MovieNet", "Python", "OpenCV"],
    icon: Video,
    color: "bg-cyan-600",
    liveLink: "https://github.com/VijayMakkad/Action-Recognition",
    githubRepo: "https://github.com/VijayMakkad/Action-Recognition",
  },
];
