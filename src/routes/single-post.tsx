import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/single-post')({
  component: SinglePost,
})

function SinglePost() {
  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="mb-[70px] text-center">
            <div>
              <img src="upload/blog/single.jpg" alt="" className="w-full h-auto" />
              <div className="pt-[50px] md:px-[60px]">
                <div className="mb-[40px]">
                  <span className="block text-[#969696] text-[15px] font-['Montserrat',sans-serif] font-semibold mb-[5px] uppercase">
                    Apr-11-18
                  </span>
                  <h1 className="text-[30px] md:text-[40px] leading-[1.2] m-0 mb-[20px] pb-[20px] text-[#37404d] font-['Crimson_Text',serif] relative after:content-[''] after:absolute after:w-[170px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-1/2 after:-ml-[85px]">
                    We Asked Interior Designers: What Small Changes <br className="hidden md:block" /> Make the Biggest Difference?
                  </h1>
                  <ul className="m-0 p-0">
                    <li className="inline-block mr-[3px]">
                      <a href="#" className="text-[#969696] text-[15px] font-['Montserrat',sans-serif] hover:text-[#ff9900] transition-colors">Architecture</a>
                    </li>
                    <li className="inline-block mr-[3px] before:content-['/'] before:text-[#969696] before:text-[13px] before:font-['Montserrat',sans-serif] before:mr-[6px]">
                      <a href="#" className="text-[#969696] text-[15px] font-['Montserrat',sans-serif] hover:text-[#ff9900] transition-colors">Exterior</a>
                    </li>
                  </ul>
                </div>
                
                <div className="text-left">
                  <p className="text-[#37404d] text-[24px] leading-[36px] font-['Crimson_Text',serif] italic pl-[30px] border-l-4 border-[#ff9900] mb-[30px]">
                    We work with people that are as dedicated to their work as we are to ours. And, we do everything with hard work and our core values of honesty.
                  </p>
                  <p className="text-[19px] leading-[26px] mb-[20px] text-[#37404d] font-['Crimson_Text',serif]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.
                  </p>
                  
                  <div className="flex flex-wrap -mx-[15px] my-[40px]">
                    <div className="w-full md:w-1/2 px-[15px] mb-[30px] md:mb-0">
                      <div className="relative">
                        <img src="upload/blog/single2.jpg" alt="" className="w-full h-auto" />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <a href="https://vimeo.com/185928744" className="w-[70px] h-[70px] leading-[70px] text-center bg-[#ff9900] text-white text-[15px] font-['Montserrat',sans-serif] font-bold uppercase rounded-full hover:opacity-90 transition-opacity">
                            Play
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-[15px]">
                      <img src="upload/blog/single3.jpg" alt="" className="w-full h-auto" />
                    </div>
                  </div>
                  
                  <p className="text-[19px] leading-[26px] mb-[20px] text-[#37404d] font-['Crimson_Text',serif]">
                    <span className="font-bold">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span>
                  </p>
                  <p className="text-[19px] leading-[26px] mb-[20px] text-[#37404d] font-['Crimson_Text',serif]">
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.
                  </p>
                  
                  <div className="mt-[40px] pt-[20px] border-t border-[#e4e4e4]">
                    <div className="flex flex-wrap -mx-[15px] items-center">
                      <div className="w-full lg:w-1/3 md:w-1/4 px-[15px] mb-[15px] md:mb-0">
                        <p className="m-0 text-[#37404d] text-[15px] font-['Montserrat',sans-serif] font-semibold uppercase">Posted by John Levo</p>
                      </div>
                      <div className="w-full lg:w-2/3 md:w-3/4 px-[15px]">
                        <div className="flex flex-wrap justify-between md:justify-end items-center">
                          <ul className="m-0 p-0 flex mb-[15px] sm:mb-0 sm:mr-[30px]">
                            {['facebook', 'twitter', 'dribbble', 'github-alt'].map(social => (
                              <li key={social} className="inline-block mx-[5px]">
                                <a href="#" className="w-[30px] h-[30px] leading-[30px] text-center inline-block text-white bg-[#37404d] hover:bg-[#ff9900] transition-colors rounded-sm">
                                  <i className={`fa fa-${social}`}></i>
                                </a>
                              </li>
                            ))}
                          </ul>
                          <ul className="m-0 p-0">
                            {['interior,', 'design,', 'archicture,', 'buildings'].map(tag => (
                              <li key={tag} className="inline-block mr-[5px]">
                                <a href="#" className="text-[#969696] text-[14px] font-['Montserrat',sans-serif] hover:text-[#ff9900] transition-colors">{tag}</a>
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
          </div>
          
          <div className="md:px-[60px] mb-[70px]">
            <h2 className="text-[24px] font-['Crimson_Text',serif] text-[#37404d] mb-[30px]">Comments (2)</h2>
            <ul className="m-0 p-0 list-none">
              <li className="mb-[30px]">
                <div className="flex flex-col sm:flex-row mb-[30px] pb-[30px] border-b border-[#e4e4e4]">
                  <img alt="" src="upload/others/test1.jpg" className="w-[70px] h-[70px] rounded-full sm:mr-[25px] mb-[15px] sm:mb-0 shrink-0" />
                  <div>
                    <h4 className="text-[20px] font-['Crimson_Text',serif] m-0 mb-[5px] text-[#37404d]">Hansom Rob</h4>
                    <span className="block text-[#969696] text-[12px] font-['Montserrat',sans-serif] uppercase mb-[10px]">
                      19.06.2018 | 2 hours ago | <a href="#" className="text-[#ff9900] ml-[5px] hover:text-[#37404d] transition-colors">REPLY</a>
                    </span>
                    <p className="m-0 text-[17px] leading-[26px] text-[#37404d] font-['Crimson_Text',serif]">
                      As an architect and interior designer, Dean creates warm and inviting environments that deliver the comfort of energy efficient, naturally lit spaces. he spends a lot of time traveling, for work and pleasure, and relies on her experiences with different cultures to gain unique perspectives.
                    </p>
                  </div>
                </div>
                <ul className="m-0 p-0 list-none sm:pl-[95px]">
                  <li>
                    <div className="flex flex-col sm:flex-row pb-[30px] border-b border-[#e4e4e4]">
                      <img alt="" src="upload/others/test2.jpg" className="w-[70px] h-[70px] rounded-full sm:mr-[25px] mb-[15px] sm:mb-0 shrink-0" />
                      <div>
                        <h4 className="text-[20px] font-['Crimson_Text',serif] m-0 mb-[5px] text-[#37404d]">Johny Bravo</h4>
                        <span className="block text-[#969696] text-[12px] font-['Montserrat',sans-serif] uppercase mb-[10px]">
                          19.06.2018 | 1 hours ago | <a href="#" className="text-[#ff9900] ml-[5px] hover:text-[#37404d] transition-colors">REPLY</a>
                        </span>
                        <p className="m-0 text-[17px] leading-[26px] text-[#37404d] font-['Crimson_Text',serif]">
                          Work and pleasure, and relies on her experiences with different cultures to gain unique perspectives. This drives Dean to go a step further than mere design.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="md:px-[60px]">
            <h2 className="text-[24px] font-['Crimson_Text',serif] text-[#37404d] mb-[30px]">Leave a Comment</h2>
            <form id="comment-form">
              <div className="flex flex-wrap -mx-[15px]">
                <div className="w-full md:w-5/12 px-[15px]">
                  <input name="name" id="name" type="text" placeholder="Name" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-[#e4e4e4] outline-none text-[#37404d] text-[15px] font-['Crimson_Text',serif] bg-white transition-colors focus:border-[#ff9900]" />
                  <input name="website" id="website" type="text" placeholder="Subject" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-[#e4e4e4] outline-none text-[#37404d] text-[15px] font-['Crimson_Text',serif] bg-white transition-colors focus:border-[#ff9900]" />
                  <input name="mail" id="mail" type="text" placeholder="Email" className="w-full m-0 mb-[25px] px-[20px] py-[13px] border border-[#e4e4e4] outline-none text-[#37404d] text-[15px] font-['Crimson_Text',serif] bg-white transition-colors focus:border-[#ff9900]" />
                </div>
                <div className="w-full md:w-7/12 px-[15px]">
                  <textarea name="comment" id="comment" placeholder="Message" className="w-full h-[185px] m-0 mb-[25px] px-[20px] py-[13px] border border-[#e4e4e4] outline-none text-[#37404d] text-[15px] font-['Crimson_Text',serif] bg-white resize-none transition-colors focus:border-[#ff9900]"></textarea>
                  <input type="submit" id="submit-contact" value="Submit" className="bg-[#ff9900] text-white text-[13px] font-['Montserrat',sans-serif] font-semibold uppercase px-[30px] py-[15px] border-none outline-none cursor-pointer hover:bg-[#37404d] transition-colors" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

