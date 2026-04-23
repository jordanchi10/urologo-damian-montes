import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Menu, Calendar, ArrowRight } from 'lucide-react';
import { blogArticles } from '../data/blogData';

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const articlesPerPage = 12;
  const totalPages = Math.ceil(blogArticles.length / articlesPerPage);

  // Ensure page is within valid range
  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      setSearchParams({ page: '1' });
    }
  }, [currentPage, totalPages, setSearchParams]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = blogArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="app-wrapper font-body" id="appWrapper">
      <Helmet>
        <title>Blog de Urología en Manta | Dr. Damián Montes</title>
        <meta name="description" content="Artículos educativos y consejos de salud urológica del Dr. Damián Montes en Manta, Ecuador. Información sobre prevención y tratamientos. Visita urologo.damianmontes.medico.ec" />
        <meta name="keywords" content="blog urologia manta, consejos salud urologica, dr damian montes, articulos urologia, urologia manta, urologo en manta" />
        <link rel="canonical" href={`https://urologo.damianmontes.medico.ec/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`} />
      </Helmet>
      <nav id="mainNav" className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md border-b border-[#E8DCC8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center cursor-pointer">
              <Link to="/">
                <img src="https://i.ibb.co/MyvThyG3/LOGOTIPO-Dami-n-Montes-WEBB.png" alt="Logo Dr. Damián Montes" className="h-14 w-auto" referrerPolicy="no-referrer" />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className="nav-link font-medium text-base px-5 py-2.5 rounded-lg text-[#2C1810]">
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28" style={{ background: "linear-gradient(135deg, rgba(62, 39, 35, 0.8) 0%, rgba(78, 52, 46, 0.8) 40%, rgba(93, 64, 55, 0.8) 100%), url('https://i.ibb.co/jvCrDGKV/urologooo.jpg') center/cover no-repeat" }}>
        <h2 className="sr-only">Blog de Urología en Manta</h2>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#F5F1E8]">Blog de Urología</h1>
          <p className="text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto text-[#D7CCC8]">Artículos educativos y consejos de salud urológica del Dr. Damián Montes</p>
        </div>
      </header>

      <section className="py-20 lg:py-28 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-12 text-[#6D4C41]">
            <Link to="/" className="font-semibold text-[#5D4037] hover:text-[#0B7B5A]">Inicio</Link> <span>/</span> <span>Blog</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {currentArticles.map((article) => (
              <div key={article.id} className="rounded-2xl overflow-hidden bg-white border border-[#E8DCC8] transition-all duration-400 hover:-translate-y-2 hover:shadow-xl">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-400 hover:scale-105" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block font-semibold text-xs tracking-widest uppercase px-3 py-1 rounded-full bg-[#FFF9E6] text-[#8B6F00]">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#9A8178]">{article.date}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3 leading-tight text-[#2C1810]">{article.title}</h3>
                  <p className="text-sm leading-relaxed mb-4 text-[#6D4C41]">{article.excerpt}</p>
                  <Link to={`/blog/${article.id}`} className="inline-flex items-center gap-2 font-semibold text-sm transition-all duration-300 hover:gap-3 text-[#0B7B5A]">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-16">
            {currentPage > 1 ? (
              <Link
                to={`/blog?page=${currentPage - 1}`}
                className="px-6 py-2 rounded-full bg-[#5D4037] text-white font-semibold transition-all hover:bg-[#4E342E]"
              >
                Anterior
              </Link>
            ) : (
              <span className="px-6 py-2 rounded-full bg-[#5D4037] text-white font-semibold opacity-50 cursor-not-allowed">
                Anterior
              </span>
            )}
            <span className="text-[#6D4C41] font-medium">Página {currentPage} de {totalPages}</span>
            {currentPage < totalPages ? (
              <Link
                to={`/blog?page=${currentPage + 1}`}
                className="px-6 py-2 rounded-full bg-[#5D4037] text-white font-semibold transition-all hover:bg-[#4E342E]"
              >
                Siguiente
              </Link>
            ) : (
              <span className="px-6 py-2 rounded-full bg-[#5D4037] text-white font-semibold opacity-50 cursor-not-allowed">
                Siguiente
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[#2C1810]">¿Necesitas una Consulta?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-[#6D4C41]">Agende una cita con el Dr. Damián Montes para una evaluación personalizada</p>
          <a href="https://wa.me/593986495487" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#0B7B5A] text-white">
            <Calendar className="w-5 h-5" /> Agendar Cita
          </a>
        </div>
      </section>

      <footer className="py-12 bg-[#3E2723]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <img src="https://i.ibb.co/RpsZthjJ/LOGOTIPO-Dami-n-Montes-BYN-FINAL.png" alt="Logo Dr. Damián Montes" className="h-12 w-auto" referrerPolicy="no-referrer" />
            <p className="text-sm text-[#D7CCC8]">
              © Todos los derechos reservados, Dr. Damián Montes 2026. Diseñada por <a href="https://mantaconect.com/" target="_blank" rel="noopener noreferrer" className="text-[#F5F1E8] underline hover:opacity-80">Manta Connect</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

