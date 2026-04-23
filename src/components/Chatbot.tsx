import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { services } from '../data/servicesData';
import { faqs } from '../data/chatbotKnowledge';
import { blogArticles } from '../data/blogData';

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

  const jaccardSimilarity = (s1: string, s2: string) => {
    const set1 = new Set(s1.toLowerCase().split(/\s+/));
    const set2 = new Set(s2.toLowerCase().split(/\s+/));
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    return intersection.size / union.size;
  };

  const findAnswer = (input: string) => {
    let bestMatch = { answer: "", score: 0 };
    const threshold = 0.1; // Lower threshold to allow better matching

    // 1. Check FAQs
    faqs.forEach(faq => {
      const score = jaccardSimilarity(input, faq.question);
      if (score > bestMatch.score) {
        bestMatch = { answer: faq.answer, score };
      }
    });

    // 2. Check Services
    services.forEach(service => {
      const score = jaccardSimilarity(input, service.title + " " + service.desc);
      if (score > bestMatch.score) {
        bestMatch = { answer: service.longDesc, score };
      }
    });

    // 3. Check Blog
    blogArticles.forEach(article => {
      const score = jaccardSimilarity(input, article.title + " " + article.excerpt);
      if (score > bestMatch.score) {
        bestMatch = { answer: article.excerpt + " (Puedes leer más en nuestro blog)", score };
      }
    });
    
    if (bestMatch.score >= threshold) {
      return bestMatch.answer;
    }

    // Default response if no good match
    return "Como asistente del Dr. Damián Montes, estoy aquí para ayudarte. Mi especialidad es la urología. ¿Te gustaría saber más sobre nuestros servicios, tienes alguna duda médica o prefieres agendar una cita por WhatsApp? https://wa.me/593986495487";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate delay for natural typing feel
    await new Promise(resolve => setTimeout(resolve, 600));

    const answer = findAnswer(input);

    setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
    setIsLoading(false);
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
