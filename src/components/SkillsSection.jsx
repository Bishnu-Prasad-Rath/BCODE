import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiExpress,
  SiTailwindcss,
  SiFigma,
} from "react-icons/si";
import { FaPaintBrush } from "react-icons/fa";

const SkillsSection = () => {
  const skills = [
    { name: "HTML5", icon: <SiHtml5 className="w-12 h-12" />, color: "text-orange-500" },
    { name: "CSS3", icon: <SiCss3 className="w-12 h-12" />, color: "text-blue-500" },
    { name: "JavaScript", icon: <SiJavascript className="w-12 h-12" />, color: "text-yellow-400" },
    { name: "React", icon: <SiReact className="w-12 h-12" />, color: "text-cyan-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-12 h-12" />, color: "text-cyan-500" },
    { name: "Node.js", icon: <SiNodedotjs className="w-12 h-12" />, color: "text-green-500" },
    { name: "Express.js", icon: <SiExpress className="w-12 h-12" />, color: "text-gray-400" },
    { name: "Figma", icon: <SiFigma className="w-12 h-12" />, color: "text-purple-500" },
    { name: "Spline", icon: <FaPaintBrush className="w-12 h-12" />, color: "text-blue-400" },
    { name: "Canvas", icon: <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">C</div>, color: "text-white" },
  ];

  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <section id="skills" className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Enhanced Background glow effects */}
      <div className="absolute top-0 right-0 opacity-30 -z-10 animate-pulse-slow">
        <div className="w-[500px] h-[500px] bg-red-900 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 opacity-25 -z-10 animate-pulse-slow">
        <div className="w-[400px] h-[400px] bg-purple-900 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-15 -z-10">
        <div className="w-[600px] h-[600px] bg-pink-900 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Tech <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Stack</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Sliding Logo Marquee */}
        <div className="relative">
          {/* Enhanced Gradient Overlays */}
          <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-10"></div>
          
          {/* Marquee Container */}
          <div 
            ref={containerRef}
            className="overflow-hidden py-8"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            <motion.div
              className="flex gap-12"
              animate={{ 
                x: isPlaying ? ["0%", "-50%"] : "0%"
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                }
              }}
            >
              {duplicatedSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  whileHover={{ 
                    scale: 1.1,
                    y: -5
                  }}
                  className="flex-shrink-0 group cursor-pointer relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-600/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                  
                  <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 w-32 h-32 flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:border-pink-500/80 group-hover:shadow-2xl group-hover:shadow-pink-500/40 relative z-10">
                    <div className={`${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <span className="text-white font-medium text-sm group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Additional Static Skills Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Core <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Competencies</span>
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1 
                }}
                className="group relative"
              >
                {/* Glow Effect for Static Cards */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-pink-600/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                
                <div className="bg-gray-900/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6 text-center group-hover:border-pink-500/80 group-hover:shadow-2xl group-hover:shadow-pink-500/40 transition-all duration-300 relative z-10">
                  <div className={`${skill.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <h4 className="text-white font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {skill.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Always learning, always building</p>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-2xl hover:shadow-pink-500/50 transform hover:-translate-y-1 transition-all duration-300 relative group"
          >
            <span className="relative z-10">See My Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;