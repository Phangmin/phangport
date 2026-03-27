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
  aboutProfileContent,
  aboutSectionHeaders,
  awardItemsByLanguage,
  projectItemsByLanguage,
  skillGroups,
  strengthCards,
  trainingItemsByLanguage,
} from '../components/about/aboutData'
import { Footer } from '../components/common'
import useLanguage from '../hooks/useLanguage'

function AboutPage() {
  const language = useLanguage()
  const profileContent = aboutProfileContent[language]
  const sectionHeaders = aboutSectionHeaders[language]
  const trainingItems = trainingItemsByLanguage[language]
  const awardItems = awardItemsByLanguage[language]
  const projectItems = projectItemsByLanguage[language]

  return (
    <main
      className="min-h-screen text-left text-[var(--text-h)] [--navbar-offset:104px] max-md:[--navbar-offset:96px]"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(37, 99, 235, 0.10), transparent 30%), linear-gradient(180deg, #ffffff 0%)',
      }}
    >
      <section className="mx-auto grid min-h-screen w-[min(1126px,calc(100%-24px))] gap-5 px-0 pb-[72px] pt-[calc(var(--navbar-offset)+20px)] md:w-[min(1126px,calc(100%-128px))] md:gap-6 md:pt-[calc(var(--navbar-offset)+24px)]">
        <div className="grid gap-8 mb-2 lg:grid-cols-[minmax(280px,312px)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-12">
          <AboutProfileCard imageSrc={gwangminPicture} content={profileContent} language={language} />
          <div className="max-md:px-5">
            <AboutIntroSection
              strengthCards={strengthCards}
              headingLines={profileContent.headingLines}
              description={profileContent.introductionDescription}
              links={profileContent.links}
            />
          </div>
        </div>

        <div className="grid w-full gap-5 max-md:px-5">
          <AboutEducationSection items={trainingItems} header={sectionHeaders.education} />
          <AboutAwardsSection items={awardItems} header={sectionHeaders.awards} />
          <AboutProjectsSection items={projectItems} header={sectionHeaders.projects} />
          <AboutSkillsSection skillGroups={skillGroups} header={sectionHeaders.skills} />
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default AboutPage
