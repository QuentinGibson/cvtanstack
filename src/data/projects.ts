export interface Project {
  id: number;
  title: string;
  category: string;
  img: string;
  isTall: boolean;
  description: string;
  client?: string;
  date?: string;
  skills?: string[];
}

export const portfolioItems: Project[] = [
  { 
    id: 1, 
    title: 'Over Thinking', 
    category: 'Photography', 
    img: '/upload/portfolio/1.jpg', 
    isTall: false,
    description: 'A deep dive into the photographic exploration of overthinking. This project captures the essence of human thought through a series of evocative images.',
    client: 'Nunforest',
    date: '10 April 2018',
    skills: ['Photography', 'Design', 'Creative']
  },
  { 
    id: 2, 
    title: 'Silent Thoughts', 
    category: 'Photography', 
    img: '/upload/portfolio/2.jpg', 
    isTall: false,
    description: 'Capturing the silence of the mind in a busy world. This photographic journey explores the contrast between inner peace and outer chaos.',
    client: 'Art Studio',
    date: '15 May 2018',
    skills: ['Photography', 'Retouching']
  },
  { 
    id: 3, 
    title: 'Modern Architecture', 
    category: 'Architecture', 
    img: '/upload/portfolio/3.jpg', 
    isTall: true,
    description: 'An architectural photography series focusing on modern, minimalist building designs and their interaction with natural light.',
    client: 'BuildCo',
    date: '22 June 2018',
    skills: ['Architecture', 'Photography']
  },
  { 
    id: 4, 
    title: 'Abstract Concepts', 
    category: 'Design', 
    img: '/upload/portfolio/4.jpg', 
    isTall: false,
    description: 'Abstract design concepts brought to life through a mixture of digital art and photography.',
    client: 'Creative Agency',
    date: '05 July 2018',
    skills: ['Design', 'Digital Art']
  },
  { 
    id: 5, 
    title: 'Nature Calls', 
    category: 'Photography', 
    img: '/upload/portfolio/5.jpg', 
    isTall: false,
    description: 'A breathtaking look at untouched landscapes, highlighting the raw beauty of nature.',
    client: 'National Geo',
    date: '18 August 2018',
    skills: ['Photography', 'Nature']
  },
  { 
    id: 6, 
    title: 'Urban Jungle', 
    category: 'Photography', 
    img: '/upload/portfolio/6.jpg', 
    isTall: false,
    description: 'Street photography capturing the vibrant life and architecture of the city.',
    client: 'City Magazine',
    date: '02 September 2018',
    skills: ['Photography', 'Urban']
  },
  { 
    id: 8, 
    title: 'Product Mockups', 
    category: 'Design', 
    img: '/upload/portfolio/8.jpg', 
    isTall: false,
    description: 'High-quality product mockups designed to showcase branding and packaging in realistic environments.',
    client: 'Brand Inc',
    date: '14 October 2018',
    skills: ['Design', 'Mockups']
  },
  { 
    id: 7, 
    title: 'Portrait Series', 
    category: 'Photography', 
    img: '/upload/portfolio/7.jpg', 
    isTall: true,
    description: 'An intimate portrait series focusing on raw emotion and natural lighting.',
    client: 'Fashion Week',
    date: '29 November 2018',
    skills: ['Photography', 'Portraits']
  },
  { 
    id: 9, 
    title: 'Minimalist Branding', 
    category: 'Design', 
    img: '/upload/portfolio/9.jpg', 
    isTall: false,
    description: 'A complete branding package featuring a minimalist logo, typography, and color palette.',
    client: 'Startup X',
    date: '11 December 2018',
    skills: ['Branding', 'Design']
  },
  { 
    id: 10, 
    title: 'Night Escapades', 
    category: 'Photography', 
    img: '/upload/portfolio/10.jpg', 
    isTall: false,
    description: 'Exploring the city after dark through long-exposure photography and neon lights.',
    client: 'Nightlife Co',
    date: '20 January 2019',
    skills: ['Photography', 'Night']
  },
]
