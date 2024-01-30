
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
        name: "Kent C. Dodds",
        link: "https://kentcdodds.com/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/290bc1ad-8054-452c-97a7-e4de8ffe57e2.webp"
      },
      {
        name: "Kent Beck",
        link: "https://www.kentbeck.com/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/d8befe08-823f-4407-b850-5248463272f8.webp"
      },
      {
        name: "Eric Evans",
        link: "https://www.domainlanguage.com/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/1364f4bf-def8-4ae0-ada1-2b78a006f234.webp"
      },
      {
        name: "Martin Fowler",
        link: "https://martinfowler.com/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/0d521200-3e72-4bb8-99eb-ae2dcae04498.webp"
      },
      {
        name: "Robert C. Martin",
        link: "http://cleancoder.com/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/d9950327-baed-4c42-9659-255e1d7970bb.webp"
      },
      {
        name: "Adam Dymitruk",
        link: "https://eventmodeling.org/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/eac29aec-8668-4278-ab7a-b38c9c66acec.webp"
      }
    ]
  },
  {
    name: 'People I Learn From',
    items : [
      {
        name: "Kent C. Dodds",
        link: "https://kentcdodds.com/",
        imageUrl: "https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/290bc1ad-8054-452c-97a7-e4de8ffe57e2.webp"
      }
    ]
  },
]
    
      
      


export default siteMeta;