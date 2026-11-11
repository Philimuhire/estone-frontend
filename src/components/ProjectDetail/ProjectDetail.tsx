import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProject, fetchProjects, Project } from '../../services/api';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProjectMedia from './ProjectMedia';
import { ProjectCard, toPortfolioProject } from '../Work/portfolio';
import { usePageMeta } from '../usePageMeta';

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [neighbours, setNeighbours] = useState<{ previous?: Project; next?: Project }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  usePageMeta({
    title: project ? `${project.title}, ${project.location}` : 'Project',
    description: project?.description,
    path: `/project/${id ?? ''}`,
    image: project?.image,
  });

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      setIsLoading(true);
      setError('');

      try {
        const projectData = await fetchProject(parseInt(id));
        setProject(projectData);

        const allProjects = await fetchProjects();
        const related = allProjects
          .filter((p) => p.category === projectData.category && p.id !== projectData.id)
          .slice(0, 3);
        setRelatedProjects(related);

        // Previous/next wrap around so every project has both links.
        const index = allProjects.findIndex((p) => p.id === projectData.id);
        if (index !== -1 && allProjects.length > 1) {
          const count = allProjects.length;
          setNeighbours({
            previous: allProjects[(index - 1 + count) % count],
            next: allProjects[(index + 1) % count],
          });
        } else {
          setNeighbours({});
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header forceSolid />
        <main className="pt-28 md:pt-32 pb-16 md:pb-20" role="status" aria-label="Loading project">
          <div className="container-custom">
            <div className="mb-8 md:mb-10">
              <div className="h-7 w-24 bg-secondary-200 rounded-full animate-pulse mb-4" />
              <div className="h-9 w-3/4 max-w-2xl bg-secondary-200 rounded animate-pulse mb-3" />
              <div className="h-4 w-40 bg-secondary-200 rounded animate-pulse" />
            </div>

            <div className="grid lg:grid-cols-2 gap-3 lg:gap-4">
              <div className="aspect-[4/3] bg-secondary-200 rounded-2xl animate-pulse" />
              <div className="flex flex-col gap-8 lg:pl-6 pt-4 lg:pt-0">
                <div className="space-y-3">
                  <div className="h-3 w-32 bg-secondary-200 rounded animate-pulse" />
                  <div className="h-6 w-56 bg-secondary-200 rounded animate-pulse" />
                  <div className="h-3 w-full bg-secondary-200 rounded animate-pulse" />
                  <div className="h-3 w-full bg-secondary-200 rounded animate-pulse" />
                  <div className="h-3 w-5/6 bg-secondary-200 rounded animate-pulse" />
                </div>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-secondary-100 space-y-4">
                  <div className="h-5 w-40 bg-secondary-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-secondary-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-secondary-200 rounded animate-pulse" />
                  <div className="h-11 w-full bg-secondary-200 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen">
        <Header forceSolid />
        <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">Error</p>
          <h1 className="text-3xl font-heading font-bold text-secondary-900 mb-4">Project Not Found</h1>
          <p className="text-secondary-600 mb-8 max-w-md">
            {error || 'The project you are looking for does not exist.'}
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors duration-300"
          >
            Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryLabel = capitalize(project.category);
  const gallery = project.gallery || [];
  const details = [
    { label: 'Category', value: categoryLabel },
    { label: 'Location', value: project.location },
  ];

  const overview = (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
        Project Overview
      </p>
      <h2 className="text-xl md:text-2xl font-heading font-bold text-secondary-900 mb-4">
        About this project
      </h2>
      <p className="text-secondary-600 leading-relaxed whitespace-pre-line">
        {project.description}
      </p>
    </div>
  );

  const detailsCard = (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-secondary-100">
      <h3 className="text-lg font-heading font-bold text-secondary-900 mb-5">Project Details</h3>

      <dl className="divide-y divide-secondary-100">
        {details.map((detail) => (
          <div key={detail.label} className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0">
            <dt className="text-xs font-semibold uppercase tracking-wider text-secondary-500">
              {detail.label}
            </dt>
            <dd className="font-medium text-secondary-900 text-right">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <Link
        to="/#contact"
        className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-full shadow-md shadow-primary-500/30 hover:bg-primary-700 transition-colors duration-300"
      >
        Start Your Project
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header forceSolid />

      <main className="pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="container-custom">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-secondary-500 hover:text-primary-600 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All projects
          </Link>

          <div className="mb-8 md:mb-10">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 mb-4">
              {categoryLabel}
            </span>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-secondary-900 leading-tight max-w-4xl mb-2">
              {project.title}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              {project.location}
            </p>
          </div>

          {/* With gallery photos the right half holds them and the text follows below;
              without, the overview and details sit beside the main photo instead. */}
          <ProjectMedia
            image={project.image}
            gallery={gallery}
            title={project.title}
            fallback={
              <div className="flex flex-col gap-8 lg:pl-6 pt-4 lg:pt-0">
                {overview}
                {detailsCard}
              </div>
            }
          />

          {gallery.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 mt-12 md:mt-16">
              <div className="lg:col-span-2">{overview}</div>
              <aside>{detailsCard}</aside>
            </div>
          )}

          {(neighbours.previous || neighbours.next) && (
            <nav
              aria-label="More projects"
              className="grid grid-cols-2 gap-4 mt-12 md:mt-16 pt-8 border-t border-secondary-200"
            >
              {neighbours.previous ? (
                <Link to={`/project/${neighbours.previous.id}`} className="group flex flex-col items-start min-w-0">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary-500 group-hover:text-primary-600 transition-colors duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Previous project
                  </span>
                  <span className="mt-1 w-full truncate font-heading font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300 md:text-lg">
                    {neighbours.previous.title}
                  </span>
                </Link>
              ) : <span />}
              {neighbours.next && (
                <Link to={`/project/${neighbours.next.id}`} className="group flex flex-col items-end text-right min-w-0">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-secondary-500 group-hover:text-primary-600 transition-colors duration-300">
                    Next project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="mt-1 w-full truncate font-heading font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300 md:text-lg">
                    {neighbours.next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </div>
      </main>

      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-20 bg-canvas-alt">
          <div className="container-custom">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-2">
                  Related Projects
                </p>
                <h2 className="text-xl md:text-2xl font-heading font-bold text-secondary-900">
                  More {categoryLabel} Work
                </h2>
              </div>
              <Link
                to={`/projects?category=${project.category}`}
                className="inline-flex items-center px-6 py-2.5 bg-white text-primary-700 font-semibold rounded-full border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition-colors duration-300"
              >
                View All Projects
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((related) => (
                <ProjectCard key={related.id} project={toPortfolioProject(related)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProjectDetail;
