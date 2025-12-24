import React, { useState, useMemo } from 'react';
import { PROJECTS } from './constants';
import { Category, Project } from './types';
import { ProjectCard } from './components/ProjectCard';
import { AIAssistant } from './components/AIAssistant';
import { ProjectModal } from './components/ProjectModal';
import { MultiSelect } from './components/MultiSelect';
import { Sparkles, Search, Filter, Github, Bot, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extract unique tech stacks
  const allTechStacks = useMemo(() => {
    const techs = new Set<string>();
    PROJECTS.forEach(p => p.techStack.forEach(t => techs.add(t)));
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTech = selectedTechs.length === 0 || 
                          project.techStack.some(tech => selectedTechs.includes(tech));
      
      return matchesCategory && matchesSearch && matchesTech;
    });
  }, [selectedCategory, searchQuery, selectedTechs]);

  const categories = ['All', ...Object.values(Category).filter(c => c !== 'All')];

  // Helper to get Thai label for 'All'
  const getCategoryLabel = (cat: string) => cat === 'All' ? 'ทั้งหมด' : cat;

  return (
    <div className="min-h-screen bg-dark text-slate-100 font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-dark/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                AI Gallery
              </span>
            </div>

            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <a href="https://github.com/KalyanM45/AI-Project-Gallery" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white">
                  <Github size={18} />
                  <span>GitHub Repo</span>
                </a>
                <button 
                  onClick={() => setIsAssistantOpen(true)}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-primary px-4 py-2 rounded-full border border-primary/20 hover:border-primary/50 transition-all shadow-lg hover:shadow-primary/20"
                >
                  <Bot size={18} />
                  <span>ถาม AI ผู้ช่วย</span>
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400 hover:text-white">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
             <a href="https://github.com/KalyanM45/AI-Project-Gallery" target="_blank" rel="noreferrer" className="flex items-center gap-2 w-full p-2 text-slate-300 hover:text-white">
                <Github size={18} /> GitHub Repo
             </a>
             <button 
                onClick={() => { setIsAssistantOpen(true); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 w-full p-2 text-primary hover:text-indigo-400"
              >
                <Bot size={18} /> ถาม AI ผู้ช่วย
              </button>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            สำรวจโลกแห่ง <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">ปัญญาประดิษฐ์ (AI)</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            รวบรวมโปรเจกต์ Machine Learning, Deep Learning และ Generative AI ที่คัดสรรมาอย่างดี 
            ศึกษาโค้ด ดูตัวอย่างการทำงาน และจุดประกายไอเดียใหม่ๆ ของคุณ
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center mb-10 sticky top-20 z-30 py-4 bg-dark/95 backdrop-blur-sm -mx-4 px-4 xl:mx-0 xl:px-0">
          <div className="flex items-center bg-slate-800/50 p-1 rounded-xl border border-slate-700 w-full xl:w-auto overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category | 'All')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
            <MultiSelect 
              options={allTechStacks}
              selected={selectedTechs}
              onChange={setSelectedTechs}
              placeholder="เลือก Tech Stack..."
            />
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="ค้นหาโปรเจกต์, แท็ก..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={setSelectedProject}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-500">
              <Filter size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl">ไม่พบโปรเจกต์ที่ตรงกับเงื่อนไข</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All'); 
                  setSearchQuery('');
                  setSelectedTechs([]);
                }}
                className="mt-4 text-primary hover:underline"
              >
                ล้างตัวกรอง
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 mb-4">
            สร้างด้วย React, Tailwind และ Gemini API
          </p>
          <div className="flex justify-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
            <a href="https://github.com/KalyanM45/AI-Project-Gallery" className="text-slate-400 hover:text-white">
              <Github size={24} />
            </a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <AIAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />
      
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* FAB for Mobile Assistant */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="md:hidden fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-2xl shadow-primary/40 z-40 hover:scale-110 transition-transform active:scale-95"
      >
        <Bot size={28} />
      </button>
    </div>
  );
};

export default App;