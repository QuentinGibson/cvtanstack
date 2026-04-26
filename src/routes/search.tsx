import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
  component: SearchResults,
  validateSearch: (search: Record<string, unknown>): { q?: string } => {
    return {
      q: typeof search.q === 'string' ? search.q : undefined,
    }
  },
})

// Mock data to search through
const searchableItems = [
  { id: 1, type: 'Project', title: 'Over Thinking', category: 'Photography', img: '/upload/portfolio/1.jpg', link: '/single-project' },
  { id: 2, type: 'Project', title: 'Stairway to Heaven', category: 'Architecture', img: '/upload/portfolio/2.jpg', link: '/single-project' },
  { id: 3, type: 'Blog', title: '5 Things you should know before starting coding', category: 'Development', img: '/upload/blog/1.jpg', link: '/single-post' },
  { id: 4, type: 'Blog', title: 'Benefits from letuce, the good and the bad', category: 'Health', img: '/upload/blog/2.jpg', link: '/single-post' },
  { id: 5, type: 'Blog', title: 'Prototyping is a must when working with ideas', category: 'Design', img: '/upload/blog/3.jpg', link: '/single-post' },
  { id: 6, type: 'Project', title: 'Modern Architecture', category: 'Design', img: '/upload/portfolio/3.jpg', link: '/single-project' },
]

function SearchResults() {
  const { q } = Route.useSearch()
  
  const query = (q || '').toLowerCase().trim()
  
  const results = query 
    ? searchableItems.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
      )
    : []

  return (
    <section className="py-[100px] min-h-[70vh]">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="mb-[60px] text-center">
          <span className="inline-block text-brand text-[15px] font-orbitron font-bold uppercase mb-[8px]">
            Search Results
          </span>
          <h1 className="text-[38px] leading-[48px] m-0 text-text-main font-rajdhani">
            {query ? `Results for "${q}"` : 'No search query provided'}
          </h1>
          {query && (
            <p className="mt-[15px] text-[17px] text-text-muted font-orbitron">
              Found {results.length} item{results.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {query && results.length > 0 && (
          <div className="flex flex-wrap -mx-[15px]">
            {results.map((item) => (
              <div key={`${item.type}-${item.id}`} className="w-full md:w-1/2 lg:w-1/3 px-[15px] mb-[40px]">
                <div className="bg-dark-bg border border-border-light rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Link to={item.link} className="block overflow-hidden h-[200px] relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    <span className="absolute top-[15px] left-[15px] bg-brand text-black text-[11px] font-orbitron font-bold uppercase px-[10px] py-[4px] rounded-sm">
                      {item.type}
                    </span>
                  </Link>
                  <div className="p-[25px]">
                    <span className="block text-text-muted text-[12px] font-orbitron font-semibold uppercase mb-[10px]">
                      {item.category}
                    </span>
                    <h2 className="text-[22px] leading-[28px] m-0 font-rajdhani">
                      <Link to={item.link} className="text-text-main hover:text-brand transition-colors">
                        {item.title}
                      </Link>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="text-center py-[50px]">
            <div className="text-[60px] text-border-light mb-[20px]">
              <i className="fa fa-search"></i>
            </div>
            <h2 className="text-[28px] text-text-main font-rajdhani mb-[15px]">
              No results found
            </h2>
            <p className="text-[17px] text-text-muted font-orbitron mb-[30px]">
              We couldn't find anything matching "{q}". Try adjusting your search term.
            </p>
            <Link to="/" className="inline-block bg-brand text-black text-[13px] font-orbitron font-semibold uppercase px-[30px] py-[15px] rounded-sm hover:bg-text-main transition-colors">
              Return Home
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
