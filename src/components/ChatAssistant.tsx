import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Shield,
  PhoneCall,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ChatMessage, Language, VerifiedResource } from '../types';
import { translations } from '../data/translations';

interface ChatAssistantProps {
  language: Language;
  onNavigateToTab?: (tab: string) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ language, onNavigateToTab }) => {
  const t = translations[language];

  const initialGreeting =
    language === 'ur'
      ? 'سلام! میں حفاظت اے آئی اسسٹنٹ ہوں۔ میں آپ کی ڈیجیٹل سیکیورٹی، بلیک میلنگ، نجی تصاویر کی دھمکیوں اور پاکستانی قوانین (پیکا) کے حوالے سے محفوظ رہنمائی کے لیے حاضر ہوں۔ آپ بلا جھجھک اپنا مسئلہ بیان کر سکتی ہیں، یہاں آپ کی مکمل پرائیویسی کا احترام کیا جاتا ہے۔'
      : language === 'ur-roman'
      ? 'Salam! Main HIFAZAT AI Assistant hoon. Main online harassment, blackmailing, fake accounts aur Pakistani PECA qanoon ke mutabiq aapki safe guidance ke liye tayyar hoon. Aap baghair kisi jhijhak ke apna masla describe kar sakti hain.'
      : 'Hello! I am HIFAZAT AI Assistant. I am here to help you navigate online harassment, blackmail, fake accounts, intimate photo threats, and your legal rights under Pakistani cyber law (PECA). You are safe here, and this conversation is private and anonymous.';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: initialGreeting,
      timestamp: Date.now(),
      suggestedPrompts: [
        language === 'ur' ? 'کوئی مجھے تصویریں لیک کرنے کی دھمکی دے رہا ہے' : 'Someone is blackmailing me with pictures',
        language === 'ur' ? 'میرے نام اور تصویر سے فیک اکاؤنٹ بن گیا ہے' : 'A fake profile is using my photos',
        language === 'ur' ? 'میرا انسٹاگرام یا واٹس ایپ ہیک ہو گیا ہے' : 'My account was hacked',
        language === 'ur' ? 'این سی سی آئی اے (NCCIA) میں شکایت کیسے کریں؟' : 'How do I report to NCCIA officially?'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    language === 'ur' ? 'کوئی مجھے تصویریں لیک کرنے کی دھمکی دے رہا ہے' : 'Someone is threatening to leak my pictures',
    language === 'ur' ? 'میرے نام سے جعلی پروفائل بن گیا ہے' : 'A fake profile is using my photos on Instagram',
    language === 'ur' ? 'کوئی مجھ سے بلیک میل کر کے پیسے مانگ رہا ہے' : 'Someone is blackmailing me for money',
    language === 'ur' ? 'میرا سوشل میڈیا اکاؤنٹ ہیک ہو گیا ہے' : 'My account was hacked and 2FA bypassed',
    language === 'ur' ? 'ثبوت محفوظ کرنے کا صحیح طریقہ کیا ہے؟' : 'How do I preserve evidence properly for NCCIA?',
    language === 'ur' ? 'پیکا (PECA) 2016 کے تحت میری کیا قانونی حفاظت ہے؟' : 'What are my legal rights under PECA in Pakistan?'
  ];

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setLastError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          })),
          language,
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: data.text || 'I could not generate a response at this moment.',
        timestamp: Date.now(),
        suggestedPrompts: data.suggestedFollowUps,
        verifiedReferences: data.verifiedResources?.map((r: VerifiedResource) => ({
          title: r.name,
          url: r.officialUrl
        }))
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setLastError('Unable to connect to the assistant right now. You can retry, or call the DRF helpline at 0800-39393.');
      
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          language === 'ur'
            ? 'معذرت، رابطہ قائم کرنے میں عارضی دشواری پیش آئی ہے۔ براہ کرم "دوبارہ کوشش کریں" پر کلک کریں یا براہ راست ڈیجیٹل رائٹس فاؤنڈیشن کی مفت ہیلپ لائن 0800-39393 پر رابطہ کریں۔'
            : 'I encountered a connection error. Please tap Retry or call the confidential DRF Cyber Harassment Helpline at 0800-39393 (Mon-Fri 9am-5pm PKT).',
        timestamp: Date.now(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        role: 'assistant',
        content: initialGreeting,
        timestamp: Date.now(),
        suggestedPrompts: [
          language === 'ur' ? 'کوئی مجھے تصویریں لیک کرنے کی دھمکی دے رہا ہے' : 'Someone is blackmailing me with pictures',
          language === 'ur' ? 'این سی سی آئی اے (NCCIA) میں شکایت کیسے کریں؟' : 'How do I report to NCCIA officially?'
        ]
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] min-h-[580px] max-w-4xl mx-auto bg-white rounded-3xl border border-[#D4EBE2] shadow-sm overflow-hidden">
      {/* Assistant Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#F0F8F5] border-b border-[#D4EBE2]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#174E4A] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-5 h-5 text-[#80C5B0]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-[#174E4A]">HIFAZAT AI Assistant</h2>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#D4EBE2] text-[#174E4A]">
                Gemini Powered
              </span>
            </div>
            <p className="text-xs text-[#2E5853]">
              {language === 'ur' ? 'خفیہ اور نجی سیشن • کوئی ڈیٹا محفوظ نہیں کیا جاتا' : 'Private & anonymous session • Zero logs retained'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#174E4A] hover:bg-[#D4EBE2] transition-colors border border-[#D4EBE2]"
            title={t.clearChat}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.newChat}</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-white">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 text-sm sm:text-[15px] leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-[#174E4A] text-white rounded-tr-xs'
                    : message.isError
                    ? 'bg-amber-50 text-amber-950 border border-amber-200 rounded-tl-xs'
                    : 'bg-[#F0F8F5] text-[#133834] border border-[#D4EBE2] rounded-tl-xs'
                }`}
              >
                {/* Content rendering with linebreaks */}
                <div className="whitespace-pre-wrap font-normal">
                  {message.content}
                </div>

                {/* Verified references badge if present */}
                {message.verifiedReferences && message.verifiedReferences.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#D4EBE2] space-y-1.5">
                    <p className="text-xs font-bold text-[#174E4A] flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#80C5B0]" />
                      <span>{language === 'ur' ? 'تصدیق شدہ سرکاری ذرائع:' : 'Verified Official Sources:'}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {message.verifiedReferences.map((ref, idx) => (
                        <a
                          key={idx}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#80C5B0] text-[#174E4A] text-xs font-semibold hover:bg-[#D4EBE2] transition-colors"
                        >
                          <span>{ref.title}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assistant footer actions */}
                {!isUser && (
                  <div className="mt-3 flex items-center justify-between text-xs text-[#2E5853] pt-2 border-t border-[#D4EBE2]/60">
                    <span>
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <button
                      onClick={() => handleCopyMessage(message.id, message.content)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-white text-[#174E4A] font-medium transition-colors"
                      title={t.copyPlan}
                    >
                      {copiedId === message.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{t.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.copyPlan}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Follow-up suggestions from model */}
              {message.suggestedPrompts && message.suggestedPrompts.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[85%]">
                  {message.suggestedPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(p)}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#D4EBE2]/50 hover:bg-[#D4EBE2] text-[#174E4A] font-medium border border-[#80C5B0]/50 transition-colors text-left"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] max-w-sm text-sm text-[#2E5853]">
            <div className="flex space-x-1.5">
              <div className="w-2.5 h-2.5 bg-[#80C5B0] rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-[#174E4A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-2.5 h-2.5 bg-[#80C5B0] rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            <span className="font-medium text-xs">
              {language === 'ur'
                ? 'حفاظت اے آئی جواب تیار کر رہا ہے...'
                : 'HIFAZAT AI is reasoning with safety guidelines...'}
            </span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested prompts strip if only initial message */}
      {messages.length === 1 && (
        <div className="px-5 py-3 bg-[#F0F8F5]/80 border-t border-[#D4EBE2]">
          <p className="text-xs font-bold text-[#174E4A] mb-2">{t.chatSuggestedHeading}</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-[#D4EBE2] text-[#174E4A] border border-[#D4EBE2] font-medium transition-all shadow-2xs hover:shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form Bar */}
      <div className="p-4 bg-white border-t border-[#D4EBE2]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatPlaceholder}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] focus:border-[#174E4A] focus:outline-hidden text-sm sm:text-base text-[#133834] placeholder-[#2E5853]/60 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 rounded-2xl bg-[#174E4A] hover:bg-[#113C39] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#80C5B0]"
          >
            <span>{t.chatSend}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-center text-[#2E5853] mt-2">
          {t.chatDisclaimer}
        </p>
      </div>
    </div>
  );
};
