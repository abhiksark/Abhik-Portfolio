// src/pages/resume.jsx

import Image from 'next/future/image'
import { NextSeo } from 'next-seo';

import {  LearningResources, SimpleLayoutNew } from '@/components/SimpleLayout'

import siteMeta, { learningResourcesdata, experiencesData, skillsData } from '@/data/siteMeta'
// import { educationData } from '@/data/siteMeta'
import portraitImage from 'public/fixed/images/abhik-resume.jpg'

import LinkedInIcon from '@/components/icons/LinkedInIcon'
import { educationData } from '@/data/resume';

const SkillProgress = ({ level }) => {
  const totalLevels = 5;
  const levels = Array.from({ length: totalLevels }, (_, index) => ({
    filled: index < level,
    isFirst: index === 0,
    isLast: index === totalLevels - 1,
  }));

  return (
    <div className="flex gap-1.5">
      {levels.map(({ filled, isFirst, isLast }, index) => (
        <div
          key={index}
          className={`
            ${filled ? 'bg-teal-500 dark:bg-teal-400' : 'bg-zinc-200 dark:bg-zinc-700'}
            ${isFirst ? 'rounded-l-full' : ''} 
            ${isLast ? 'rounded-r-full' : ''} 
            h-1.5 w-4
            transition-all duration-300 ease-in-out
            group-hover:h-2
          `}
        />
      ))}
    </div>
  );
};

function Skills({ skillsData }) {
  const renderSkillItem = (item) => {
    const hasValidImage = item.imageUrl && item.imageUrl !== 'incorrect_url';

    return (
      <div 
        key={item.Name} 
        className="group flex items-center mb-4 rounded-lg 
          bg-white dark:bg-zinc-900
          hover:bg-zinc-50 dark:hover:bg-zinc-800/50 
          ring-1 ring-zinc-100 dark:ring-zinc-300/10
          transition-all duration-150 ease-in-out
          p-4 shadow-sm hover:shadow-md dark:shadow-zinc-800/5"
      >
        <div className="shrink-0 w-12 mr-4 flex items-center justify-center">
          {hasValidImage ? (
            <Image
              className="w-8 h-8 object-contain 
                transition-transform duration-150 ease-in-out
                group-hover:scale-110"
              src={item.imageUrl}
              alt={item.Name}
              width={32}
              height={32}
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-teal-500/10 dark:bg-teal-400/10 
              flex items-center justify-center
              transition-transform duration-150 ease-in-out
              group-hover:scale-110">
              <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                {item.Name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span
              className="text-lg font-semibold 
                text-zinc-800 dark:text-zinc-100 
                transition-colors duration-150 ease-in-out
                group-hover:text-teal-500 dark:group-hover:text-teal-400"
            >
              {item.Name}
            </span>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 
                  transition-opacity duration-150 ease-in-out"
              >
                <svg
                  className="w-4 h-4 text-zinc-400 hover:text-teal-500 
                    dark:text-zinc-500 dark:hover:text-teal-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
          </div>
          
          {item.skillLevel && (
            <div className="mt-2 transition-opacity duration-150 
              opacity-80 group-hover:opacity-100">
              <SkillProgress level={item.skillLevel} />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {skillsData.map((category) => (
        <section key={category.name} className="rounded-2xl 
          bg-zinc-50 dark:bg-zinc-800/50 
          p-6 ring-1 ring-zinc-100 dark:ring-zinc-300/10">
          <h3 className="text-2xl font-bold tracking-tight 
            text-zinc-800 dark:text-zinc-100 mb-6">
            {category.name}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {category.items.map(renderSkillItem)}
          </div>
        </section>
      ))}
    </div>
  );
}








function ResumeAboutMe() {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4 sm:mb-6">
        Machine Learning Engineer
      </h3>
      <div className="flex flex-col sm:flex-row">
        {portraitImage && (
          <div className="sm:w-1/4 p-4 flex justify-center">
            <Image
              src={portraitImage} // Replace with the URL of your image
              alt="Abhik Sarkar"
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg"
              width={250}
              height={250}
            />
          </div>
        )}

        <div className="sm:w-3/4 p-4">
          <div className="flex flex-wrap mb-5">
            <h3 className="w-full sm:w-1/2 text-base sm:text-lg text-zinc-800 dark:text-zinc-100 mb-2 sm:mb-0">
              <span className="font-bold">Phone Number:</span> +91 9876543210
            </h3>
            <h3 className="w-full sm:w-1/2 text-base sm:text-lg text-zinc-800 dark:text-zinc-100">
              <span className="font-bold">Email:</span> abhiksark@gmail.com
            </h3>
          </div>

          <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-100">
            I am a Machine Learning Engineer with a passion for building scalable and efficient machine learning models. I have experience in building and deploying machine learning models using modern tools and technologies. I am also a strong advocate for open-source and have contributed to various open-source projects.
          </p>

        </div>
      </div>
    </div>
  );
}




function WorkExperience({ experiences }) {
  return (
    <div className="flex flex-col gap-8">
      {experiences.map((exp) => (
        <div key={exp.id} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-between w-full">
            <Image
              className="hidden sm:block rounded-md h-[4.5rem] w-[4.5rem]"
              src={exp.imageUrl}
              alt={exp.altText}
              width={72}
              height={72}
            />
            <div className="flex flex-col flex-grow">
              <h3 className="font-extrabold mb-0 text-zinc-800 dark:text-zinc-100">{exp.title}</h3>
              <p className="font-semibold leading-snug mb-0.5 text-zinc-800 dark:text-zinc-100">{exp.company}</p>
              <p className="font-medium text-sm mb-0 text-zinc-800 dark:text-zinc-100">{exp.period}</p>
            </div>
            <div className="flex gap-3 flex-wrap sm:flex-nowrap">
              {exp.socialLinks.map((link) => (
                <a key={link.platform} href={link.url} className="flex items-center justify-center rounded bg-gray-600 text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 active:translate-y-px w-8 h-8" target="_blank" aria-label={link.platform} rel="noreferrer noopener">
                  <LinkedInIcon className="fill-current bg-gray-200 text-gray-600" />
                </a>


              ))}

            </div>
          </div>
          <div className="text-sm font-normal leading-relaxed sm:leading-relaxed sm:text-base mb-3 text-zinc-800 dark:text-zinc-100">
            <ul className="list-disc pl-5 text-zinc-800 dark:text-zinc-100">
              {exp.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function Education({ education }) {
  return (
    <div className="flex flex-col gap-8">
      {education.map((edu) => (
        <div key={edu.id} className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-between w-full">
            <Image
              className="hidden sm:block rounded-md h-[4.5rem] w-[4.5rem]"
              src={edu.imageUrl}
              alt={edu.altText}
              width={72}
              height={72}
            />
            <div className="flex flex-col flex-grow">
              <h3 className="font-extrabold mb-0 text-zinc-800 dark:text-zinc-100">{edu.title}</h3>
              <p className="font-semibold leading-snug mb-0.5 text-zinc-800 dark:text-zinc-100">{edu.institute}</p>
              <p className="font-medium text-sm mb-0 text-zinc-800 dark:text-zinc-100">{edu.period}</p>
            </div>
            <div className="flex gap-3 flex-wrap sm:flex-nowrap">

            </div>
          </div>
          <div className="text-sm font-normal leading-relaxed sm:leading-relaxed sm:text-base mb-3 text-zinc-800 dark:text-zinc-100">
            <ul className="list-disc pl-5 text-zinc-800 dark:text-zinc-100">
              {edu.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
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
      <SimpleLayoutNew title="Abhik Sarkar">
        <ResumeAboutMe />
      </SimpleLayoutNew>
      <SimpleLayoutNew title="Skills">

        <Skills skillsData={skillsData} />

      </SimpleLayoutNew>
      <SimpleLayoutNew title="Work Experience">
        <WorkExperience experiences={experiencesData} />
      </SimpleLayoutNew>

      <SimpleLayoutNew title="Education">
        <Education education={educationData} />
      </SimpleLayoutNew>
      <SimpleLayoutNew title="My Favorites">
        <LearningResources categories={learningResourcesdata} />
      </SimpleLayoutNew>
    </>
  )
}

