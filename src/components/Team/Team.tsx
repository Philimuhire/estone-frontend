import React, { useEffect, useRef, useState } from 'react';
import { fetchTeamMembers, TeamMember as ApiTeamMember } from '../../services/api';

interface TeamMember {
  id?: number;
  name: string;
  role: string;
  description: string;
  image: string;
  isCEO?: boolean;
}

// The CEO block is intentionally not driven by the API: it pairs a fixed photo and
// message with the founder's name, so it must not follow whichever record happens to
// carry the isCEO flag.
const ceo = {
  name: 'Eng. Daniel NDAGIJIMANA',
  role: 'CEO & Founder',
  image: '/images/team-leader.jpg',
};

const values = [
  {
    title: 'Excellence',
    description: 'Committed to delivering the highest quality in every project we undertake.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Collaboration',
    description: 'Building strong partnerships with clients, communities, and stakeholders.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description: 'Embracing cutting-edge technology and sustainable construction practices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

const Team: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
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

    const loadTeamMembers = async () => {
      try {
        const data = await fetchTeamMembers();
        const mappedMembers: TeamMember[] = data.map((m: ApiTeamMember) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          description: m.description,
          image: m.image,
          isCEO: m.isCEO,
        }));

        const otherMembers = mappedMembers.filter(m => !m.isCEO);

        if (active) {
          setTeamMembers(otherMembers);
        }
      } catch (error) {
        console.error('Failed to load team members');
        if (active) {
          setTeamMembers([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadTeamMembers();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="team"
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
            Our Team
          </div>

          <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto">
            Meet the passionate professionals driving innovation and excellence in civil engineering.
          </p>
        </div>

        <div
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 rounded-full p-1.5 ring-2 ring-primary-300">
                <img
                  src={ceo.image}
                  alt={`${ceo.name} - ${ceo.role}`}
                  className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full object-cover object-top shadow-xl"
                />
              </div>

              <p className="text-xl font-heading font-bold text-secondary-900">{ceo.name}</p>
              <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider mt-1">{ceo.role}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600 mb-3">
                CEO Message
              </p>

              <div className="mb-6 border-l-4 border-primary-600 pl-6">
                <p className="text-lg text-secondary-800 leading-relaxed italic">
                  "As CEO and Founder, it's a pleasure to invite you into our world. At ESTONE, we go beyond constructing buildings—we craft spaces that inspire, innovate, and endure. Every project we undertake reflects our dedication to excellence, integrity, and delivering beyond client expectations."
                </p>
              </div>

              <p className="text-secondary-600 leading-relaxed mb-6">
                For us, construction is more than assembling materials—it's about building trust, fostering collaboration, and making a meaningful impact on our communities. With meticulous attention to detail, sustainable practices, and a commitment to quality, we bring ideas to life and create environments where people can flourish.
              </p>

              <p className="text-secondary-700 font-medium mb-6">
                Join us as we reshape the construction landscape, one project at a time. Together, we can build a stronger, brighter, and more sustainable future.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/daniel-ndagijimana-126683362/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BbtUxf8hvR%2F6RzUOQuI7voA%3D%3D"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-secondary-200 text-secondary-600 hover:border-primary-300 hover:text-primary-600 transition-all duration-300 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {(loading || teamMembers.length > 0) && (
        <div
          className={`mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-secondary-900">
              Our Professional Team
            </h3>
          </div>

          {loading && (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-12" role="status" aria-label="Loading team members">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center w-full sm:w-64">
                  <div className="w-40 h-40 rounded-full bg-secondary-200 animate-pulse mb-5" />
                  <div className="h-5 w-40 bg-secondary-200 rounded animate-pulse mb-2" />
                  <div className="h-3 w-28 bg-secondary-200 rounded animate-pulse mb-4" />
                  <div className="w-full space-y-2">
                    <div className="h-3 w-full bg-secondary-200 rounded animate-pulse" />
                    <div className="h-3 w-2/3 mx-auto bg-secondary-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-12">
            {teamMembers.map((member, index) => (
              <div
                key={member.id || index}
                className="group flex flex-col items-center text-center w-full sm:w-64"
              >
                <div className="mb-5 rounded-full p-1 ring-2 ring-primary-200 group-hover:ring-primary-500 transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover object-top shadow-md"
                  />
                </div>

                <h4 className="text-lg font-heading font-bold text-secondary-900">
                  {member.name}
                </h4>
                <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
          )}
        </div>
        )}

        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg border border-secondary-100 overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
                    {value.icon}
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-secondary-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-sm text-secondary-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
