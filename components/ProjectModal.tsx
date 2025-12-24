import React from 'react';
import { Project } from '../types';
import { X, Github, ExternalLink, Layers, Tag } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-primary transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="relative h-64 md:h-80 w-full">
           <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:left-10">
            <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full mb-3">
              {project.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                ภาพรวมโปรเจกต์
              </h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                {project.longDescription}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <Layers className="text-primary" size={20} /> เทคโนโลยีที่ใช้
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">ลิงก์</h3>
              <div className="space-y-3">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700 p-3 rounded-lg transition-all w-full border border-slate-700 hover:border-primary"
                >
                  <Github size={20} />
                  <span>ดูซอร์สโค้ด</span>
                </a>
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-slate-700 p-3 rounded-lg transition-all w-full border border-slate-700 hover:border-secondary"
                  >
                    <ExternalLink size={20} />
                    <span>ดูตัวอย่างงานจริง</span>
                  </a>
                )}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Tag size={18} className="text-secondary" /> แท็ก
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs text-secondary bg-purple-900/30 px-2 py-1 rounded border border-purple-900/50">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};