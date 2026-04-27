import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/single-project')({
  component: SingleProject,
})

const relatedProjects = [
  { img: '1.jpg', title: 'Over Thinking', category: 'Photography' },
  { img: '2.jpg', title: 'Silent Thoughts', category: 'Photography' },
  { img: '4.jpg', title: 'Abstract Concepts', category: 'Design' }
]

function SingleProject() {
  // Main project images — each slides in from below with stagger
  const mainImagesRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const imgs = mainImagesRef.current?.querySelectorAll('[data-img]')
    if (!imgs) return
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

  // Sidebar info slides in from the right
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

  // Navigation links fade in
  const navRef = useScrollReveal('[data-reveal]', { y: 20, stagger: 0.1, duration: 0.5 })

  // "Latest Projects" header
  const latestHeaderRef = useScrollReveal('[data-reveal]', { y: 40, duration: 0.6 })

  // Related project cards stagger up
  const relatedRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.15, duration: 0.7 })

  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">

          {/* Main project layout */}
          <div className="mb-[70px] pb-[70px] border-b border-border-light">
            <div className="flex flex-wrap -mx-[15px]">

              {/* Images column */}
              <div className="w-full md:w-2/3 px-[15px]">
                <div ref={mainImagesRef}>
                  <img data-img src="upload/portfolio/s1.jpg" alt="" className="w-full h-auto mb-[30px]" />
                  <img data-img src="upload/portfolio/s2.jpg" alt="" className="w-full h-auto mb-[30px]" />
                  <img data-img src="upload/portfolio/s3.jpg" alt="" className="w-full h-auto" />
                </div>

                {/* Navigation */}
                <div ref={navRef as React.RefObject<HTMLDivElement>} className="mt-[30px] overflow-hidden flex flex-wrap items-center">
                  <Link data-reveal to="/" className="text-brand text-[15px] font-orbitron font-bold uppercase mr-auto transition-colors hover:opacity-80">
                    Back to Gallery
                  </Link>
                  <a data-reveal href="#" className="text-text-main text-[15px] font-orbitron font-bold uppercase ml-[20px] transition-colors hover:text-brand">
                    Previous
                  </a>
                  <a data-reveal href="#" className="text-text-main text-[15px] font-orbitron font-bold uppercase ml-[20px] transition-colors hover:text-brand">
                    Next
                  </a>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full md:w-1/3 px-[15px] pt-[50px] md:pt-0">
                <div ref={sidebarRef}>
                  <h2 className="text-[38px] leading-[48px] m-0 mb-[15px] text-text-main font-rajdhani">Stairway to Heaven</h2>
                  <p className="text-[19px] leading-[26px] m-0 text-text-main font-rajdhani">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related projects */}
          <div>
            <div ref={latestHeaderRef as React.RefObject<HTMLDivElement>}>
              <h2 data-reveal className="text-[38px] leading-[48px] m-0 mb-[40px] text-center text-text-main font-rajdhani">Latest Projects</h2>
            </div>

            <div ref={relatedRef as React.RefObject<HTMLDivElement>} className="flex flex-wrap -mx-[15px]">
              {relatedProjects.map((project, index) => (
                <div data-reveal key={index} className="w-full lg:w-1/3 px-[15px] mb-[30px]">
                  <div className="relative group overflow-hidden">
                    <img
                      src={`upload/portfolio/${project.img}`}
                      alt={project.title}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-[20px] left-[20px] right-[20px] bottom-[20px] z-10 opacity-0 bg-black/90 flex items-center justify-center transition-all duration-300 group-hover:opacity-100">
                      <div className="text-center">
                        <h2 className="text-[21px] font-rajdhani mb-[50px] transition-all duration-300 group-hover:mb-0">
                          <Link to="/single-project" className="text-brand hover:opacity-70 transition-opacity">
                            {project.title}
                          </Link>
                        </h2>
                        <span className="inline-block text-text-main text-[10px] font-orbitron font-bold uppercase m-0">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
