import { createFileRoute } from '@tanstack/react-router'
import { useScrollReveal } from '../hooks/useScrollReveal'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

function Contact() {
  // Form slides up as one block
  const formRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.1, duration: 0.8 })

  // Contact info fades up
  const infoRef = useScrollReveal('[data-reveal]', { y: 40, duration: 0.7, delay: 0.1 })

  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">

          <div ref={formRef as React.RefObject<HTMLDivElement>}>
            {/* Form header */}
            <div data-reveal className="mb-[50px]">
              <span className="inline-block text-brand text-[15px] font-orbitron font-bold uppercase mb-[8px]">
                Get in touch
              </span>
              <p className="text-[38px] leading-[55px] m-0 text-text-main font-rajdhani">
                Have a project in mind? Let's talk.
              </p>
            </div>

            {/* Form */}
            <form data-reveal id="contact-form" className="mb-[50px]">
              <div className="flex flex-wrap -mx-[15px]">
                <div className="w-full md:w-1/3 px-[15px]">
                  <input name="name" id="name" type="text" placeholder="Name" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg transition-colors focus:border-brand" />
                </div>
                <div className="w-full md:w-1/3 px-[15px]">
                  <input name="mail" id="mail" type="text" placeholder="Email" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg transition-colors focus:border-brand" />
                </div>
                <div className="w-full md:w-1/3 px-[15px]">
                  <input name="tel-number" id="tel-number" type="text" placeholder="Subject" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg transition-colors focus:border-brand" />
                </div>
                <div className="w-full px-[15px]">
                  <textarea name="comment" id="comment" placeholder="Your Message*" className="w-full h-[185px] m-0 mb-[25px] px-[20px] py-[13px] border border-border-light outline-none text-text-main text-[15px] font-rajdhani bg-dark-bg resize-none transition-colors focus:border-brand"></textarea>
                  <div className="text-center">
                    <input type="submit" id="submit_contact" value="Submit" className="bg-brand text-black text-[13px] font-orbitron font-semibold uppercase px-[30px] py-[15px] border-none outline-none cursor-pointer hover:bg-text-main transition-colors inline-block" />
                  </div>
                  <div id="msg" className="hidden mt-[10px] p-[15px] rounded-[4px]"></div>
                </div>
              </div>
            </form>

            {/* Contact info */}
            <div data-reveal ref={infoRef as React.RefObject<HTMLDivElement>}>
              <p className="text-[21px] leading-[34px] text-center text-text-main font-rajdhani">
                Thank you for choosing our website. <br/>
                Please give us a ring for an informal chat to find out more about what we can offer your needs.<br/>
                Our phone number is: +44 (0)7882452461.<br/>
                And the address: Kim Young 39082, New Yersey, USA
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
