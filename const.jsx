import {
  FaEnvelope, FaTwitter, FaGithub, FaLinkedin, FaLightbulb, FaBlog, FaBlogger, FaHome, FaProjectDiagram, FaCode, FaBook, FaFilm,
  FaPython,
  FaDocker,
  FaJs,
  FaDatabase,
  FaServer,
  FaReact
} from 'react-icons/fa'

import { SiPytorch, SiTensorflow, SiGooglecloud, SiCplusplus, SiMongodb, SiPostgresql, SiRedis, SiRust, SiApachekafka, SiNumpy, SiPandas, SiJenkins, SiScikitlearn, SiNextdotjs, SiGit } from 'react-icons/si'
import { GiArtificialIntelligence } from 'react-icons/gi'
import { AiOutlineApi } from 'react-icons/ai'
import React from 'react'


export const skillsMap = [
  {
    name: 'Pytorch',
    Icon: SiPytorch,
    level: 0.5
  },
  {
    name: 'Tensorflow',
    Icon: SiTensorflow,
    level: 1
  },
  {
    name: 'Scikit-learn',
    Icon: SiScikitlearn,
    level: 1
  },
  {
    name: 'Python',
    Icon: FaPython,
    level: 0

  },
  {
    name: 'Docker',
    Icon: FaDocker,
    level: 1.5
  },
  {
    name: 'GCP',
    Icon: SiGooglecloud,
    level: 2
  },
  {
    name: 'JavaScript',
    Icon: FaJs,
    level: 3
  },
  {
    name: 'Jenkins',
    Icon: SiJenkins,
    level: 2
  },
  {
    name: 'Pandas',
    Icon: SiPandas,
    level: 1
  },
  {
    name: 'C++',
    Icon: SiCplusplus,
    level: 3
  },
  {
    name: 'Numpy',
    Icon: SiNumpy,
    level: 0.5
  },
  {
    name: 'MongoDB',
    Icon: SiMongodb,
    level: 2
  },
  {
    name: 'Postgres',
    Icon: SiPostgresql,
    level: 2
  },
  {
    name: 'Redis',
    Icon: SiRedis,
    level: 2
  },
  {
    name: 'Kafka',
    Icon: SiApachekafka,
    level: 2
  },
  {
    name: 'Rust',
    Icon: SiRust,
    level: 2.5
  },
  {
    name: 'React.js',
    Icon: FaReact,
    level: 2.5
  },
  {
    name: 'Next.js',
    Icon: SiNextdotjs,
    level: 3
  },
  {
    name: 'Next.js',
    Icon: SiNextdotjs,
    level: 3
  },
  {
    name: 'Git',
    Icon: SiGit,
    level: 1
  }
]

export const navbarLinks = [
  {
    name: 'Home',
    href: '/',
    icon: <FaHome />
  },
  {
    name: 'Projects',
    href: '#projects',
    icon: <FaProjectDiagram />
  },
  {
    name: 'Blog',
    href: '/blog',
    icon: <FaCode />
  },
  {
    name: 'Shelf',
    href: '/shelf',
    icon: <FaBook />
  },
  {
    name: 'Watch',
    href: '/watch',
    icon: <FaFilm />
  }
]

export const aboutMe = `
Hi, I'm Abhik Sarkar, a Deep Learning Practitioner at Cloudastructure Inc. My research focuses on developing new deep learning models and algorithms for computer vision.

This portfolio showcases some of my recent projects and publications. Please feel free to get in touch if you have any questions or would like to collaborate!
`

export const projects = [
  {
    title: 'Image Captioning with Attention Mechanisms',
    description: 'A deep learning model that generates captions for images using attention mechanisms.',
    technologies: ['Python', 'PyTorch', 'NLTK'],
    link: 'https://github.com/johndoe/image-captioning'
  },
  {
    title: 'Generative Adversarial Networks for Text Generation',
    description: 'A deep learning model that generates realistic text using generative adversarial networks.',
    technologies: ['Python', 'TensorFlow'],
    link: 'https://github.com/johndoe/gan-text-generation'
  }
]

export const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:abhiksark@gmail.com',
    icon: <FaEnvelope />
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/abhiksark',
    icon: <FaTwitter />
  },
  {
    name: 'GitHub',
    href: 'https://github.com/abhiksark',
    icon: <FaGithub />
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhiksark/',
    icon: <FaLinkedin />
  }
]




export const skills = [
  { name: 'Deep Learning', progress: 90 , level: 0.5},
  { name: 'Computer Vision', progress: 90 , level: 1},
  { name: 'Natural Language Processing', progress: 55 , level: 1.7},
  { name: 'Databases', progress: 50 , level: 2},
  { name: 'Front End', progress: 20 , level: 3},
]

export const suggestedReading = [
  {
    title: 'Deep Residual Learning for Image Recognition',
    link: 'https://arxiv.org/pdf/1512.03385.pdf',
    type: 'Paper',
    subType: 'Computer Vision'
  },
  {
    title: 'Illustrated Transformer',
    link: 'https://jalammar.github.io/illustrated-transformer/',
    type: 'Blog',
    subType: 'Natural Language Processing'
  },
  {
    title: 'You Only Look Once: Unified, Real-Time Object Detection',
    link: 'https://arxiv.org/pdf/1506.02640.pdf',
    type: 'Paper',
    subType: 'Computer Vision'
  },
  {
    title: 'The Illustrated GPT-2 (Visualizing Transformer Language Models)',
    link: 'https://jalammar.github.io/illustrated-gpt2/',
    type: 'Blog',
    subType: 'Natural Language Processing'
  },
  {
    title: 'Attention Is All You Need',
    link: 'https://arxiv.org/pdf/1706.03762.pdf',
    type: 'Paper',
    subType: 'Natural Language Processing'
  },
  {
    title: 'YOLO9000: Better, Faster, Stronger',
    link: 'https://arxiv.org/pdf/1612.08242.pdf',
    type: 'Paper',
    subType: 'Computer Vision'
  },
  {
    title: 'YOLOv3: An Incremental Improvement',
    link: 'https://arxiv.org/pdf/1804.02767.pdf',
    type: 'Paper',
    subType: 'Computer Vision'
  },
  {
    title: 'YOLOv4: Optimal Speed and Accuracy of Object Detection',
    link: 'https://arxiv.org/pdf/2004.10934.pdf',
    type: 'Paper',
    subType: 'Computer Vision'
  },
  {
    title: 'Visual Transformer Language Representation Models',
    link: 'https://arxiv.org/pdf/2010.11929.pdf',
    type: 'Paper',
    subType: 'Natural Language Processing'
  },
  {
    title: 'CLIP: Connecting Text and Images',
    link: 'https://arxiv.org/pdf/2103.00020.pdf',
    type: 'Paper',
    subType: 'Natural Language Processing'
  },
  {
    title: 'Transformers from Scratch',
    link: 'https://e2eml.school/transformers.html',
    type: 'Blog',
    subType: 'Natural Language Processing'
  },
  {
    title: 'Machine Learning Design Patterns: Solutions to Common Challenges in Data Preparation, Model Building, and MLOps ',
    link: 'https://www.amazon.in/Machine-Learning-Design-Patterns-Preparation/dp/1098115783',
    type: 'Book',
    subType: 'Machine Learning'
  },
  {
    title: 'Designing Machine Learning Systems: An Iterative Process for Production-Ready Applications',
    link: 'https://www.amazon.in/Designing-Machine-Learning-Systems-Production-Ready/dp/149204510X',
    type: 'Book',
    subType: 'Machine Learning'
  }
]

export const suggestedVideos = [
  {
    title: 'Joe Rogan Experience #1309 - Naval Ravikant',
    link: 'https://www.youtube.com/watch?v=3qHkcs3kG44',
    type: 'Podcast',
    subType: 'Joe Rogan'
  },
  {
    title: 'Sam Altman: OpenAI CEO on GPT-4, ChatGPT, and the Future of AI | Lex Fridman Podcast #367',
    link: 'https://www.youtube.com/watch?v=L_Guz73e6fw',
    type: 'Podcast',
    subType: 'Lex Fridman'
  },
  {
    title: 'Balaji Srinivasan: How to Fix Government, Twitter, Science, and the FDA | Lex Fridman Podcast #331',
    link: 'https://www.youtube.com/watch?v=VeH7qKZr0WI',
    type: 'Podcast',
    subType: 'Lex Fridman'
  },
  {
    title: 'Joe Rogan Experience #1536 - Edward Snowden',
    link: 'https://www.youtube.com/watch?v=efs3QRr8LWw',
    type: 'Podcast',
    subType: 'Joe Rogan'
  },
  {
    title: 'Joe Rogan Experience #1470 - Elon Musk',
    link: 'https://www.youtube.com/watch?v=RcYjXbSJBN8',
    type: 'Podcast',
    subType: 'Joe Rogan'
  },
  {
    title: 'Mark Zuckerberg: Meta, Facebook, Instagram, and the Metaverse | Lex Fridman Podcast #267',    
    link: 'https://www.youtube.com/watch?v=5zOHSysMmH0',
    type: 'Podcast',
    subType: 'Lex Fridman'
  },
  {
    title: 'Asli Engineering by Arpit Bhayani',
    link: 'https://www.youtube.com/@AsliEngineering',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'Techie007',
    link: 'https://www.youtube.com/user/Techie007',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'Yannic Kilcher',
    link: 'https://www.youtube.com/@YannicKilcher',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'Two Minute Papers',
    link: 'https://www.youtube.com/user/keeroyz',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: '3Blue1Brown',
    link: 'https://www.youtube.com/channel/UCYO_jab_esuFRV4b17AJtAw',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'Theo - t3․gg',
    link: 'https://www.youtube.com/@t3dotgg',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'Byte Byte Go',
    link: 'https://www.youtube.com/@ByteByteGo',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'CS231n: Convolutional Neural Networks for Visual Recognition',
    link: 'https://www.youtube.com/playlist?list=PLC1qU-LWwrF64f4QKQT-Vg5Wr4qEE1Zxk',
    type: 'Course',
    subType: 'Computer Vision'
  },
  {
    title: 'CS224n: Natural Language Processing with Deep Learning',
    link: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOhcuXMZkNm7j3fVwBBY42z',
    type: 'Course',
    subType: 'Natural Language Processing'
  },
  {
    title: 'CS224W: Machine Learning with Graphs',
    link: 'https://www.youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn',
    type: 'Course',
    subType: 'Graph Neural Networks'
  },
  {
    title: 'CS285: Deep Reinforcement Learning',
    link: 'https://www.youtube.com/playlist?list=PLkFD6_40KJIxJMR-j5A1mkxK26gh_qg37',
    type: 'Course',
    subType: 'Reinforcement Learning'
  },
  {
    title: 'CS230: Deep Learning',
    link: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOABXSygHTsbvUz4G_YQhOb',
    type: 'Course',
    subType: 'Deep Learning'
  },
  {
    title: 'FreeCodeCamp',
    link: 'https://www.youtube.com/channel/UC8butISFwT-Wl7EV0hUK0BQ',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'Sebastian Raschka',
    link: 'https://www.youtube.com/@SebastianRaschka',
    type: 'YouTube',
    subType: 'Recommended Channels'
  },
  {
    title: 'Corey Schafer',
    link: 'https://www.youtube.com/user/schafer5',
    type: 'YouTube',
    subType: 'Recommended Channels'
  }
]
