import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, Project as ApiProject } from '../../services/api';

interface Project {
  id?: number;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  location: string;
  image: string;
}

const fallbackProjects: Project[] = [
  {
    title: 'Modern Residential Complex',
    category: 'residential',
    categoryLabel: 'Residential',
    description: 'Contemporary multi-story residential building with modern architectural elements and sustainable design features.',
    location: 'Kigali, Rwanda',
    image: '/images/hero-engineering.jpg',
  },
  {
    title: 'Commercial Office Complex',
    category: 'commercial',
    categoryLabel: 'Commercial',
    description: 'Multi-story commercial building with brick facade and glass elements, designed for optimal workspace functionality.',
    location: 'Kigali, Rwanda',
    image: '/images/project-commercial-building-2.jpg',
  },
];

const Work: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        const mappedProjects: Project[] = data.map((p: ApiProject) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          categoryLabel: p.category.charAt(0).toUpperCase() + p.category.slice(1),
          description: p.description,
          location: p.location,
          image: p.image,
        }));
        if (mappedProjects.length > 0) {
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error('Failed to load projects, using fallback data');
      }
    };

    loadProjects();
  }, []);

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'residential', label: 'Residential' },
    { key: 'commercial', label: 'Commercial' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg shadow-primary-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Our Portfolio
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto mb-10">
            Explore our portfolio of successfully completed construction and design projects that showcase our expertise and commitment to excellence.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id || index}
              to={project.id ? `/project/${project.id}` : '#'}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-secondary-100 cursor-pointer hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 hover:border-primary-200 transition-all duration-500"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${
                    project.category === 'residential'
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary-600/20 rotate-45 translate-x-12 -translate-y-12 group-hover:bg-primary-600/40 transition-colors duration-500" />
                </div>
              </div>

              {/* Content Below Image */}
              <div className="p-5">
                {/* Location */}
                <div className="flex items-center gap-2 text-secondary-500 text-sm mb-2">
                  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{project.location}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-heading font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-secondary-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* View Project Link */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 md:p-12 overflow-hidden transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Let us bring your vision to life with our proven expertise in construction and design. Contact us today to discuss your next project.
              </p>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Right - Features */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ), label: 'Design Excellence' },
                { icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ), label: 'Quality Construction' },
                { icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), label: 'Timely Delivery' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <span className="text-white text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
