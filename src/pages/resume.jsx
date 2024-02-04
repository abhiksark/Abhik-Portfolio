import Image from 'next/future/image'
import { NextSeo } from 'next-seo';

import { Card } from '@/components/Card'
import { SimpleLayout, LearningResources, NewLayout, SimpleLayoutNew } from '@/components/SimpleLayout'

import siteMeta, { learningResourcesdata,experiencesData, skillsData } from '@/data/siteMeta'
import portraitImage from '@/images/abhik-resume.jpg'
function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
    </svg>
  )
}
const educationData = [
  {
    id: 1,
    title: 'Bachelor of Technology in Computer Science and Engineering',
    institute: 'National Institute of Technology, Raipur',
    period: '2014 - 2018',
    imageUrl: '/images/iit-kharagpur-logo.png',
    altText: 'NIT Raipur',
    details: [
      'Thesis: "A study of the impact of machine learning models on the financial sector"',
    ],


  },

  {
    id: 1,
    title: 'Bachelor of Technology in Computer Science and Engineering',
    institute: 'National Institute of Technology, Raipur',
    period: '2014 - 2018',
    imageUrl: '/images/iit-kharagpur-logo.png',
    altText: 'NIT Raipur',
    details: [
      'Thesis: "A study of the impact of machine learning models on the financial sector"',
    ],
  },

]
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


function ResumeAboutMe() {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4 sm:mb-6">
        Machine Learning Engineer
      </h3>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-1/4 p-4 flex justify-center">
          <Image
            src={portraitImage} // Replace with the URL of your image
            alt="Abhik Sarkar"
            className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg"
            width={250}
            height={250}
          />
        </div>
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




function WorkExperience({experiences}) {
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

