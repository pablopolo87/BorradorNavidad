import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Greeting } from './components/Greeting';
import { FeaturedEvents } from './components/FeaturedEvents';
import { Agenda } from './components/Agenda';
import { Traditions } from './components/Traditions';
import { Footer } from './components/Footer';
import { EventDetail } from './components/EventDetail';
import { Participacion } from './components/Participacion';

// Component for the main page layout
const MainPage: React.FC = () => (
  <>
    <Hero />
    <FeaturedEvents />
    <Participacion />
    <Agenda />
    <Traditions />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 selection:bg-navidad-gold selection:text-white">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/evento/:id" element={<EventDetail />} />
            <Route path="/saludo" element={<Greeting />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;