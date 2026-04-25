import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="mb-[80px] relative">
            <span className="inline-block text-[#ff9900] text-[15px] font-['Montserrat',sans-serif] font-bold uppercase mb-[8px]">
              Hello People!
            </span>
            <p className="text-[38px] leading-[55px] m-0 text-[#37404d] font-['Crimson_Text',serif]">
              Based on a small part town of Atlanta, we are passionate about making great ideas come to life, we work with confidence and pleasure.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative w-full md:w-1/2 pr-0 md:pr-[15px] mb-8 md:mb-0">
              <img src="upload/others/ab1.jpg" alt="" className="w-full h-auto" />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <a href="https://vimeo.com/185928744" className="w-[70px] h-[70px] leading-[70px] text-center bg-[#ff9900] text-white text-[15px] font-['Montserrat',sans-serif] font-bold uppercase rounded-full hover:opacity-90 transition-opacity">
                  Play
                </a>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 pl-0 md:pl-[50px]">
              <h1 className="text-[38px] leading-[48px] m-0 mb-[5px] text-[#37404d] font-['Crimson_Text',serif]">Our Mission</h1>
              <span className="inline-block text-[#969696] text-[13px] font-['Montserrat',sans-serif] font-bold uppercase mb-[20px]">
                things we do, it’s all original and epic, join the journey
              </span>
              <p className="text-[19px] leading-[26px] mb-[10px] text-[#37404d] font-['Crimson_Text',serif]">
                Cvbuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human development, advance human rights, and work towards a more sustainable, just and equal world.
              </p>
              <p className="text-[19px] leading-[26px] mb-[10px] text-[#37404d] font-['Crimson_Text',serif]">
                We work with clients from a diverse range of cultural, political, social and religious backgrounds working towards these goals. Being politically neutral and values positive, we welcome projects from corporations to charities, political parties to social ventures that work towards these goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-[100px] pb-[70px] bg-[#f1f1f1]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="text-center mb-[40px] relative">
            <h1 className="text-[38px] leading-[48px] m-0 mb-0 text-[#37404d] font-['Crimson_Text',serif]">Friends, Team Members</h1>
            <span className="inline-block text-[#ff9900] text-[15px] font-['Montserrat',sans-serif] font-bold uppercase mt-[8px]">
              guys that make things happened
            </span>
          </div>

          <div>
            <div className="flex flex-wrap -mx-[15px]">
              {[
                { img: 'team1.jpg', name: 'John Pol', role: 'Ceo' },
                { img: 'team2.jpg', name: 'Hansom Rob', role: 'Accountant' },
                { img: 'team3.jpg', name: 'Bilbo Baginski', role: 'Ring Holder' },
                { img: 'team4.jpg', name: 'Johny Bravo', role: 'Designer' }
              ].map((member, i) => (
                <div key={i} className="w-full sm:w-1/2 lg:w-1/4 px-[15px] mb-[30px]">
                  <div className="text-center px-[10px]">
                    <img src={`upload/others/${member.img}`} alt={member.name} className="w-full h-auto mb-[25px] rounded-full" />
                    <ul className="m-0 p-0 mb-[15px]">
                      {['facebook', 'twitter', 'dribbble'].map(social => (
                        <li key={social} className="inline-block mx-[10px]">
                          <a href="#" className="text-[#666] text-[19px] hover:text-[#ff9900] transition-colors">
                            <i className={`fa fa-${social}`}></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <h2 className="text-[22px] leading-[28px] m-0 mb-0 text-[#37404d] font-['Crimson_Text',serif]">{member.name}</h2>
                    <span className="inline-block text-[#37404d] text-[12px] font-['Montserrat',sans-serif] font-bold uppercase mb-[10px] mt-[4px]">
                      {member.role}
                    </span>
                    <p className="text-[17px] leading-[26px] m-0 text-[#37404d] font-['Crimson_Text',serif]">
                      Larabuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="overflow-hidden border-t border-l border-[#e4e4e4]">
            <ul className="m-0 p-0 flex flex-wrap">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <li key={i} className="w-1/2 sm:w-1/3 md:w-1/4 h-[168px] list-none border-r border-b border-[#e4e4e4]">
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
