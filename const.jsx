import {
  FaEnvelope, FaTwitter, FaGithub, FaLinkedin, FaLightbulb, FaBlog, FaBlogger, FaHome, FaProjectDiagram, FaCode, FaBook, FaFilm,
  FaPython,
  FaDocker,
  FaJs,
  FaDatabase,
  FaServer
} from 'react-icons/fa'

import { SiPytorch, SiTensorflow, SiGooglecloud, SiCplusplus, SiMongodb, SiPostgresql, SiRedis } from 'react-icons/si'
import { GiArtificialIntelligence } from 'react-icons/gi'
import { AiOutlineApi } from 'react-icons/ai'

export const skillsMap = [
  {
    name: 'Pytorch',
    Icon: SiPytorch,
    level: 3
  },
  {
    name: 'Tensorflow',
    Icon: SiTensorflow,
    level: 3
  },
  {
    name: 'Scikit-learn',
    Icon: GiArtificialIntelligence,
    level: 3
  },
  {
    name: 'Python',
    Icon: FaPython,
    level: 3

  },
  {
    name: 'Docker',
    Icon: FaDocker,
    level: 3
  },
  {
    name: 'GCP',
    Icon: SiGooglecloud,
    level: 3
  },
  {
    name: 'JavaScript',
    Icon: FaJs,
    level: 2
  },
  {
    name: 'Jenkins',
    Icon: AiOutlineApi,
    level: 2
  },
  {
    name: 'Pandas',
    Icon: GiArtificialIntelligence,
    level: 2
  },
  {
    name: 'C++',
    Icon: SiCplusplus,
    level: 2
  },
  {
    name: 'Numpy',
    Icon: GiArtificialIntelligence,
    level: 2
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
    Icon: FaServer,
    level: 2
  },
  {
    name: 'MLflow',
    Icon: GiArtificialIntelligence,
    level: 2
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

export const books = [
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    cover: '/books/catcher-in-the-rye.jpg',
    summary: 'The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school.'
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    cover: '/books/to-kill-a-mockingbird.jpg',
    summary: 'The novel is renowned for its warmth and humor, despite dealing with the serious issues of rape and racial inequality.'
  }
  // Add more books here
]

export const papers = [
  {
    title: 'My First Paper',
    authors: 'John Doe, Jane Smith',
    journal: 'Journal of Machine Learning Research',
    date: 'Mar 2021',
    link: 'https://www.example.com/paper1'
  },
  {
    title: 'My Second Paper',
    authors: 'John Doe, Bob Johnson',
    conference: 'Conference on Neural Information Processing Systems',
    date: 'Dec 2022',
    link: 'https://www.example.com/paper2'
  }
  // add more papers here
]

export const skills = [
  { name: 'HTML', progress: 90 },
  { name: 'CSS', progress: 80 },
  { name: 'JavaScript', progress: 70 },
  { name: 'React', progress: 60 },
  { name: 'Node.js', progress: 50 }
]

export const suggestedReading = [
  {
    title: 'Deep Residual Learning for Image Recognition',
    link: 'https://arxiv.org/pdf/1512.03385.pdf',
    type: 'Paper',
    subType: 'Computer Vision'
  },
  {
    title: 'Convolutional Neural Networks for Sentence Classification',
    link: 'https://arxiv.org/pdf/1408.5882.pdf',
    type: 'Paper',
    subType: 'Natural Language Processing'
  },
  {
    title: 'Title of Book 1',
    authors: 'Author 1, Author 2',
    link: 'https://example.com/book1',
    type: 'Book',
    subType: 'Machine Learning'
  },
  {
    title: 'Title of Book 2',
    authors: 'Author 3, Author 4',
    link: 'https://example.com/book2',
    type: 'Book',
    subType: 'Computer Science'
  },
  {
    title: 'Title of Book 2',
    authors: 'Author 3, Author 4',
    link: 'https://example.com/book2',
    type: 'Blog',
    subType: ''
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
    title: 'Convolutional Neural Networks for Sentence Classification',
    link: 'https://arxiv.org/pdf/1408.5882.pdf',
    type: 'YouTube',
    subType: 'Natural Language Processing'
  },
  {
    title: 'Title of Book 1',
    authors: 'Author 1, Author 2',
    link: 'https://example.com/book1',
    type: 'Course',
    subType: 'Machine Learning'
  },
  {
    title: 'Title of Book 2',
    authors: 'Author 3, Author 4',
    link: 'https://example.com/book2',
    type: 'Book',
    subType: 'Computer Science'
  },
  {
    title: 'Title of Book 2',
    authors: 'Author 3, Author 4',
    link: 'https://example.com/book2',
    type: 'Blog',
    subType: ''
  }
]
