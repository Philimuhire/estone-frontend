import React, { useEffect, useRef, useState } from 'react';
import { fetchServices, Service as ApiService } from '../../services/api';

interface ServiceItem {
  id?: number;
  title: string;
  description: string;
  features: string[];
}

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
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
    let active = true;

    const loadServices = async () => {
      try {
        const data = await fetchServices();
        const mappedServices: ServiceItem[] = [...data]
          .sort((a, b) => a.order - b.order)
          .map((s: ApiService) => ({
            id: s.id,
            title: s.title,
            description: s.description,
            features: s.features || [],
          }));

        if (active) {
          setServices(mappedServices);
        }
      } catch (error) {
        console.error('Failed to load services');
        if (active) {
          setServices([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="pt-12 lg:pt-16 pb-20 lg:pb-28 bg-canvas-alt overflow-hidden"
    >
      <div className="container-custom">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg shadow-primary-500/30">
            Our Services
          </div>

          <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto">
            From design to construction, we offer complete civil engineering services backed by expertise and cutting-edge technology.
          </p>
        </div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="status" aria-label="Loading services">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-secondary-100">
                <div className="h-5 w-3/4 bg-secondary-200 rounded animate-pulse mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 w-full bg-secondary-200 rounded animate-pulse" />
                  <div className="h-3 w-full bg-secondary-200 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-secondary-200 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-3 w-1/2 bg-secondary-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg border border-secondary-100 overflow-hidden cursor-pointer
                hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 hover:border-primary-200
                transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <h3 className="text-lg font-heading font-bold text-secondary-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-sm text-secondary-600 leading-relaxed mb-4 group-hover:text-secondary-700 transition-colors duration-300">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-secondary-500 group-hover:text-secondary-600 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default Services;
