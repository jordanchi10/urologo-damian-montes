import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  RotateCcw, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Activity,
  Heart,
  FileText,
  User,
  ExternalLink,
  MapPin,
  Phone,
  Music
} from 'lucide-react';
import { Instagram, Facebook } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  text: string;
  description: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "1. Vaciado Incompleto",
    text: "¿Con qué frecuencia ha tenido la sensación de no vaciar completamente la vejiga al terminar de orinar?",
    description: "Evalúe si siente que queda líquido acumulado tras finalizar de orinar durante el último mes.",
    options: [
      { label: "Ninguna vez", score: 0 },
      { label: "Menos de 1 de cada 5 veces (Menos del 20%)", score: 1 },
      { label: "Menos de la mitad de las veces (Menos del 50%)", score: 2 },
      { label: "Aproximadamente la mitad de las veces (50%)", score: 3 },
      { label: "Más de la mitad de las veces (Más del 50%)", score: 4 },
      { label: "Casi siempre", score: 5 }
    ]
  },
  {
    id: 2,
    title: "2. Frecuencia de Micción",
    text: "¿Con qué frecuencia ha tenido que volver a orinar en menos de dos horas después de haber orinado la última vez?",
    description: "Mide la necesidad frecuente de acudir al baño en lapsos cortos durante el último mes.",
    options: [
      { label: "Ninguna vez", score: 0 },
      { label: "Menos de 1 de cada 5 veces (Menos del 20%)", score: 1 },
      { label: "Menos de la mitad de las veces (Menos del 50%)", score: 2 },
      { label: "Aproximadamente la mitad de las veces (50%)", score: 3 },
      { label: "Más de la mitad de las veces (Más del 50%)", score: 4 },
      { label: "Casi siempre", score: 5 }
    ]
  },
  {
    id: 3,
    title: "3. Intermitencia",
    text: "¿Con qué frecuencia ha notado que, al orinar, el chorro se detenía e iniciaba de nuevo varias veces?",
    description: "Valore si su flujo urinario se interrumpe y arranca de forma involuntaria.",
    options: [
      { label: "Ninguna vez", score: 0 },
      { label: "Menos de 1 de cada 5 veces (Menos del 20%)", score: 1 },
      { label: "Menos de la mitad de las veces (Menos del 50%)", score: 2 },
      { label: "Aproximadamente la mitad de las veces (50%)", score: 3 },
      { label: "Más de la mitad de las veces (Más del 50%)", score: 4 },
      { label: "Casi siempre", score: 5 }
    ]
  },
  {
    id: 4,
    title: "4. Urgencia Miccional",
    text: "¿Con qué frecuencia ha tenido dificultad para aguantar o posponer las ganas de orinar?",
    description: "Mide la aparición súbita e incontrolable de deseos de orinar durante el último mes.",
    options: [
      { label: "Ninguna vez", score: 0 },
      { label: "Menos de 1 de cada 5 veces (Menos del 20%)", score: 1 },
      { label: "Menos de la mitad de las veces (Menos del 50%)", score: 2 },
      { label: "Aproximadamente la mitad de las veces (50%)", score: 3 },
      { label: "Más de la mitad de las veces (Más del 50%)", score: 4 },
      { label: "Casi siempre", score: 5 }
    ]
  },
  {
    id: 5,
    title: "5. Chorro Débil",
    text: "¿Con qué frecuencia ha notado que el chorro de orina es débil, fino o con poca fuerza?",
    description: "Evalúe si ha percibido una disminución notable en la potencia del chorro urinario.",
    options: [
      { label: "Ninguna vez", score: 0 },
      { label: "Menos de 1 de cada 5 veces (Menos del 20%)", score: 1 },
      { label: "Menos de la mitad de las veces (Menos del 50%)", score: 2 },
      { label: "Aproximadamente la mitad de las veces (50%)", score: 3 },
      { label: "Más de la mitad de las veces (Más del 50%)", score: 4 },
      { label: "Casi siempre", score: 5 }
    ]
  },
  {
    id: 6,
    title: "6. Esfuerzo al Orinar",
    text: "¿Con qué frecuencia ha tenido que apretar, pujar o hacer fuerza física para comenzar a orinar?",
    description: "Valore si necesita contraer el abdomen o esperar un momento largo realizando fuerza para iniciar.",
    options: [
      { label: "Ninguna vez", score: 0 },
      { label: "Menos de 1 de cada 5 veces (Menos del 20%)", score: 1 },
      { label: "Menos de la mitad de las veces (Menos del 50%)", score: 2 },
      { label: "Aproximadamente la mitad de las veces (50%)", score: 3 },
      { label: "Más de la mitad de las veces (Más del 50%)", score: 4 },
      { label: "Casi siempre", score: 5 }
    ]
  },
  {
    id: 7,
    title: "7. Nocturia",
    text: "¿Cuántas veces suele levantarse a orinar por la noche desde que se acuesta hasta que se levanta por la mañana?",
    description: "Mide el promedio de veces que el deseo urinario fragmenta su descanso nocturno diario.",
    options: [
      { label: "Ninguna vez", score: 0 },
      { label: "1 vez por noche", score: 1 },
      { label: "2 veces por noche", score: 2 },
      { label: "3 veces por noche", score: 3 },
      { label: "4 veces por noche", score: 4 },
      { label: "5 o más veces por noche", score: 5 }
    ]
  },
  {
    id: 8,
    title: "8. Calidad de Vida (QoL)",
    text: "Si tuviera que pasar el resto de su vida con sus problemas actuales para orinar, ¿cómo se sentiría?",
    description: "Autovaloración subjetiva sobre el impacto emocional de su situación urinaria actual.",
    options: [
      { label: "Encantado", score: 0 },
      { label: "Muy satisfecho", score: 1 },
      { label: "Mayormente satisfecho", score: 2 },
      { label: "Satisfecho y descontento por igual (Regular)", score: 3 },
      { label: "Mayormente insatisfecho", score: 4 },
      { label: "Infeliz", score: 5 },
      { label: "Fatal / Insoportable", score: 6 }
    ]
  }
];

export default function CalculadoraIpss() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectOption = (score: number) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: score };
    setAnswers(newAnswers);

    // Auto advance after short delay for better UX
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsFinished(true);
      }
    }, 250);
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1 && answers[questions[currentStep].id] !== undefined) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === questions.length - 1 && answers[questions[currentStep].id] !== undefined) {
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsFinished(false);
    window.scrollTo(0, 0);
  };

  // Calculations
  const symptomScore = questions
    .filter((q) => q.id !== 8)
    .reduce((sum, q) => sum + (answers[q.id] || 0), 0);

  const qolScore = answers[8] !== undefined ? answers[8] : 0;

  // Severity Level
  let severityLabel = "";
  let severityColor = "";
  let severityDescription = "";
  let severityBg = "";

  if (symptomScore <= 7) {
    severityLabel = "Sintomatología Leve";
    severityColor = "text-emerald-600 border-emerald-200";
    severityBg = "bg-emerald-50";
    severityDescription = "Sus síntomas urinarios son de carácter leve. Habitualmente no requieren intervenciones quirúrgicas o farmacológicas intensivas. Sin embargo, se recomienda mantener un control urológico anual preventivo con el urólogo para monitorear el tamaño de la próstata y el flujo urinario.";
  } else if (symptomScore <= 19) {
    severityLabel = "Sintomatología Moderada";
    severityColor = "text-amber-600 border-amber-200";
    severityBg = "bg-amber-50";
    severityDescription = "Presenta síntomas prostáticos de intensidad moderada que ya repercuten en su bienestar físico y cotidiano. Es el momento ideal para programar una consulta formal de urología. Existen tratamientos médicos (como fitoterapia o bloqueadores alfa) que mejoran significativamente el flujo y reducen los síntomas evitando progresiones.";
  } else {
    severityLabel = "Sintomatología Grave";
    severityColor = "text-rose-600 border-rose-200";
    severityBg = "bg-rose-50";
    severityDescription = "Sus síntomas prostáticos son severos y conllevan un impacto considerable. Esto amerita una valoración prioritaria por parte del especialista en urología. Una puntuación alta no tratada puede derivar en retención aguda de orina, cálculos en la vejiga o daño renal. Dr. Damián Montes se especializa en tratamientos avanzados como la cirugía láser de próstata HoLEP para solucionar estos cuadros de manera definitiva y segura.";
  }

  // QoL labels
  const qolLabels = [
    "Encantado",
    "Muy satisfecho",
    "Mayormente satisfecho",
    "Satisfecho y descontento por igual (Regular)",
    "Mayormente insatisfecho",
    "Infeliz",
    "Fatal / Insoportable"
  ];

  // Progress percentage
  const progressPercent = Math.round(((Object.keys(answers).length) / questions.length) * 100);

  // WhatsApp sharing message URL
  const getWhatsAppUrl = () => {
    const text = `Hola Dr. Damián Montes, realicé el test IPSS (Síntomas Prostáticos) en su web y obtuve estos resultados:\n\n` +
                 `• Puntuación de Síntomas: ${symptomScore}/35 (${severityLabel})\n` +
                 `• Calidad de Vida (QoL): ${qolScore}/6 (${qolLabels[qolScore]})\n\n` +
                 `Me gustaría agendar una consulta médica para evaluar mis síntomas de forma personalizada.`;
    return `https://wa.me/593986495487?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col">
      <Helmet>
        <title>Calculadora de Síntomas Prostáticos IPSS | Dr. Damián Montes Urólogo Manta</title>
        <meta name="description" content="Evalúe la gravedad de sus síntomas urinarios de forma rápida y gratuita con la Calculadora de Síntomas Prostáticos IPSS. Obtenga resultados inmediatos y compártalos confidencialmente con el Dr. Damián Montes en Manta, Ecuador." />
        <meta name="keywords" content="calculadora ipss, test prostata, sintomas prostata inflamada, dr damian montes, urologo manta, urologia manta, bph manta, hiperplasia prostatica benigna" />
        <link rel="canonical" href="https://urologo.damianmontes.medico.ec/calculadora-ipss" />
      </Helmet>

      {/* Header Banner */}
      <div className="bg-[#5D4037] text-[#F5F1E8] py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(11,123,90,0.15),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[#D7CCC8] hover:text-white mb-4 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Volver al Inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-2">
            Calculadora de Síntomas Prostáticos (IPSS)
          </h1>
          <p className="text-[#D7CCC8] text-base sm:text-lg max-w-2xl">
            Cuestionario de Autoevaluación Internacional (IPSS) para analizar la salud y el bienestar de su próstata de forma completamente confidencial.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {!isFinished ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#E8DCC8]">
            {/* Progress Bar Header */}
            <div className="mb-8">
              <div className="flex justify-between items-center text-sm font-semibold text-[#5D4037] mb-2">
                <span>Progreso del Test</span>
                <span>{progressPercent}% Completado</span>
              </div>
              <div className="w-full bg-[#F5F1E8] rounded-full h-2.5 overflow-hidden border border-[#E8DCC8]/50">
                <div 
                  className="bg-[#0B7B5A] h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Questions Wizard */}
            <div className="min-h-[340px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="inline-block bg-[#0B7B5A]/10 text-[#0B7B5A] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Pregunta {currentStep + 1} de {questions.length}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2C1810] leading-tight">
                    {questions[currentStep].text}
                  </h2>
                  <p className="text-gray-500 text-sm italic">
                    {questions[currentStep].description}
                  </p>

                  {/* Options List */}
                  <div className="grid grid-cols-1 gap-3 mt-6">
                    {questions[currentStep].options.map((opt, i) => {
                      const isSelected = answers[questions[currentStep].id] === opt.score;
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectOption(opt.score)}
                          className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition-all duration-200 flex justify-between items-center ${
                            isSelected 
                              ? 'bg-[#0B7B5A]/5 border-[#0B7B5A] text-[#0B7B5A] shadow-md ring-1 ring-[#0B7B5A]' 
                              : 'bg-white border-[#E8DCC8] text-gray-700 hover:bg-[#F5F1E8]/50 hover:border-gray-300'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-md ml-3 ${
                            isSelected ? 'bg-[#0B7B5A] text-white' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {opt.score === 0 && questions[currentStep].id !== 8 ? "0 ptos" : `+${opt.score} ${opt.score === 1 ? 'punto' : 'puntos'}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls */}
              <div className="flex justify-between items-center border-t border-[#E8DCC8]/50 pt-6 mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#5D4037] hover:text-[#0B7B5A] disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ChevronLeft className="w-5 h-5" /> Anterior
                </button>

                <div className="text-xs text-gray-400 font-medium">
                  {questions[currentStep].id === 8 ? "Pregunta de Calidad de Vida" : "Evaluación de Síntomas Prostáticos"}
                </div>

                <button
                  onClick={handleNext}
                  disabled={answers[questions[currentStep].id] === undefined}
                  className="inline-flex items-center gap-2 bg-[#5D4037] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#0B7B5A] disabled:opacity-40 disabled:pointer-events-none transition-all shadow-sm hover:shadow"
                >
                  {currentStep === questions.length - 1 ? "Ver Resultados" : "Siguiente"} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#E8DCC8]"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-[#0B7B5A] mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#2C1810]">
                  Evaluación Finalizada con Éxito
                </h2>
                <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-xl mx-auto">
                  De acuerdo con sus respuestas, hemos calculado su puntuación de acuerdo a la escala internacional validada clínicamente.
                </p>
              </div>

              {/* Score Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Symptom Score Card */}
                <div className="bg-[#F5F1E8]/50 border border-[#E8DCC8] rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                      <Activity className="w-4 h-4 text-[#0B7B5A]" /> Puntuación de Síntomas
                    </span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-5xl font-bold text-[#2C1810]">{symptomScore}</span>
                      <span className="text-gray-400 text-lg">/ 35 puntos</span>
                    </div>
                  </div>

                  <div className={`mt-4 p-3.5 rounded-xl border font-bold text-center text-sm ${severityColor} ${severityBg}`}>
                    {severityLabel}
                  </div>
                </div>

                {/* Quality of Life Card */}
                <div className="bg-[#F5F1E8]/50 border border-[#E8DCC8] rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                      <Heart className="w-4 h-4 text-rose-500" /> Calidad de Vida (QoL)
                    </span>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-5xl font-bold text-[#2C1810]">{qolScore}</span>
                      <span className="text-gray-400 text-lg">/ 6 puntos</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-xl border border-gray-200 bg-white font-semibold text-center text-sm text-gray-700">
                    Impacto: <span className="text-[#5D4037] font-bold">{qolLabels[qolScore]}</span>
                  </div>
                </div>
              </div>

              {/* Medical Explanation Block */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 mb-8">
                <h3 className="font-display font-bold text-[#2C1810] text-lg mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#5D4037]" /> Interpretación de sus Resultados:
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {severityDescription}
                </p>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[#E8DCC8]/50 pt-8">
                <a 
                  href={getWhatsAppUrl()}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 bg-[#0B7B5A] text-white shadow-md text-base"
                >
                  <Calendar className="w-5 h-5" /> Compartir en WhatsApp con el Dr. Montes
                </a>

                <button 
                  onClick={resetTest}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold px-6 py-4 rounded-full border border-[#E8DCC8] text-gray-600 hover:bg-[#F5F1E8]/60 transition-all text-base"
                >
                  <RotateCcw className="w-4 h-4" /> Repetir Test
                </button>
              </div>

              {/* Medical Disclaimer inside Results */}
              <div className="mt-8 flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200/50 text-amber-800 text-xs sm:text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                <p className="leading-relaxed">
                  <strong>Aviso médico importante:</strong> Este cuestionario autoadministrado es una herramienta de cribado internacionalmente reconocida, pero tiene un carácter puramente informativo. No constituye un diagnóstico médico. Los problemas de vaciado o frecuencia urinaria pueden deberse a múltiples factores que únicamente un médico urólogo certificado puede descartar mediante exploración física y exámenes específicos.
                </p>
              </div>
            </motion.div>

            {/* Informational SEO Content Block (Increases Word Count & internal links) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#E8DCC8] space-y-6">
              <h3 className="text-xl font-display font-bold text-[#2C1810] border-b border-gray-100 pb-3">
                ¿Qué es el Cuestionario Internacional de Síntomas Prostáticos (IPSS)?
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                El <strong>IPSS</strong> (por sus siglas en inglés, <em>International Prostate Symptom Score</em>) es una prueba validada por la Organización Mundial de la Salud (OMS) que ayuda a determinar la severidad de los síntomas de la vía urinaria inferior provocados por patologías como el agrandamiento prostático (Hiperplasia Prostática Benigna o HPB).
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                El test consta de 7 preguntas enfocadas en el patrón miccional y 1 pregunta final orientada a evaluar cómo afecta esta situación a su calidad de vida habitual. Las puntuaciones resultantes se clasifican clínicamente en:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600">
                <li><strong>0 - 7 puntos (Leve):</strong> Sintomatología inicial. Habitualmente requiere seguimiento anual preventivo.</li>
                <li><strong>8 - 19 puntos (Moderado):</strong> Grado de afectación moderado. Se recomienda consultar al urólogo para discutir tratamientos de soporte.</li>
                <li><strong>20 - 35 puntos (Grave):</strong> Grado de afectación severo. Requiere estudio integral para evaluar la opción de técnicas quirúrgicas desobstructivas como el <Link to="/cirugias-prostata-laser" className="text-[#0B7B5A] underline font-semibold">láser de próstata HoLEP</Link>.</li>
              </ul>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                En el consultorio de urología del <strong>Dr. Damián Montes</strong> en Manta, disponemos de equipos de diagnóstico de vanguardia (flujometría, ecografía prostática y vesical de alta resolución) para brindarle un abordaje terapéutico integral con los más altos estándares de calidad y calidez humana. No deje que los problemas urinarios afecten su tranquilidad diaria.
              </p>
              <div className="flex justify-start">
                <Link to="/consulta-urologia" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B7B5A] hover:underline">
                  Conozca más sobre la Consulta de Urología General <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer copied to match home styling */}
      <footer className="bg-[#2C1810] text-[#F5F1E8] pt-20 pb-8 mt-16 border-t-4 border-[#0B7B5A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <Link to="/" className="inline-block mb-6">
                <img src="https://i.ibb.co/RpsZthjJ/LOGOTIPO-Dami-n-Montes-BYN-FINAL.png" alt="Logo Dr. Damián Montes" className="h-16 w-auto" referrerPolicy="no-referrer" />
              </Link>
              <p className="text-[#D7CCC8] text-sm leading-relaxed max-w-xs">
                Especialista en urología comprometido con la excelencia médica y la atención humanizada en la ciudad de Manta.
              </p>
            </div>
            <div>
              <h4 className="text-white font-display text-lg font-bold mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-[#D7CCC8] hover:text-white transition-colors">Inicio</Link>
                </li>
                <li>
                  <Link to="/#servicios" className="text-[#D7CCC8] hover:text-white transition-colors">Servicios</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-[#D7CCC8] hover:text-white transition-colors">Blog de Salud</Link>
                </li>
                <li>
                  <Link to="/calculadora-ipss" className="text-white font-semibold transition-colors flex items-center gap-1">
                    Calculadora IPSS <span className="bg-[#0B7B5A] text-[9px] uppercase px-1.5 py-0.5 rounded text-white">Nuevo</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-display text-lg font-bold mb-6">Contacto</h4>
              <ul className="space-y-3 text-[#D7CCC8] text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-[#0B7B5A]" />
                  <span>Clínica del Sol, Manta, Ecuador</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-5 h-5 flex-shrink-0 text-[#0B7B5A]" />
                  <a href="tel:+593986495487" className="hover:text-white transition-colors">+593 98 649 5487</a>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                {[
                  { Icon: Instagram, url: "https://www.instagram.com/urologo.damianmontes/" },
                  { Icon: Facebook, url: "https://www.facebook.com/urologo.damianmontes" },
                  { Icon: Music, url: "https://tiktok.com/@urologo.damianmontes/" }
                ].map(({ Icon, url }, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#3E2723] flex items-center justify-center text-[#D7CCC8] hover:bg-[#0B7B5A] hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#3E2723] text-center">
            <p className="text-sm text-[#9A8178]">
              © {new Date().getFullYear()} Dr. Damián Montes. Todos los derechos reservados. | Diseñado por <a href="https://mantaconect.com/" target="_blank" rel="noopener noreferrer" className="text-[#F5F1E8] underline transition-opacity hover:opacity-80">Manta Connect</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
