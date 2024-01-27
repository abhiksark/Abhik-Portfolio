import { NextSeo } from 'next-seo';
import  siteMeta from '@/data/siteMeta'
import { Card } from '@/components/Card'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'

function ToolsSection({ children, ...props }) {
  return (
    <Section {...props}>
      <ul role="list" className="space-y-3">
        {children}
      </ul>
    </Section>
  )
}

function Tool({ title, href, children }) {
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
      canonical="https://abhik.xyz/uses"
      openGraph={{
        url: 'https://abhik.xyz/uses',
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
        <div className="space-y-10">
          <ToolsSection title="Workstation">
            <Tool title="13” MacBook M1 Air, 16GB RAM (2021)">
              RISC FTW. I love this machine. It&apos;s fast, light, and has great battery life.
            </Tool>
            <Tool title="AMD Ryzen 9 + RTX A6000">
              You need to train those models, right?
            </Tool>
            <Tool title="12.9 inch iPad Pro">
              I use this for reading, taking notes and my second screen while i am travelling.
            </Tool>
            <Tool title="MSI GS66 Stealth">
              My Linux machine. I use this as my daily driver.
            </Tool>

          </ToolsSection>

  
      
        <ToolsSection title="Software Section">
          <Tool title="VS Code">
            My favorite editor. I use it for everything.
          </Tool>
          <Tool title="Barrier">
            Lifesafer for my workflow. I use it to share my mouse and keyboard between my Mac and Linux machine.
          </Tool>
          <Tool title="Copilot">
           Do I need to say anything?
          </Tool>
          
          <Tool title="Obsidian">
            My second brain. I use it for everything.
          </Tool>

          <Tool title="Notion">
            Mainly work related stuff.
          </Tool>

          <Tool title="Byobu">
            Gods gift to terminal multiplexing.
          </Tool>

        </ToolsSection>
        </div>
      </SimpleLayout>
    </>
  )
}
