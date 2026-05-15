import React from 'react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Scoring from './pages/Scoring';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import Imprint from './pages/Imprint';
import { TEAM } from './constants';

// ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    // Force instant scroll to top using window
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <MemoryRouter>
      <div className="flex flex-col min-h-screen bg-[#050a14] text-[#e5e5e5] font-sans antialiased selection:bg-white/20">
        <ScrollToTop />
        <Navigation />
        
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Scoring />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/filip" element={<Profile member={TEAM.filip} />} />
            <Route path="/johann" element={<Profile member={TEAM.johann} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/imprint" element={<Imprint />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </MemoryRouter>
  );
};

export default App;