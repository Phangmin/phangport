import gwangminPicture from '../assets/profiles/gwangmin-front-picture.jpg'
import {
  AboutAwardsSection,
  AboutEducationSection,
  AboutIntroSection,
  AboutProfileCard,
  AboutProjectsSection,
  AboutSkillsSection,
} from '../components/about'
import {
  awardItems,
  projectItems,
  skillGroups,
  strengthCards,
  trainingItems,
} from '../components/about/aboutData'
import { Footer } from '../components/common'

function AboutPage() {
  return (
    <main
      className="min-h-screen text-left text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:132px]"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.10), transparent 30%), linear-gradient(180deg, #ffffff 0%)',
      }}
    >
      <section className="mx-auto grid min-h-screen w-[min(1126px,calc(100%-48px))] gap-6 px-0 pb-[72px] pt-[calc(var(--navbar-offset)+24px)] md:w-[min(1126px,calc(100%-128px))]">
        <div className="grid gap-12 xl:grid-cols-[320px_minmax(0,1fr)]">
          <AboutProfileCard imageSrc={gwangminPicture} />
          <AboutIntroSection strengthCards={strengthCards} />
        </div>

        <div className="grid gap-[22px]">
          <AboutEducationSection items={trainingItems} />
          <AboutAwardsSection items={awardItems} />
          <AboutProjectsSection items={projectItems} />
          <AboutSkillsSection skillGroups={skillGroups} />
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default AboutPage
