import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects, Project as ApiProject } from '../../services/api';

/**
 * Shared by the home page portfolio section and the full /projects page so both
 * load, filter and render projects the same way.
 */

export interface PortfolioProject {
  id?: number;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  location: string;
  image: string;
}

const fallbackProjects: PortfolioProject[] = [
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

export const projectFilters = [
  { key: 'all', label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
];

export const isProjectFilter = (value: string | null): value is string =>
  projectFilters.some((filter) => filter.key === value);

export const toPortfolioProject = (p: ApiProject): PortfolioProject => ({
  id: p.id,
  title: p.title,
  category: p.category,
  categoryLabel: p.category.charAt(0).toUpperCase() + p.category.slice(1),
  description: p.description,
  location: p.location,
  image: p.image,
});

export const filterProjects = (projects: PortfolioProject[], filter: string): PortfolioProject[] =>
  filter === 'all' ? projects : projects.filter((p) => p.category === filter);

/** Projects from the API, or the built-in examples if the API is empty or unreachable. */
export const usePortfolioProjects = (): PortfolioProject[] => {
  const [projects, setProjects] = useState<PortfolioProject[]>(fallbackProjects);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        const mappedProjects = data.map(toPortfolioProject);
        if (mappedProjects.length > 0) {
          setProjects(mappedProjects);
        }
      } catch (error) {
        console.error('Failed to load projects, using fallback data');
      }
    };

    loadProjects();
  }, []);

  return projects;
};

interface ProjectFiltersProps {
  active: string;
  onChange: (filter: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({ active, onChange }) => (
  <div className="inline-flex justify-center gap-1 p-1.5 bg-white rounded-full border border-secondary-200 shadow-sm">
    {projectFilters.map((filter) => (
      <button
        key={filter.key}
        onClick={() => onChange(filter.key)}
        className={`px-3 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap transition-colors duration-300 ${
          active === filter.key
            ? 'bg-primary-600 text-white shadow-md shadow-primary-500/30'
            : 'text-secondary-600 hover:text-primary-700 hover:bg-primary-50'
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);

interface ProjectCardProps {
  project: PortfolioProject;
  style?: React.CSSProperties;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, style }) => {
  const className = `group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-secondary-100 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 hover:border-primary-200 transition-all duration-500${
    project.id ? ' cursor-pointer' : ''
  }`;

  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-primary-700 shadow-md">
            {project.categoryLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-2">
          {project.location}
        </p>

        <h3 className="text-xl font-heading font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-secondary-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {project.id && (
          <div className="mt-auto pt-4 border-t border-secondary-100">
            <span className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
              View Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </>
  );

  // Fallback projects have no id, so there is nothing to navigate to.
  return project.id ? (
    <Link to={`/project/${project.id}`} className={className} style={style}>
      {content}
    </Link>
  ) : (
    <div className={className} style={style}>
      {content}
    </div>
  );
};

export const EmptyProjects: React.FC<{ filter: string }> = ({ filter }) => (
  <p className="text-center text-secondary-500 mb-12">
    No {filter === 'all' ? '' : `${filter} `}projects to show yet.
  </p>
);
