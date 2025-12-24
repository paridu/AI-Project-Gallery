export enum Category {
  ALL = 'ทั้งหมด',
  ML = 'Machine Learning',
  DL = 'Deep Learning',
  GENAI = 'Generative AI',
  NLP = 'NLP',
  CV = 'Computer Vision'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Category;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  demoUrl?: string;
  techStack: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
