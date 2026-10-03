import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EmptyProjects,
  ProjectCard,
  ProjectFilters,
  filterProjects,
  usePortfolioProjects,
} from './portfolio';

/** The home page shows a preview; the rest live on /projects. */
const HOME_PROJECT_LIMIT = 6;

const Work: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const projects = usePortfolioProjects();
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

  const filteredProjects = filterProjects(projects, activeFilter);
  const previewProjects = filteredProjects.slice(0, HOME_PROJECT_LIMIT);
  const allProjectsLink = activeFilter === 'all' ? '/projects' : `/projects?category=${activeFilter}`;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="pt-12 lg:pt-16 pb-20 lg:pb-28 bg-canvas overflow-hidden"
    >
      <div className="container-custom">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg shadow-primary-500/30">
            Our Portfolio
          </div>

          <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto mb-10">
            Explore our portfolio of successfully completed construction and design projects that showcase our expertise and commitment to excellence.
          </p>

          <ProjectFilters active={activeFilter} onChange={setActiveFilter} />
        </div>

        {filteredProjects.length === 0 ? (
          <EmptyProjects filter={activeFilter} />
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {previewProjects.map((project, index) => (
              <ProjectCard
                key={project.id ?? `fallback-${index}`}
                project={project}
                style={{ transitionDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mb-16">
          <Link
            to={allProjectsLink}
            className="inline-flex items-center px-8 py-3 bg-white text-primary-700 font-semibold rounded-full border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-300"
          >
            View All Projects
          </Link>
        </div>

        <div
          className={`relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 md:p-12 overflow-hidden transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Let us bring your vision to life with our proven expertise in construction and design. Contact us today to discuss your next project.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                Start Your Project
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['Design Excellence', 'Quality Construction', 'Timely Delivery'].map((label) => (
                <div
                  key={label}
                  className="flex items-center justify-center text-center px-3 py-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 transition-colors duration-300"
                >
                  <span className="text-white text-sm sm:text-base font-semibold leading-snug">{label}</span>
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
