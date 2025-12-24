import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ 
  options, 
  selected, 
  onChange, 
  placeholder = 'Select...',
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    const newSelected = selected.includes(option)
      ? selected.filter(item => item !== option)
      : [...selected, option];
    onChange(newSelected);
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== option));
  };

  return (
    <div className="relative w-full md:w-64" ref={containerRef}>
      {label && <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>}
      
      <div 
        className={`bg-slate-800/50 border ${isOpen ? 'border-primary ring-1 ring-primary' : 'border-slate-700'} rounded-xl p-2 min-h-[42px] flex flex-wrap gap-2 items-center cursor-pointer hover:bg-slate-800 transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-slate-500 text-sm px-2">{placeholder}</span>
        ) : (
          selected.map(item => (
            <span 
              key={item} 
              className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-md flex items-center gap-1 border border-primary/30"
            >
              {item}
              <button 
                onClick={(e) => removeOption(item, e)}
                className="hover:text-white rounded-full p-0.5"
              >
                <X size={10} />
              </button>
            </span>
          ))
        )}
        <div className="ml-auto px-2 text-slate-500">
          <ChevronDown size={16} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
          {options.map(option => (
            <div 
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between hover:bg-slate-800 transition-colors ${selected.includes(option) ? 'text-white bg-slate-800/50' : 'text-slate-300'}`}
              onClick={() => toggleOption(option)}
            >
              <span>{option}</span>
              {selected.includes(option) && <Check size={14} className="text-primary" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
