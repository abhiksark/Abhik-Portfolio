import { NextSeo } from 'next-seo';
import  siteMeta from '@/data/siteMeta'
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import React from 'react';
import Link from 'next/link';

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-6">
        {children}
      </ul>
    </Section>
  )
}



function Tool({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3">
        {/* Wrapping the title in an <a> tag to make it clickable */}
        <a href={href} className="text-zinc-800 hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">{title}</a>
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}



function ToolOld({ title, href, children }) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  )
}

export default function Uses() {
  return (
    <>
    <NextSeo
      title="Uses - Abhik"
      description={siteMeta.description}
      canonical="https://www.abhik.xyz/uses"
      openGraph={{
        url: 'https://www.abhik.xyz/uses',
        images: [
          {
            url: `https://og.abhik.xyz/api/og?title=Uses&desc=Things I use every day to get my work done.`,
            width: 1200,
            height: 600,
            alt: 'Og Image Alt',
            type: 'image/jpeg',
          }
        ],
        siteName: 'abhik.xyz',
      }}
    />
    
      <SimpleLayout
        title="Software I use, gadgets I love, and other things I recommend."
        intro="I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff."
      >
        <div className="space-y-16">
          <ToolsSection title="Workstation">
            <Tool title="13” MacBook M1 Air, 16GB RAM (2021)" href="https://www.apple.com/macbook-air-m1/">
              RISC FTW. I love this machine. It&apos;s fast, light, and has great battery life.
            </Tool>
            <Tool title="AMD Ryzen 9 + RTX A6000" href="https://www.nvidia.com/en-gb/design-visualization/rtx-a6000/">
              You need to train those models, right?
            </Tool>
            <Tool title="12.9 inch iPad Pro" href="https://www.apple.com/in/ipad-pro/">
              I use this for reading, taking notes and my second screen while i am travelling.
            </Tool>
            <Tool title="MSI GS66 Stealth" href="https://www.msi.com/Laptop/GS66-Stealth-10SX">
              My Linux machine. I use this as my daily driver.
            </Tool>

          </ToolsSection>

  
      
        <ToolsSection title="Software Section">
          <Tool title="VS Code" href="https://code.visualstudio.com/">
            My favorite editor. I use it for everything.
          </Tool>
          <Tool title="Barrier"  href="https://github.com/debauchee/barrier">
            Lifesafer for my workflow. I use it to share my mouse and keyboard between my Mac and Linux machine.
          </Tool>
          <Tool title="Copilot" href="https://copilot.github.com/">
           Do I need to say anything?
          </Tool>
          
          <Tool title="Obsidian" href="https://obsidian.md/">
            My second brain. I use it for everything.
          </Tool>

          <Tool title="Notion" href="https://www.notion.so/">
            Mainly work related stuff.
          </Tool>

          <Tool title="Byobu" href="https://byobu.org/">
            Gods gift to terminal multiplexing.
          </Tool>

        </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
