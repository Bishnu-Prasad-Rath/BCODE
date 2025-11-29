import { motion } from "framer-motion"
import Header from "./components/Header"
import InteractiveRobot from "./components/InteractiveRobot"
import { FloatingDockDemo } from "./components/FloatingDock"
import ProjectsSlider from "./components/ProjectsSlider"
import SkillsSection from "./components/SkillsSection"
import AboutSection from "./components/AboutSection";
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="min-h-screen bg-black overflow-hidden relative">

      <div className="absolute top-0 right-0 opacity-30 -z-10 animate-pulse-slow">
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-red-900 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 opacity-20 -z-10 animate-pulse-slow">
        <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-purple-900 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <section
          id="home"
          className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 pt-16 lg:pt-0"
        >
          {/* Left Text - Better mobile spacing */}
          <motion.div
            className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0 transform-gpu will-change-transform mt-8 lg:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-4 lg:mb-6 px-2 sm:px-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Hello, I'm{" "}
              <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                BISHNU
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 lg:mb-8 max-w-3xl px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Full Stack Developer passionate about creating beautiful and functional web applications
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 lg:justify-start justify-center px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-red-500/25 transform-gpu hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
              >
                View My Work
              </button>
              
              <a href="/Resume.pdf" download>
                <button className="px-6 py-3 sm:px-8 sm:py-3 border-2 border-pink-500 text-pink-400 font-medium rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 text-sm sm:text-base">
                  Download CV
                </button>
              </a>
            </motion.div>
          </motion.div>


          <motion.div
            className="lg:w-1/2 flex justify-center lg:justify-end items-center transform-gpu w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.div
              className="w-full max-w-5xl h-[200px] xs:h-[220px] sm:h-[280px] lg:h-[800px] relative scale-60 xs:scale-65 sm:scale-75 lg:scale-150"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <InteractiveRobot />
            </motion.div>
          </motion.div>
        </section>


        <section id="projects" className="min-h-screen">
          <ProjectsSlider />
        </section>
        

        <SkillsSection />


        <section id="about" className="min-h-screen">
          <AboutSection />
        </section>

        <motion.section
          id="contact"
          className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-20 bg-gray-900/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
<section id="contact" className="min-h-screen">
  <ContactSection />
</section>
        </motion.section>

        <div className="hidden md:block">
          <FloatingDockDemo />
        </div>
        <Footer />
      </div>
    </main>
  )
}