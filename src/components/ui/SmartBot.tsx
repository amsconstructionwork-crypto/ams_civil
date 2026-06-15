'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, PhoneCall } from 'lucide-react';

type Language = 'en' | 'hi' | 'mr';

type ChatStep = {
  id: string;
  sender: 'bot' | 'user';
  text: string | React.ReactNode;
  time: string;
  options?: { label: string; nextStep: string; value?: string }[];
  isTyping?: boolean;
};

const formatTime = () => {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

export default function SmartBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language | null>(null);
  const [history, setHistory] = useState<ChatStep[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Form State
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Input State
  const [inputValue, setInputValue] = useState('');
  const [inputMode, setInputMode] = useState<'none' | 'name' | 'phone'>('none');

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

    askName: {
      en: "Perfect! Could I please have your name?",
      hi: "बिल्कुल सही! क्या मैं आपका शुभ नाम जान सकता हूँ?",
      mr: "उत्तम! कृपया तुमचे नाव सांगू शकता का?"
    },
    askPhone: {
      en: "Thanks {name}! Lastly, please share your 10-digit WhatsApp number so our senior engineer can send you an estimate.",
      hi: "धन्यवाद {name}! कृपया अपना 10 अंकों का WhatsApp नंबर बताएं ताकि हमारे इंजीनियर आपको एस्टीमेट भेज सकें।",
      mr: "धन्यवाद {name}! कृपया तुमचा 10 अंकी WhatsApp नंबर सांगा जेणेकरून आमचे इंजिनियर तुम्हाला एस्टीमेट पाठवू शकतील."
    },
    final: {
      en: "Thank you {name}! Click the button below to connect with us on WhatsApp immediately.",
      hi: "धन्यवाद {name}! तुरंत WhatsApp पर जुड़ने के लिए नीचे दिए गए बटन पर क्लिक करें।",
      mr: "धन्यवाद {name}! त्वरित WhatsApp वर जोडले जाण्यासाठी खालील बटणावर क्लिक करा."
    },
    btnWA: { en: "Connect on WhatsApp", hi: "WhatsApp पर जुड़ें", mr: "WhatsApp वर संपर्क साधा" }
  };

  const getSteps = (l: Language, nameVal = '') => ({
    start: {
      id: 'start', sender: 'bot' as const, text: t.greeting[l], time: formatTime(),
      options: [
        { label: t.optNew[l], nextStep: 'loc', value: 'New Bungalow' },
        { label: t.optReno[l], nextStep: 'reno', value: 'Renovation' },
        { label: t.optComm[l], nextStep: 'loc', value: 'Commercial Work' }
      ]
    },
    reno: {
      id: 'reno', sender: 'bot' as const, text: t.renoFollowup[l], time: formatTime(),
      options: [
        { label: t.optFull[l], nextStep: 'loc', value: 'Full House Renovation' },
        { label: t.optBath[l], nextStep: 'loc', value: 'Bathroom Renovation' },
        { label: t.optKitchen[l], nextStep: 'loc', value: 'Kitchen Renovation' }
      ]
    },
    loc: {
      id: 'loc', sender: 'bot' as const, text: t.locFollowup[l], time: formatTime(),
      options: [
        { label: t.optSouth[l], nextStep: 'askName', value: 'South Mumbai' },
        { label: t.optWest[l], nextStep: 'askName', value: 'Western Line' },
        { label: t.optCent[l], nextStep: 'askName', value: 'Central Line' },
        { label: t.optNavi[l], nextStep: 'askName', value: 'Navi Mumbai/Thane' }
      ]
    },
    askName: {
      id: 'askName', sender: 'bot' as const, text: t.askName[l], time: formatTime()
    },
    askPhone: {
      id: 'askPhone', sender: 'bot' as const, text: t.askPhone[l].replace('{name}', nameVal), time: formatTime()
    },
    final: {
      id: 'final', sender: 'bot' as const, text: t.final[l].replace('{name}', nameVal), time: formatTime(),
      options: [
        { label: t.btnWA[l], nextStep: 'wa' }
      ]
    }
  });

  const pushBotMessage = (stepData: ChatStep, actionCb?: () => void) => {
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      setHistory(prev => [...prev, stepData]);
      if (actionCb) actionCb();
    }, 1200); // Premium typing delay
  };

  // Init
  useEffect(() => {
    if (history.length === 0) {
      setHistory([{
        id: 'lang', sender: 'bot', text: 'Welcome! Choose your language / भाषा चुनें / भाषा निवडा', time: formatTime(),
        options: [
          { label: 'English', nextStep: 'en' },
          { label: 'हिंदी', nextStep: 'hi' },
          { label: 'मराठी', nextStep: 'mr' }
        ]
      }]);
    }
  }, [history.length]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isBotTyping]);

  const handleOptionClick = (option: { label: string; nextStep: string; value?: string }) => {
    setHistory(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: option.label, time: formatTime() }]);

    if (['en', 'hi', 'mr'].includes(option.nextStep)) {
      const selectedLang = option.nextStep as Language;
      setLang(selectedLang);
      pushBotMessage(getSteps(selectedLang).start);
      return;
    }

    if (option.value && history.length <= 5) {
      if (!service) setService(option.value);
      else setArea(option.value);
    }

    if (option.nextStep === 'wa') {
      const msg = encodeURIComponent(`Hi AMS Civil, I am ${customerName} (${customerPhone}). I am looking for ${service} in ${area}. I want to book a free site visit.`);
      window.open(`https://wa.me/918779391690?text=${msg}`, '_blank');
      return;
    }

    if (lang) {
      const nextStepData = getSteps(lang, customerName)[option.nextStep as keyof ReturnType<typeof getSteps>];
      if (nextStepData) {
        pushBotMessage(nextStepData, () => {
          if (option.nextStep === 'askName') setInputMode('name');
          if (option.nextStep === 'askPhone') setInputMode('phone');
        });
      }
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !lang) return;

    const text = inputValue.trim();
    setHistory(prev => [...prev, { id: Date.now().toString(), sender: 'user', text, time: formatTime() }]);
    setInputValue('');
    setInputMode('none');

    if (inputMode === 'name') {
      setCustomerName(text);
      pushBotMessage(getSteps(lang, text).askPhone, () => setInputMode('phone'));
    } else if (inputMode === 'phone') {
      setCustomerPhone(text);
      pushBotMessage(getSteps(lang, customerName).final);
    }
  };

  return (
    <>
      <div className="fixed bottom-[100px] right-6 z-50 flex flex-col items-end pointer-events-none">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="mb-4 w-[340px] h-[500px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto"
            >
              {/* Premium Header */}
              <div className="bg-[#0f172a] p-4 flex items-center justify-between shadow-md z-10 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl pointer-events-none" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-full flex items-center justify-center border-2 border-white/10 shadow-lg">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm tracking-wide">AMS Expert</h3>
                    <p className="text-green-400 text-[11px] flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Online
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors relative z-10 p-1">
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 bg-slate-50 no-scrollbar relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {history.map((msg, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col relative z-10 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-slate-800' : 'bg-orange-500'}`}>
                        {msg.sender === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} className="text-white" />}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className={`px-4 py-2.5 text-[13px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-slate-800 text-white rounded-2xl rounded-br-none' : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-none'}`}>
                          {msg.text}
                        </div>
                        <span className={`text-[9px] text-slate-400 font-medium px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>

                    {msg.options && (
                      <div className="mt-3 flex flex-wrap gap-2 ml-8">
                        {msg.options.map((opt, j) => (
                          <button 
                            key={j} 
                            onClick={() => handleOptionClick(opt)}
                            className={`text-xs px-4 py-2 rounded-full border transition-all font-medium ${opt.nextStep === 'wa' ? 'bg-green-600 text-white border-green-500 hover:bg-green-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2' : 'bg-white border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 shadow-sm'}`}
                          >
                            {opt.nextStep === 'wa' && <PhoneCall size={14} />} {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isBotTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Premium Input Area */}
              <div className="p-3 bg-white border-t border-slate-100">
                <form onSubmit={handleTextSubmit} className="relative flex items-center gap-2">
                  <input 
                    type={inputMode === 'phone' ? 'tel' : 'text'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={inputMode === 'none' || isBotTyping}
                    placeholder={inputMode === 'name' ? 'Type your name...' : inputMode === 'phone' ? 'Type 10-digit number...' : 'Select an option above...'}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all disabled:opacity-50 disabled:bg-slate-100"
                  />
                  <button 
                    type="submit"
                    disabled={inputMode === 'none' || !inputValue.trim() || isBotTyping} 
                    className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white disabled:opacity-50 disabled:bg-slate-300 transition-colors shadow-md"
                  >
                    <Send size={16} className={inputMode !== 'none' && inputValue.trim() ? "translate-x-0.5" : ""} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggler with Badge */}
        <div className="relative pointer-events-auto">
          {!isOpen && (
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-2 border-[#0B1120] z-10 flex items-center justify-center"
            >
              <span className="text-[10px] text-white font-bold">1</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-[0_10px_25px_rgba(249,115,22,0.4)] hover:scale-110 active:scale-95 bg-gradient-to-tr from-orange-600 to-orange-400 border border-orange-300/30"
          >
            {!isOpen && <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-20" />}
            {isOpen ? <X className="text-white relative z-10" size={28} /> : <MessageSquare className="text-white relative z-10 fill-white/20" size={28} />}
          </button>
        </div>
      </div>
    </>
  );
}
