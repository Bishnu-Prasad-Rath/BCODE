import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`navbar fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        isScrolled ? "bg-black/90 border-pink-500/30 py-3" : "bg-transparent border-transparent py-4"
      } ${isMobile ? "bg-black/80" : ""}`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="nav-logo flex items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            BCODE
          </h1>
          <span className="ml-1 sm:ml-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse"></span>
        </div>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {["HOME", "SKILLS", "PROJECTS", "ABOUT", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`relative text-sm font-medium tracking-wider transition-all duration-300 group ${
                isScrolled ? "text-white hover:text-pink-200" : "text-white hover:text-pink-200"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.toLowerCase());
              }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}

          <button className="px-4 py-2 lg:px-6 lg:py-2 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-pink-500/25 transform hover:-translate-y-0.5 transition-all duration-300">
            Let's Talk
          </button>
        </nav>

        <button
          aria-label="Toggle menu"
          className="hamburger md:hidden flex items-center justify-center w-10 h-10 p-1 rounded-lg active:scale-95"
          onClick={toggleMobileMenu}
        >
          <span
            className={`block w-6 h-[2px] rounded-full transition-transform duration-300 bg-white transform ${
              isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`block w-6 h-[2px] rounded-full transition-all duration-300 bg-white my-1 ${
              isMobileMenuOpen ? "opacity-0 scale-90" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-[2px] rounded-full transition-transform duration-300 bg-white transform ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : "translate-y-1.5"
            }`}
          />
        </button>

        <div
          className={`fixed inset-0 z-40 md:hidden pointer-events-none ${
            isMobileMenuOpen ? "pointer-events-auto" : ""
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={toggleMobileMenu}
          />

          <aside
            style={{
              minHeight: `calc(100vh + 41rem)`,
              paddingBottom: `calc(41rem + env(safe-area-inset-bottom))`,
            }}
            className={`absolute top-0 left-0 w-64 sm:w-72 z-50 border-r border-pink-500/30 bg-black overflow-y-auto transform transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="relative p-6 border-b border-pink-500/30 pb-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  BCODE
                </h1>
                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>

              <button
                onClick={toggleMobileMenu}
                aria-label="Close menu"
                className="absolute top-5 right-6 text-white p-2 rounded-lg hover:bg-white/5 transition"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 6L18 18"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 18L18 6"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="h-full flex flex-col justify-between p-4">
              <div className="space-y-3 select-none pointer-events-auto">
                {["HOME", "SKILLS", "PROJECTS", "ABOUT", "CONTACT"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-3 text-white text-lg font-medium hover:bg-pink-500/20 rounded-lg transition-all duration-200 border border-transparent hover:border-pink-500/50"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.toLowerCase());
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="mt-8 mb-6">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300">
                  Let's Talk
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </header>
  );
};

export default Header;
