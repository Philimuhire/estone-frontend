import React, { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Our Work', href: '/#work' },
  { label: 'Our Team', href: '/#team' },
];

interface HeaderProps {
  forceSolid?: boolean;
}

const Header: React.FC<HeaderProps> = ({ forceSolid = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Use solid style if forced or scrolled
  const isSolid = forceSolid || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    setActiveSection(href.replace('/#', ''));
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a href="/#home" className="flex items-center gap-3 group">
            <img
              src="/images/company-logo.png"
              alt="ESTONE Design & Construction"
              className="h-12 w-auto rounded-lg pb-1 transition-all duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className={`font-semibold text-base leading-tight transition-colors duration-300 ${
                isSolid ? 'text-primary-800' : 'text-white'
              }`}>
                ESCOtech Ltd
              </span>
              <span className={`text-xs font-medium transition-colors duration-300 ${
                isSolid ? 'text-secondary-500' : 'text-white/80'
              }`}>
                Engineering Excellence
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isSolid
                    ? activeSection === item.href.replace('/#', '')
                      ? 'text-primary-600'
                      : 'text-secondary-700 hover:text-primary-600'
                    : activeSection === item.href.replace('/#', '')
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all duration-300 ${
                    activeSection === item.href.replace('/#', '')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <a
              href="/#contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                isSolid
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
                  : 'bg-white text-primary-600 hover:bg-primary-50 shadow-lg'
              }`}
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isSolid
                ? 'text-secondary-700 hover:bg-secondary-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className={`rounded-2xl p-4 ${
            isSolid ? 'bg-secondary-50' : 'bg-white/10 backdrop-blur-md'
          }`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
                  isSolid
                    ? activeSection === item.href.replace('/#', '')
                      ? 'bg-primary-100 text-primary-600'
                      : 'text-secondary-700 hover:bg-secondary-100'
                    : activeSection === item.href.replace('/#', '')
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="block mt-3 py-3 px-4 text-center rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
