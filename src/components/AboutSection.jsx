import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection = () => {
  // Multiple intersection observers for better scroll-triggered animations
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [storyRef, storyInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [skillsRef, skillsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
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

  // Animation variants for reusable animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const progressBarAnimation = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  return (
    <section id="about" className="min-h-screen py-20 bg-black relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 right-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-1/4 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section with Enhanced Animation */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            About <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-600 mx-auto mb-8"
          />
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate Full Stack Developer crafting digital experiences that make a difference
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Story with Staggered Animations */}
          <motion.div
            ref={storyRef}
            initial="hidden"
            animate={storyInView ? "visible" : "hidden"}
            variants={slideInLeft}
            className="space-y-8"
          >
            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              My <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
            </motion.h3>
            
            <motion.div
              variants={containerVariants}
              className="space-y-6 text-gray-300 text-lg leading-relaxed"
            >
              <motion.p variants={itemVariants}>
                Hello! I'm <span className="text-pink-400 font-semibold">Bishnu</span>, a passionate Full Stack Developer 
                with a love for creating beautiful and functional web applications. My journey in web development 
                started from B.Tech 1st year, and since then I've been constantly learning and evolving.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                I specialize in modern technologies like <span className="text-red-400 font-medium">React</span>, <span className="text-blue-400 font-medium">Node.js</span>, 
                and <span className="text-cyan-400 font-medium">Tailwind CSS</span>. I believe in writing clean, efficient code 
                and creating user experiences that are both visually appealing and highly functional.
              </motion.p>
              
              <motion.p variants={itemVariants}>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or working on personal projects that challenge my skills and creativity.
              </motion.p>
            </motion.div>

            {/* Stats Grid with Enhanced Animations */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  custom={index}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-700 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={storyInView ? { scale: 1 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      delay: 0.8 + index * 0.2 
                    }}
                    className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={storyInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="text-gray-400 text-sm mt-2"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Skills with Enhanced Progress Animations */}
          <motion.div
            ref={skillsRef}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            variants={slideInRight}
            className="space-y-10"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                My <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Skills</span>
              </h3>
              <p className="text-gray-400 text-lg">
                Technologies I work with to bring ideas to life
              </p>
            </motion.div>

            {/* Skills with Enhanced Progress Bars */}
            <motion.div
              variants={containerVariants}
              className="space-y-8"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  custom={index}
                  className="space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <motion.span 
                      initial={{ opacity: 0, x: -20 }}
                      animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-white font-medium text-lg"
                    >
                      {skill.name}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={skillsInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-gray-400 text-sm font-mono"
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      custom={skill.level}
                      variants={progressBarAnimation}
                      initial="hidden"
                      animate={skillsInView ? "visible" : "hidden"}
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color} shadow-lg group-hover:shadow-xl group-hover:brightness-110 transition-all duration-300`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 1.5,
                type: "spring",
                stiffness: 100
              }}
              className="text-center mt-16"
            >
             <motion.a
  href="./Resume.pdf"
  download="Bishnu_Prasad_Rath_Resume.pdf"
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)"
  }}
  whileTap={{ scale: 0.95 }}
  className="px-10 py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300 text-lg relative overflow-hidden group inline-block"
>
  <span className="relative z-10">Download Resume</span>
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  />
</motion.a>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={skillsInView ? { opacity: 1 } : {}}
                transition={{ delay: 2 }}
                className="text-gray-400 text-lg mt-6"
              >
                Let's build something amazing together!
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;