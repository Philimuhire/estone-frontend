import React from 'react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  { label: 'Civil Engineering Works', href: '#services' },
  { label: 'Road Design & Construction', href: '#services' },
  { label: 'House Design & Construction', href: '#services' },
  { label: 'Engineering Software Training', href: '#services' },
  { label: 'Structural Analysis', href: '#services' },
  { label: 'GIS & Remote Sensing', href: '#services' },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg">ESCOtech Ltd</h3>
                <p className="text-xs text-primary-400">Engineering Excellence</p>
              </div>
            </div>

            <p className="text-secondary-400 text-sm leading-relaxed">
              Your trusted partner for comprehensive civil engineering solutions. Building the future with precision and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary-600 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 text-primary-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary-600 rounded-full"></span>
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-secondary-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <svg className="w-4 h-4 text-primary-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{service.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-primary-600 rounded-full"></span>
              Contact Information
            </h4>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm text-secondary-400">
                  <p>Kigali, Nyamirambo</p>
                  <p>Cosmos Area</p>
                  <p>Nyarugenge District</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-sm">
                  <a href="tel:+250781013090" className="block text-secondary-400 hover:text-primary-400 transition-colors">
                    +250 781 013 090
                  </a>
                  <a href="tel:+250787934708" className="block text-secondary-400 hover:text-primary-400 transition-colors">
                    +250 787 934 708
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary-800 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:info@escotech.rw" className="text-sm text-secondary-400 hover:text-primary-400 transition-colors">
                  info@escotech.rw
                </a>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-sm font-medium text-white mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {/* LinkedIn */}
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-secondary-800 flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  {/* Twitter/X */}
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-secondary-800 flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-secondary-800 flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="#"
                    className="w-10 h-10 rounded-lg bg-secondary-800 flex items-center justify-center text-secondary-400 hover:bg-primary-600 hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="container-custom py-6">
          <div className="relative flex items-center justify-center">
            <p className="text-sm text-secondary-400">
              &copy; {currentYear} ESCOtech Ltd. All rights reserved.
            </p>
            <a
              href="https://wa.me/250789058711"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 text-sm text-secondary-400 hover:text-primary-400 transition-colors duration-300"
            >
              Contact Developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
