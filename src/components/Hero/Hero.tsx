import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../../services/api';

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const loadProjectCount = async () => {
      try {
        const projects = await fetchProjects();
        setProjectCount(projects.length);
      } catch {
        setProjectCount(0);
      }
    };

    loadProjectCount();
  }, []);

  const stats: StatItem[] = [
    { value: String(projectCount), suffix: '+', label: 'Projects Completed' },
    { value: '3', suffix: '+', label: 'Satisfied Clients' },
    { value: '2', suffix: '+', label: 'Years Experience' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/project-commercial-building-2.jpg')`,
        }}
      />

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      <div className="w-full relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              ESTONE{' '}
              <span className="text-primary-200">Design</span> And{' '}
              <span className="relative">
              <span className="text-primary-200">Construction</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                >
                  <path
                    d="M1 5.5C47.6667 2.16667 141 -2.4 199 5.5"
                    stroke="#93c5fd"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              Where prompt, precise service defines our success. We offer a full
              range of solutions, including building and infrastructure
              construction, structural analysis, GIS, remote sensing, interior
              design, and landscape architecture.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#services"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Explore Our Services
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Get in Touch
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-700 hover:bg-white/15 hover:scale-105 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-1">
                    {stat.value}
                    <span className="text-primary-300">{stat.suffix}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
