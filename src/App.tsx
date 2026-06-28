import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ServiceDetail from './pages/ServiceDetail';
import CalculadoraIpss from './pages/CalculadoraIpss';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/calculadora-ipss" element={<CalculadoraIpss />} />
        <Route path="/:id" element={<ServiceDetail />} />
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}
