import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { getPosts, strapiImageUrl, type StrapiPost } from '../lib/strapi'

const fetchPosts = createServerFn({ method: 'GET' })
  .inputValidator((d: { page: number }) => d)
  .handler(async ({ data }) => getPosts(data.page))

export const Route = createFileRoute('/blog')({
  loader: async () => fetchPosts({ data: { page: 1 } }),
  component: Blog,
})

function Blog() {
  // When a child route (/blog/$slug) is active, render it instead of the listing
  const { pathname } = useLocation()
  if (pathname !== '/blog') return <Outlet />

  const { data: posts, pagination } = Route.useLoaderData()

  const heroRef = useScrollReveal('[data-reveal]', { y: 60, stagger: 0.2, duration: 0.9 })
  const gridRef = useScrollReveal('[data-reveal]', { y: 80, stagger: 0.12, duration: 0.7, start: 'top 85%' })
  const paginationRef = useScrollReveal('[data-reveal]', { y: 20, duration: 0.5 })

  return (
    <section className="py-[100px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">

        <div ref={heroRef as React.RefObject<HTMLDivElement>} className="mb-[80px] relative">
          <span data-reveal className="inline-block text-brand text-[15px] font-orbitron font-bold uppercase mb-[8px]">
            blog posts
          </span>
          <p data-reveal className="text-[38px] leading-[55px] m-0 text-text-main font-rajdhani">
            Thoughts, ideas, and stories — written to share.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-[80px]">
            <p className="text-gray-500 font-orbitron text-[14px] uppercase tracking-widest">
              No posts published yet.
            </p>
            <p className="text-gray-600 font-orbitron text-[12px] mt-[8px]">
              Add your first post in the Strapi admin at{' '}
              <a href="http://localhost:1337/admin" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                localhost:1337/admin
              </a>
            </p>
          </div>
        ) : (
          <>
            <div ref={gridRef as React.RefObject<HTMLDivElement>} className="flex flex-wrap -mx-[15px]">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {pagination && pagination.pageCount > 1 && (
              <div ref={paginationRef as React.RefObject<HTMLDivElement>} className="mb-[20px] overflow-hidden text-center">
                <ul data-reveal className="m-0 p-0 inline-block">
                  {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((page) => (
                    <li key={page} className="inline-block mx-[5px]">
                      <span className={`inline-block text-[23px] font-rajdhani px-[10px] py-[3px] transition-colors border-b-2 ${
                        page === pagination.page
                          ? 'text-brand border-brand'
                          : 'text-text-main border-transparent'
                      }`}>
                        {page}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

function PostCard({ post }: { post: StrapiPost }) {
  const coverUrl = post.coverImage ? strapiImageUrl(post.coverImage) : null
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: '2-digit',
  })
  const tags: string[] = Array.isArray(post.tags) ? post.tags : []

  return (
    <div data-reveal className="w-full md:w-1/2 lg:w-1/3 px-[15px]">
      <div className="mb-[70px] text-center">
        <Link to="/blog/$slug" params={{ slug: post.slug }} className="inline-block mb-[25px] overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={post.coverImage?.alternativeText ?? post.title}
              className="w-full h-[200px] object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-[200px] bg-dark-bg border border-border-light flex items-center justify-center transition-transform duration-500 hover:scale-105">
              <span className="text-gray-600 font-orbitron text-[11px] uppercase tracking-widest">No image</span>
            </div>
          )}
        </Link>
        <span className="block text-text-muted text-[15px] font-orbitron font-semibold mb-[5px] uppercase">
          {date}
        </span>
        <h2 className="text-[30px] leading-[36px] m-0 mb-[20px] pb-[20px] font-rajdhani relative after:content-[''] after:absolute after:w-[170px] after:h-[1px] after:bg-border-med after:bottom-0 after:left-1/2 after:-ml-[85px]">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="text-text-main hover:text-brand transition-colors">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-text-muted font-rajdhani text-[16px] leading-[24px] mb-[12px] line-clamp-2">
            {post.excerpt}
          </p>
        )}
        {tags.length > 0 && (
          <ul className="m-0 p-0">
            {tags.map((tag, i) => (
              <li key={i} className="inline-block mr-[3px]">
                {i > 0 && <span className="text-text-muted text-[13px] font-orbitron mr-[6px]">/</span>}
                <span className="text-text-muted text-[15px] font-orbitron">{tag}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
