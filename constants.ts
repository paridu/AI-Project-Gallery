import { Project, Category } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ระบบจดจำป้ายจราจร (Traffic Sign Recognition)',
    description: 'โมเดล CNN สำหรับจำแนกป้ายจราจรเพื่อยานยนต์ไร้คนขับ',
    longDescription: 'โปรเจกต์นี้ใช้ Convolutional Neural Network (CNN) ที่ฝึกฝนด้วยชุดข้อมูล German Traffic Sign Recognition Benchmark (GTSRB) เพื่อจำแนกป้ายจราจรประเภทต่างๆ ด้วยความแม่นยำสูงกว่า 98% ซึ่งเป็นองค์ประกอบสำคัญสำหรับระบบยานยนต์ไร้คนขับและการจราจรทางบก',
    category: Category.DL,
    tags: ['CNN', 'TensorFlow', 'Computer Vision'],
    imageUrl: 'https://picsum.photos/600/400?random=1',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Pandas']
  },
  {
    id: '2',
    title: 'ระบบแนะนำภาพยนตร์ (Movie Recommendation System)',
    description: 'ระบบแนะนำหนังส่วนบุคคลโดยใช้เทคนิค Collaborative Filtering',
    longDescription: 'การใช้งานระบบแนะนำ (Recommendation Engine) โดยใช้วิธี Collaborative Filtering ทั้งแบบ User-based และ Item-based ระบบจะวิเคราะห์รูปแบบการให้คะแนนของผู้ใช้เพื่อทำนายความน่าจะเป็นที่จะชอบภาพยนตร์เรื่องใหม่ แก้ปัญหา Cold Start ด้วยวิธีการแบบผสมผสาน',
    category: Category.ML,
    tags: ['Scikit-learn', 'Recommender Systems', 'Data Mining'],
    imageUrl: 'https://picsum.photos/600/400?random=2',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['Python', 'Scikit-learn', 'NumPy', 'Flask']
  },
  {
    id: '3',
    title: 'Gemini Chatbot Assistant',
    description: 'อินเทอร์เฟซ AI สนทนาที่ขับเคลื่อนโดย Gemini API ของ Google',
    longDescription: 'แอปพลิเคชันนี้สาธิตความสามารถของ Large Language Models (LLMs) โดยการเชื่อมต่อกับ Gemini API รองรับการสนทนาตามบริบท การเขียนโค้ด และการช่วยเขียนเชิงสร้างสรรค์ พร้อมหน้าจอผู้ใช้ React ที่ทันสมัย',
    category: Category.GENAI,
    tags: ['LLM', 'Gemini API', 'React'],
    imageUrl: 'https://picsum.photos/600/400?random=3',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['TypeScript', 'React', 'Google GenAI SDK', 'Tailwind']
  },
  {
    id: '4',
    title: 'ทำนายราคาหุ้น (Stock Price Predictor)',
    description: 'การพยากรณ์ข้อมูลอนุกรมเวลาสำหรับแนวโน้มตลาดหุ้นโดยใช้ LSTM',
    longDescription: 'ใช้เครือข่าย Long Short-Term Memory (LSTM) เพื่อวิเคราะห์ข้อมูลราคาหุ้นในอดีต โมเดลจะจับความสัมพันธ์ของช่วงเวลาเพื่อพยากรณ์ราคาปิดในอนาคต แสดงผลด้วยกราฟแบบโต้ตอบ',
    category: Category.DL,
    tags: ['LSTM', 'Finance', 'Time Series'],
    imageUrl: 'https://picsum.photos/600/400?random=4',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['Python', 'Keras', 'Matplotlib', 'Yahoo Finance API']
  },
  {
    id: '5',
    title: 'Neural Style Transfer',
    description: 'ประยุกต์สไตล์ศิลปะจากภาพหนึ่งไปยังเนื้อหาของอีกภาพหนึ่ง',
    longDescription: 'โปรเจกต์ Deep Learning ที่ใช้สถาปัตยกรรม VGG19 โดยแยกการแทนค่าของเนื้อหา (Content) และสไตล์ (Style) ในโครงข่ายเพื่อสังเคราะห์ภาพใหม่ที่รวมเนื้อหาของภาพถ่ายเข้ากับสไตล์ของภาพวาด (เช่น Starry Night)',
    category: Category.GENAI,
    tags: ['GAN', 'Art', 'Image Processing'],
    imageUrl: 'https://picsum.photos/600/400?random=5',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['PyTorch', 'TorchVision', 'PIL']
  },
  {
    id: '6',
    title: 'แดชบอร์ดวิเคราะห์อารมณ์ (Sentiment Analysis)',
    description: 'ติดตามอารมณ์ความรู้สึกบนโซเชียลมีเดียแบบเรียลไทม์ด้วย NLP',
    longDescription: 'ไปป์ไลน์ NLP ที่ประมวลผลข้อความดิบจากฟีดโซเชียลมีเดียเพื่อระบุขั้วอารมณ์ (บวก, ลบ, กลาง) แสดงภาพแนวโน้มตามเวลาเพื่อตรวจจับการเปลี่ยนแปลงความรู้สึกของสาธารณชน',
    category: Category.NLP,
    tags: ['NLP', 'NLTK', 'Visualization'],
    imageUrl: 'https://picsum.photos/600/400?random=6',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['Python', 'NLTK', 'D3.js', 'FastAPI']
  },
  {
    id: '7',
    title: 'ตรวจจับหน้ากากอนามัย (Face Mask Detection)',
    description: 'ระบบตรวจจับการสวมใส่หน้ากากอนามัยแบบเรียลไทม์จากวิดีโอ',
    longDescription: 'ระบบ Computer Vision ที่ใช้ MobileNetV2 เพื่อตรวจจับใบหน้าและจำแนกว่าบุคคลนั้นสวมหน้ากากอนามัยหรือไม่ เหมาะสำหรับระบบรักษาความปลอดภัยและการเฝ้าระวังด้านสุขภาพ',
    category: Category.CV,
    tags: ['Computer Vision', 'Deep Learning', 'Health'],
    imageUrl: 'https://picsum.photos/600/400?random=7',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Keras']
  },
  {
    id: '8',
    title: 'จำแนกตัวเลขเขียนมือ (Handwritten Digit Recognition)',
    description: 'โมเดลคลาสสิกสำหรับจำแนกตัวเลข 0-9 จากชุดข้อมูล MNIST',
    longDescription: 'โปรเจกต์พื้นฐานสำหรับการเรียนรู้ Deep Learning โดยสร้าง Neural Network เพื่ออ่านลายมือตัวเลขและแปลงเป็นข้อมูลดิจิทัล แม่นยำและรวดเร็ว',
    category: Category.DL,
    tags: ['MNIST', 'Classification', 'Neural Networks'],
    imageUrl: 'https://picsum.photos/600/400?random=8',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['Python', 'PyTorch', 'Matplotlib']
  },
  {
    id: '9',
    title: 'ตรวจจับข่าวปลอม (Fake News Detection)',
    description: 'ใช้ Machine Learning เพื่อจำแนกข่าวจริงและข่าวปลอม',
    longDescription: 'ระบบวิเคราะห์ข้อความข่าวโดยใช้เทคนิค TF-IDF Vectorization และ Passive Aggressive Classifier เพื่อระบุความน่าจะเป็นที่บทความข่าวนั้นจะเป็นข่าวปลอมหรือข่าวจริง',
    category: Category.ML,
    tags: ['NLP', 'Classification', 'Social Good'],
    imageUrl: 'https://picsum.photos/600/400?random=9',
    githubUrl: 'https://github.com/KalyanM45/AI-Project-Gallery',
    techStack: ['Python', 'Scikit-learn', 'Pandas']
  }
];
