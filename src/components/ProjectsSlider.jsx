import { useState, useEffect, useRef } from 'react';

const ProjectsSlider = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef(null);

  const projects = [
    {
      title: "MegaBlog.IO",
      technologies: ["React", "TailwindCSS", "Appwrite", "TinyMCE"],
      liveLink: "https://react-from-begginers-to-advance-lev.vercel.app",
      githubLink: "https://github.com/Bishnu-Prasad-Rath/React-from-begginers-to-advance-level/tree/main/12MegaBlog",
      bgColor: "from-red-500/20 to-pink-600/20",
      thumb: "🚀"
    },
    {
      title: "2d shooting game",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas"],
      liveLink: "https://canvas-game-phi.vercel.app",
      githubLink: "https://github.com/Bishnu-Prasad-Rath/Canvas-Game/tree/main/Game-1",
      bgColor: "from-green-500/20 to-teal-600/20",
      thumb: "💼"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextProject = () => {
    setActiveProject(prev => {
      const next = Math.min(prev + 1, projects.length - 1);
      setHoveredProject(next);
      return next;
    });
  };

  const prevProject = () => {
    setActiveProject(prev => {
      const next = Math.max(prev - 1, 0);
      setHoveredProject(next);
      return next;
    });
  };

  const isExpanded = (index) => {
    return index === hoveredProject || (isMobile && index === activeProject);
  };

  const handleMouseEnter = (index) => {
    if (!isMobile) setHoveredProject(index);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setHoveredProject(null);
  };

  const getActiveDotIndex = () => {
    return hoveredProject !== null ? hoveredProject : activeProject;
  };

  return (
    <section className="min-h-screen py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6">
          <div className="w-full lg:w-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-center lg:text-left">
              Featured <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              Here are some of my recent works that showcase my skills and creativity
            </p>
          </div>
          
          <div className="controls flex gap-2 sm:gap-3 w-full lg:w-auto justify-center lg:justify-end">
            <button 
              onClick={prevProject}
              disabled={activeProject === 0}
              className="nav-btn w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 hover:bg-pink-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 rounded-full flex items-center justify-center text-white text-lg sm:text-xl backdrop-blur-sm border border-gray-600"
            >
              ‹
            </button>
            <button 
              onClick={nextProject}
              disabled={activeProject === projects.length - 1}
              className="nav-btn w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/80 hover:bg-pink-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 rounded-full flex items-center justify-center text-white text-lg sm:text-xl backdrop-blur-sm border border-gray-600"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={trackRef}
          className={`track flex ${
            isMobile 
              ? 'flex-col gap-4 overflow-y-auto scroll-smooth items-center max-h-[80vh] pb-4' 
              : 'flex-row gap-6 overflow-x-auto scroll-smooth items-start pb-8'
          } scrollbar-hide`}
          style={{ scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory' }}
        >
          {projects.map((project, index) => {
            const expanded = isExpanded(index);

            return (
              <div
                key={index}
                className={`project-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out ${
                  isMobile 
                    ? 'w-full max-w-sm' 
                    : expanded ? 'w-[500px]' : 'w-24'
                } ${
                  expanded 
                    ? 'scale-102 -translate-y-0 shadow-2xl shadow-pink-500/30 z-10 border-2 border-pink-500/40'
                    : 'opacity-80 hover:opacity-100 z-0 border-2 border-purple-500/30 hover:border-pink-500/50'
                }`}
                style={{ 
                  height: isMobile ? (expanded ? '380px' : '80px') : '350px',
                  flex: isMobile ? '0 0 auto' : `0 0 ${expanded ? '500px' : '96px'}`,
                  scrollSnapAlign: 'start'
                }}
                onClick={() => {
                  if (isMobile) {
                    setActiveProject(index);
                    setHoveredProject(index);
                  } else {
                    setActiveProject(index);
                    setHoveredProject(hoveredProject === index ? null : index);
                  }
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} transition-all duration-300 ${
                  expanded ? 'opacity-100' : 'opacity-70'
                }`}>
                  <div className={`absolute inset-0 bg-black transition-all duration-300 ${
                  expanded ? 'opacity-40' : 'opacity-60'
                  }`}></div>
                </div>
                
                <div className="absolute inset-0 p-6 lg:p-8">
                  {!isMobile && !expanded && (
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                      <div className="writing-mode-vertical transform rotate-180">
                        <h3 className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-bold text-lg text-center tracking-wide">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {isMobile && !expanded && (
                    <div className="absolute inset-0 flex items-center justify-start px-4 transition-all duration-300">
                      <h3 className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent font-bold text-lg">
                        {project.title}
                      </h3>
                    </div>
                  )}

                  {expanded && (
                    <div className={`absolute inset-0 flex ${
                      isMobile ? 'flex-col' : 'flex-row'
                    } items-center justify-center gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 transition-all duration-300`}>
                      
                      <div className={`flex justify-center ${isMobile ? 'w-full mb-4' : 'flex-1'}`}>
                        <div className={`bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-2 border-pink-500/20 ${
                          isMobile ? 'w-32 h-40' : 'w-48 h-60'
                        }`}>
                          <div className="text-white text-center p-4">
                            <div className={`bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 ${
                              isMobile ? 'w-12 h-12' : 'w-14 h-14'
                            }`}>
                              <span className={isMobile ? 'text-lg' : 'text-xl'}>{project.thumb}</span>
                            </div>
                            <p className="text-xs font-medium">Project Preview</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`text-center lg:text-left ${isMobile ? 'w-full' : 'flex-1'}`}>
                        <h3 className={`font-bold text-white mb-4 lg:mb-6 leading-tight bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent ${
                          isMobile ? 'text-xl' : 'text-3xl'
                        }`}>
                          {project.title}
                        </h3>
                        
                        <div className={`flex flex-wrap gap-2 mb-6 lg:mb-8 justify-center lg:justify-start ${
                          isMobile ? 'gap-1 mb-4' : ''
                        }`}>
                          {project.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className={`bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 ${
                                isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-2 text-sm'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        {/* FIXED BUTTONS — OPEN LINKS CORRECTLY */}
                        <div className={`flex gap-3 justify-center lg:justify-start ${
                          isMobile ? 'gap-2 mt-2' : ''
                        }`}>
                          <a 
                            href={project.liveLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 transition-all duration-300 ${
                              isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-2 text-sm'
                            }`}
                          >
                            Live Demo
                          </a>

                          <a 
                            href={project.githubLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`border border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 ${
                              isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-2 text-sm'
                            }`}
                          >
                            View Code
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!isMobile && (
        <div className="dots flex justify-center gap-3 mt-8">
          {projects.map((_, index) => {
            const activeDotIndex = getActiveDotIndex();
            return (
              <button
                key={index}
                onClick={() => {
                  setActiveProject(index);
                  setHoveredProject(index);
                }}
                className={`dot w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeDotIndex
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProjectsSlider;
