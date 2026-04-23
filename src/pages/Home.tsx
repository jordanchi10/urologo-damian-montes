import React, { useState, useEffect, useRef } from 'react';
import { Menu, Calendar, Droplets, HeartPulse, ShieldAlert, CheckCircle, Instagram, Music, Facebook, Star, User, Award, Microscope, HeartHandshake, MapPin, Phone, Clock, MessageCircle, ImageIcon, Home as HomeIcon, BriefcaseMedical, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { services } from '../data/servicesData';

const reviews = [
  { name: 'Carlos M.', type: 'Consulta Urología', text: '"Excelente atención del Dr. Damián Montes. Es un profesional muy dedicado y comprensivo. La operación fue un éxito total. Recomiendo ampliamente sus servicios."' },
  { name: 'Roberto L.', type: 'Cirugía Láser', text: '"Dr. Damián muy profesional desde la primera consulta. Me explicó todo claramente y realizó la intervención de manera impecable. ¡Muy recomendable!"' },
  { name: 'Juan P.', type: 'Cálculos Renales', text: '"Muy satisfecho con la atención recibida. Dr. Damián es excelente profesional, muy atento y dedicado. Mi operación fue exitosa y recuperación rápida."' },
  { name: 'Miguel R.', type: 'Próstata', text: '"Definitivamente recomiendo al Dr. Damián Montes. Su experiencia y profesionalismo son evidentes. Mi problema se resolvió perfectamente. ¡Excelente!"' },
  { name: 'Fernando G.', type: 'Infertilidad', text: '"Excelente experiencia. Dr. Damián es muy profesional, con excelente trato y gran dominio en urología. Mi operación fue un éxito. Lo recomiendo."' },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [formMessage, setFormMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  const appWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80; // 80px for the fixed header
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      (card as HTMLElement).style.setProperty('--mouse-x', `${xPercent}%`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${yPercent}%`);
    });
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullname = formData.get('fullname') as string;
    const message = formData.get('cmessage') as string;

    if (!fullname.trim() || !message.trim()) {
      setFormMessage({ text: '⚠ Por favor complete todos los campos', type: 'error' });
      setTimeout(() => setFormMessage(null), 5000);
      return;
    }

    const whatsappMessage = `Hola Dr. Damián Montes,\n\nMi nombre es: ${fullname}\n\nMotivo de la cita:\n${message}`;
    const whatsappUrl = `https://wa.me/593986495487?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setFormMessage({ text: '✓ Abriendo WhatsApp...', type: 'success' });
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setFormMessage(null), 4000);
  };

  return (
    <div className="app-wrapper font-body" id="appWrapper" ref={appWrapperRef} onMouseMove={handleMouseMove}>
      <Helmet>
        <title>Dr. Damián Montes | Urólogo Especialista en Manta, Ecuador</title>
        <meta name="description" content="Dr. Damián Montes es un cirujano urólogo de confianza en Manta, Ecuador." />
        <meta name="keywords" content="urologo manta, cirujano urologo, damian montes, urologia ecuador, calculos renales, prostata, urologia, urologo en manta" />
        <link rel="canonical" href="https://urologo.damianmontes.medico.ec/" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://urologo.damianmontes.medico.ec/" />
        <meta property="og:title" content="Dr. Damián Montes | Urólogo Especialista en Manta" />
        <meta property="og:description" content="Cirujano urólogo de confianza en Manta, Ecuador. Atención especializada en urología, próstata, cálculos renales y cirugía mínimamente invasiva." />
        <meta property="og:image" content="https://i.ibb.co/MyvThyG3/LOGOTIPO-Dami-n-Montes-WEBB.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://urologo.damianmontes.medico.ec/" />
        <meta property="twitter:title" content="Dr. Damián Montes | Urólogo Especialista en Manta" />
        <meta property="twitter:description" content="Cirujano urólogo de confianza en Manta, Ecuador. Atención especializada en urología, próstata, cálculos renales y cirugía mínimamente invasiva." />
        <meta property="twitter:image" content="https://i.ibb.co/MyvThyG3/LOGOTIPO-Dami-n-Montes-WEBB.png" />

        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Damián Montes",
              "image": "https://i.ibb.co/hFRHzGN6/damian000000.png",
              "url": "https://urologo.damianmontes.medico.ec",
              "telephone": "+593986495487",
              "medicalSpecialty": "Urology",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Calle 18 y Avenida 38 y 39, Clínica del Sol (Torre Nueva), Piso 1 - Consultorio 211",
                "addressLocality": "Manta",
                "addressRegion": "Manabí",
                "addressCountry": "EC"
              },
              "description": "Cirujano Urólogo en Manta, Ecuador. Especialista en próstata, cálculos renales, y cirugía mínimamente invasiva."
            }
          `}
        </script>
      </Helmet>
      {/* Navigation */}
      <nav
        id="mainNav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#F0F7EEf0] backdrop-blur-md shadow-sm' : 'bg-white/95 backdrop-blur-md border-b border-[#E8DCC8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center cursor-pointer" onClick={(e) => scrollToSection(e, 'inicio')}>
              <img
                src="https://i.ibb.co/MyvThyG3/LOGOTIPO-Dami-n-Montes-WEBB.png"
                alt="Logo Dr. Damián Montes"
                className="h-14 w-auto"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <a href="#inicio" className="nav-link font-medium text-base px-5 py-2.5 rounded-lg text-[#2C1810]" onClick={(e) => scrollToSection(e, 'inicio')}>Inicio</a>
              <a href="#servicios" className="nav-link font-medium text-base px-5 py-2.5 rounded-lg text-[#2C1810]" onClick={(e) => scrollToSection(e, 'servicios')}>Servicios</a>
              <a href="#especialidades" className="nav-link font-medium text-base px-5 py-2.5 rounded-lg text-[#2C1810]" onClick={(e) => scrollToSection(e, 'especialidades')}>Especialidades</a>
              <Link to="/blog" className="nav-link font-medium text-base px-5 py-2.5 rounded-lg text-[#2C1810]">Blog</Link>
              <a href="#contacto" className="font-semibold text-base px-8 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg ml-2 bg-[#5D4037] text-[#F5F1E8]" onClick={(e) => scrollToSection(e, 'contacto')}>Contacto</a>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-[#2C1810]" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8DCC8] bg-white">
            <div className="px-4 py-6 space-y-2">
              <a href="#inicio" className="flex items-center gap-3 font-medium text-base py-3 px-3 rounded-lg hover:bg-gray-50 text-[#2C1810]" onClick={(e) => scrollToSection(e, 'inicio')}>
                <HomeIcon className="w-5 h-5" /> Inicio
              </a>
              <a href="#servicios" className="flex items-center gap-3 font-medium text-base py-3 px-3 rounded-lg hover:bg-gray-50 text-[#2C1810]" onClick={(e) => scrollToSection(e, 'servicios')}>
                <BriefcaseMedical className="w-5 h-5" /> Servicios
              </a>
              <a href="#especialidades" className="flex items-center gap-3 font-medium text-base py-3 px-3 rounded-lg hover:bg-gray-50 text-[#2C1810]" onClick={(e) => scrollToSection(e, 'especialidades')}>
                <Award className="w-5 h-5" /> Especialidades
              </a>
              <Link to="/blog" className="flex items-center gap-3 font-medium text-base py-3 px-3 rounded-lg hover:bg-gray-50 text-[#2C1810]">
                <BookOpen className="w-5 h-5" /> Blog
              </Link>
              <a href="https://wa.me/593986495487" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 font-semibold text-base text-center py-3 rounded-lg mt-3 bg-[#5D4037] text-[#F5F1E8]">
                <Calendar className="w-5 h-5" /> Agendar Cita
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header
        id="inicio"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(62, 39, 35, 0.7) 0%, rgba(78, 52, 46, 0.7) 40%, rgba(93, 64, 55, 0.7) 100%), url('https://i.ibb.co/jvCrDGKV/urologooo.jpg') center/cover no-repeat"
        }}
      >
        <h2 className="sr-only">Urólogo en Manta, Especialista en Urología</h2>
        <div className="hero-pattern absolute inset-0"></div>
        <div className="absolute inset-0 dot-pattern text-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="anim-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-white/10 text-[#D7CCC8]">
                <span className="w-2 h-2 rounded-full inline-block bg-[#0B7B5A]" style={{ animation: 'slowPulse 3s ease-in-out infinite' }}></span>
                Agenda disponible
              </div>
              <h1 className="anim-fade-up anim-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#F5F1E8] max-w-[800px]">
                Cirujano Urólogo en MANTA
              </h1>
              <p className="anim-fade-up anim-delay-2 text-lg lg:text-xl leading-relaxed mb-8 max-w-lg text-[#D7CCC8]">
                Dr. Damián Montes, formado en Argentina con amplia experiencia. Atención Urológica y personalizada en Manta, Ecuador.
              </p>
              <div className="anim-fade-up anim-delay-3 flex flex-wrap gap-4">
                <a href="https://wa.me/593986495487" target="_blank" rel="noopener noreferrer" className="pulse-button inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#0B7B5A] text-white">
                  <Calendar className="w-5 h-5" /> Agendar Cita
                </a>
                <a href="#servicios" className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full border-2 transition-all duration-300 hover:bg-white/10 border-white/30 text-[#F5F1E8]" onClick={(e) => scrollToSection(e, 'servicios')}>
                  Ver Servicios
                </a>
              </div>

              {/* Stats */}
              <div className="anim-fade-up anim-delay-4 grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                <div>
                  <div className="font-display text-3xl font-bold text-[#F5F1E8]">10+</div>
                  <div className="text-sm mt-1 text-[#D7CCC8]">Años de experiencia</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-[#F5F1E8]">4000+</div>
                  <div className="text-sm mt-1 text-[#D7CCC8]">Pacientes atendidos</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-bold text-[#F5F1E8]">100%</div>
                  <div className="text-sm mt-1 text-[#D7CCC8]">Compromiso</div>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <img
                src="https://i.ibb.co/hFRHzGN6/damian000000.png"
                alt="Dr. Damián Montes - Cirujano Urólogo Especialista en Manta"
                className="w-full max-w-2xl h-auto object-contain rounded-3xl"
                style={{ animation: 'imageFloat 6s ease-in-out infinite, imageGlow 6s ease-in-out infinite' }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="block w-full h-[60px]">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="#F5F1E8" />
          </svg>
        </div>
      </header>
 
      {/* Litotricia Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-[#2C1810]">Litotricia con Láser Holmio</h2>
              <p className="text-lg text-[#6D4C41] mb-6">
                Somos los líderes en Manta en tratamientos mínimamente invasivos para cálculos renales.
              </p>
              <p className="text-lg text-[#6D4C41] mb-6">
                Utilizamos tecnología de Láser Holmio de última generación para una fragmentación de alta precisión, permitiendo una recuperación rápida y sin incisiones externas.
              </p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://i.ibb.co/ZzCcL4SD/damians17.jpg" alt="Litotricia con Láser Holmio" className="w-full h-auto" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 lg:py-28 bg-[#F5F1E8]">
        <h2 className="sr-only">Servicios de Urología en Manta</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block font-semibold text-sm tracking-widest uppercase mb-4 text-[#5D4037]">Nuestros Servicios</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C1810]">Servicios Urológicos Especializados</h2>
            <p className="text-lg max-w-2xl mx-auto text-[#6D4C41]">Atención integral con tecnología de vanguardia y calidez humana</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, i) => (
              <Link key={service.id} to={`/${service.id}`} className={`service-card rounded-3xl overflow-hidden anim-fade-up anim-delay-${(i % 4) + 1} bg-white border border-[#E8DCC8] block group shadow-sm hover:shadow-2xl transition-all duration-500`}>
                <div className="w-full relative aspect-[4/3] overflow-hidden bg-[#F5F1E8]">
                  {service.img ? (
                    <>
                      <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-[#2C1810]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F1E8] to-[#E8DCC8]">
                      <ImageIcon className="w-12 h-12 text-[#BCAAA4]" />
                    </div>
                  )}
                  <div className="absolute bottom-5 right-5 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="flex items-center gap-3 bg-[#2C1810] text-[#F5F1E8] pl-5 pr-2 py-2 rounded-full shadow-2xl transform group-hover:scale-105 transition-transform border border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider">Ver servicio</span>
                      <div className="w-8 h-8 rounded-full bg-[#5D4037] flex items-center justify-center">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 relative z-10 bg-white">
                  <h3 className="font-display text-xl font-bold mb-3 text-[#2C1810] group-hover:text-[#5D4037] transition-colors">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-[#6D4C41] mb-6 line-clamp-3">{service.desc}</p>
                  <div className="flex items-center text-sm font-bold text-[#5D4037] transition-colors">
                    <span className="border-b-2 border-transparent group-hover:border-[#5D4037] pb-0.5 transition-all uppercase tracking-wider text-xs">Conocer más</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <a href="https://wa.me/593986495487" target="_blank" rel="noopener noreferrer" className="pulse-button inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#0B7B5A] text-white">
              <Calendar className="w-5 h-5" /> Agendar Cita
            </a>
          </div>

          {/* Conditions Slider */}
          <div className="mt-20 pt-12 border-t border-[#E8DCC8]">
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-12 text-center text-[#2C1810]">Condiciones que Tratamos</h2>
            <div className="relative w-full overflow-hidden">
              <motion.div 
                className="flex gap-6"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              >
                {[0, 1, 2, 0, 1, 2].map((i, index) => (
                  <div key={index} className="flex-shrink-0 w-full md:w-1/2 px-4 md:px-0">
                    <div className="rounded-2xl p-6 sm:p-8 h-full bg-white border border-[#E8DCC8] shadow-[0_4px_20px_rgba(93,64,55,0.08)]">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#5D4037]">
                          {i === 0 ? <Droplets className="w-6 h-6 text-[#F5F1E8]" /> : i === 1 ? <HeartPulse className="w-6 h-6 text-[#F5F1E8]" /> : <ShieldAlert className="w-6 h-6 text-[#F5F1E8]" />}
                        </div>
                        <h3 className="font-display text-lg sm:text-xl font-bold text-[#5D4037]">
                          {i === 0 ? 'Sistema Urinario' : i === 1 ? 'Sexual y Reproductiva' : 'Próstata y Testículos'}
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {(i === 0 ? ['Cálculos renales y vía urinaria', 'Enfermedad de vía urinaria', 'Incontinencia urinaria', 'Infección a las vías urinarias'] : 
                          i === 1 ? ['Disfunción eréctil', 'Eyaculación precoz', 'Infección de transmisión sexual', 'Varicocele'] : 
                          ['Enfermedades de la próstata', 'Quistes de epidídimo', 'Cáncer de vía urinaria']).map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm sm:text-base text-[#6D4C41]">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#5D4037]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block font-semibold text-sm tracking-widest uppercase mb-4 text-[#5D4037]">Redes Sociales</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C1810]">Síguenos en Nuestras Redes</h2>
            <p className="text-lg max-w-2xl mx-auto text-[#6D4C41]">Contenido exclusivo, consejos de salud y más información sobre nuestros servicios</p>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <a href="https://www.instagram.com/urologo.damianmontes/" target="_blank" rel="noopener noreferrer" className="social-btn inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-300 bg-[#E1306C] text-white">
                <Instagram className="w-5 h-5" /> Instagram
              </a>
              <a href="https://tiktok.com/@urologo.damianmontes/" target="_blank" rel="noopener noreferrer" className="social-btn inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-300 bg-black text-white">
                <Music className="w-5 h-5" /> TikTok
              </a>
              <a href="https://www.facebook.com/urologo.damianmontes" target="_blank" rel="noopener noreferrer" className="social-btn inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-lg transition-all duration-300 bg-[#1877F2] text-white">
                <Facebook className="w-5 h-5" /> Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 lg:py-28 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block font-semibold text-sm tracking-widest uppercase mb-4 text-[#5D4037]">Testimonios</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C1810]">Lo que dicen nuestros pacientes satisfechos</h2>
            <p className="text-lg max-w-2xl mx-auto text-[#6D4C41]">Experiencias reales de pacientes satisfechos con la atención del Dr. Damián Montes</p>
          </div>
          
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out w-full"
              style={{ transform: `translateX(-${currentReview * (window.innerWidth < 768 ? 100 : 50)}%)` }}
            >
              {reviews.map((review, i) => (
                <div key={i} className="flex-shrink-0 w-full md:w-1/2 px-4 md:px-0">
                  <div className="rounded-2xl p-6 md:p-8 h-full bg-white border border-[#E8DCC8] shadow-[0_4px_20px_rgba(93,64,55,0.08)]">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-[#FFC107] fill-[#FFC107]" />
                      ))}
                    </div>
                    <p className="text-sm md:text-base leading-relaxed mb-6 text-[#6D4C41]">{review.text}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-[#5D4037]">
                        <User className="w-6 h-6 text-[#F5F1E8]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#2C1810]">{review.name}</p>
                        <p className="text-xs text-[#9A8178]">{review.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <a 
              href="https://g.page/r/Cf1-Cj5cSR-yEBM/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#5D4037] text-[#F5F1E8]"
            >
              Déjanos tu reseña
            </a>
          </div>
        </div>
      </section>

      {/* Especialidades Section */}
      <section id="especialidades" className="py-20 lg:py-28 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="pb-12">
              <span className="inline-block font-semibold text-sm tracking-widest uppercase mb-4 text-[#5D4037]">Formación & Experiencia</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-[#2C1810]">Especialidades Médicas</h2>
              <p className="text-lg leading-relaxed mb-8 text-[#6D4C41]">
                El Dr. Damián Montes realizó su especialización en reconocidas instituciones de Argentina, adquiriendo experiencia de primer nivel en urología moderna, cirugía mínimamente invasiva y tratamientos de vanguardia.
              </p>
              <div className="space-y-4">
                {['Urología Oncológica', 'Cirugía Laparoscópica', 'Andrología', 'Endourología', 'Uroginecología'].map((spec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#5D4037]" />
                    <span className="font-medium text-[#2C1810]">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-[#3E2723] to-[#5D4037]">
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#BCAAa433]">
                      <Award className="w-6 h-6 text-[#D7CCC8]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-[#F5F1E8]">Certificación Internacional</h4>
                      <p className="text-sm text-[#D7CCC8]">Formación especializada en Argentina con estándares internacionales</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#BCAAa433]">
                      <Microscope className="w-6 h-6 text-[#D7CCC8]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-[#F5F1E8]">Tecnología Avanzada</h4>
                      <p className="text-sm text-[#D7CCC8]">Equipos de última generación para diagnóstico y tratamiento</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#BCAAa433]">
                      <HeartHandshake className="w-6 h-6 text-[#D7CCC8]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-[#F5F1E8]">Atención Humanizada</h4>
                      <p className="text-sm text-[#D7CCC8]">Cada paciente recibe un plan de tratamiento personalizado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Image */}
      <div className="w-full h-auto bg-white mt-[60px]">
        <img src="https://i.ibb.co/xSJ4yMZm/Whisk-ihjmxgznxewyxmgmtazy3gtl2i2m00sokjdmtez.jpg" alt="Consultorio urológico" className="w-full h-auto object-cover" referrerPolicy="no-referrer" />
      </div>

      {/* Contact Section */}
      <section id="contacto" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block font-semibold text-sm tracking-widest uppercase mb-4 text-[#5D4037]">Contáctenos</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#2C1810]">Agende su Cita con el Dr. Damián Montes</h2>
            <p className="text-lg max-w-2xl mx-auto text-[#6D4C41]">Estamos aquí para atenderle. Complete el formulario o contáctenos directamente.</p>
          </div>
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F5F1E8]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#5D4037]">
                  <MapPin className="w-5 h-5 text-[#F5F1E8]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-[#2C1810]">Consultorio</h4>
                  <p className="text-sm font-semibold mb-3 text-[#2C1810]">MANTA - Clínica del Sol (Torre Nueva)</p>
                  <p className="text-sm leading-relaxed mb-4 text-[#6D4C41]">
                    Piso 1 - Consultorio 211<br />
                    Calle 18 y Avenida 38 y 39
                  </p>
                  <a href="https://maps.app.goo.gl/sG3LYTU2uZJ63uHb6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold px-4 py-2.5 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-105 bg-[#5D4037] text-white">
                    <MapPin className="w-4 h-4" /> Llegar con GPS
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F5F1E8]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#5D4037]">
                  <Phone className="w-5 h-5 text-[#F5F1E8]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-[#2C1810]">Teléfono</h4>
                  <p className="text-lg font-medium text-[#0B7B5A]">0986495487</p>
                  <p className="text-sm mt-1 text-[#6D4C41]">Emergencias: Disponible 24h</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F5F1E8]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#5D4037]">
                  <Clock className="w-5 h-5 text-[#F5F1E8]" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-[#2C1810]">Horario de Atención</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-[#6D4C41]"><span className="font-semibold text-[#2C1810]">Lunes a Viernes:</span> 16h00 - 19h00</p>
                    <p className="text-sm text-[#6D4C41]"><span className="font-semibold text-[#2C1810]">Sábado:</span> 09h00 - 13h00</p>
                    <p className="text-sm text-[#6D4C41]"><span className="font-semibold text-[#2C1810]">Emergencias:</span> 24h disponible</p>
                    <p className="text-base font-semibold mt-3 p-3 rounded-lg bg-[#FFF9E6] text-[#8B6F00] border border-[#FFE66D]">
                      ⚠ Atención previa cita
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleContactSubmit} className="rounded-3xl p-8 lg:p-10 shadow-xl bg-[#F5F1E8] border border-[#E8DCC8]">
                <div className="mb-6 flex items-center gap-2 p-3 rounded-xl bg-[#0B7B5A1A] border border-[#0B7B5A33]">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 bg-[#0B7B5A]" style={{ animation: 'slowPulse 3s ease-in-out infinite' }}></span>
                  <span className="text-sm font-medium text-[#0B7B5A]">Agenda disponible</span>
                </div>
                
                <div className="mb-5">
                  <label htmlFor="fullname" className="block font-medium text-sm mb-2 text-[#2C1810]">Nombre Completo</label>
                  <input type="text" id="fullname" name="fullname" placeholder="Su nombre completo" className="w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all focus:ring-2 bg-white border-[#E8DCC8] text-[#2C1810] focus:ring-[#5D4037]" />
                </div>
                
                <div className="mb-5">
                  <label htmlFor="cmessage" className="block font-medium text-sm mb-2 text-[#2C1810]">Motivo de la Cita</label>
                  <textarea id="cmessage" name="cmessage" rows={4} placeholder="Describa el motivo de su consulta..." className="w-full px-4 py-3 rounded-xl text-sm border-2 outline-none transition-all focus:ring-2 resize-none bg-white border-[#E8DCC8] text-[#2C1810] focus:ring-[#5D4037]"></textarea>
                </div>
                
                <button type="submit" className="w-full font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 bg-[#0B7B5A] text-white">
                  <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
                </button>
                
                <p className="font-bold mt-6 p-6 rounded-xl text-center bg-gradient-to-br from-[#E8DCC8] to-[#F5F1E8] text-[#0B7B5A] border-2 border-[#5D4037] text-lg font-sans">
                  Valor de la Consulta<br />
                  <span className="text-2xl font-sans">$50</span>
                </p>
                
                <p className="text-base mt-4 p-4 rounded-xl text-center font-semibold bg-[#FFF9E6] text-[#8B6F00] border border-[#FFE66D]">
                  ⚠ No trabajamos con ninguna aseguradora médica
                </p>
                
                {formMessage && (
                  <div className={`mt-4 p-4 rounded-xl text-center font-medium text-sm toast-msg ${formMessage.type === 'error' ? 'bg-[#FFE8D4] text-[#7B2C04]' : 'bg-[#D4E8D0] text-[#0B3D24]'}`}>
                    {formMessage.text}
                  </div>
                )}
              </form>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-16 rounded-3xl overflow-hidden border border-[#E8DCC8] shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.4607758362678!2d-80.73977538466159!3d-0.9573887993356064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902be17e132c3f8f%3A0x6d9f7833a6f1d0a5!2sCl%C3%ADnica%20del%20Sol!5e0!3m2!1ses-419!2sec!4v1713856385000!5m2!1ses-419!2sec" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del consultorio del Dr. Damián Montes en Manta"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#3E2723]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <a href="/" className="flex items-center gap-3" onClick={(e) => scrollToSection(e, 'inicio')}>
              <img src="https://i.ibb.co/RpsZthjJ/LOGOTIPO-Dami-n-Montes-BYN-FINAL.png" alt="Logo Dr. Damián Montes" className="h-12 w-auto" referrerPolicy="no-referrer" />
            </a>
            <p className="text-sm text-[#D7CCC8]">
              © Todos los derechos reservados, Dr. Damián Montes 2026. Diseñada por <a href="https://mantaconect.com/" target="_blank" rel="noopener noreferrer" className="text-[#F5F1E8] underline transition-opacity hover:opacity-80">Manta Connect</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
