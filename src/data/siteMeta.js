
import logoCas from '@/images/logos/cas.svg'
import logoDeloitte from '@/images/logos/deloitte.webp'
import logoQuantiphi from '@/images/logos/quantiphi.jpeg'
import logoXOR from '@/images/logos/xor.jpg'
import logoVanilla from '@/images/logos/vanilla.svg'
import logoFleek from '@/images/logos/fleeksvg.svg'
import logoUblue from '@/images/logos/ublue.png'

import logoGolang from '@/images/logos/icons8-golang.svg'
import logoKubernetes from '@/images/logos/kubernetes.svg'
import logoCaptainhook from '@/images/logos/captainhook.svg'  
import ElasticLogo from '@/images/elasticsearch.png'

import RedisLogo from '@/images/redis.jpg'
import TailWindLogo from '@/images/Tailwind_CSS_Logo.svg'
import FastAPILogo from '@/images/fastapi.png'

import ShellLogo from '@/images/shell.png'

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
    </svg>
  )
}

const siteMeta = {
    title: "Abhik Sarkar - MLE",
    description: "Abhik Sarkar is a Machine Learning Engineer.",
    copyright: "Abhik Sarkar",
    author: {
        name: "Abhik Sarkar",
        email: "abhiksark@gmail.com",
        twitter: "https://twitter.com/abhiksark",
        mastodon: "https://tty0.social/@bketelsen",
        instagram: "https://instagram.com/abhiksark",
        stackoverflow: "https://stackoverflow.com/users/5103969/abhik-sarkar",
        github: "https://github.com/abhiksark",
        linkedin: "https://linkedin.com/in/abhiksark",
        twitch: "https://twitch.tv/bketelsen",
        youtube: "https://youtube.com/@bketelsen",
    },
    siteUrl: "https://abhik.xyz"
}
 export const resume = [
    {
      company: 'Cloudastructure Inc ',
      title: 'Director, Machine Learning',
      logo: logoCas,
      start: '2020',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Quantiphi Inc',
      title: 'Machine Learning Engineer',
      logo: logoQuantiphi,
      start: '2019',
      end: '2020',
    },
    {
      company: 'Deloitte',
      title: 'Business Technology Analyst',
      logo: logoDeloitte,
      start: '2018',
      end: '2019',
    }
  ]
export const projects = [
  {
    name: 'Fleek',
    description:
      'Install and manage all the tools you need to be productive.',
    link: { href: 'https://getfleek.dev', label: 'getfleek.dev' },
    logo: logoFleek,
  },
  {
    name: 'Universal Blue',
    description:
      'Custom Operating System images based on Fedora.',
    link: { href: 'https://ublue.it', label: 'Universal Blue' },
    logo: logoUblue,
  },
  {
    name: 'Bluefin',
    description:
      'The next generation Linux workstation. Built for cloud-native, using cloud-native.',
    link: { href: 'https://projectbluefin.io', label: 'Bluefin' },
    logo: logoUblue,
  },
  {
    name: 'Vanilla OS',
    description:
      'Vanilla OS is an immutable and atomic Ubuntu Linux-based Point Release distribution, that receives updates at the right time, neither before nor after, without sacrificing security and functionality.',
    link: { href: 'https://vanillaos.org', label: 'vanillaos.org' },
    logo: logoVanilla,
  },
  {
    name: 'Captain Hook',
    description:
      'Custom commands as webhooks.',
    link: { href: 'https://github.com/bketelsen/captainhook', label: 'github.com' },
    logo: logoCaptainhook,
  },
  {
    name: 'Kubernetes',
    description:
      'Production-Grade Container Scheduling and Management',
    link: { href: 'https://github.com/kubernetes/kubernetes', label: 'github.com' },
    logo: logoKubernetes,
  },
  {
    name: 'Go',
    description:
      'Build fast, reliable, and efficient software at scale',
    link: { href: 'https://go.dev', label: 'go.dev' },
    logo: logoGolang,
  },


]

export const learningResourcesdata = [
  {
    name: 'People I Learn From',
    items : [
      {
        name: "George Hotz",
        link: "https://geohot.com/",
        imageUrl: "https://pbs.twimg.com/profile_images/772342671721455616/FE79-7Ev_400x400.jpg"
      },
      {
        name: "Andrew Ng",
        link: "https://www.andrewng.org/",
        imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-instructor-photos.s3.amazonaws.com/2a/6192a04f1311e7ba12057425631cbc/AndrewNg-Headshot.jpg?auto=format%2Ccompress&dpr=2&w=200&h=200"
      },
      {
        name: "Andrej Karpathy",
        link: "https://karpathy.ai/",
        imageUrl: "https://yt3.googleusercontent.com/ytc/AIf8zZQiL93FUj3x_4AZoTCr_XT6GQZ7N0UJjIpBVgeAH70=s176-c-k-c0x00ffffff-no-rj"
      },
      {
        name: "Robert C. Martin",
        link: "http://cleancoder.com/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/d9950327-baed-4c42-9659-255e1d7970bb.webp"
      },
      {
        name: "Arpit Bhayani",
        link: "https://arpitbhayani.me/",
        imageUrl: "https://yt3.googleusercontent.com/q4pQdGZdT9Suk5Yu7cm0KI9pLMSaFhEeKQtyZCYjFeJRcbODjS4V5J9AQhN96TYOHXI-rgZ5TA=s176-c-k-c0x00ffffff-no-rj"
      },
      {
        name: "Adam Dymitruk",
        link: "https://eventmodeling.org/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/eac29aec-8668-4278-ab7a-b38c9c66acec.webp"
      }
    ]
  },
  {
    name: 'YouTube Channels',
    items : [
      {
        name: "3Blue1Brown",
        link: "https://www.youtube.com/c/3blue1brown",
        imageUrl: "https://yt3.googleusercontent.com/ytc/AIf8zZSApZdSBilmxjGARJbX1WdIFYXFv69aixy9FcJraA=s176-c-k-c0x00ffffff-no-rj"
      },
      {
        name: "Yannic Kilcher",
        link: "https://www.youtube.com/c/YannicKilcher",
        imageUrl: "https://yt3.googleusercontent.com/ytc/AIf8zZTtFAmxsoXUJ0BLZvk_xeUeoycW1qIT5-DckCoGIkk=s176-c-k-c0x00ffffff-no-rj"
      },
      {
        name : "Dave Xiang",
        link: "https://www.youtube.com/c/DaveXiang",
        imageUrl: "https://yt3.googleusercontent.com/ytc/AIf8zZTGhWR1SubNCdvrcxJB4CzHDhbYzghi3D7vM9DQJA=s176-c-k-c0x00ffffff-no-rj"
      },
      {
        name: "Theo - t3․gg",
        link: "https://www.youtube.com/c/Theot3gg",
        imageUrl: "https://yt3.googleusercontent.com/4NapxEtLcHQ6wN2zA_DMmkOk47RFb_gy6sjSmUZGg_ARHjlIUjFsrNFddrcKMkTYpBNxCp3J=s176-c-k-c0x00ffffff-no-rj"
      },
      {
        name: "Fireship",
        link: "https://www.youtube.com/c/Fireship",
        imageUrl: "https://yt3.googleusercontent.com/ytc/AIf8zZTUVa5AeFd3m5-4fdY2hEaKof3Byp8VruZ0f0FNEA=s176-c-k-c0x00ffffff-no-rj"
      },
      {
        name: "Byte Byte Go",
        link: "https://www.youtube.com/c/ByteByteGo",
        imageUrl: "https://yt3.googleusercontent.com/efrVnDJbJOQ5XcXrrFhA9V2wTXh6gP_i0KycoYjqhN3nEh6VbCgqMQakAcFqEsguw7wxhHEjnA=s176-c-k-c0x00ffffff-no-rj"
      }
    ]

  },
  {
    name: 'Podcasts',
    items : [
      {
        name: "The Joe Rogan Experience",
        link: "https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk",
        imageUrl: "https://i.scdn.co/image/d3ae59a048dff7e95109aec18803f22bebe82d2f"
      },
      {
        name: "Huberman Lab",
        link: "https://www.hubermanlab.com/podcast",
        imageUrl: "https://assets-global.website-files.com/64416928859cbdd1716d79ce/6441c30ef12f50bc3f2449da_huberman-lab-podcast-cover.webp"
      },
      {
        name: "The Lex Fridman Podcast",
        link: "https://lexfridman.com/podcast",
        imageUrl: "https://lexfridman.com/wordpress/wp-content/uploads/2019/03/lex_fridman_deep_learning_course.jpg"
      },
      {
        name: "Real Python",
        link: "https://realpython.com/podcasts/rpp/",
        imageUrl: "https://avatars.githubusercontent.com/u/5448020?s=200&v=4"
      }
    ]      
  }

]
    
      
export const skillsData = [
  {
    name: "Languages",
    items: [
      {
        Name: "Python",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
        link: "https://www.python.org/",
        skillLevel: 5
      }, 
    

      {
        Name: "C++",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
        link: "https://isocpp.org/",
        skillLevel: 2
      },
      
     
      {
        Name: "JavaScript",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
        link: "https://www.javascript.com/",
        skillLevel: 2
      },
      {
        Name: "Shell",
        imageUrl: ShellLogo,
        link: "https://www.gnu.org/software/bash/",
        skillLevel: 3
      }


      
    ]
  },
  {
    name: "Frameworks, Libraries and Tools",
    items: [
      
      {
        Name: "FastAPI",
        imageUrl: FastAPILogo,
        link: "https://fastapi.tiangolo.com/",
        skillLevel: 2
      },
      {
        Name : "Next.js",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
        link: "https://nextjs.org/",
        skillLevel: 2

      },
      {
        Name: "Tailwind CSS",
        imageUrl: TailWindLogo,
        link: "https://tailwindcss.com/",
        skillLevel: 2

      },
      {
        Name: "React",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        link: "https://reactjs.org/",
        skillLevel: 4

      },
      {
        Name: "Docker",
        imageUrl: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-1024.png",
        link: "https://www.docker.com/",
        skillLevel: 3
      },
      {
        Name: "Kubernetes",
        imageUrl: "https://upload.wikimedia.org/wikipedia/labs/b/ba/Kubernetes-icon-color.svg",
        link: "https://kubernetes.io/",
        skillLevel: 3
        
      },
      {
        Name : "PyTorch",
        imageUrl: "https://pytorch.org/assets/images/pytorch-logo.png",
        link: "https://pytorch.org/",
        skillLevel: 4
      },
    ],

  },
  {
    name: "Databases",
    items: [
      {
        Name: "MongoDB",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg",
        link: "https://www.mongodb.com/",
        skillLevel: 3
      },
      {
        Name: "PostgreSQL",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
        link: "https://www.postgresql.org/",
        skillLevel: 3
      },
      {
        Name: "Redis",
        imageUrl: RedisLogo,
        link: "https://redis.io/",
        skillLevel: 3
      },
      {
        Name: "Elasticsearch",
        imageUrl: ElasticLogo,
        link: "https://www.elastic.co/",
        skillLevel: 3
      }
    ]
  },
  {
    name: "Concepts",
    items: [
      {
        Name: "Machine Learning",
        // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
        // link: "https://scikit-learn.org/",
        skillLevel: 4
      },
      {
        Name: "Deep Learning",
        // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/TensorFlowLogo.svg",
        // link: "https://www.tensorflow.org/",
        skillLevel: 4
      },
      
      {
        Name: "Computer Vision",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg",
        link: "https://opencv.org/",
        skillLevel: 4
      },
      {
        Name: "Natural Language Processing",
        // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Python3-powered_hello-world.svg",
        // link: "https://www.nltk.org/",
        skillLevel: 3
      },
      // {
      //   Name: "Reinforcement Learning",
      //   imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Keras_logo.svg",
      //   link: "https://keras.io/",
      //   skillLevel: 3
      // },
      // {
      //   Name: "Time Series Analysis",
      //   imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Seaborn_logo.svg",
      //   link: "https://seaborn.pydata.org/",
      //   skillLevel: 3
      // }
    ]
  },

  {
    name : "Things I'm Learning",
    items :[
      {
        Name: "Golang",
        imageUrl: "https://blog.golang.org/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg",
        link: "https://golang.org/",
      },
      // {
      //   Name: "Kubernetes",
      //   imageUrl: "https://upload.wikimedia.org/wikipedia/labs/b/ba/Kubernetes-icon-color.svg",
      //   link: "https://kubernetes.io/",
      // },
      {
        Name: "Rust",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg",
        link: "https://www.rust-lang.org/",
      },
      {
        Name: "Distributed Systems",
        // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Consul_Logo.svg",
        // link: "https://www.consul.io/",
      },
      // {
      //   Name: "Microservices",
      //   imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Consul_Logo.svg",
      //   link: "https://www.consul.io/",
      // },
      {
        Name: "WASM",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/WebAssembly_Logo.svg",
        link: "https://webassembly.org/",
      },
      
    ]
  }

]

export const experiencesData = [
  {
    id: 1,
    title: "Director, Machine Learning",
    company: "Cloudastucture Inc",
    period: "Aug 2022 - now",
    imageUrl: logoCas, // Replace with actual image URL
    socialLinks: [
      {
        platform: "",
        url: "https://www.linkedin.com/company/cloudastructure/",
        iconUrl: "/icons/linkedin.png", // Local or external link to the icon image
      }
      // Add more social links as needed
    ],
    details: [
      "In tristique vulputate augue vel egestas.",
      "Quisque ac imperdiet tortor, at lacinia ex.",
      "Duis vel ex hendrerit, commodo odio sed, aliquam enim.",
      // Add more details as needed
    ]
  },
  {
    id: 2,
    title: "Founding Machine Learning Engineer",
    company: "Cloudastucture Inc",
    period: "Dec 2020 - Aug 2022",
    imageUrl: logoCas, // Replace with actual image URL
    socialLinks: [
      {
        platform: "",
        url: "https://www.linkedin.com/company/cloudastructure/",
        iconUrl: LinkedInIcon, // Local or external link to the icon image
      }
    ],
    Technologies: [
      {
        name : "Python",
        logo : "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/9961f604-43bf-4f21-8bf2-15a9926bfedd.svg",
      },
      { name : "PyTorch",
        logo: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/9961f604-43bf-4f21-8bf2-15a9926bfedd.svg",
    }
    ],
    details: [
      "In tristique vulputate augue vel egestas.",
      "Quisque ac imperdiet tortor, at lacinia ex.",
      "Duis vel ex hendrerit, commodo odio sed, aliquam enim.",
      // Add more details as needed
    ]
  },
  {
    id: 3,
    title: "Machine Learning Engineer",
    company: "Quantiphi Analytics Solutions Pvt. Ltd. / AthenasOwl",
    period: "April 2019 - Nov 2020",
    imageUrl: logoQuantiphi, // Replace with actual image URL
    socialLinks: [
      {
        platform: "",
        url: "https://www.linkedin.com/company/athenasowl/about/",
        iconUrl: "/icons/linkedin.png", // Local or external link to the icon image
      },
      // Add more social links as needed
    ],
    details: [
      "In tristique vulputate augue vel egestas.",
      "Quisque ac imperdiet tortor, at lacinia ex.",
      "Duis vel ex hendrerit, commodo odio sed, aliquam enim.",
      // Add more details as needed
    ]
  },
  {
    id: 4,
    title: "Business Technology Analyst",
    company: "Deloitte USI Consulting",
    period: "June 2018 - March 2019",
    imageUrl: logoDeloitte,
    socialLinks: [
      {
        platform: "",
        url: "https://www.linkedin.com/company/deloitte/",
        iconUrl: "/icons/linkedin.png", // Local or external link to the icon image
      }
      // Add more social links as needed
    ],
    details: [
      "Worked in Human Capital Service Line which deals with research, analysis and design of critical programs involving different aspects of HR Processes.",
      "Got Trained in Workday which is a cloud-based ERP Solution for human capital management and financial management applications.",
      "Staffed in worldwide implementation of Financial Giant wherein Delivered both Inbound and Outbound Solutions using Workday Studio and EIBs(Enterprise Interface Builder).",
      // Add more details as needed
    ]
  },
];



export default siteMeta;