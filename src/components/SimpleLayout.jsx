import { Container } from '@/components/Container'

import React from 'react';
import Image from 'next/image';

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="mx-auto max-w-4xl">
        <header className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400 mx-auto leading-relaxed">
            {intro}
          </p>
        </header>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 dark:from-zinc-900/30 to-transparent h-32 pointer-events-none" 
               aria-hidden="true" />
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </Container>
  )
}

export function NewLayout({ title, children }) {
  return (
    <Container className="flex-row mt-16 sm:mt-16">
      <div className="mx-auto max-w-4xl">
        <h2 className="h3 text-gray-100 font-extrabold mb-6">{title}</h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {children}
        </div>
      </div>
    </Container>
  );
}

export function SimpleLayoutNew({ title, children }) {
  return (
    <Container className="mt-16 sm:mt-16">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-6 bg-zinc-100/80 backdrop-blur-sm dark:bg-gray-800/80 p-8 rounded-2xl shadow-lg">
          <header className="w-full">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </header>
          <div className="flex flex-col gap-16">
            {children}
          </div>
        </div>
      </div>
    </Container>
  )
}

export function CategoryList({ category }) {
  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl md:text-3xl">
        {category.name}
      </h3>
      <div className="mt-5">
        <ul role="list" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {category.items.map(item => (
            <li key={item.name} className="flex flex-col items-center hover:translate-y-1 transition duration-300">
              <a href={item.link} target="_blank" rel="noreferrer noopener" className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={96}
                    height={96}
                    unoptimized
                  />
                </div>
                <h4 className="mt-4 text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-100 text-center">{item.name}</h4>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export function LearningResources({ categories }) {
  return (
    <div>
      {categories.map(category => (
        <CategoryList key={category.name} category={category} />
      ))}
    </div>
  );
}
