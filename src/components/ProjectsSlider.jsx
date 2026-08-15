import { memo, useEffect, useState, useCallback } from "react";

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  expanded,
  isMobile,
  onCardClick,
  onCardEnter,
  onCardLeave
}) {
  return (
    <div
      className={`project-card relative rounded-2xl overflow-hidden cursor-pointer transform-gpu will-change-[flex,height,transform] transition-all duration-300 ease-out
        ${isMobile ? "w-full max-w-sm" : expanded ? "w-[500px]" : "w-24"}
        ${
          expanded
            ? "scale-[1.02] -translate-y-1 shadow-2xl shadow-pink-500/30 z-10 border-2 border-pink-500/40"
            : "opacity-80 hover:opacity-100 z-0 border-2 border-purple-500/30 hover:border-pink-500/50"
        }`}
      style={{
        height: isMobile ? (expanded ? "380px" : "80px") : "350px",
        flex: isMobile ? "0 0 auto" : `0 0 ${expanded ? "500px" : "96px"}`,
        scrollSnapAlign: "start",
        backfaceVisibility: "hidden", // Prevents repaints during animation
        WebkitFontSmoothing: "subpixel-antialiased"
      }}
      onClick={() => onCardClick(index)}
      onMouseEnter={() => onCardEnter(index)}
      onMouseLeave={onCardLeave}
    >
      {/* Background Gradients - Simplified for performance */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} transform-gpu transition-opacity duration-300 ${
          expanded ? "opacity-100" : "opacity-70"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black transform-gpu transition-opacity duration-300 ${
            expanded ? "opacity-40" : "opacity-60"
          }`}
        ></div>
      </div>

      <div className="absolute inset-0 p-6 lg:p-8">
        {/* Collapsed State (Desktop) */}
        {!isMobile && !expanded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="transform rotate-180 writing-mode-vertical">
              <h3 className="text-lg font-bold tracking-wide text-center text-transparent bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text will-change-transform">
                {project.title}
              </h3>
            </div>
          </div>
        )}

        {/* Collapsed State (Mobile) */}
        {isMobile && !expanded && (
          <div className="absolute inset-0 flex items-center justify-start px-4 pointer-events-none">
            <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text will-change-transform">
              {project.title}
            </h3>
          </div>
        )}

        {/* Expanded State */}
        {expanded && (
          <div
            className={`absolute inset-0 flex ${
              isMobile ? "flex-col" : "flex-row"
            } items-center justify-center gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 transform-gpu transition-opacity duration-300 opacity-100`}
          >
            {/* Project Thumbnail Box */}
            <div
              className={`flex justify-center ${
                isMobile ? "w-full mb-4" : "flex-1"
              }`}
            >
              <div
                className={`bg-gradient-to-br from-gray-800 to-black rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-2 border-pink-500/20 transform-gpu ${
                  isMobile ? "w-32 h-40" : "w-48 h-60"
                }`}
              >
                <div className="p-4 text-center text-white">
                  <div
                    className={`bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3 transform-gpu ${
                      isMobile ? "w-12 h-12" : "w-14 h-14"
                    }`}
                  >
                    <span className={isMobile ? "text-lg" : "text-xl"}>
                      {project.thumb}
                    </span>
                  </div>
                  <p className="text-xs font-medium">Project Preview</p>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div
              className={`text-center lg:text-left ${
                isMobile ? "w-full" : "flex-1"
              }`}
            >
              <h3
                className={`font-bold text-white mb-4 lg:mb-6 leading-tight bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent transform-gpu ${
                  isMobile ? "text-xl" : "text-3xl"
                }`}
              >
                {project.title}
              </h3>

              <div
                className={`flex flex-wrap gap-2 mb-6 lg:mb-8 justify-center lg:justify-start ${
                  isMobile ? "gap-1 mb-4" : ""
                }`}
              >
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`bg-gray-800/50 text-gray-200 rounded-full border border-gray-600/50 transform-gpu ${
                      isMobile ? "px-2 py-1 text-xs" : "px-3 py-2 text-sm"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                className={`flex gap-3 justify-center lg:justify-start ${
                  isMobile ? "gap-2 mt-2" : ""
                }`}
              >
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-pink-500/30 transform hover:-translate-y-1 transition-transform duration-200 ${
                    isMobile ? "px-4 py-2 text-sm" : "px-6 py-2 text-sm"
                  }`}
                >
                  Live Demo
                </a>

                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`border border-gray-500 text-white font-medium rounded-full hover:bg-white/10 hover:border-white transition-colors duration-200 ${
                    isMobile ? "px-4 py-2 text-sm" : "px-6 py-2 text-sm"
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
});

export default function ProjectsSlider() {
  const [activeProject, setActiveProject] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const projects = [
    {
      title: "MegaBlog.IO",
      technologies: ["React", "TailwindCSS", "Appwrite", "TinyMCE"],
      liveLink: "https://megablog-appwrite-react.vercel.app/",
      githubLink: "https://github.com/Bishnu-Prasad-Rath/React-from-begginers-to-advance-level/tree/main/12MegaBlog",
      bgColor: "from-red-500/20 to-pink-600/20",
      thumb: "🚀"
    },
    {
      title: "2D Shooting Game",
      technologies: ["HTML", "CSS", "JavaScript", "Canvas"],
      liveLink: "https://shooting-game-gules.vercel.app/",
      githubLink: "https://github.com/Bishnu-Prasad-Rath/Canvas-Game/tree/main/Game-1",
      bgColor: "from-green-500/20 to-teal-600/20",
      thumb: "🎮"
    },
    {
      title: "YT_NEO",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "BullMQ", "Cloudinary"],
      liveLink: "https://you-tube-theta-ten.vercel.app/",
      githubLink: "https://github.com/Bishnu-Prasad-Rath/YouTube",
      bgColor: "from-purple-500/20 to-indigo-600/20",
      thumb: "📺"
    }
  ];

  // Debounced resize listener
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);
    checkMobile();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoized Handlers to prevent ProjectCard re-renders
  const handleCardClick = useCallback((index) => {
    setActiveProject(index);
    if (isMobile) {
      setHoveredProject(index);
    } else {
      setHoveredProject((prev) => (prev === index ? null : index));
    }
  }, [isMobile]);

  const handleCardEnter = useCallback((index) => {
    if (!isMobile) setHoveredProject(index);
  }, [isMobile]);

  const handleCardLeave = useCallback(() => {
    if (!isMobile) setHoveredProject(null);
  }, [isMobile]);

  const isExpanded = useCallback(
    (index) => index === hoveredProject || (isMobile && index === activeProject),
    [hoveredProject, activeProject, isMobile]
  );

  return (
    <section id="projects" className="min-h-screen py-12 bg-black sm:py-16 lg:py-20">
      <div className="px-4 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:pb-12">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end sm:gap-6">
          <div className="w-full lg:w-auto">
            <h2 className="mb-3 text-2xl font-bold text-center text-white sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4 lg:text-left">
              Featured{" "}
              <span className="text-transparent bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text">
                Projects
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-base text-center text-gray-300 sm:text-lg lg:text-xl lg:text-left lg:mx-0">
              Here are some of my recent works that showcase my skills and creativity
            </p>
          </div>

          <div className="flex justify-center w-full gap-2 controls sm:gap-3 lg:w-auto lg:justify-end">
            <button
              onClick={() => {
                const next = Math.max(activeProject - 1, 0);
                setActiveProject(next);
                setHoveredProject(next);
              }}
              disabled={activeProject === 0}
              className="flex items-center justify-center w-10 h-10 text-lg text-white transition-colors duration-200 border border-gray-600 rounded-full nav-btn sm:w-12 sm:h-12 bg-gray-800 hover:bg-pink-600 disabled:opacity-30 disabled:cursor-not-allowed sm:text-xl"
              aria-label="Previous Project"
            >
              ‹
            </button>

            <button
              onClick={() => {
                const next = Math.min(activeProject + 1, projects.length - 1);
                setActiveProject(next);
                setHoveredProject(next);
              }}
              disabled={activeProject === projects.length - 1}
              className="flex items-center justify-center w-10 h-10 text-lg text-white transition-colors duration-200 border border-gray-600 rounded-full nav-btn sm:w-12 sm:h-12 bg-gray-800 hover:bg-pink-600 disabled:opacity-30 disabled:cursor-not-allowed sm:text-xl"
              aria-label="Next Project"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          className={`track flex ${
            isMobile
              ? "flex-col gap-4 overflow-y-auto scroll-smooth items-center max-h-[80vh] pb-4"
              : "flex-row gap-6 overflow-x-auto scroll-smooth items-start pb-8"
          } scrollbar-hide`}
          style={{ 
            scrollSnapType: isMobile ? "y mandatory" : "x mandatory",
            WebkitOverflowScrolling: "touch" // Smoother scrolling on iOS
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              expanded={isExpanded(index)}
              isMobile={isMobile}
              onCardClick={handleCardClick}
              onCardEnter={handleCardEnter}
              onCardLeave={handleCardLeave}
            />
          ))}
        </div>
      </div>

      {/* Dots (Desktop Only) */}
      {!isMobile && (
        <div className="flex justify-center gap-3 mt-8 dots">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveProject(index);
                setHoveredProject(index);
              }}
              aria-label={`Go to project ${index + 1}`}
              className={`dot w-3 h-3 rounded-full transition-transform duration-300 ${
                index === (hoveredProject ?? activeProject)
                  ? "bg-gradient-to-r from-red-500 to-pink-600 scale-125"
                  : "bg-gray-600 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}