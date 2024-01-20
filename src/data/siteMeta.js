
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


export default siteMeta;