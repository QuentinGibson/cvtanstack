import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/services')({
  component: Services,
})

const services = [
  {
    title: 'Research',
    img: 'upload/others/s1.jpg',
    reverse: false,
    desc: 'Cvbuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human development, just and equal world. <br/> We work with clients from a diverse range of cultural, political, social and religious backgrounds working towards these goals. we welcome projects from corporations to charities, political parties to social ventures that work towards these goals.'
  },
  {
    title: 'Design',
    img: 'upload/others/s2.jpg',
    reverse: true,
    desc: 'Cvbuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human development, just and equal world. <br/> We work with clients from a diverse range of cultural, political, social and religious backgrounds working towards these goals. we welcome projects from corporations to charities, political parties to social ventures that work towards these goals.'
  },
  {
    title: 'Final Product',
    img: 'upload/others/s3.jpg',
    reverse: false,
    desc: 'Cvbuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human development, just and equal world. <br/> We work with clients from a diverse range of cultural, political, social and religious backgrounds working towards these goals. we welcome projects from corporations to charities, political parties to social ventures that work towards these goals.'
  }
]

const stats = [
  { value: '259', label: 'Project Finished' },
  { value: '112', label: 'Client Satisfied' },
  { value: '1569', label: 'Hour of works' },
  { value: '8', label: 'Years of experience' }
]

/** Each service row — image slides from one side, text from the other */
function ServiceRow({ service, index }: { service: typeof services[0], index: number }) {
  const rowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const img = rowRef.current?.querySelector('[data-img]')
    const text = rowRef.current?.querySelector('[data-text]')
    if (!img || !text) return

    const fromLeft = !service.reverse
    gsap.set(img, { x: fromLeft ? -80 : 80, opacity: 0 })
    gsap.set(text, { x: fromLeft ? 80 : -80, opacity: 0 })

    ScrollTrigger.create({
      trigger: rowRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(img, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: index * 0.05 })
        gsap.to(text, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: index * 0.05 + 0.1 })
      },
      once: true,
    })
  }, { scope: rowRef })

  return (
    <div ref={rowRef} className="mb-[45px]">
      <div className={`flex flex-wrap -mx-[15px] ${service.reverse ? 'flex-row-reverse' : ''}`}>
        <div data-img className="w-full lg:w-1/2 px-[15px]">
          <img src={service.img} alt={service.title} className="w-full h-auto" />
        </div>
        <div data-text className="w-full lg:w-1/2 px-[15px]">
          <div className="py-[30px] px-[25px]">
            <h1 className="text-[38px] leading-[48px] m-0 mb-[20px] text-text-main font-rajdhani">{service.title}</h1>
            <p className="text-[19px] leading-[30px] m-0 text-text-main font-rajdhani" dangerouslySetInnerHTML={{ __html: service.desc }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Services() {
  // Hero text
  const heroRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.2, duration: 1 })

  // Stats counters animate numbers up on scroll
  const statsRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const items = statsRef.current?.querySelectorAll('[data-stat]')
    if (!items) return

    gsap.set(items, { y: 50, opacity: 0 })

    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(items, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.4)' })

        // Animate each number counting up
        items.forEach((item) => {
          const numEl = item.querySelector('[data-count]')
          if (!numEl) return
          const target = parseInt(numEl.textContent || '0', 10)
          gsap.fromTo({ val: 0 }, { val: 0 }, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.4,
            onUpdate: function() { numEl.textContent = Math.round(this.targets()[0].val).toString() }
          })
        })
      },
      once: true,
    })
  }, { scope: statsRef })

  // Testimonials stagger in from below
  const testimonialsRef = useScrollReveal('[data-reveal]', { y: 50, stagger: 0.2, duration: 0.8 })

  return (
    <>
      {/* ─── Section 1: Hero + Service Rows ──────────── */}
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">

          {/* Hero text */}
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className="mb-[80px] relative">
            <span data-reveal className="inline-block text-brand text-[15px] font-orbitron font-bold uppercase mb-[8px]">
              What we provide
            </span>
            <p data-reveal className="text-[38px] leading-[55px] m-0 text-text-main font-rajdhani">
              This is a sample text block, you can describe services in short words, or fill up with some nice and niche informations about your company.
            </p>
          </div>

          {/* Service rows — each animates independently */}
          <div>
            {services.map((service, index) => (
              <ServiceRow key={index} service={service} index={index} />
            ))}
          </div>

          {/* Stats */}
          <div ref={statsRef} className="pt-[60px] text-center">
            <div className="flex flex-wrap -mx-[15px]">
              {stats.map((skill, index) => (
                <div data-stat key={index} className="w-full sm:w-1/2 lg:w-1/4 px-[15px]">
                  <div className="circle-skill relative w-[180px] h-[180px] mx-auto border-[4px] border-brand rounded-full flex items-center justify-center">
                    <div className="inner-circle absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div>
                        <span data-count className="block text-[60px] font-rajdhani font-bold m-0 leading-[40px] text-text-main">
                          {skill.value}
                        </span>
                        <p className="m-0 text-[13px] uppercase font-orbitron text-text-main mt-[10px]">{skill.label}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── Section 2: Testimonials ──────────────────── */}
      <section className="py-[100px] pb-[70px] bg-dark-bg">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div ref={testimonialsRef as React.RefObject<HTMLDivElement>}>
            <div className="flex flex-wrap -mx-[15px]">
              {[
                { img: 'test3.jpg', name: 'John Pol', role: 'CEO at marks and spenser', desc: 'Cvbuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human, development, advance human rights.' },
                { img: 'test4.jpg', name: 'Jay Nello', role: 'Manager at Wallsmart', desc: 'We take on projects that further human, development, advance human right, and work towards a more sustainable, just and equal world.' }
              ].map((test, index) => (
                <div data-reveal key={index} className="w-full lg:w-1/2 px-[15px]">
                  <div className="flex mb-[30px]">
                    <img src={`upload/others/${test.img}`} alt={test.name} className="mr-[25px] w-[70px] h-[70px] rounded-full shrink-0" />
                    <div className="pr-[40px]">
                      <h2 className="text-[22px] leading-[28px] m-0 mb-0 text-text-main font-rajdhani">{test.name}</h2>
                      <span className="inline-block text-text-main text-[12px] font-orbitron font-bold uppercase mb-[10px]">
                        {test.role}
                      </span>
                      <p className="text-[17px] leading-[26px] m-0 text-text-main font-rajdhani">
                        {test.desc}
                      </p>
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
