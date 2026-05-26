import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar } from 'lucide-react';
import { blogArticles } from '../data/blogData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return <div className="p-20 text-center">Artículo no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-20">
      <Helmet>
        <title>{article.title} | Blog del Urólogo en Manta | Dr. Damián Montes</title>
        <meta name="description" content={`Descubre información experta sobre ${article.title} con el Dr. Damián Montes. Urólogo certificado en Manta, Ecuador, brindando atención integral y urología avanzada.`} />
        <meta name="keywords" content={`urologia en manta, cirujano urólogo, urologo damian montes, salud masculina, ${article.category}, ${article.title.toLowerCase()}, urologia ecuador`} />
        <link rel="canonical" href={`https://urologo.damianmontes.medico.ec/blog/${article.slug}`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#5D4037] hover:underline mb-8">
          <ArrowLeft className="w-5 h-5" /> Volver al Blog
        </Link>
        <article className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8DCC8]">
          <img src={article.image} alt={article.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" referrerPolicy="no-referrer" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-[#2C1810]">{article.title}</h1>
          <div className="flex items-center gap-2 mb-8 text-sm text-[#9A8178]">
            <span className="bg-[#FFF9E6] text-[#8B6F00] px-3 py-1 rounded-full uppercase tracking-widest text-xs font-semibold">{article.category}</span>
            <span>{article.date}</span>
          </div>
          <div className="blog-content text-[#6D4C41]" dangerouslySetInnerHTML={{ __html: article.content }} />
          <div className="mt-12 text-center">
            <a href="https://wa.me/593986495487" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#0B7B5A] text-white">
              <Calendar className="w-5 h-5" /> Agendar Cita
            </a>
          </div>
        </article>

        {/* Related Articles for SEO Internal Linking */}
        <div className="mt-16 mb-8">
          <h3 className="font-display text-2xl font-bold mb-6 text-[#2C1810]">Más artículos de interés</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogArticles
              .filter(a => a.slug !== article.slug)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map(related => (
                <Link key={related.id} to={`/blog/${related.slug}`} className="bg-white rounded-xl overflow-hidden border border-[#E8DCC8] hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden">
                    <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-[#8B6F00] uppercase tracking-wider mb-2 block">{related.category}</span>
                    <h4 className="font-display font-bold text-[#2C1810] leading-tight group-hover:text-[#0B7B5A] transition-colors">{related.title}</h4>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
