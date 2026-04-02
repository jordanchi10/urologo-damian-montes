import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar } from 'lucide-react';
import { blogArticles } from '../data/blogData';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const article = blogArticles.find((a) => a.id === parseInt(id || '0'));

  if (!article) {
    return <div className="p-20 text-center">Artículo no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-20">
      <Helmet>
        <title>{article.title} | Blog de Urología en Manta | Dr. Damián Montes</title>
        <meta name="description" content={`${article.excerpt} - Dr. Damián Montes, Urólogo en Manta, Ecuador. urologo.damianmontes.medico.ec`} />
        <meta name="keywords" content={`urologia manta, ${article.category}, dr damian montes, ${article.title.split(' ').slice(0, 3).join(', ')}, urologia en manta`} />
        <link rel="canonical" href={`https://urologo.damianmontes.medico.ec/blog/${article.id}`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#5D4037] hover:underline mb-8">
          <ArrowLeft className="w-5 h-5" /> Volver al Blog
        </Link>
        <article className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8DCC8]">
          <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-[#2C1810]">{article.title}</h1>
          <div className="flex items-center gap-2 mb-8 text-sm text-[#9A8178]">
            <span className="bg-[#FFF9E6] text-[#8B6F00] px-3 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">{article.category}</span>
            <span>{article.date}</span>
          </div>
          <div className="prose prose-lg text-[#6D4C41]" dangerouslySetInnerHTML={{ __html: article.content }} />
          <div className="mt-12 text-center">
            <a href="https://wa.me/593986495487" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#0B7B5A] text-white">
              <Calendar className="w-5 h-5" /> Agendar Cita
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}
