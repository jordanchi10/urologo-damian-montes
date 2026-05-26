import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { services } from '../data/servicesData'; // Need to move services to a separate file
import { ArrowLeft, Calendar } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = services.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return <div className="p-20 text-center">Servicio no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Helmet>
        <title>{service.title} en Manta | Dr. Damián Montes</title>
        <meta name="description" content={`Conoce más sobre ${service.title} ofrecido por el Dr. Damián Montes, urólogo especialista en Manta, Ecuador. Atención urológica profesional. urologo.damianmontes.medico.ec`} />
        <meta name="keywords" content={`urologia manta, ${service.title}, dr damian montes, salud urologica, urologo en manta`} />
        <link rel="canonical" href={`https://urologo.damianmontes.medico.ec/${service.id}`} />
      </Helmet>

      {/* Hero Banner Section */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img src={service.img} alt={service.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white hover:underline mb-6 font-medium">
              <ArrowLeft className="w-5 h-5" /> Volver al Inicio
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">{service.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-24 relative z-10">
        <article className="bg-[#FFFFFF] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E8DCC8]">
          
          {service.id === 'cirugias-prostata-laser' && (
            <div className="w-full max-w-sm mx-auto mb-12">
              <video 
                controls 
                playsInline
                className="w-full aspect-[9/16] rounded-2xl shadow-lg border-4 border-[#F5F1E8]"
              >
                <source src="https://urologo.damianmontes.medico.ec/media/holep_final1.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>
          )}

          {service.id === 'litotricia-laser-holmio' && (
            <div className="w-full mb-12">
              <video 
                controls 
                playsInline
                className="w-full rounded-2xl shadow-lg border-4 border-[#F5F1E8]"
              >
                <source src="https://urologo.damianmontes.medico.ec/media/cirugia_ureter_manta.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>
          )}

          {service.id === 'calculos-vias-urinarias' && (
            <div className="w-full mb-12">
              <video 
                controls 
                playsInline
                className="w-full rounded-2xl shadow-lg border-4 border-[#F5F1E8]"
              >
                <source src="https://urologo.damianmontes.medico.ec/media/cirugia_rinon_manta1.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>
          )}

          <div className="prose prose-lg prose-stone max-w-none text-[#5D4037]">
            {service.longDesc.split('\n').map((line, i) => {
              if (line === 'Causas:' || line === 'Tratamiento:') {
                return <h3 key={i} className="font-display font-bold text-3xl text-[#2C1810] mt-10 mb-4">{line}</h3>;
              }
              return <p key={i} className="leading-relaxed mb-6">{line}</p>;
            })}
          </div>
          
          <div className="mt-12 text-center">
            <a href="https://wa.me/593986495487" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-semibold px-10 py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-[#0B7B5A] text-white text-lg shadow-lg">
              <Calendar className="w-6 h-6" /> Agendar Cita
            </a>
          </div>

        </article>
      </div>

      {/* Servicios Relacionados */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h3 className="text-3xl font-display font-bold text-[#2C1810] mb-10 text-center">Servicios Relacionados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services
            .filter((s) => s.id !== service.id)
            .slice(0, 3)
            .map((rs) => (
              <Link
                key={rs.id}
                to={`/servicio/${rs.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8DCC8] hover:shadow-lg transition-all group"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src={rs.img} alt={rs.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold text-[#2C1810] mb-2 group-hover:text-[#0B7B5A] transition-colors line-clamp-1">
                    {rs.title}
                  </h4>
                  <p className="text-sm text-[#5D4037] line-clamp-2">{rs.desc}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Acciones Finales */}
      <div className="pb-24 text-center flex flex-col items-center gap-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5D4037] hover:text-[#0B7B5A] font-semibold transition-all">
          <ArrowLeft className="w-5 h-5" /> Regresar
        </Link>
      </div>
    </div>
  );
}
