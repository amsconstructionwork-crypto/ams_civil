'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, CheckCircle } from 'lucide-react';

type Language = 'en' | 'hi' | 'mr';

type ChatStep = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  options?: { label: string; nextStep: string; value?: string }[];
};

export default function SmartBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language | null>(null);
  const [history, setHistory] = useState<ChatStep[]>([]);
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Translations
  const t = {
    greeting: {
      en: "Hello! Welcome to AMS Civil Construction. What are you looking to build today?",
      hi: "नमस्ते! AMS Civil में आपका स्वागत है। आज आप क्या बनवाना चाहते हैं?",
      mr: "नमस्कार! AMS Civil मध्ये आपले स्वागत आहे. आज आपण काय बांधू इच्छिता?"
    },
    optNew: { en: "New Bungalow", hi: "नया बंगला", mr: "नवीन बंगला" },
    optReno: { en: "Home Renovation", hi: "घर का रिनोवेशन", mr: "घराचे नूतनीकरण" },
    optComm: { en: "Commercial Work", hi: "कमर्शियल काम", mr: "कमर्शियल काम" },
    
    renoFollowup: {
      en: "Great! Which area needs renovation?",
      hi: "बहुत बढ़िया! किस हिस्से का रिनोवेशन करना है?",
      mr: "उत्तम! कोणत्या भागाचे नूतनीकरण करायचे आहे?"
    },
    optFull: { en: "Full House", hi: "पूरा घर", mr: "संपूर्ण घर" },
    optBath: { en: "Bathroom", hi: "बाथरूम", mr: "बाथरूम" },
    optKitchen: { en: "Kitchen", hi: "किचन", mr: "किचन" },
    
    locFollowup: {
      en: "Awesome! Where is your site located in Mumbai?",
      hi: "बढ़िया! मुंबई में आपकी साइट कहाँ है?",
      mr: "छान! मुंबईत तुमची साईट कुठे आहे?"
    },
    optSouth: { en: "South Mumbai", hi: "साउथ मुंबई", mr: "दक्षिण मुंबई" },
    optWest: { en: "Western Line", hi: "वेस्टर्न लाइन", mr: "वेस्टर्न लाईन" },
    optCent: { en: "Central Line", hi: "सेंट्रल लाइन", mr: "सेंट्रल लाईन" },
    optNavi: { en: "Navi Mumbai/Thane", hi: "नवी मुंबई / ठाणे", mr: "नवी मुंबई / ठाणे" },

    final: {
      en: "Perfect. Click below to instantly connect with our senior engineer on WhatsApp to get your free estimate.",
      hi: "बिल्कुल सही! नीचे क्लिक करके हमारे सीनियर इंजीनियर से सीधे WhatsApp पर फ्री एस्टीमेट लें।",
      mr: "उत्तम! खाली क्लिक करून आमच्या सीनियर इंजिनियरशी थेट WhatsApp वर संपर्क साधा आणि मोफत एस्टीमेट मिळवा."
    },
    btnWA: { en: "Get Free Estimate on WhatsApp", hi: "WhatsApp पर फ्री एस्टीमेट लें", mr: "WhatsApp वर मोफत एस्टीमेट मिळवा" }
  };

  const getSteps = (l: Language) => ({
    start: {
      id: 'start', sender: 'bot' as const, text: t.greeting[l],
      options: [
        { label: t.optNew[l], nextStep: 'loc', value: 'New Bungalow' },
        { label: t.optReno[l], nextStep: 'reno', value: 'Renovation' },
        { label: t.optComm[l], nextStep: 'loc', value: 'Commercial Work' }
      ]
    },
    reno: {
      id: 'reno', sender: 'bot' as const, text: t.renoFollowup[l],
      options: [
        { label: t.optFull[l], nextStep: 'loc', value: 'Full House Renovation' },
        { label: t.optBath[l], nextStep: 'loc', value: 'Bathroom Renovation' },
        { label: t.optKitchen[l], nextStep: 'loc', value: 'Kitchen Renovation' }
      ]
    },
    loc: {
      id: 'loc', sender: 'bot' as const, text: t.locFollowup[l],
      options: [
        { label: t.optSouth[l], nextStep: 'final', value: 'South Mumbai' },
        { label: t.optWest[l], nextStep: 'final', value: 'Western Line' },
        { label: t.optCent[l], nextStep: 'final', value: 'Central Line' },
        { label: t.optNavi[l], nextStep: 'final', value: 'Navi Mumbai/Thane' }
      ]
    },
    final: {
      id: 'final', sender: 'bot' as const, text: t.final[l],
      options: [
        { label: t.btnWA[l], nextStep: 'wa' }
      ]
    }
  });

  // Init
  useEffect(() => {
    if (history.length === 0) {
      setHistory([{
        id: 'lang', sender: 'bot', text: 'Welcome! Choose your language / भाषा चुनें / भाषा निवडा',
        options: [
          { label: 'English', nextStep: 'en' },
          { label: 'हिंदी', nextStep: 'hi' },
          { label: 'मराठी', nextStep: 'mr' }
        ]
      }]);
    }
  }, [history.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleOptionClick = (option: { label: string; nextStep: string; value?: string }) => {
    // Add user response to history
    setHistory(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: option.label }]);

    if (['en', 'hi', 'mr'].includes(option.nextStep)) {
      const selectedLang = option.nextStep as Language;
      setLang(selectedLang);
      setTimeout(() => {
        setHistory(prev => [...prev, getSteps(selectedLang).start]);
      }, 500);
      return;
    }

    if (option.value && history.length < 5) {
      // First save is service, second is area
      if (!service) setService(option.value);
      else setArea(option.value);
    }

    if (option.nextStep === 'wa') {
      const msg = encodeURIComponent(`Hi AMS Civil, I am looking for ${service} in ${area}. I want to book a free site visit.`);
      window.open(`https://wa.me/918779391690?text=${msg}`, '_blank');
      return;
    }

    if (lang) {
      const nextStepData = getSteps(lang)[option.nextStep as keyof ReturnType<typeof getSteps>];
      if (nextStepData) {
        setTimeout(() => {
          setHistory(prev => [...prev, nextStepData]);
        }, 500);
      }
    }
  };

  return (
    <>
      <div className="fixed bottom-[100px] right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-4 w-[320px] h-[450px] max-w-[calc(100vw-32px)] bg-[#0B1120] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">AMS Assistant</h3>
                    <p className="text-white/80 text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar">
                {history.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-orange-500' : 'bg-slate-700'}`}>
                        {msg.sender === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-white" />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-orange-500 text-white rounded-br-sm' : 'bg-white/10 text-slate-200 border border-white/5 rounded-bl-sm'}`}>
                        {msg.text}
                      </div>
                    </div>

                    {msg.options && (
                      <div className="mt-3 flex flex-wrap gap-2 ml-8">
                        {msg.options.map((opt, j) => (
                          <button 
                            key={j} 
                            onClick={() => handleOptionClick(opt)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${opt.nextStep === 'wa' ? 'bg-green-600 text-white border-green-500 hover:bg-green-500 shadow-[0_0_15px_rgba(22,163,74,0.4)]' : 'border-orange-500/50 text-orange-400 hover:bg-orange-500/10'}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area (Disabled since it's rule-based, but looks real) */}
              <div className="p-3 bg-[#080D1A] border-t border-white/10 flex items-center gap-2">
                <input 
                  type="text" 
                  disabled 
                  placeholder="Select an option above..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-slate-400 focus:outline-none cursor-not-allowed"
                />
                <button disabled className="w-8 h-8 rounded-full bg-orange-500/50 flex items-center justify-center text-white cursor-not-allowed">
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggler */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 bg-gradient-to-tr from-orange-600 to-orange-400 border border-orange-300/30"
          style={{ boxShadow: isOpen ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(249,115,22,0.4)' }}
        >
          {!isOpen && <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-20" />}
          {isOpen ? <X className="text-white relative z-10" size={24} /> : <MessageSquare className="text-white relative z-10 fill-white/20" size={24} />}
        </button>
      </div>
    </>
  );
}
