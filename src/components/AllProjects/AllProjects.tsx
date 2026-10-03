import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {
  EmptyProjects,
  ProjectCard,
  ProjectFilters,
  filterProjects,
  isProjectFilter,
  usePortfolioProjects,
} from '../Work/portfolio';

const PROJECTS_PER_PAGE = 9;

const AllProjects: React.FC = () => {
  const projects = usePortfolioProjects();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter and page live in the URL so the home page can link straight to a
  // filtered view and the back button returns to the same page of results.
  const categoryParam = searchParams.get('category');
  const activeFilter = isProjectFilter(categoryParam) ? categoryParam : 'all';
  const filteredProjects = filterProjects(projects, activeFilter);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const requestedPage = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = Number.isNaN(requestedPage) ? 1 : Math.min(Math.max(requestedPage, 1), totalPages);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const updateParams = (filter: string, page: number) => {
    const params: Record<string, string> = {};
    if (filter !== 'all') params.category = filter;
    if (page > 1) params.page = String(page);
    setSearchParams(params);
  };

  const goToPage = (page: number) => {
    updateParams(activeFilter, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Header forceSolid />

      <main className="pt-32 pb-20 lg:pb-28">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-secondary-900 mb-4">
              Our Projects
            </h1>
            <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto mb-10">
              Every construction and design project we have completed, from family homes to commercial buildings.
            </p>

            <ProjectFilters active={activeFilter} onChange={(filter) => updateParams(filter, 1)} />
          </div>

          {filteredProjects.length === 0 ? (
            <EmptyProjects filter={activeFilter} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {paginatedProjects.map((project, index) => (
                <ProjectCard key={project.id ?? `fallback-${index}`} project={project} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-secondary-200 text-secondary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-secondary-600 disabled:hover:border-secondary-200 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-white border border-secondary-200 text-secondary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-white border border-secondary-200 text-secondary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-secondary-600 disabled:hover:border-secondary-200 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllProjects;
