import { createFileRoute } from '@tanstack/react-router'
import { useScrollReveal } from '../hooks/useScrollReveal'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  // Section 1 — hero text fades up
  const heroRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.2, duration: 1 })

  // Section 1 — image slides in from left, content from right
  const missionImgRef = useScrollReveal('[data-reveal-left]', { x: -80, y: 0, duration: 0.9 })
  const missionTextRef = useScrollReveal('[data-reveal-right]', { x: 80, y: 0, duration: 0.9 })

  // Section 2 — team cards stagger up
  const teamRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.12, duration: 0.7 })

  // Section 3 — clients grid fades in as a group
  const clientsRef = useScrollReveal('[data-reveal]', { y: 30, stagger: 0.06, duration: 0.5 })

  return (
    <>
      {/* ─── Section 1: Hero Text ─────────────────────── */}
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className="mb-[80px] relative"
          >
            <span data-reveal className="inline-block text-brand text-[15px] font-orbitron font-bold uppercase mb-[8px]">
              Hello People!
            </span>
            <p data-reveal className="text-[38px] leading-[55px] m-0 text-text-main font-rajdhani">
              Based on a small part town of Atlanta, we are passionate about making great ideas come to life, we work with confidence and pleasure.
            </p>
          </div>

          {/* ─── Mission: image slides in from left ─── */}
          <div className="flex flex-col md:flex-row items-center">
            <div
              ref={missionImgRef as React.RefObject<HTMLDivElement>}
              className="relative w-full md:w-1/2 pr-0 md:pr-[15px] mb-8 md:mb-0"
            >
              <div data-reveal-left>
                <img src="upload/others/ab1.jpg" alt="" className="w-full h-auto" />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <a href="https://vimeo.com/185928744" className="w-[70px] h-[70px] leading-[70px] text-center bg-brand text-black text-[15px] font-orbitron font-bold uppercase rounded-full hover:opacity-90 transition-opacity">
                    Play
                  </a>
                </div>
              </div>
            </div>

            {/* ─── Mission: text slides in from right ─── */}
            <div
              ref={missionTextRef as React.RefObject<HTMLDivElement>}
              className="w-full md:w-1/2 pl-0 md:pl-[50px]"
            >
              <div data-reveal-right>
                <h1 className="text-[38px] leading-[48px] m-0 mb-[5px] text-text-main font-rajdhani">Our Mission</h1>
                <span className="inline-block text-text-muted text-[13px] font-orbitron font-bold uppercase mb-[20px]">
                  things we do, it's all original and epic, join the journey
                </span>
                <p className="text-[19px] leading-[26px] mb-[10px] text-text-main font-rajdhani">
                  Cvbuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human development, advance human rights, and work towards a more sustainable, just and equal world.
                </p>
                <p className="text-[19px] leading-[26px] mb-[10px] text-text-main font-rajdhani">
                  We work with clients from a diverse range of cultural, political, social and religious backgrounds working towards these goals. Being politically neutral and values positive, we welcome projects from corporations to charities, political parties to social ventures that work towards these goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 2: Team ─────────────────────────── */}
      <section className="py-[100px] pb-[70px] bg-dark-bg">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div
            ref={teamRef as React.RefObject<HTMLDivElement>}
          >
            <div data-reveal className="text-center mb-[40px] relative">
              <h1 className="text-[38px] leading-[48px] m-0 mb-0 text-text-main font-rajdhani">Friends, Team Members</h1>
              <span className="inline-block text-brand text-[15px] font-orbitron font-bold uppercase mt-[8px]">
                guys that make things happened
              </span>
            </div>

            <div className="flex flex-wrap -mx-[15px]">
              {[
                { img: 'team1.jpg', name: 'John Pol', role: 'Ceo' },
                { img: 'team2.jpg', name: 'Hansom Rob', role: 'Accountant' },
                { img: 'team3.jpg', name: 'Bilbo Baginski', role: 'Ring Holder' },
                { img: 'team4.jpg', name: 'Johny Bravo', role: 'Designer' }
              ].map((member, i) => (
                <div data-reveal key={i} className="w-full sm:w-1/2 lg:w-1/4 px-[15px] mb-[30px]">
                  <div className="text-center px-[10px]">
                    <img src={`upload/others/${member.img}`} alt={member.name} className="w-full h-auto mb-[25px] rounded-full" />
                    <ul className="m-0 p-0 mb-[15px]">
                      {['facebook', 'twitter', 'dribbble'].map(social => (
                        <li key={social} className="inline-block mx-[10px]">
                          <a href="#" className="text-text-muted text-[19px] hover:text-brand transition-colors">
                            <i className={`fa fa-${social}`}></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <h2 className="text-[22px] leading-[28px] m-0 mb-0 text-text-main font-rajdhani">{member.name}</h2>
                    <span className="inline-block text-text-main text-[12px] font-orbitron font-bold uppercase mb-[10px] mt-[4px]">
                      {member.role}
                    </span>
                    <p className="text-[17px] leading-[26px] m-0 text-text-main font-rajdhani">
                      Larabuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 3: Client Logos ──────────────────── */}
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div
            ref={clientsRef as React.RefObject<HTMLDivElement>}
            className="overflow-hidden border-t border-l border-border-light"
          >
            <ul className="m-0 p-0 flex flex-wrap">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <li data-reveal key={i} className="w-1/2 sm:w-1/3 md:w-1/4 h-[168px] list-none border-r border-b border-border-light">
                  <a href="#" className="w-full h-full flex items-center justify-center opacity-25 hover:opacity-100 transition-opacity">
                    <img src="images/client.png" alt="" className="max-w-full h-auto" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
