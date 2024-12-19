import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Program from './pages/Program';
import Auth from './pages/Auth';
import Lesson from './pages/Lesson';
import { AuthProvider } from './contexts/AuthContext';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-black text-white flex flex-col">
    <Header />
    <Breadcrumbs />
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Hero />
            </Layout>
          } />
          <Route path="/program" element={
            <Layout>
              <Program />
            </Layout>
          } />
          <Route path="/lesson/1.1" element={
            <Layout>
              <Lesson />
            </Layout>
          } />
          <Route path="/privacy" element={
            <Layout>
              <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold">Политика конфиденциальности</h1>
              </div>
            </Layout>
          } />
          <Route path="/terms" element={
            <Layout>
              <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold">Публичная оферта</h1>
              </div>
            </Layout>
          } />
          <Route path="/auth" element={
            <Layout>
              <Auth />
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;