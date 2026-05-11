import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { services } from '../data/servicesData'; // Need to move services to a separate file
import { ArrowLeft, Calendar } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return <div className="p-20 text-center">Servicio no encontrado.</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-20">
      <Helmet>
        <title>{service.title} en Manta | Dr. Damián Montes</title>
        <meta name="description" content={`Conoce más sobre ${service.title} ofrecido por el Dr. Damián Montes, urólogo especialista en Manta, Ecuador. Atención urológica profesional. urologo.damianmontes.medico.ec`} />
        <meta name="keywords" content={`urologia manta, ${service.title}, dr damian montes, salud urologica, urologo en manta`} />
        <link rel="canonical" href={`https://urologo.damianmontes.medico.ec/${service.id}`} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-[#5D4037] hover:underline mb-8">
          <ArrowLeft className="w-5 h-5" /> Volver al Inicio
        </Link>
        <article className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8DCC8]">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-[#2C1810]">{service.title}</h1>
          <h2 className="sr-only">{service.title} - Especialista en Urología en Manta</h2>
          <h2 className="sr-only">Servicios de Urología en Manta</h2>
          <img src={service.img} alt={service.title} className="w-full h-64 md:h-96 object-cover rounded-xl mb-8" referrerPolicy="no-referrer" />
          
          {service.id === 'cirugias-prostata-laser' && (
            <div className="w-full max-w-sm mx-auto mb-8">
              <video 
                controls 
                playsInline
                className="w-full aspect-[9/16] rounded-xl shadow-lg"
              >
                <source src="https://urologo.damianmontes.medico.ec/media/holep_final1.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>
          )}

          {service.id === 'litotricia-laser-holmio' && (
            <div className="w-full mb-8">
              <video 
                controls 
                playsInline
                className="w-full rounded-xl shadow-lg"
              >
                <source src="https://urologo.damianmontes.medico.ec/media/cirugia_ureter_manta.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>
          )}

          {service.id === 'calculos-vias-urinarias' && (
            <div className="w-full mb-8">
              <video 
                controls 
                playsInline
                className="w-full rounded-xl shadow-lg"
              >
                <source src="https://urologo.damianmontes.medico.ec/media/cirugia_rinon_manta1.mp4" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </div>
          )}

          <div className="text-lg text-[#6D4C41] mb-8 space-y-4">
            {service.longDesc.split('\n').map((line, i) => {
              if (line === 'Causas:' || line === 'Tratamiento:') {
                return <h3 key={i} className="font-bold text-2xl text-[#2C1810] mt-6 mb-2">{line}</h3>;
              }
              return <p key={i}>{line}</p>;
            })}
          </div>
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
