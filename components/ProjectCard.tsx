import React from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Code2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="group relative bg-card rounded-xl overflow-hidden border border-slate-700 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(project)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-slate-700">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-slate-700 pt-4 mt-auto">
          <div className="flex space-x-3">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={18} />
            </a>
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
          <button className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            รายละเอียด <Code2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};