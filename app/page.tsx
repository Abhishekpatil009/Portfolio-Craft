import { HeroSection } from './components/pages/home/hero-section'
import { HighlightedProjects } from './components/pages/home/highlighted-projects'
import { KnownTechs } from './components/pages/home/known-techs'
import { WorksExperience } from './components/pages/home/works-experience'
import { HomePageData } from './types/page-info'
import { fetchHygraphQuery } from './utils/fetch-hygraph-query'

const getPageData = async (): Promise<HomePageData> => {
  const query = `
    query PageInfoQuery {
      page(where: { slug: "home" }) {
        introduction {
          raw
        }
        profilePicture {
          url
        }
        socials {
          url
          iconSvg
        }
        knownTechs {
          iconSvg
          name
          startDate
        }
        highlightProjects {
          slug
          thumbnail {
            url
          }
          title
          shortDescription
          technologies {
            name
          }
        }
      }
      workExperiences {
        companyLogo {
          url
        }
        role
        companyName
        companyUrl
        startDate
        endDate
        description {
          raw
        }
        technologies {
          name
        }
      }
    }
  `

  // 🔥 Use revalidate in production, no-store in dev
  return fetchHygraphQuery(query, 150)
}

export default async function Home() {
  const data = await getPageData()
  console.log('HOME PAGE DATA:', JSON.stringify(data, null, 2))

  // ✅ SAFE destructuring
  const pageData = data?.page
  const workExperiences = data?.workExperiences ?? []

  // ✅ Extra safety (prevents 500 crash)
  if (!pageData) {
    return (
      <main className="container py-20">
        <h1 className="text-xl font-semibold">
          Home page content not found in Hygraph
        </h1>
      </main>
    )
  }

  return (
    <>
      <HeroSection homeInfo={pageData} />

      <KnownTechs techs={pageData.knownTechs ?? []} />

      <HighlightedProjects
        projects={pageData.highlightProjects ?? []}
      />

      <WorksExperience experiences={workExperiences} />
    </>
  )
}
