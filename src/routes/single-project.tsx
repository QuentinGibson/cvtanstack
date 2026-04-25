import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/single-project')({
  component: SingleProject,
})

function SingleProject() {
  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="mb-[70px] pb-[70px] border-b border-[#e4e4e4]">
            <div className="flex flex-wrap -mx-[15px]">
              <div className="w-full md:w-2/3 px-[15px]">
                <div>
                  <img src="upload/portfolio/s1.jpg" alt="" className="w-full h-auto mb-[30px]" />
                  <img src="upload/portfolio/s2.jpg" alt="" className="w-full h-auto mb-[30px]" />
                  <img src="upload/portfolio/s3.jpg" alt="" className="w-full h-auto" />
                </div>
                <div className="mt-[30px] overflow-hidden flex flex-wrap items-center">
                  <Link to="/" className="text-[#ff9900] text-[15px] font-['Montserrat',sans-serif] font-bold uppercase mr-auto transition-colors hover:opacity-80">
                    Back to Gallery
                  </Link>
                  <a href="#" className="text-[#37404d] text-[15px] font-['Montserrat',sans-serif] font-bold uppercase ml-[20px] transition-colors hover:text-[#ff9900]">
                    Previous
                  </a>
                  <a href="#" className="text-[#37404d] text-[15px] font-['Montserrat',sans-serif] font-bold uppercase ml-[20px] transition-colors hover:text-[#ff9900]">
                    Next
                  </a>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-[15px] pt-[50px] md:pt-0">
                <div>
                  <h2 className="text-[38px] leading-[48px] m-0 mb-[15px] text-[#37404d] font-['Crimson_Text',serif]">Stairway to Heaven</h2>
                  <p className="text-[19px] leading-[26px] m-0 text-[#37404d] font-['Crimson_Text',serif]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-[38px] leading-[48px] m-0 mb-[40px] text-center text-[#37404d] font-['Crimson_Text',serif]">Latest Projects</h2>
            <div className="flex flex-wrap -mx-[15px]">
              {[
                { img: '1.jpg', title: 'Over Thinking', category: 'Photography' },
                { img: '2.jpg', title: 'Over Thinking', category: 'Photography' },
                { img: '4.jpg', title: 'Over Thinking', category: 'Photography' }
              ].map((project, index) => (
                <div key={index} className="w-full lg:w-1/3 px-[15px] mb-[30px]">
                  <div className="relative group overflow-hidden">
                    <img src={`upload/portfolio/${project.img}`} alt={project.title} className="w-full h-auto block" />
                    <div className="absolute top-[20px] left-[20px] right-[20px] bottom-[20px] z-10 opacity-0 bg-white/95 flex items-center justify-center transition-all duration-200 group-hover:opacity-100">
                      <div className="text-center">
                        <h2 className="text-[21px] font-['Crimson_Text',serif] mb-[50px] transition-all duration-300 group-hover:mb-0">
                          <Link to="/single-project" className="text-[#ff9900] hover:opacity-70 transition-opacity">
                            {project.title}
                          </Link>
                        </h2>
                        <span className="inline-block text-[#37404d] text-[10px] font-['Montserrat',sans-serif] font-bold uppercase m-0">
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

