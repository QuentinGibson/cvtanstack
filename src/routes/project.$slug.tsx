import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getProjectBySlug, getProjects, strapiImageUrl, type StrapiProject } from '../lib/strapi'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Server functions ──────────────────────────────────────────────────────────

const fetchProject = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => getProjectBySlug(slug))

const fetchRelated = createServerFn({ method: 'GET' })
  .inputValidator((currentSlug: string) => currentSlug)
  .handler(async ({ data: currentSlug }) => {
    const all = await getProjects()
    return all.filter((p) => p.slug !== currentSlug).slice(0, 3)
  })

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/project/$slug')({
  loader: async ({ params }) => {
    const [project, related] = await Promise.all([
      fetchProject({ data: params.slug }),
      fetchRelated({ data: params.slug }),
    ])
    if (!project) throw redirect({ to: '/' })
    return { project, related }
  },
  component: SingleProject,
})

// ── Page ──────────────────────────────────────────────────────────────────────

function SingleProject() {
  const { project, related } = Route.useLoaderData() as {
    project: StrapiProject
    related: StrapiProject[]
  }

  const mainImagesRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const imgs = mainImagesRef.current?.querySelectorAll('[data-img]')
    if (!imgs?.length) return
    gsap.set(imgs, { y: 60, opacity: 0 })
    ScrollTrigger.create({
      trigger: mainImagesRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(imgs, { y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out' })
      },
      once: true,
    })
  }, { scope: mainImagesRef })

  const sidebarRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const el = sidebarRef.current
    if (!el) return
    gsap.set(el, { x: 80, opacity: 0 })
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(el, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 })
      },
      once: true,
    })
  }, { scope: sidebarRef })

  const navRef = useScrollReveal('[data-reveal]', { y: 20, stagger: 0.1, duration: 0.5 })
  const latestHeaderRef = useScrollReveal('[data-reveal]', { y: 40, duration: 0.6 })
  const relatedRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.15, duration: 0.7 })

  const galleryImages = project.images && project.images.length > 0
    ? project.images
    : project.coverImage
    ? [project.coverImage]
    : []

  const skills: string[] = Array.isArray(project.skills) ? project.skills : []

  return (
    <section className="py-[100px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">

        {/* Main layout */}
        <div className="mb-[70px] pb-[70px] border-b border-border-light">
          <div className="flex flex-wrap -mx-[15px]">

            {/* Gallery column */}
            <div className="w-full md:w-2/3 px-[15px]">
              <div ref={mainImagesRef}>
                {galleryImages.length > 0 ? (
                  galleryImages.map((img, i) => (
                    <img
                      data-img
                      key={i}
                      src={strapiImageUrl(img)}
                      alt={img.alternativeText ?? project.title}
                      className={`w-full h-auto ${i < galleryImages.length - 1 ? 'mb-[30px]' : ''}`}
                    />
                  ))
                ) : (
                  <div data-img className="w-full h-[400px] bg-dark-bg border border-border-light flex items-center justify-center">
                    <span className="text-gray-600 font-orbitron text-[11px] uppercase tracking-widest">No images</span>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div ref={navRef as React.RefObject<HTMLDivElement>} className="mt-[30px] overflow-hidden flex flex-wrap items-center">
                <Link
                  data-reveal
                  to="/"
                  className="text-brand text-[15px] font-orbitron font-bold uppercase mr-auto transition-colors hover:opacity-80 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to Gallery
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3 px-[15px] pt-[50px] md:pt-0">
              <div ref={sidebarRef}>
                {project.category && (
                  <span className="block text-brand text-[13px] font-orbitron font-bold uppercase tracking-wider mb-[12px]">
                    {project.category}
                  </span>
                )}
                <h2 className="text-[38px] leading-[48px] m-0 mb-[20px] text-text-main font-rajdhani">
                  {project.title}
                </h2>
                {project.description && (
                  <p className="text-[19px] leading-[26px] m-0 mb-[30px] text-text-main font-rajdhani">
                    {project.description}
                  </p>
                )}

                {(project.client || project.date || skills.length > 0) && (
                  <ul className="m-0 p-0 list-none space-y-[15px] border-t border-border-light pt-[25px]">
                    {project.client && (
                      <li className="flex justify-between gap-[16px]">
                        <span className="text-text-main font-orbitron font-bold text-[12px] uppercase shrink-0">Client</span>
                        <span className="text-text-muted font-orbitron text-[12px] text-right">{project.client}</span>
                      </li>
                    )}
                    {project.date && (
                      <li className="flex justify-between gap-[16px]">
                        <span className="text-text-main font-orbitron font-bold text-[12px] uppercase shrink-0">Date</span>
                        <span className="text-text-muted font-orbitron text-[12px] text-right">{project.date}</span>
                      </li>
                    )}
                    {skills.length > 0 && (
                      <li className="flex justify-between gap-[16px]">
                        <span className="text-text-main font-orbitron font-bold text-[12px] uppercase shrink-0">Skills</span>
                        <span className="text-text-muted font-orbitron text-[12px] text-right">{skills.join(', ')}</span>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div>
            <div ref={latestHeaderRef as React.RefObject<HTMLDivElement>}>
              <h2 data-reveal className="text-[38px] leading-[48px] m-0 mb-[40px] text-center text-text-main font-rajdhani">
                Latest Projects
              </h2>
            </div>

            <div ref={relatedRef as React.RefObject<HTMLDivElement>} className="flex flex-wrap -mx-[15px]">
              {related.map((p) => (
                <div data-reveal key={p.id} className="w-full lg:w-1/3 px-[15px] mb-[30px]">
                  <div className="relative group overflow-hidden">
                    {p.coverImage ? (
                      <img
                        src={strapiImageUrl(p.coverImage)}
                        alt={p.coverImage.alternativeText ?? p.title}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-[200px] bg-dark-bg border border-border-light transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <div className="absolute top-[20px] left-[20px] right-[20px] bottom-[20px] z-10 opacity-0 bg-black/90 flex items-center justify-center transition-all duration-300 group-hover:opacity-100">
                      <div className="text-center">
                        <h2 className="text-[21px] font-rajdhani mb-[10px]">
                          <Link
                            to="/project/$slug"
                            params={{ slug: p.slug }}
                            className="text-brand hover:opacity-70 transition-opacity"
                          >
                            {p.title}
                          </Link>
                        </h2>
                        {p.category && (
                          <span className="inline-block text-text-main text-[10px] font-orbitron font-bold uppercase">
                            {p.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
