import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useQuery, useMutation } from 'convex/react'
import { useUser } from '@clerk/tanstack-react-start'
import { api } from '../../convex/_generated/api'
import type { Id } from '../../convex/_generated/dataModel'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, strapiImageUrl, type StrapiPost } from '../lib/strapi'
import { Loader2, MessageSquare, Reply, Trash2, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Server function ───────────────────────────────────────────────────────────

const fetchPost = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    const post = await getPostBySlug(slug)
    return post
  })

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const post = await fetchPost({ data: params.slug })
    if (!post) throw redirect({ to: '/blog' })
    return post
  },
  component: SinglePostPage,
})

// ── Comment types ─────────────────────────────────────────────────────────────

type CommentDoc = {
  _id: Id<'comments'>
  _creationTime: number
  postSlug: string
  authorId: Id<'users'>
  content: string
  parentId?: Id<'comments'>
  depth: number
  author: {
    _id: Id<'users'>
    name: string
    avatar?: string
  } | null
}

type CommentTree = CommentDoc & { replies: CommentTree[] }

function buildTree(flat: CommentDoc[]): CommentTree[] {
  const map = new Map<string, CommentTree>()
  const roots: CommentTree[] = []

  for (const c of flat) {
    map.set(c._id, { ...c, replies: [] })
  }
  for (const node of map.values()) {
    if (node.parentId) {
      const parent = map.get(node.parentId)
      parent ? parent.replies.push(node) : roots.push(node)
    } else {
      roots.push(node)
    }
  }
  return roots
}

function timeAgo(ms: number): string {
  const seconds = Math.floor((Date.now() - ms) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ── Page ──────────────────────────────────────────────────────────────────────

function SinglePostPage() {
  const post = Route.useLoaderData() as StrapiPost
  const heroRef = useRef<HTMLDivElement>(null)
  const commentsRef = useScrollReveal('[data-reveal]', { y: 50, stagger: 0.15, duration: 0.7 })

  useGSAP(() => {
    const img = heroRef.current?.querySelector('[data-hero-img]')
    const header = heroRef.current?.querySelector('[data-hero-header]')
    if (!img || !header) return
    gsap.set([img, header], { opacity: 0 })
    gsap.set(img, { y: -40 })
    gsap.set(header, { y: 40 })
    gsap.to(img, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
    gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 })
  }, { scope: heroRef })

  const coverUrl = post.coverImage ? strapiImageUrl(post.coverImage) : null
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
  const tags: string[] = Array.isArray(post.tags) ? post.tags : []

  return (
    <section className="py-[100px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">

        {/* Hero */}
        <div ref={heroRef} className="mb-[70px] text-center">
          {coverUrl && (
            <img data-hero-img src={coverUrl} alt={post.coverImage?.alternativeText ?? post.title} className="w-full h-auto mb-[50px]" />
          )}
          <div data-hero-header className="md:px-[60px]">
            <span className="block text-text-muted text-[15px] font-orbitron font-semibold mb-[5px] uppercase">{date}</span>
            <h1 className="text-[30px] md:text-[40px] leading-[1.2] m-0 mb-[20px] pb-[20px] text-text-main font-rajdhani relative after:content-[''] after:absolute after:w-[170px] after:h-[1px] after:bg-border-med after:bottom-0 after:left-1/2 after:-ml-[85px]">
              {post.title}
            </h1>
            {tags.length > 0 && (
              <ul className="m-0 p-0 mb-[16px]">
                {tags.map((tag, i) => (
                  <li key={i} className="inline-block mr-[3px]">
                    {i > 0 && <span className="text-text-muted text-[13px] font-orbitron mr-[6px]">/</span>}
                    <span className="text-text-muted text-[15px] font-orbitron">{tag}</span>
                  </li>
                ))}
              </ul>
            )}
            {post.authorName && (
              <p className="text-[14px] font-orbitron text-gray-500 uppercase tracking-widest">
                By {post.authorName}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="md:px-[60px] mb-[80px]">
          <article className="prose prose-invert prose-lg max-w-none font-rajdhani prose-headings:font-rajdhani prose-a:text-brand">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Back link */}
        <div className="md:px-[60px] mb-[80px]">
          <Link to="/blog" className="text-[12px] font-orbitron uppercase tracking-widest text-gray-500 hover:text-brand transition-colors flex items-center gap-2">
            <ChevronRight className="w-3 h-3 rotate-180" /> Back to blog
          </Link>
        </div>

        {/* Comments */}
        <div ref={commentsRef as React.RefObject<HTMLDivElement>} className="md:px-[60px]">
          <CommentsSection postSlug={post.slug} />
        </div>

      </div>
    </section>
  )
}

// ── Comments section ──────────────────────────────────────────────────────────

function CommentsSection({ postSlug }: { postSlug: string }) {
  const rawComments = useQuery(api.comments.listByPost, { postSlug })
  const { user } = useUser()

  if (rawComments === undefined) {
    return (
      <div className="flex justify-center py-[40px]">
        <Loader2 className="w-6 h-6 text-brand animate-spin" />
      </div>
    )
  }

  const tree = buildTree(rawComments as CommentDoc[])
  const count = rawComments.length

  return (
    <div data-reveal>
      <h2 className="text-[24px] font-rajdhani text-text-main mb-[30px] flex items-center gap-3">
        <MessageSquare className="w-5 h-5 text-brand" />
        {count === 0 ? 'No comments yet' : `${count} Comment${count !== 1 ? 's' : ''}`}
      </h2>

      {tree.length > 0 && (
        <ul className="m-0 p-0 list-none mb-[60px] space-y-[2px]">
          {tree.map((comment) => (
            <CommentNode key={comment._id} comment={comment} postSlug={postSlug} />
          ))}
        </ul>
      )}

      <div className="border-t border-border-light pt-[40px]">
        <h3 className="text-[20px] font-rajdhani text-text-main mb-[24px]">
          {user ? 'Leave a Comment' : 'Sign in to Comment'}
        </h3>
        {user
          ? <CommentForm postSlug={postSlug} />
          : (
            <Link
              to="/sign-in"
              className="inline-block bg-brand text-dark-bg px-[24px] py-[12px] rounded-[4px] font-orbitron text-[12px] uppercase tracking-widest hover:bg-text-main transition-colors"
            >
              Sign In
            </Link>
          )
        }
      </div>
    </div>
  )
}

// ── Single comment node (recursive) ──────────────────────────────────────────

function CommentNode({
  comment,
  postSlug,
}: {
  comment: CommentTree
  postSlug: string
}) {
  const [replying, setReplying] = useState(false)
  const { user } = useUser()
  const removeComment = useMutation(api.comments.remove)

  const indentClass = comment.depth === 0 ? '' :
    comment.depth === 1 ? 'ml-[40px] sm:ml-[72px]' :
    comment.depth === 2 ? 'ml-[64px] sm:ml-[120px]' :
    'ml-[80px] sm:ml-[160px]'

  return (
    <li>
      <div className={`${indentClass} mb-[6px]`}>
        <div className="flex flex-col sm:flex-row gap-[16px] py-[20px] border-b border-border-light/50">
          {/* Avatar */}
          <div className="shrink-0">
            {comment.author?.avatar ? (
              <img
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-[44px] h-[44px] rounded-full border border-border-light object-cover"
              />
            ) : (
              <div className="w-[44px] h-[44px] rounded-full border border-border-light bg-dark-bg flex items-center justify-center">
                <span className="text-brand font-orbitron text-[14px] font-bold uppercase">
                  {comment.author?.name?.[0] ?? '?'}
                </span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-[12px] gap-y-[4px] mb-[8px]">
              <span className="text-text-main font-orbitron text-[13px] font-semibold">
                {comment.author?.name ?? 'Unknown'}
              </span>
              <span className="text-gray-500 font-orbitron text-[11px] uppercase tracking-widest">
                {timeAgo(comment._creationTime)}
              </span>
              <span className="text-gray-600 font-orbitron text-[10px] uppercase tracking-widest">
                {new Date(comment._creationTime).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric',
                })}
              </span>
            </div>

            <p className="text-text-main font-rajdhani text-[17px] leading-[26px] m-0 mb-[10px] break-words">
              {comment.content}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-[16px]">
              {user && comment.depth < 3 && (
                <button
                  onClick={() => setReplying((v) => !v)}
                  className="flex items-center gap-[6px] text-[11px] font-orbitron uppercase tracking-widest text-gray-500 hover:text-brand transition-colors"
                >
                  <Reply className="w-3 h-3" />
                  {replying ? 'Cancel' : 'Reply'}
                </button>
              )}
              {user && (
                <button
                  onClick={() => removeComment({ commentId: comment._id })}
                  className="flex items-center gap-[6px] text-[11px] font-orbitron uppercase tracking-widest text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              )}
            </div>

            {/* Inline reply form */}
            {replying && (
              <div className="mt-[16px]">
                <CommentForm
                  postSlug={postSlug}
                  parentId={comment._id}
                  onSubmit={() => setReplying(false)}
                  compact
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies.length > 0 && (
        <ul className="m-0 p-0 list-none">
          {comment.replies.map((reply) => (
            <CommentNode
              key={reply._id}
              comment={reply}
              postSlug={postSlug}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

// ── Comment form ──────────────────────────────────────────────────────────────

function CommentForm({
  postSlug,
  parentId,
  onSubmit,
  compact = false,
}: {
  postSlug: string
  parentId?: Id<'comments'>
  onSubmit?: () => void
  compact?: boolean
}) {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const addComment = useMutation(api.comments.create)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    setError('')
    try {
      await addComment({ postSlug, content, parentId })
      setContent('')
      onSubmit?.()
    } catch (err: any) {
      setError(err.message ?? 'Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={compact ? 'Write a reply…' : 'Write a comment…'}
        rows={compact ? 3 : 5}
        className="w-full bg-transparent border border-border-light rounded-[4px] px-[16px] py-[12px] text-text-main font-rajdhani text-[15px] focus:border-brand focus:outline-none transition-colors resize-none placeholder:text-gray-600 mb-[12px]"
      />
      {error && (
        <p className="text-red-500 font-orbitron text-[11px] mb-[12px]">{error}</p>
      )}
      <button
        type="submit"
        disabled={submitting || !content.trim()}
        className="bg-brand text-dark-bg px-[20px] py-[10px] rounded-[4px] font-orbitron text-[12px] uppercase tracking-widest hover:bg-text-main transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {submitting && <Loader2 className="w-3 h-3 animate-spin" />}
        {compact ? 'Post Reply' : 'Post Comment'}
      </button>
    </form>
  )
}
