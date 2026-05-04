import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { strapiImageUrl, type StrapiProject } from '../lib/strapi'

interface ProjectCardProps {
  project: StrapiProject
  onClick: (project: StrapiProject) => void
  isTall?: boolean
  isWide?: boolean
  long?: boolean
  showCategory?: boolean
}

export default function ProjectCard({
  project,
  onClick,
  isTall,
  isWide,
  long,
  showCategory = true,
}: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const categoryRef = useRef<HTMLSpanElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const accent1Ref = useRef<HTMLDivElement>(null)
  const accent2Ref = useRef<HTMLDivElement>(null)

  const tl = useRef<gsap.core.Timeline | null>(null)

  const tall = isTall !== undefined ? isTall : (project.isTall ?? false)
  const wide = isWide !== undefined ? isWide : (project.isWide ?? false)
  const spanClass = `${tall ? 'row-span-2' : 'row-span-1'} ${wide ? 'col-span-2' : 'col-span-1'}`

  const imgUrl = project.coverImage ? strapiImageUrl(project.coverImage) : null

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true, reversed: true })
      .to(imageRef.current, { scale: 1.15, rotation: 2, duration: 0.6, ease: 'power2.out' }, 0)
      .to(overlayRef.current, { opacity: 1, inset: 0, duration: 0.4, ease: 'power3.out' }, 0)
      .to(titleRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, 0.1)
      .to(lineRef.current, { width: '60px', duration: 0.4, ease: 'power2.out' }, 0.15)
      .to(categoryRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.2)
      .to(descRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.25)
      .to([accent1Ref.current, accent2Ref.current], { opacity: 0.6, duration: 0.6 }, 0.3)
  }, { scope: containerRef })

  const { contextSafe } = useGSAP({ scope: containerRef })
  const onMouseEnter = contextSafe(() => tl.current?.play())
  const onMouseLeave = contextSafe(() => tl.current?.reverse())

  return (
    <div
      ref={containerRef}
      onClick={() => onClick(project)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative group overflow-hidden cursor-pointer ${spanClass} ${long ? 'min-h-[400px]' : ''} bg-black`}
    >
      {imgUrl ? (
        <img
          ref={imageRef}
          src={imgUrl}
          alt={project.coverImage?.alternativeText ?? project.title}
          className="w-full h-full object-cover block will-change-transform"
        />
      ) : (
        <div ref={imageRef as React.RefObject<HTMLDivElement>} className="w-full h-full bg-dark-bg flex items-center justify-center will-change-transform">
          <span className="text-gray-600 font-orbitron text-[11px] uppercase tracking-widest">No image</span>
        </div>
      )}

      <div
        ref={overlayRef}
        className="absolute inset-[20px] z-10 opacity-0 bg-black/90 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center p-6 flex flex-col items-center">
          <h2
            ref={titleRef}
            className="text-[24px] font-rajdhani font-bold text-brand uppercase tracking-wider mb-2 opacity-0 translate-y-[30px]"
          >
            {project.title}
          </h2>

          <div ref={lineRef} className="w-0 h-[2px] bg-brand mb-4" />

          {showCategory && project.category && (
            <span
              ref={categoryRef}
              className="text-text-main text-[11px] font-orbitron font-bold uppercase tracking-[0.3em] opacity-0 translate-y-[30px]"
            >
              {project.category}
            </span>
          )}

          {long && project.description && (
            <p
              ref={descRef}
              className="mt-6 text-text-muted text-[14px] font-rajdhani line-clamp-3 opacity-0 translate-y-[30px] max-w-[80%]"
            >
              {project.description}
            </p>
          )}

          <div ref={accent1Ref} className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-brand opacity-0" />
          <div ref={accent2Ref} className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-brand opacity-0" />
        </div>
      </div>
    </div>
  )
}
