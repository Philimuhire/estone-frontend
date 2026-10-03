import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Hero, About, Services, Work, Team, Contact, Footer } from './components';
import { ProjectDetail } from './components/ProjectDetail';
import AllProjects from './components/AllProjects';
import ScrollToHash from './components/ScrollToHash';
import AdminRoutes from './admin';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
