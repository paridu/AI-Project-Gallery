import React, { useState, useRef, useEffect } from 'react';
import { Chat } from '@google/genai';
import { createChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';
import { X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "สวัสดีครับ! ผมคือผู้ช่วย AI Gallery ให้ผมช่วยแนะนำโปรเจกต์ อธิบายเทคนิค หรือช่วยคิดไอเดียสำหรับงานของคุณไหมครับ?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatSessionRef.current) {
      chatSessionRef.current = createChatSession();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
         // Re-attempt init if session lost
         chatSessionRef.current = createChatSession();
      }

      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessageStream({ message: userMsg.text });
        
        let fullText = '';
        const botMsgId = (Date.now() + 1).toString();
        
        // Add placeholder
        setMessages(prev => [...prev, { id: botMsgId, role: 'model', text: '' }]);

        for await (const chunk of result) {
            const text = chunk.text; // Access text property directly
            if (text) {
                fullText += text;
                setMessages(prev => 
                    prev.map(msg => msg.id === botMsgId ? { ...msg, text: fullText } : msg)
                );
            }
        }
      } else {
        throw new Error("Could not connect to AI service.");
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'model', 
        text: "ขออภัยครับ เกิดปัญหาในการเชื่อมต่อกับระบบ AI กรุณาตรวจสอบ API Key หรือลองใหม่อีกครั้งในภายหลัง",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-700 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles size={20} />
          <h2 className="font-bold text-lg">AI ผู้ช่วยอัจฉริยะ</h2>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-primary text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}
              ${msg.isError ? 'bg-red-900/50 border-red-700 text-red-200' : ''}
            `}>
              <div className="flex items-center gap-2 mb-1 opacity-70 text-xs">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span>{msg.role === 'user' ? 'คุณ' : 'Gemini'}</span>
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                 <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl p-3 border border-slate-700 rounded-bl-none flex items-center gap-2">
              <Loader2 className="animate-spin text-primary" size={16} />
              <span className="text-xs text-slate-400">กำลังคิด...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700 bg-slate-800">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="ถามเกี่ยวกับโปรเจกต์ AI..."
            className="w-full bg-slate-900 text-white rounded-xl pl-4 pr-12 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-primary border border-slate-700 h-12 max-h-32"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">
          ขับเคลื่อนโดย Gemini 3 Flash AI อาจมีข้อผิดพลาด
        </p>
      </div>
    </div>
  );
};