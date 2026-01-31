import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Hero, About, Services, Work, Team, Contact, Footer } from './components';
import { ProjectDetail } from './components/ProjectDetail';
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
