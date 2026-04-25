import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/services')({
  component: Services,
})

function Services() {
  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="mb-[80px] relative">
            <span className="inline-block text-[#ff9900] text-[15px] font-['Montserrat',sans-serif] font-bold uppercase mb-[8px]">
              What we provide
            </span>
            <p className="text-[38px] leading-[55px] m-0 text-[#37404d] font-['Crimson_Text',serif]">
              This is a sample text block, you can describe services in short words, or fill up with some nice and niche informations about your company.
            </p>
          </div>
          
          <div>
            {[
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
            ].map((service, index) => (
              <div key={index} className="mb-[45px]">
                <div className={`flex flex-wrap -mx-[15px] ${service.reverse ? 'flex-row-reverse' : ''}`}>
                  <div className="w-full lg:w-1/2 px-[15px]">
                    <img src={service.img} alt={service.title} className="w-full h-auto" />
                  </div>
                  <div className="w-full lg:w-1/2 px-[15px]">
                    <div className="py-[30px] px-[25px]">
                      <h1 className="text-[38px] leading-[48px] m-0 mb-[20px] text-[#37404d] font-['Crimson_Text',serif]">{service.title}</h1>
                      <p className="text-[19px] leading-[30px] m-0 text-[#37404d] font-['Crimson_Text',serif]" dangerouslySetInnerHTML={{ __html: service.desc }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-[60px] text-center">
            <div className="flex flex-wrap -mx-[15px]">
              {[
                { percent: '46', value: '259', label: 'Project Finished' },
                { percent: '65', value: '112', label: 'Client Satisfied' },
                { percent: '84', value: '1569', label: 'Hour of works' },
                { percent: '10', value: '8', label: 'Years of experience' }
              ].map((skill, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/4 px-[15px]">
                  <div className="circle-skill relative w-[180px] h-[180px] mx-auto border-[4px] border-[#ff9900] rounded-full flex items-center justify-center">
                    <div className="inner-circle absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div>
                        <span className="block text-[60px] font-['Crimson_Text',serif] font-bold m-0 leading-[40px] text-[#37404d]">{skill.value}</span>
                        <p className="m-0 text-[13px] uppercase font-['Montserrat',sans-serif] text-[#37404d] mt-[10px]">{skill.label}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-[100px] pb-[70px] bg-[#f1f1f1]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div>
            <div className="flex flex-wrap -mx-[15px]">
              {[
                { img: 'test3.jpg', name: 'John Pol', role: 'CEO at marks and spenser', desc: 'Cvbuilder agency is a social business, a non-profit that takes on purposeful projects for a better world. We take on projects that further human, development, advance human rights.' },
                { img: 'test4.jpg', name: 'Jay Nello', role: 'Manager at Wallsmart', desc: 'We take on projects that further human, development, advance human right, and work towards a more sustainable, just and equal world.' }
              ].map((test, index) => (
                <div key={index} className="w-full lg:w-1/2 px-[15px]">
                  <div className="flex mb-[30px]">
                    <img src={`upload/others/${test.img}`} alt={test.name} className="mr-[25px] w-[70px] h-[70px] rounded-full shrink-0" />
                    <div className="pr-[40px]">
                      <h2 className="text-[22px] leading-[28px] m-0 mb-0 text-[#37404d] font-['Crimson_Text',serif]">{test.name}</h2>
                      <span className="inline-block text-[#37404d] text-[12px] font-['Montserrat',sans-serif] font-bold uppercase mb-[10px]">
                        {test.role}
                      </span>
                      <p className="text-[17px] leading-[26px] m-0 text-[#37404d] font-['Crimson_Text',serif]">
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

