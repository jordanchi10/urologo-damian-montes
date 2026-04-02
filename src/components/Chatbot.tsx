import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { services } from '../data/servicesData';
import { faqs } from '../data/chatbotKnowledge';
import { blogArticles } from '../data/blogData';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const knowledgeBase = `
Información del Dr. Damián Montes:
- Urólogo en Manta, Ecuador.
- Especialista en diagnóstico y tratamiento de enfermedades del sistema urinario y reproductor masculino.

Servicios ofrecidos:
${services.map(s => `- ${s.title}: ${s.longDesc}`).join('\n')}

Preguntas frecuentes:
${faqs.map(f => `- ${f.question}: ${f.answer}`).join('\n')}

Artículos del blog:
${blogArticles.map(b => `- ${b.title}: ${stripHtml(b.content)}`).join('\n')}
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente virtual del Dr. Damián Montes. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Eres un asistente virtual cálido, amable y profesional para el consultorio del Dr. Damián Montes, un urólogo en Manta, Ecuador. Tu objetivo es ayudar a los pacientes con empatía y claridad. Utiliza emojis de manera moderada para hacer tus respuestas más amigables y fáciles de leer. Responde de manera concisa basándote EXCLUSIVAMENTE en la siguiente base de conocimiento. Si la información no está en la base, indica con amabilidad que el paciente debe contactar directamente al consultorio a través de este enlace de WhatsApp: https://wa.me/593986495487 para obtener asistencia personalizada.

Base de conocimiento:
${knowledgeBase}
        
Pregunta del usuario: ${input}`,
      });
      
      const botMessage = { role: 'bot' as const, text: response.text || 'Lo siento, no pude procesar tu solicitud.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages((prev) => [...prev, { role: 'bot', text: 'Hubo un error al procesar tu mensaje. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (text: string) => {
    const whatsappUrl = "https://wa.me/593986495487";
    if (text.includes(whatsappUrl)) {
      const parts = text.split(whatsappUrl);
      return (
        <>
          {parts[0]}
          <button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-3 py-1 rounded-full text-xs font-medium mt-2 hover:bg-[#128C7E] transition-colors"
          >
            <Phone className="w-3 h-3" />
            Escríbenos por WhatsApp
          </button>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-[#E8DCC8] flex flex-col overflow-hidden"
          >
            <div className="bg-[#5D4037] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <span className="font-semibold">Asistente Virtual</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => window.open('https://wa.me/593986495487', '_blank')} className="hover:bg-white/20 p-1 rounded-full">
                  <Phone className="w-5 h-5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[#0B7B5A] text-white' : 'bg-[#F5F1E8] text-[#2C1810]'}`}>
                    {renderMessage(msg.text)}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-sm text-[#9A8178]">Escribiendo...</div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-[#E8DCC8] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2 rounded-full border border-[#E8DCC8] outline-none focus:ring-2 focus:ring-[#5D4037]"
              />
              <button onClick={handleSend} className="bg-[#5D4037] text-white p-2 rounded-full hover:bg-[#4E342E]">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0B7B5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
