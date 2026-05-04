import { createFileRoute, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getProjects, strapiImageUrl, type StrapiProject } from '../lib/strapi'

const fetchProjects = createServerFn({ method: 'GET' }).handler(async () => getProjects())

export const Route = createFileRoute('/')({
  loader: async () => fetchProjects(),
  component: Index,
})

function Index() {
  const projects = Route.useLoaderData()
  const [selectedProject, setSelectedProject] = useState<StrapiProject | null>(null)

  return (
    <section className="py-[100px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        <div className="mb-[80px] relative">
          <span className="logo text-brand inline-block mb-[8px]">
            Welcome to the showroom
          </span>
          <p className="text-[38px] leading-[55px] m-0 text-text-main font-rajdhani">
            We work with passion and professionalism. I'm currently exploring opportunities in the AI industry, where I can apply my technical skills and creativity to solve real-world problems.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-[80px]">
            <p className="text-gray-500 font-orbitron text-[14px] uppercase tracking-widest">
              No projects yet.
            </p>
            <p className="text-gray-600 font-orbitron text-[12px] mt-[8px]">
              Add your first project in the Strapi admin at{' '}
              <a href="http://localhost:1337/admin" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                localhost:1337/admin
              </a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] auto-rows-[300px] md:auto-rows-[350px] grid-flow-row-dense mb-[30px]">
            {projects.map((item) => (
              <ProjectCard
                key={item.id}
                project={item}
                onClick={setSelectedProject}
                isTall={item.isTall ?? false}
                isWide={item.isWide ?? false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/80 z-[100000] flex items-center justify-center p-[20px] transition-all duration-300 ${selectedProject ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setSelectedProject(null)}
      >
        <div
          className={`bg-dark-bg w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-sm relative transition-all duration-500 transform border border-border-light ${selectedProject ? 'translate-y-0 opacity-100' : 'translate-y-[50px] opacity-0'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-[20px] right-[20px] w-[40px] h-[40px] bg-dark-bg rounded-full flex items-center justify-center shadow-md z-10 text-text-main hover:text-brand transition-colors border border-border-light"
            onClick={() => setSelectedProject(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {selectedProject && (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                {selectedProject.coverImage ? (
                  <img
                    src={strapiImageUrl(selectedProject.coverImage)}
                    alt={selectedProject.coverImage.alternativeText ?? selectedProject.title}
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                ) : (
                  <div className="w-full min-h-[300px] bg-dark-bg border-r border-border-light flex items-center justify-center">
                    <span className="text-gray-600 font-orbitron text-[11px] uppercase">No image</span>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 p-[40px] lg:p-[60px] flex flex-col justify-center">
                {selectedProject.category && (
                  <span className="text-brand text-[13px] font-orbitron font-bold uppercase tracking-wider mb-[10px] block">
                    {selectedProject.category}
                  </span>
                )}
                <h2 className="text-[32px] md:text-[42px] font-rajdhani text-text-main mb-[20px] leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="w-[50px] h-[2px] bg-brand mb-[30px]" />
                {selectedProject.description && (
                  <p className="text-[17px] text-text-main font-rajdhani leading-[28px] mb-[30px]">
                    {selectedProject.description}
                  </p>
                )}
                <ul className="m-0 p-0 list-none space-y-[15px] border-t border-gray-200 pt-[30px]">
                  {selectedProject.client && (
                    <li className="flex justify-between">
                      <span className="text-text-main font-orbitron font-bold text-[13px] uppercase">Client:</span>
                      <span className="text-gray-500 font-orbitron text-[13px]">{selectedProject.client}</span>
                    </li>
                  )}
                  {selectedProject.date && (
                    <li className="flex justify-between">
                      <span className="text-text-main font-orbitron font-bold text-[13px] uppercase">Date:</span>
                      <span className="text-gray-500 font-orbitron text-[13px]">{selectedProject.date}</span>
                    </li>
                  )}
                  {selectedProject.skills && selectedProject.skills.length > 0 && (
                    <li className="flex justify-between">
                      <span className="text-text-main font-orbitron font-bold text-[13px] uppercase">Skills:</span>
                      <span className="text-gray-500 font-orbitron text-[13px]">
                        {selectedProject.skills.join(', ')}
                      </span>
                    </li>
                  )}
                </ul>
                <div className="mt-[40px]">
                  <Link
                    to="/project/$slug"
                    params={{ slug: selectedProject.slug }}
                    onClick={() => setSelectedProject(null)}
                    className="inline-block bg-brand text-black text-[13px] font-orbitron font-bold uppercase tracking-wider px-[30px] py-[15px] rounded-sm hover:bg-text-main transition-colors"
                  >
                    View Full Project
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
