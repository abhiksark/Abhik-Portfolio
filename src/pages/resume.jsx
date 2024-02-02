import Image from 'next/future/image'
import { NextSeo } from 'next-seo';

import { Card } from '@/components/Card'
import { SimpleLayout, LearningResources, NewLayout, SimpleLayoutNew } from '@/components/SimpleLayout'

import siteMeta, { learningResourcesdata, skillsData } from '@/data/siteMeta'


function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}
const SkillProgress = ({ level }) => {
  // Total number of levels (divs)
  const totalLevels = 5;
  // Array to hold each level's status
  const levels = Array.from({ length: totalLevels }, (_, index) => index < level ? 'dark:bg-gray-300 bg-gray-500' : 'dark:bg-gray-500 bg-gray-300');

  return (
    <div className="flex gap-2">
      {levels.map((color, index) => (
        <div
          key={index}
          className={`${color} ${index === 0 ? 'first:rounded-l-sm' : ''} ${index === levels.length - 1 ? 'last:rounded-r-sm' : ''} first:rounded-r-none last:rounded-l-none h-2 w-9`}
        ></div>
      ))}
    </div>
  );
};


function Skills({ skillsData }) {
  return (
    <div>
      {skillsData.map((category) => (
        <div className="mb-12" key={category.name}>
          <div key={category.name}>
            <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <div key={item.Name} className="mb-4">
                  <a
                    href={item.link}
                    className="flex items-center gap-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      className="w-8 h-8"
                      src={item.imageUrl}
                      alt={item.Name}
                      width={32}
                      height={32}
                      unoptimized
                    />
                    <span className="font-medium text-base text-zinc-800 dark:text-zinc-100">
                      {item.Name}
                    </span>
                  </a>
                  {item.skillLevel && (
                    <div className="mt-2">
                      <SkillProgress level={item.skillLevel} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}






function SkillsOld({ skillsData }) {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-0">
        Things I&apos;m good at
      </h3>
      <div className="flex flex-wrap gap-8 mt-8">
        <div className="flex flex-col gap-2 w-1/2">
          <div className="flex items-center h-5 justify-between gap-2">
            <a href="https://reactjs.org/" className="flex gap-2 h-5" target="_blank" rel="noopener noreferrer">
              <Image className="w-5	h-5"
                src="https://d1pnnwteuly8z3.cloudfront.net/images/dafc1e05-b0e8-4c6d-b375-4a62333bbd5a/9961f604-43bf-4f21-8bf2-15a9926bfedd.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
              />
              <span className="font-medium text-sm text-zinc-800 dark:text-zinc-100">React.js</span>
            </a>
          </div>
          <SkillProgress level={2} />
        </div>
      </div>
    </div >
  )
}


export default function Projects() {
  const headline = "Things I’ve made trying to put my mark on the universe."
  const intro = "I’ve worked on tons of little projects over the years, but these are some of the ones that I’m most proud of. If you see something that piques your interest, check it out via the link below. While you're there, feel free to contribute any ideas that would make it better. Remember: Open source!"

  return (
    <>
      <NextSeo
        title="Shelf - Abhik"
        description={siteMeta.description}
        canonical="https://abhik.xyz/shelf"
        openGraph={{
          url: 'https://abhik.xyz/shelf',
          images: [
            {
              url: `https://og.abhik.xyz/api/og?title=shelf&desc=${headline}`,
              width: 1200,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            }
          ],
          siteName: 'abhik.xyz',
        }}
      />
      {/* <SimpleLayout
        title={headline}
        intro={intro}
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={project.logo}
                  alt=""
                  className="h-8 w-8"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout> */}

      {/* <SimpleLayoutNew title="My Favorites">
        <h3 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          People I learn from
        </h3>
        <ul role="list" className="grid grid-cols-1 gap-x-20 gap-y-24 sm:grid-cols-2 lg:grid-cols-6">
          {peopleILearnFrom.map(person => (
            <li key={person.name} className="flex items-center hover:translate-y-2 transition duration-300">
              <a href={person.link} target="_blank" rel="noreferrer noopener" className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden relative">
                  <Image
                    src={person.imageUrl}
                    alt={person.name}
                    layout="fill"
                    objectFit="cover"
                    width={96}
                    height={96}
                    unoptimized
                  />
                </div>
                <h4 className="relative mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100 text-center">{person.name}</h4>
              </a>
            </li>
          ))}   
        </ul>
        
        <h3 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          Videos I Like
        </h3>

        <ul role="list" className="grid grid-cols-1 gap-x-20 gap-y-24 sm:grid-cols-2 lg:grid-cols-6">
          {peopleILearnFrom.map(person => (
            <li key={person.name} className="flex items-center hover:translate-y-2 transition duration-300">
              <a href={person.link} target="_blank" rel="noreferrer noopener" className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden relative">
                  <Image
                    src={person.imageUrl}
                    alt={person.name}
                    layout="fill"
                    objectFit="cover"
                    width={96}
                    height={96}
                    unoptimized
                  />
                </div>
                <h4 className="relative mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100 text-center">{person.name}</h4>
              </a>
            </li>
          ))}
        </ul>
      </SimpleLayoutNew> */}

      <SimpleLayoutNew title="Skills">

        <Skills skillsData={skillsData} />

      </SimpleLayoutNew>

      <SimpleLayoutNew title="My Favorites">


        <LearningResources categories={learningResourcesdata} />

      </SimpleLayoutNew>


    </>
  )
}

