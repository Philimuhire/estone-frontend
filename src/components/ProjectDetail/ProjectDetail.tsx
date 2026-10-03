import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProject, fetchProjects, Project } from '../../services/api';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProjectGallery from './ProjectGallery';
import { ProjectCard, toPortfolioProject } from '../Work/portfolio';

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
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
  const details = [
    { label: 'Category', value: categoryLabel },
    { label: 'Location', value: project.location },
    {
      label: 'Completed',
      value: new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    },
  ];

  return (
    <div className="min-h-screen">
      <Header forceSolid />

      <section className="relative h-[60vh] md:h-[75vh] min-h-[420px] mt-20">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14">
          <div className="container-custom">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 text-primary-700 shadow-md mb-4">
              {categoryLabel}
            </span>
            <h1 className="text-2xl md:text-4xl lg:text-[2.75rem] font-heading font-bold text-white leading-tight max-w-4xl mb-3">
              {project.title}
            </h1>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-200">
              {project.location}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
                Project Overview
              </p>
              <h2 className="text-xl md:text-2xl font-heading font-bold text-secondary-900 mb-4">
                About this project
              </h2>
              <p className="text-secondary-600 leading-relaxed whitespace-pre-line mb-10">
                {project.description}
              </p>

              <ProjectGallery images={project.gallery || []} title={project.title} />
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-secondary-100 lg:sticky lg:top-28">
                <div className="flex items-center justify-between gap-3 mb-6">
                  <h3 className="text-lg font-heading font-bold text-secondary-900">Project Details</h3>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700">
                      Featured
                    </span>
                  )}
                </div>

                <dl className="divide-y divide-secondary-100">
                  {details.map((detail) => (
                    <div key={detail.label} className="py-4 first:pt-0">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-1">
                        {detail.label}
                      </dt>
                      <dd className="font-medium text-secondary-900">{detail.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 pt-6 border-t border-secondary-100">
                  <p className="text-sm text-secondary-600 leading-relaxed mb-4">
                    Planning something similar? Let's talk about your project.
                  </p>
                  <Link
                    to="/#contact"
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-full shadow-md shadow-primary-500/30 hover:bg-primary-700 transition-colors duration-300"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
