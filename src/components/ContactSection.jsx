import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 🌟 Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      "service_v05a5x6",
      "template_rkf7a98",
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      },
      "b9lVZFsRmhcexI7UR"
    )
    .then(() => {
      setToast({
        show: true,
        message: "Message sent successfully!",
        type: "success",
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);

      setFormData({ name: "", email: "", message: "" });
    })
    .catch(() => {
      setToast({
        show: true,
        message: "Failed to send message. Please try again.",
        type: "error",
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 
          1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: 'Email',
      value: 'rbishnu604@gmail.com',
      link: 'mailto:rbishnu604@gmail.com'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" className="text-pink-400">
          <path d="M22 16.92v3a2 2 0 0 
          1-2.18 2 19.79 19.79 0 0 
          1-8.63-3.07 19.5 19.5 0 0 
          1-6-6 19.79 19.79 0 0 
          1-3.07-8.67A2 2 0 0 
          1 4.11 2h3a2 2 0 0 
          1 2 1.72 12.84 12.84 0 0 
          0 .7 2.81 2 2 0 0 
          1-.45 2.11L8.09 9.91a16 
          16 0 0 0 6 6l1.27-1.27a2 
          2 0 0 1 2.11-.45 12.84 
          12.84 0 0 0 2.81.7A2 
          2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: 'Phone',
      value: '+91 9937010597',
      link: 'tel:+91 9937010597'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
          <path d="M21 10c0 7-9 
          13-9 13s-9-6-9-13a9 9 0 0 
          1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: 'Location',
      value: 'Bhubaneswar, SOA, ITER',
      link: '#'
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" fill="currentColor"
          className="text-gray-400 group-hover:text-white transition-colors duration-300">
          <path d="M12 0C5.373 0 
          0 5.373 0 12c0 5.302 
          3.438 9.799 8.207 
          11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
          1.205.084 1.839 1.237 1.839 1.237 1.07 
          1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 
          0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 
          0 0 1.008-.322 3.301 
          1.23.957-.266 1.983-.399 
          3.003-.404 1.02.005 
          2.047.138 3.006.404 
          2.291-1.552 3.297-1.23 
          3.297-1.23.653 1.653.242 
          2.874.118 3.176.77.84 
          1.235 1.911 1.235 
          3.221 0 4.609-2.807 
          5.624-5.479 5.921.43.372.823 
          1.102.823 2.222v3.293c0 
          .319.192.694.801.576C20.562 
          21.799 24 17.302 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: "https://github.com/Bishnu-Prasad-Rath",
      color: "hover:bg-gray-800"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400 group-hover:text-white transition-colors duration-300">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: "https://www.linkedin.com/in/bishnu55707x-dev/",
      color: "hover:bg-blue-600"
    },
    {
      name: "WhatsApp",
      icon: (
<svg xmlns="http://www.w3.org2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-500 group-hover:text-white transition-colors duration-300">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.549-8.482"/>
        </svg>
      ),
      url: "https://wa.me/919937010597",
      color: "hover:bg-green-600"
    },
    {
      name: "Instagram",
      icon: (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500 group-hover:text-white transition-colors duration-300">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: "https://www.instagram.com/bishnuratha2321/",
      color: "hover:bg-pink-600"
    }
  ];

  return (
    <section id="contact" className="min-h-screen py-20 bg-black relative overflow-hidden">

{toast.show && (
  <div
    className={`
      fixed top-6 right-6 px-5 py-4 rounded-2xl
      text-white font-medium z-[9999]
      border border-pink-500/30
      bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-2xl
      shadow-2xl shadow-pink-500/20
      animate-fade-in-up
      transform transition-all duration-300
      hover:scale-[1.02] hover:shadow-pink-500/30
      before:content-[''] before:absolute before:inset-0 
      before:rounded-2xl before:bg-gradient-to-r before:from-pink-500/10 before:to-transparent
      before:border-b before:border-pink-500/20
    `}
  >
    <span className="text-pink-300 bg-gradient-to-r from-pink-300 to-pink-200 bg-clip-text text-transparent">
      {toast.message}
    </span>
  
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700/50 rounded-b-2xl overflow-hidden">
      <div className="h-full bg-gradient-to-r from-pink-400 to-pink-600 animate-progress" />
    </div>
  </div>
)}

      <div className="absolute top-10 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. I'm always open to discussing new projects and opportunities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-2">
              Send Me a <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Message</span>
            </h3>
            <p className="text-gray-400 mb-6">Feel free to reach out for collaborations or just say hello!</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Your Message</label>
                <textarea
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Contact <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Info</span>
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="flex items-center p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-pink-500/30 hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{info.title}</div>
                      <div className="text-gray-400 group-hover:text-pink-400 transition-colors duration-300">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Follow Me On</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={`flex flex-col items-center justify-center p-4 bg-gray-900/50 rounded-xl border border-gray-700 ${social.color} transition-all duration-300 group`}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                    <div className="text-white text-sm font-medium">{social.name}</div>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="p-6 bg-gradient-to-r from-red-500/10 to-pink-600/10 rounded-xl border border-pink-500/20"
            >
              <div className="text-white font-semibold mb-2">💡 Quick Response</div>
              <div className="text-gray-400 text-sm">
                I typically respond within 24 hours. Let's start a conversation about your next project!
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
