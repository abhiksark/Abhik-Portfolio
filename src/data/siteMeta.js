
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
    
      
      


export default siteMeta;