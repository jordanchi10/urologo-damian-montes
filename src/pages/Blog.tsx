import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Menu, Calendar, ArrowRight } from 'lucide-react';

const blogArticles = [
  { id: 1, title: "Prevención del Cáncer de Próstata", excerpt: "Descubre las medidas preventivas y factores de riesgo del cáncer de próstata. Importancia del diagnóstico temprano.", category: "Prevención", date: "15 Mar 2024", image: "https://i.ibb.co/GQmNBXR8/s5urolgiaa.jpg" },
  { id: 2, title: "Cálculos Renales: Síntomas y Tratamiento", excerpt: "Guía completa sobre cálculos renales, sus síntomas, diagnóstico y opciones de tratamiento modernas.", category: "Cálculos", date: "12 Mar 2024", image: "https://i.ibb.co/08n4xXv/s3urolgiaa.jpg" },
  { id: 3, title: "Incontinencia Urinaria en Adultos", excerpt: "Causas, tipos y tratamientos de la incontinencia urinaria. Recupera tu calidad de vida.", category: "Incontinencia", date: "10 Mar 2024", image: "https://i.ibb.co/kp86dMM/s7urolgiaa.jpg" },
  { id: 4, title: "Disfunción Eréctil: Soluciones Modernas", excerpt: "Opciones de tratamiento para la disfunción eréctil. Desde medicamentos hasta procedimientos avanzados.", category: "Sexual", date: "08 Mar 2024", image: "https://i.ibb.co/2wFtkpJ/damians13.jpg" },
  { id: 5, title: "Infecciones de Vías Urinarias", excerpt: "Causas, síntomas y prevención de las infecciones urinarias recurrentes. Cuándo consultar al especialista.", category: "Infecciones", date: "05 Mar 2024", image: "https://i.ibb.co/hxZD0Pc3/s4urolgiaa.jpg" },
  { id: 6, title: "Eyaculación Precoz: Tratamientos Efectivos", excerpt: "Técnicas y tratamientos para el control de la eyaculación precoz. Mejora tu vida sexual.", category: "Sexual", date: "02 Mar 2024", image: "https://i.ibb.co/F2wCt6R/damians12.jpg" },
  { id: 7, title: "Próstata Inflamada: BPH", excerpt: "Comprendiendo la hiperplasia prostática benigna. Síntomas y opciones de tratamiento disponibles.", category: "Próstata", date: "28 Feb 2024", image: "https://i.ibb.co/Y4DG6xtk/damians15.jpg" },
  { id: 8, title: "Varicocele y Fecundidad", excerpt: "Qué es el varicocele y su impacto en la fertilidad masculina. Tratamientos quirúrgicos disponibles.", category: "Fertilidad", date: "25 Feb 2024", image: "https://i.ibb.co/Mywp7MCC/damians11.jpg" },
  { id: 9, title: "Cirugía Láser Holmio: Ventajas", excerpt: "Tecnología láser holmio para tratamiento de cálculos y próstata. Menos invasivo, más efectivo.", category: "Tecnología", date: "22 Feb 2024", image: "https://i.ibb.co/cS6Pfm1v/damians16.jpg" },
  { id: 10, title: "Fimosis: Opciones de Tratamiento", excerpt: "Circuncisión y opciones conservadoras para la fimosis. Recuperación y cuidados postoperatorios.", category: "Cirugía", date: "20 Feb 2024", image: "https://i.ibb.co/SXfr9SYr/s8urolgiaa.jpg" },
  { id: 11, title: "Enfermedades de Transmisión Sexual", excerpt: "Prevención, diagnóstico y tratamiento de ITS. Protege tu salud urológica.", category: "Prevención", date: "18 Feb 2024", image: "https://i.ibb.co/nsPGDP4v/damians14.jpg" },
  { id: 12, title: "Litotricia: Fragmentación de Cálculos", excerpt: "Procedimiento de litotricia extracorpórea y endourológica. Alternativas a la cirugía abierta.", category: "Cálculos", date: "15 Feb 2024", image: "https://i.ibb.co/ZzCcL4SD/damians17.jpg" },
  { id: 13, title: "Quistes de Epidídimo", excerpt: "Diagnóstico y manejo de quistes epidídimos. Cuándo es necesaria la intervención quirúrgica.", category: "Diagnóstico", date: "12 Feb 2024", image: "https://i.ibb.co/0Rc4sNZt/damians10.jpg" },
  { id: 14, title: "Vasectomía: Todo lo que Debes Saber", excerpt: "Procedimiento de vasectomía. Reversibilidad, cuidados y efectividad anticonceptiva.", category: "Cirugía", date: "10 Feb 2024", image: "https://i.ibb.co/6csB4Yrs/damians18.jpg" },
  { id: 15, title: "Terapia de Testosterona", excerpt: "Síntomas de baja testosterona y opciones de tratamiento de reemplazo hormonal.", category: "Hormonal", date: "08 Feb 2024", image: "https://i.ibb.co/2wFtkpJ/damians13.jpg" },
  { id: 16, title: "Ureteroscopía Flexible", excerpt: "Técnica minimamente invasiva para el tratamiento de cálculos y obstrucciones urinarias.", category: "Tecnología", date: "05 Feb 2024", image: "https://i.ibb.co/cS6Pfm1v/damians16.jpg" },
  { id: 17, title: "Estilo de Vida y Salud Urinaria", excerpt: "Cambios en el estilo de vida para prevenir problemas urológicos. Hidratación y ejercicio.", category: "Prevención", date: "02 Feb 2024", image: "https://i.ibb.co/kp86dMM/s7urolgiaa.jpg" },
  { id: 18, title: "Diagnóstico por Imagen en Urología", excerpt: "Ecografía, TAC y resonancia magnética. Herramientas diagnósticas modernas en urología.", category: "Diagnóstico", date: "31 Jan 2024", image: "https://i.ibb.co/hxZD0Pc3/s4urolgiaa.jpg" },
  { id: 19, title: "Prostatitis: Inflamación de la Próstata", excerpt: "Tipos, síntomas y tratamiento de la prostatitis. Cómo distinguir entre bacteriana y abacteriana.", category: "Próstata", date: "28 Jan 2024", image: "https://i.ibb.co/GQmNBXR8/s5urolgiaa.jpg" },
  { id: 20, title: "Verificación de Fertilidad Masculina", excerpt: "Pruebas diagnósticas para evaluar la capacidad reproductiva masculina. Análisis de semen.", category: "Fertilidad", date: "25 Jan 2024", image: "https://i.ibb.co/6cxqrHYn/s6urolgiaa.jpg" },
  { id: 21, title: "Cáncer de Vejiga: Detección Temprana", excerpt: "Factores de riesgo, síntomas y procedimientos de cribado del cáncer vesical.", category: "Oncología", date: "22 Jan 2024", image: "https://i.ibb.co/08n4xXv/s3urolgiaa.jpg" },
  { id: 22, title: "Hematuria: Sangre en la Orina", excerpt: "Causas de hematuria visible y microscópica. Cuándo buscar atención médica.", category: "Síntomas", date: "20 Jan 2024", image: "https://i.ibb.co/hxZD0Pc3/s4urolgiaa.jpg" },
  { id: 23, title: "Salud Sexual Masculina Después de los 50", excerpt: "Cambios naturales y opciones de tratamiento. Mantén tu vitalidad sexual.", category: "Sexual", date: "18 Jan 2024", image: "https://i.ibb.co/2wFtkpJ/damians13.jpg" },
  { id: 24, title: "Nefropatía Diabética y Urología", excerpt: "Complicaciones urológicas en pacientes diabéticos. Prevención y manejo integral.", category: "Comorbilidades", date: "15 Jan 2024", image: "https://i.ibb.co/GQmNBXR8/s5urolgiaa.jpg" },
  { id: 25, title: "Recuperación Postoperatoria en Urología", excerpt: "Cuidados después de intervenciones urológicas. Tiempos de recuperación y actividades permitidas.", category: "Postoperatorio", date: "12 Jan 2024", image: "https://i.ibb.co/kp86dMM/s7urolgiaa.jpg" }
];

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 13;
  const totalPages = Math.ceil(blogArticles.length / articlesPerPage);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = blogArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="app-wrapper font-body" id="appWrapper">
      <Helmet>
        <title>Blog de Urología en Manta | Dr. Damián Montes</title>
        <meta name="description" content="Artículos educativos y consejos de salud urológica del Dr. Damián Montes en Manta, Ecuador. Información sobre prevención y tratamientos. Visita urologo.damianmontes.medico.ec" />
        <meta name="keywords" content="blog urologia manta, consejos salud urologica, dr damian montes, articulos urologia, urologia manta, urologo en manta" />
        <link rel="canonical" href="https://urologo.damianmontes.medico.ec/blog" />
      </Helmet>
      <nav id="mainNav" className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-md border-b border-[#E8DCC8] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center cursor-pointer">
              <Link to="/">
                <img src="https://i.ibb.co/MyvThyG3/LOGOTIPO-Dami-n-Montes-WEBB.png" alt="Logo Dr. Damián Montes" className="h-14 w-auto" />
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
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-400 hover:scale-105" />
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
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 rounded-full bg-[#5D4037] text-white font-semibold disabled:opacity-50 transition-all hover:bg-[#4E342E]"
            >
              Anterior
            </button>
            <span className="text-[#6D4C41] font-medium">Página {currentPage} de {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 rounded-full bg-[#5D4037] text-white font-semibold disabled:opacity-50 transition-all hover:bg-[#4E342E]"
            >
              Siguiente
            </button>
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
            <img src="https://i.ibb.co/RpsZthjJ/LOGOTIPO-Dami-n-Montes-BYN-FINAL.png" alt="Logo Dr. Damián Montes" className="h-12 w-auto" />
            <p className="text-sm text-[#D7CCC8]">
              © Todos los derechos reservados, Dr. Damián Montes 2026. Diseñada por <a href="https://mantaconect.com/" target="_blank" rel="noopener noreferrer" className="text-[#F5F1E8] underline hover:opacity-80">Manta Connect</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

