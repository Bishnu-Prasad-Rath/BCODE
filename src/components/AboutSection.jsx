import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useCallback } from 'react';

const AboutSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Optimized resize handler with standard debounce
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    checkMobile();
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [checkMobile]);

  // Consolidated Intersection Observers to reduce main-thread calculations
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: isMobile ? 0.05 : 0.15,
    rootMargin: "50px 0px"
  });

  const skills = [
    { name: "React", level: 90, color: "from-cyan-500 to-blue-500" },
    { name: "JavaScript", level: 85, color: "from-yellow-400 to-orange-500" },
    { name: "Node.js", level: 80, color: "from-green-500 to-emerald-500" },
    { name: "Tailwind CSS", level: 88, color: "from-teal-400 to-cyan-500" },
    { name: "Express", level: 75, color: "from-yellow-400 to-yellow-600" },
  ];

  const stats = [
    { number: "2+", label: "Years of Learning Journey" },
    { number: "15+", label: "Minor Projects Completed" },
    { number: "10+", label: "AI Tools Knowledge" },
    { number: "5+", label: "Technologies" },
  ];

  // Simplified variants for mobile performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.15, // Disable heavy staggering on mobile
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const progressBarAnimation = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: isMobile ? 0.8 : 1.2,
        ease: "easeOut",
        delay: isMobile ? 0.1 : 0.3
      }
    })
  };

  return (
    <section id="about" className="min-h-screen py-12 md:py-20 bg-black relative overflow-hidden">
      {/* Background elements conditionally rendered to save VRAM on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-1/4 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
          />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={sectionRef}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="w-full"
        >
          {/* Header */}
          <div className="text-center mb-12 md:mb-20">
            <motion.h2 variants={itemVariants} className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
              About <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Me</span>
            </motion.h2>
            <motion.div variants={itemVariants} className="w-20 md:w-24 h-1 bg-gradient-to-r from-red-500 to-pink-600 mx-auto mb-6 md:mb-8" />
            <motion.p variants={itemVariants} className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Passionate Full Stack Developer crafting digital experiences that make a difference
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Story & Journey Section */}
            <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
              <h3 className="text-2xl md:text-4xl font-bold text-white px-4 md:px-0">
                My <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
              </h3>
              
              {/* Grouped paragraphs into one animated container to reduce DOM composite layers */}
              <div className="space-y-4 md:space-y-6 text-gray-300 text-base md:text-lg leading-relaxed px-4 md:px-0">
                <p>
                  Hello! I'm <span className="text-pink-400 font-semibold">Bishnu</span>, a passionate Full Stack Developer 
                  with a love for creating beautiful and functional web applications. My journey in web development 
                  started from B.Tech 1st year, and since then I've been constantly learning and evolving.
                </p>
                <p>
                  I specialize in modern technologies like <span className="text-red-400 font-medium">React</span>, <span className="text-blue-400 font-medium">Node.js</span>, 
                  and <span className="text-cyan-400 font-medium">Tailwind CSS</span>. I believe in writing clean, efficient code 
                  and creating user experiences that are both visually appealing and highly functional.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                  or working on personal projects that challenge my skills and creativity.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={!isMobile ? { scale: 1.03, y: -2 } : {}}
                    className="text-center p-4 md:p-6 bg-gray-900/40 rounded-xl md:rounded-2xl border border-gray-800"
                  >
                    <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="space-y-8 md:space-y-10 px-4 md:px-0">
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Skills</span>
                </h3>
                <p className="text-gray-400 text-base md:text-lg">
                  Technologies I work with to bring ideas to life
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2 md:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium text-base md:text-lg">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 text-xs md:text-sm font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-800 rounded-full h-2 md:h-3 overflow-hidden transform-gpu">
                      <motion.div
                        custom={skill.level}
                        variants={progressBarAnimation}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Resume Download */}
              <div className="text-center mt-12 md:mt-16">
                <motion.a
                  href="/Bishnu_Resume.pdf"
                  download="Bishnu_Resume.pdf"
                  whileHover={!isMobile ? { scale: 1.05, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.2)" } : {}}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl md:rounded-2xl text-base md:text-lg relative overflow-hidden group inline-block"
                >
                  <span className="relative z-10">Download Resume</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
                
                <p className="text-gray-400 text-base md:text-lg mt-4 md:mt-6">
                  Let's build something amazing together!
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;