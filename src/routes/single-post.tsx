import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

export const Route = createFileRoute('/single-post')({
  component: SinglePost,
})

function SinglePost() {
  // Hero — image drops in from above, header text fades up
  const heroRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const img = heroRef.current?.querySelector('[data-hero-img]')
    const header = heroRef.current?.querySelector('[data-hero-header]')
    if (!img || !header) return

    gsap.set(img, { y: -40, opacity: 0 })
    gsap.set(header, { y: 40, opacity: 0 })

    gsap.to(img, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
    gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 })
  }, { scope: heroRef })

  // Pull-quote slides in from left
  const quoteRef = useScrollReveal('[data-reveal]', { x: -60, y: 0, duration: 0.8 })

  // Body text paragraphs stagger up
  const bodyRef = useScrollReveal('[data-reveal]', { y: 40, stagger: 0.15, duration: 0.7 })

  // Inline images slide up from below
  const imagesRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.15, duration: 0.8 })

  // Author bar fades in
  const authorRef = useScrollReveal('[data-reveal]', { y: 20, duration: 0.6 })

  // Comments stagger up
  const commentsRef = useScrollReveal('[data-reveal]', { y: 50, stagger: 0.2, duration: 0.7 })

  // Comment form slides up
  const commentFormRef = useScrollReveal('[data-reveal]', { y: 40, stagger: 0.1, duration: 0.7 })

  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">

          {/* Hero */}
          <div ref={heroRef} className="mb-[70px] text-center">
            <div>
              <img data-hero-img src="upload/blog/single.jpg" alt="" className="w-full h-auto" />
              <div className="pt-[50px] md:px-[60px]">
                <div data-hero-header className="mb-[40px]">
                  <span className="block text-text-muted text-[15px] font-orbitron font-semibold mb-[5px] uppercase">
                    Apr-11-18
                  </span>
                  <h1 className="text-[30px] md:text-[40px] leading-[1.2] m-0 mb-[20px] pb-[20px] text-text-main font-rajdhani relative after:content-[''] after:absolute after:w-[170px] after:h-[1px] after:bg-border-med after:bottom-0 after:left-1/2 after:-ml-[85px]">
                    We Asked Interior Designers: What Small Changes <br className="hidden md:block" /> Make the Biggest Difference?
                  </h1>
                  <ul className="m-0 p-0">
                    <li className="inline-block mr-[3px]">
                      <a href="#" className="text-text-muted text-[15px] font-orbitron hover:text-brand transition-colors">Architecture</a>
                    </li>
                    <li className="inline-block mr-[3px] before:content-['/'] before:text-text-muted before:text-[13px] before:font-orbitron before:mr-[6px]">
                      <a href="#" className="text-text-muted text-[15px] font-orbitron hover:text-brand transition-colors">Exterior</a>
                    </li>
                  </ul>
                </div>

                {/* Pull quote */}
                <div ref={quoteRef as React.RefObject<HTMLDivElement>} className="text-left mb-[30px]">
                  <p data-reveal className="text-text-main text-[24px] leading-[36px] font-rajdhani italic pl-[30px] border-l-4 border-brand">
                    We work with people that are as dedicated to their work as we are to ours. And, we do everything with hard work and our core values of honesty.
                  </p>
                </div>

                {/* Body text */}
                <div ref={bodyRef as React.RefObject<HTMLDivElement>} className="text-left">
                  <p data-reveal className="text-[19px] leading-[26px] mb-[20px] text-text-main font-rajdhani">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  </p>

                  {/* Mid-article images */}
                  <div ref={imagesRef as React.RefObject<HTMLDivElement>} className="flex flex-wrap -mx-[15px] my-[40px]">
                    <div data-reveal className="w-full md:w-1/2 px-[15px] mb-[30px] md:mb-0">
                      <div className="relative">
                        <img src="upload/blog/single2.jpg" alt="" className="w-full h-auto" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <a href="https://vimeo.com/185928744" className="w-[70px] h-[70px] leading-[70px] text-center bg-brand text-black text-[15px] font-orbitron font-bold uppercase rounded-full hover:opacity-90 transition-opacity">
                            Play
                          </a>
                        </div>
                      </div>
                    </div>
                    <div data-reveal className="w-full md:w-1/2 px-[15px]">
                      <img src="upload/blog/single3.jpg" alt="" className="w-full h-auto" />
                    </div>
                  </div>

                  <p data-reveal className="text-[19px] leading-[26px] mb-[20px] text-text-main font-rajdhani">
                    <span className="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
                  </p>
                  <p data-reveal className="text-[19px] leading-[26px] mb-[20px] text-text-main font-rajdhani">
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                  </p>
                </div>

                {/* Author bar */}
                <div ref={authorRef as React.RefObject<HTMLDivElement>} className="mt-[40px] pt-[20px] border-t border-border-light text-left">
                  <div data-reveal className="flex flex-wrap -mx-[15px] items-center">
                    <div className="w-full lg:w-1/3 md:w-1/4 px-[15px] mb-[15px] md:mb-0">
                      <p className="m-0 text-text-main text-[15px] font-orbitron font-semibold uppercase">Posted by John Levo</p>
                    </div>
                    <div className="w-full lg:w-2/3 md:w-3/4 px-[15px]">
                      <div className="flex flex-wrap justify-between md:justify-end items-center">
                        <ul className="m-0 p-0 flex mb-[15px] sm:mb-0 sm:mr-[30px]">
                          {['facebook', 'twitter', 'dribbble', 'github-alt'].map(social => (
                            <li key={social} className="inline-block mx-[5px]">
                              <a href="#" className="w-[30px] h-[30px] leading-[30px] text-center inline-block text-white bg-text-main hover:bg-brand transition-colors rounded-sm">
                                <i className={`fa fa-${social}`}></i>
                              </a>
                            </li>
                          ))}
                        </ul>
                        <ul className="m-0 p-0">
                          {['interior,', 'design,', 'archicture,', 'buildings'].map(tag => (
                            <li key={tag} className="inline-block mr-[5px]">
                              <a href="#" className="text-text-muted text-[14px] font-orbitron hover:text-brand transition-colors">{tag}</a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div ref={commentsRef as React.RefObject<HTMLDivElement>} className="md:px-[60px] mb-[70px]">
            <h2 data-reveal className="text-[24px] font-rajdhani text-text-main mb-[30px]">Comments (2)</h2>
            <ul className="m-0 p-0 list-none">
              <li data-reveal className="mb-[30px]">
                <div className="flex flex-col sm:flex-row mb-[30px] pb-[30px] border-b border-border-light">
                  <img alt="" src="upload/others/test1.jpg" className="w-[70px] h-[70px] rounded-full sm:mr-[25px] mb-[15px] sm:mb-0 shrink-0" />
                  <div>
                    <h4 className="text-[20px] font-rajdhani m-0 mb-[5px] text-text-main">Hansom Rob</h4>
                    <span className="block text-text-muted text-[12px] font-orbitron uppercase mb-[10px]">
                      19.06.2018 | 2 hours ago | <a href="#" className="text-brand ml-[5px] hover:text-text-main transition-colors">REPLY</a>
                    </span>
                    <p className="m-0 text-[17px] leading-[26px] text-text-main font-rajdhani">
                      As an architect and interior designer, Dean creates warm and inviting environments that deliver the comfort of energy efficient, naturally lit spaces.
                    </p>
                  </div>
                </div>
                <ul className="m-0 p-0 list-none sm:pl-[95px]">
                  <li data-reveal>
                    <div className="flex flex-col sm:flex-row pb-[30px] border-b border-border-light">
                      <img alt="" src="upload/others/test2.jpg" className="w-[70px] h-[70px] rounded-full sm:mr-[25px] mb-[15px] sm:mb-0 shrink-0" />
                      <div>
                        <h4 className="text-[20px] font-rajdhani m-0 mb-[5px] text-text-main">Johny Bravo</h4>
                        <span className="block text-text-muted text-[12px] font-orbitron uppercase mb-[10px]">
                          19.06.2018 | 1 hours ago | <a href="#" className="text-brand ml-[5px] hover:text-text-main transition-colors">REPLY</a>
                        </span>
                        <p className="m-0 text-[17px] leading-[26px] text-text-main font-rajdhani">
                          Work and pleasure, and relies on her experiences with different cultures to gain unique perspectives.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Comment form */}
          <div ref={commentFormRef as React.RefObject<HTMLDivElement>} className="md:px-[60px]">
            <h2 data-reveal className="text-[24px] font-rajdhani text-text-main mb-[30px]">Leave a Comment</h2>
            <form data-reveal id="comment-form">
              <div className="flex flex-wrap -mx-[15px]">
                <div className="w-full md:w-5/12 px-[15px]">
                  <input name="name" id="name" type="text" placeholder="Name" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg transition-colors focus:border-brand" />
                  <input name="website" id="website" type="text" placeholder="Subject" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg transition-colors focus:border-brand" />
                  <input name="mail" id="mail" type="text" placeholder="Email" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg transition-colors focus:border-brand" />
                </div>
                <div className="w-full md:w-7/12 px-[15px]">
                  <textarea name="comment" id="comment" placeholder="Message" className="w-full h-[185px] m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg resize-none transition-colors focus:border-brand"></textarea>
                  <input type="submit" id="submit-contact" value="Submit" className="bg-brand text-black text-[13px] font-orbitron font-semibold uppercase px-[30px] py-[15px] border-none outline-none cursor-pointer hover:bg-text-main transition-colors" />
                </div>
              </div>
            </form>
          </div>

        </div>
      </section>
    </>
  )
}
