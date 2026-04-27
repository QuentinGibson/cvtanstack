import { createFileRoute, Link } from '@tanstack/react-router'
import { useScrollReveal } from '../hooks/useScrollReveal'

export const Route = createFileRoute('/blog')({
  component: Blog,
})

const posts = [
  { img: '1.jpg', date: 'Jan-05-18', title: '5 Things you should know before starting coding', tags: ['Interior', 'Architecture'] },
  { img: '2.jpg', date: 'Apr-11-18', title: 'Benefits from letuce, the good and the bad', tags: ['Food', 'Health'] },
  { img: '3.jpg', date: 'June-05-18', title: 'Prototyping is a must when working with ideas', tags: ['Design'] },
  { img: '4.jpg', date: 'June-05-18', title: 'Working as a Team', tags: ['Social'] },
  { img: '5.jpg', date: 'Apr-11-18', title: 'Free time in Office', tags: ['Games', 'Free Time'] },
  { img: '6.jpg', date: 'July-01-18', title: 'Smartphones the Myth!', tags: ['Writing'] }
]

function Blog() {
  // Hero slides up
  const heroRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.2, duration: 0.9 })

  // Blog cards slide up with stagger — split into two rows for independent triggers
  const gridRef = useScrollReveal('[data-reveal]', { y: 80, stagger: 0.12, duration: 0.7, start: 'top 85%' })

  // Pagination fades in
  const paginationRef = useScrollReveal('[data-reveal]', { y: 20, duration: 0.5 })

  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-[1170px] mx-auto px-[15px]">

          {/* Hero */}
          <div ref={heroRef as React.RefObject<HTMLDivElement>} className="mb-[80px] relative">
            <span data-reveal className="inline-block text-brand text-[15px] font-orbitron font-bold uppercase mb-[8px]">
              blog posts
            </span>
            <p data-reveal className="text-[38px] leading-[55px] m-0 text-text-main font-rajdhani">
              This is a sample text block, you can describe services in short words, or fill up with some nice and niche informations about your company.
            </p>
          </div>

          <div>
            {/* Blog grid */}
            <div ref={gridRef as React.RefObject<HTMLDivElement>} className="flex flex-wrap -mx-[15px]">
              {posts.map((post, index) => (
                <div data-reveal key={index} className="w-full md:w-1/2 lg:w-1/3 px-[15px]">
                  <div className="mb-[70px] text-center">
                    <Link to="/single-post" className="inline-block mb-[25px] overflow-hidden">
                      <img
                        src={`upload/blog/${post.img}`}
                        alt={post.title}
                        className="w-full h-auto transition-transform duration-500 hover:scale-105"
                      />
                    </Link>
                    <span className="block text-text-muted text-[15px] font-orbitron font-semibold mb-[5px] uppercase">
                      {post.date}
                    </span>
                    <h2 className="text-[30px] leading-[36px] m-0 mb-[20px] pb-[20px] font-rajdhani relative after:content-[''] after:absolute after:w-[170px] after:h-[1px] after:bg-border-med after:bottom-0 after:left-1/2 after:-ml-[85px]">
                      <Link to="/single-post" className="text-text-main hover:text-brand transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <ul className="m-0 p-0">
                      {post.tags.map((tag, tagIndex) => (
                        <li key={tagIndex} className="inline-block mr-[3px]">
                          {tagIndex > 0 && <span className="text-text-muted text-[13px] font-orbitron mr-[6px]">/</span>}
                          <a href="#" className="text-text-muted text-[15px] font-orbitron hover:text-brand transition-colors">
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div ref={paginationRef as React.RefObject<HTMLDivElement>} className="mb-[20px] overflow-hidden text-center">
              <ul data-reveal className="m-0 p-0 inline-block">
                <li className="inline-block mx-[5px]">
                  <a href="#" className="inline-block text-text-main text-[23px] font-rajdhani px-[10px] py-[3px] hover:text-brand transition-colors">
                    <i className="fa fa-long-arrow-left mr-[4px] leading-[30px]"></i>Prev
                  </a>
                </li>
                {[1, 2, 3].map((page) => (
                  <li key={page} className="inline-block mx-[5px]">
                    <a href="#" className={`inline-block text-[23px] font-rajdhani px-[10px] py-[3px] transition-colors border-b-2 ${page === 1 ? 'text-brand border-brand' : 'text-text-main border-transparent hover:text-brand hover:border-brand'}`}>
                      {page}
                    </a>
                  </li>
                ))}
                <li className="inline-block mx-[5px]">
                  <a href="#" className="inline-block text-text-main text-[23px] font-rajdhani px-[10px] py-[3px] hover:text-brand transition-colors">
                    Next<i className="fa fa-long-arrow-right ml-[5px] leading-[30px]"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
