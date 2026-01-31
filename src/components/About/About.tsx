import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-b from-white to-secondary-50 overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* About Us Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold rounded-full mb-6 shadow-lg shadow-primary-500/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About ESCOtech
          </div>

          {/* Tagline with decorative elements */}
          <div className="flex items-center justify-center gap-4 max-w-xl mx-auto">
            <p className="text-base sm:text-lg text-secondary-600 font-medium italic px-4">
              Where Your Aspirations Are Our Inspiration.
            </p>
          </div>
        </div>

        {/* Main Content - Image Left, Content Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left - Image with Decorative Elements */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Decorative background shapes */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-100 rounded-3xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary-600/10 rounded-3xl -z-10" />

            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/hero-engineering.jpg"
                alt="ESTONE Engineering Excellence"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-secondary-900">ESCOtech Ltd</p>
                      <p className="text-sm text-secondary-500">Nyarugenge - Kigali - Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats floating card */}
            <div className="absolute -right-4 top-8 bg-white rounded-2xl shadow-xl p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-900">2+</p>
                  <p className="text-xs text-secondary-500">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Who We Are Content */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              <h3 className="text-2xl lg:text-3xl font-heading font-bold text-secondary-900 mb-6 flex items-center gap-3">
                <span className="w-12 h-1 bg-primary-600 rounded-full" />
                Who We Are
              </h3>

              <div className="space-y-5 text-secondary-600 leading-relaxed text-lg">
                <p>
                  Welcome to <span className="font-semibold text-primary-700">ESCOtech</span> – where prompt, precise service defines our success.
                </p>
                <p>
                  We offer a full range of solutions, including building and infrastructure construction, structural analysis, GIS, remote sensing, interior design, and landscape architecture.
                </p>
                <p>
                  Our team provides expert project management, site supervision, and training in industry-relevant engineering software to ensure every project is executed with excellence.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  {
                    name: 'Building Construction',
                    icon: (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ),
                  },
                  {
                    name: 'Structural Analysis',
                    icon: (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                      </svg>
                    ),
                  },
                  {
                    name: 'GIS & Remote Sensing',
                    icon: (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                  },
                  {
                    name: 'Interior Design',
                    icon: (
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-secondary-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300"
                  >
                    {item.icon}
                    <span className="text-sm font-medium text-secondary-700">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Objectives Cards */}
        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Mission Card */}
          <div className="group relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl p-8 text-white shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-2 transition-all duration-500">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white/10 to-transparent" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white/30 transition-all duration-500">
                  <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold group-hover:tracking-wide transition-all duration-300">Our Mission</h3>
              </div>
              <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
                We are committed to exceeding client expectations by upholding integrity, fostering collaboration, and prioritizing sustainability. With expertise spanning construction, structural analysis, GIS, interior design, and beyond, we aim to empower clients, enrich communities, and deliver lasting value in every project.
              </p>
            </div>

            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-300 via-white to-primary-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
          </div>

          {/* Objectives Card */}
          <div className="group relative bg-white rounded-3xl p-8 shadow-xl border border-secondary-100 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-primary-200/50 hover:-translate-y-2 hover:border-primary-200 transition-all duration-500">
            {/* Background Pattern - animates on hover */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-600 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-600 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-primary-50 to-transparent" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                  <svg className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-bold text-secondary-900 group-hover:text-primary-700 group-hover:tracking-wide transition-all duration-300">Our Objectives</h3>
              </div>
              <p className="text-secondary-600 leading-relaxed group-hover:text-secondary-700 transition-colors duration-300">
                We put our clients first. By combining creativity, technology, and a commitment to sustainable practices, we bring every project to life with care and precision. Our team is always learning and growing, so we can deliver great results that meet your needs and match industry best practices.
              </p>
            </div>

            {/* Bottom border accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
          </div>
        </div>

        {/* Quote Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex items-center justify-center gap-4 max-w-xl mx-auto">
            <p className="text-base sm:text-lg text-secondary-600 font-medium italic px-4">
              Our success is to serve your needs promptly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
