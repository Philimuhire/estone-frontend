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
  featured: boolean;
  /** Number of extra photos beyond the main image. */
  galleryCount: number;
}

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
  featured: p.featured,
  galleryCount: p.gallery?.length ?? 0,
});

export const filterProjects = (projects: PortfolioProject[], filter: string): PortfolioProject[] =>
  filter === 'all' ? projects : projects.filter((p) => p.category === filter);

export interface PortfolioProjectsState {
  projects: PortfolioProject[];
  /** True while the first fetch is in flight, so callers can show a skeleton. */
  loading: boolean;
}

/** Projects fetched from the API. Empty while loading or if none exist. */
export const usePortfolioProjects = (): PortfolioProjectsState => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        if (active) {
          setProjects(data.map(toPortfolioProject));
        }
      } catch (error) {
        console.error('Failed to load projects');
        if (active) {
          setProjects([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      active = false;
    };
  }, []);

  return { projects, loading };
};

interface ProjectFiltersProps {
  active: string;
  onChange: (filter: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({ active, onChange }) => (
  <div className="inline-flex justify-center gap-6 sm:gap-10 border-b border-secondary-200">
    {projectFilters.map((filter) => (
      <button
        key={filter.key}
        onClick={() => onChange(filter.key)}
        className={`relative -mb-px pb-3 text-sm sm:text-base font-medium whitespace-nowrap border-b-2 transition-colors duration-300 ${
          active === filter.key
            ? 'border-primary-600 text-primary-700'
            : 'border-transparent text-secondary-500 hover:text-secondary-900'
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
  /** Sizing classes. Defaults to a 4:3 tile; grid layouts pass spans and let the row height decide. */
  className?: string;
  /** Larger title for the featured tile. */
  large?: boolean;
}

/**
 * Image-led card: the photo fills the tile and the text sits on a dark fade at the
 * bottom. On large screens the description slides up on hover; on touch screens it
 * is always shown.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, style, className = 'aspect-[4/3]', large = false }) => {
  const wrapperClass = `group relative block overflow-hidden rounded-2xl bg-secondary-200 shadow-md hover:shadow-2xl transition-shadow duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${className}`;

  const content = (
    <>
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />

      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-secondary-900 backdrop-blur-sm">
          {project.categoryLabel}
        </span>
        {project.galleryCount > 0 && (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
            +{project.galleryCount} photos
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/85 mb-1.5 drop-shadow">
          {project.location}
        </p>
        <div className="flex items-end justify-between gap-4">
          <h3
            className={`font-heading font-bold text-white leading-snug ${
              large ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            {project.title}
          </h3>
          {project.id && (
            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-primary-700 flex items-center justify-center transition-all duration-300 lg:opacity-0 lg:translate-x-2 lg:group-hover:opacity-100 lg:group-hover:translate-x-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          )}
        </div>
        <p
          className={`text-sm text-white/80 leading-relaxed line-clamp-2 mt-2 transition-all duration-500 lg:max-h-0 lg:mt-0 lg:opacity-0 lg:group-hover:max-h-12 lg:group-hover:mt-2 lg:group-hover:opacity-100 ${
            large ? 'max-w-xl' : ''
          }`}
        >
          {project.description}
        </p>
      </div>
    </>
  );

  // Fallback projects have no id, so there is nothing to navigate to.
  return project.id ? (
    <Link to={`/project/${project.id}`} className={wrapperClass} style={style} aria-label={`View project: ${project.title}`}>
      {content}
    </Link>
  ) : (
    <div className={wrapperClass} style={style}>
      {content}
    </div>
  );
};

export const EmptyProjects: React.FC<{ filter: string }> = ({ filter }) => (
  <p className="text-center text-secondary-500 mb-12">
    No {filter === 'all' ? '' : `${filter} `}projects to show yet.
  </p>
);

/** Placeholder tile shown while projects are loading, mirroring ProjectCard's shape. */
export const ProjectCardSkeleton: React.FC<{ className?: string }> = ({ className = 'aspect-[4/3]' }) => (
  <div className={`relative rounded-2xl bg-secondary-200 animate-pulse overflow-hidden ${className}`}>
    <div className="absolute bottom-0 inset-x-0 p-6 space-y-2">
      <div className="h-3 w-24 bg-secondary-300 rounded" />
      <div className="h-5 w-2/3 bg-secondary-300 rounded" />
    </div>
  </div>
);

/** A responsive grid of skeleton tiles, matching the real project grid layout. */
export const ProjectCardSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
    role="status"
    aria-label="Loading projects"
  >
    {Array.from({ length: count }).map((_, index) => (
      <ProjectCardSkeleton key={index} />
    ))}
  </div>
);
