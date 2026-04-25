import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/single-post-sidebar')({
  component: SinglePostSidebar,
})

function SinglePostSidebar() {
  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">
          <div className="flex flex-wrap -mx-[15px]">
            <div className="w-full lg:w-3/4 px-[15px]">
              <div className="mb-[70px]">
                <div className="mb-[40px]">
                  <img src="upload/blog/single.jpg" alt="" className="w-full h-auto" />
                  <div className="pt-[50px]">
                    <div className="mb-[40px]">
                      <span className="block text-[#969696] text-[15px] font-['Montserrat',sans-serif] font-semibold mb-[5px] uppercase">
                        Apr-11-18
                      </span>
                      <h1 className="text-[30px] md:text-[40px] leading-[1.2] m-0 mb-[20px] pb-[20px] text-[#37404d] font-['Crimson_Text',serif] relative after:content-[''] after:absolute after:w-[170px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-0">
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
                      <p className="text-[19px] leading-[26px] mb-[20px] text-[#37404d] font-['Crimson_Text',serif]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker.
                      </p>
                      <p className="text-[#37404d] text-[24px] leading-[36px] font-['Crimson_Text',serif] italic pl-[30px] border-l-4 border-[#ff9900] mb-[30px]">
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                      </p>
                      <p className="text-[19px] leading-[26px] mb-[20px] text-[#37404d] font-['Crimson_Text',serif]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
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
                          <p className="text-[19px] leading-[26px] mb-[20px] text-[#37404d] font-['Crimson_Text',serif]">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-[40px] pt-[20px] border-t border-[#e4e4e4]">
                        <div className="flex flex-wrap -mx-[15px] items-center">
                          <div className="w-full md:w-1/4 px-[15px] mb-[15px] md:mb-0">
                            <p className="m-0 text-[#37404d] text-[15px] font-['Montserrat',sans-serif] font-semibold uppercase">Posted by John Levo</p>
                          </div>
                          <div className="w-full md:w-3/4 px-[15px]">
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
              
              <div className="mb-[70px]">
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

              <div>
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
            
            <div className="w-full lg:w-1/4 px-[15px] mt-[50px] lg:mt-0">
              <div className="lg:pl-[20px]">
                <div className="mb-[50px] relative">
                  <form className="relative">
                    <input type="search" placeholder="Search..." className="w-full py-[12px] px-[20px] pr-[50px] border border-[#e4e4e4] outline-none text-[#37404d] text-[14px] font-['Montserrat',sans-serif] italic transition-colors focus:border-[#ff9900]" />
                    <button type="submit" className="absolute top-0 right-0 w-[50px] h-full bg-transparent border-none outline-none text-[#37404d] cursor-pointer hover:text-[#ff9900] transition-colors">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
                <div className="mb-[50px]">
                  <h2 className="text-[21px] font-['Crimson_Text',serif] text-[#37404d] mb-[25px] pb-[12px] relative after:content-[''] after:absolute after:w-[30px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-0">About me</h2>
                  <p className="text-[17px] leading-[26px] text-[#37404d] font-['Crimson_Text',serif] m-0">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining esentially unchanged.
                  </p>
                </div>
                <div className="mb-[50px]">
                  <h2 className="text-[21px] font-['Crimson_Text',serif] text-[#37404d] mb-[25px] pb-[12px] relative after:content-[''] after:absolute after:w-[30px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-0">Recent Posts</h2>
                  <ul className="m-0 p-0 list-none">
                    {[
                      { img: 't1.jpg', title: 'Aliquam tincidunt mauris eu risus.', date: 'Jan-10-18' },
                      { img: 't2.jpg', title: 'Donec quis dui at dolor tempor interdum.', date: 'Apr-23-18' },
                      { img: 't3.jpg', title: 'Vivamus molestie gravida turpis.', date: 'July-08-18' }
                    ].map((post, i) => (
                      <li key={i} className="flex mb-[20px] last:mb-0">
                        <img alt="" src={`upload/blog/${post.img}`} className="w-[80px] h-[80px] object-cover mr-[15px] shrink-0" />
                        <div>
                          <h2 className="text-[18px] leading-[24px] font-['Crimson_Text',serif] m-0 mb-[5px]">
                            <a href="/single-post" className="text-[#37404d] hover:text-[#ff9900] transition-colors">{post.title}</a>
                          </h2>
                          <span className="text-[#969696] text-[12px] font-['Montserrat',sans-serif] font-semibold uppercase">{post.date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-[50px]">
                  <h2 className="text-[21px] font-['Crimson_Text',serif] text-[#37404d] mb-[25px] pb-[12px] relative after:content-[''] after:absolute after:w-[30px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-0">Social Networks</h2>
                  <ul className="m-0 p-0 list-none flex flex-wrap -mx-[2px]">
                    {['facebook', 'twitter', 'dribbble', 'github-alt', 'vimeo', 'youtube-play'].map(social => (
                      <li key={social} className="px-[2px] mb-[4px]">
                        <a href="#" className="w-[38px] h-[38px] leading-[38px] text-center inline-block text-white bg-[#37404d] hover:bg-[#ff9900] transition-colors">
                          <i className={`fa fa-${social}`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-[50px]">
                  <h2 className="text-[21px] font-['Crimson_Text',serif] text-[#37404d] mb-[25px] pb-[12px] relative after:content-[''] after:absolute after:w-[30px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-0">Tags</h2>
                  <ul className="m-0 p-0 list-none flex flex-wrap">
                    {['design', 'development', 'travelling', 'nature', 'web design', 'multimedia', 'graphics'].map(tag => (
                      <li key={tag} className="mr-[5px] mb-[5px]">
                        <a href="#" className="inline-block px-[15px] py-[6px] border border-[#e4e4e4] text-[#969696] text-[13px] font-['Montserrat',sans-serif] hover:border-[#ff9900] hover:text-[#ff9900] transition-colors">
                          {tag}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-[50px]">
                  <a href="#"><img src="upload/blog/adv.jpg" alt="" className="w-full h-auto" /></a>
                </div>
                <div className="mb-[50px]">
                  <h2 className="text-[21px] font-['Crimson_Text',serif] text-[#37404d] mb-[25px] pb-[12px] relative after:content-[''] after:absolute after:w-[30px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-0">Newsletter</h2>
                  <p className="text-[17px] leading-[26px] text-[#37404d] font-['Crimson_Text',serif] mb-[15px]">
                    Subscribe to our newsletter and stay up to date with coming events straight in your mailbox:
                  </p>
                  <form className="relative">
                    <input type="text" name="sub-email" id="sub-email" placeholder="youremail@mail.com..." className="w-full py-[12px] px-[20px] pr-[50px] border border-[#e4e4e4] outline-none text-[#37404d] text-[14px] font-['Montserrat',sans-serif] transition-colors focus:border-[#ff9900]" />
                    <button type="submit" className="absolute top-0 right-0 w-[50px] h-full bg-[#37404d] text-white border-none outline-none cursor-pointer hover:bg-[#ff9900] transition-colors">
                      <i className="fa fa-check"></i>
                    </button>
                  </form>
                </div>
                <div className="mb-[50px]">
                  <h2 className="text-[21px] font-['Crimson_Text',serif] text-[#37404d] mb-[25px] pb-[12px] relative after:content-[''] after:absolute after:w-[30px] after:h-[1px] after:bg-[#cecece] after:bottom-0 after:left-0">Categories</h2>
                  <ul className="m-0 p-0 list-none">
                    {[
                      { name: 'Blogging', count: '9' },
                      { name: 'Web Design', count: '20' },
                      { name: 'Graphics', count: '13' },
                      { name: 'Development', count: '7' },
                      { name: 'News', count: '44' },
                      { name: 'WordPress', count: '22' }
                    ].map(cat => (
                      <li key={cat.name} className="mb-[10px] last:mb-0">
                        <a href="#" className="flex justify-between items-center text-[#37404d] text-[17px] font-['Crimson_Text',serif] hover:text-[#ff9900] transition-colors pb-[10px] border-b border-[#e4e4e4] border-dotted">
                          {cat.name} <span className="text-[#969696] text-[14px] font-['Montserrat',sans-serif]">({cat.count})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

