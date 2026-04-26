import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

import { useState } from 'react'
import { portfolioItems, type Project } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

function Index() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section className="py-[100px]">
      <div className="max-w-[1170px] mx-auto px-[15px]">
        {/* Title Section */}
        <div className="mb-[80px] relative">
          <span className="logo text-brand inline-block mb-[8px]">
            Welcome to the showroom
          </span>
          <p className="text-[38px] leading-[55px] m-0 text-text-main font-rajdhani">
            We work with passion and professionalism. I’m currently exploring opportunities in the AI industry, where I can apply my technical skills and creativity to solve real-world problems.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] auto-rows-[300px] md:auto-rows-[350px] grid-flow-row-dense mb-[30px]">
          {portfolioItems.map((item) => (
            <ProjectCard 
              key={item.id}
              project={item}
              onClick={setSelectedProject}
              long={item.id === 3 || item.id === 7} // Example: using ID 3 and 7 for "long" layout
              isWide={item.id === 5} // Example: making ID 5 span-2 wide
            />
          ))}
        </div>

        {/* Center Button */}
        <div className="text-center mt-[50px]">
          <button className="inline-block text-text-main text-[23px] font-rajdhani px-[20px] py-[13px] border-b-2 border-text-main hover:text-brand hover:border-brand transition-all duration-200 cursor-pointer bg-transparent">
            Load More
          </button>
        </div>
      </div>

      {/* Project Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/80 z-[100000] flex items-center justify-center p-[20px] transition-all duration-300 ${selectedProject ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setSelectedProject(null)}
      >
        <div
          className={`bg-dark-bg w-full max-w-[900px] max-h-[90vh] overflow-y-auto rounded-sm relative transition-all duration-500 transform border border-border-light ${selectedProject ? 'translate-y-0 opacity-100' : 'translate-y-[50px] opacity-0'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
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
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              <div className="w-full md:w-1/2 p-[40px] lg:p-[60px] flex flex-col justify-center">
                <span className="text-brand text-[13px] font-orbitron font-bold uppercase tracking-wider mb-[10px] block">
                  {selectedProject.category}
                </span>
                <h2 className="text-[32px] md:text-[42px] font-rajdhani text-text-main mb-[20px] leading-tight">
                  {selectedProject.title}
                </h2>
                <div className="w-[50px] h-[2px] bg-brand mb-[30px]"></div>

                <p className="text-[17px] text-text-main font-rajdhani leading-[28px] mb-[30px]">
                  {selectedProject.description}
                </p>

                <ul className="m-0 p-0 list-none space-y-[15px] border-t border-gray-200 pt-[30px]">
                  <li className="flex justify-between">
                    <span className="text-text-main font-orbitron font-bold text-[13px] uppercase">Client:</span>
                    <span className="text-gray-500 font-orbitron text-[13px]">{selectedProject.client}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-text-main font-orbitron font-bold text-[13px] uppercase">Date:</span>
                    <span className="text-gray-500 font-orbitron text-[13px]">{selectedProject.date}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-text-main font-orbitron font-bold text-[13px] uppercase">Skills:</span>
                    <span className="text-gray-500 font-orbitron text-[13px]">
                      {selectedProject.skills?.join(', ')}
                    </span>
                  </li>
                </ul>

                <div className="mt-[40px]">
                  <Link
                    to="/single-project"
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
