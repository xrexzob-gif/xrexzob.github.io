import { TechStackItem } from '../types';

export const TECH_STACKS: TechStackItem[] = [
  // Frontend
  { name: 'React', category: 'frontend', badgeSlug: 'React-20232A?logo=react&logoColor=61DAFB', color: '#61DAFB', logo: 'react' },
  { name: 'Next.js', category: 'frontend', badgeSlug: 'Next.js-000000?logo=next.js&logoColor=white', color: '#000000', logo: 'nextdotjs' },
  { name: 'TypeScript', category: 'frontend', badgeSlug: 'TypeScript-3178C6?logo=typescript&logoColor=white', color: '#3178C6', logo: 'typescript' },
  { name: 'JavaScript', category: 'frontend', badgeSlug: 'JavaScript-F7DF1E?logo=javascript&logoColor=black', color: '#F7DF1E', logo: 'javascript' },
  { name: 'TailwindCSS', category: 'frontend', badgeSlug: 'TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white', color: '#06B6D4', logo: 'tailwindcss' },
  { name: 'Vue.js', category: 'frontend', badgeSlug: 'Vue.js-35495E?logo=vuedotjs&logoColor=4FC08D', color: '#4FC08D', logo: 'vuedotjs' },
  { name: 'HTML5', category: 'frontend', badgeSlug: 'HTML5-E34F26?logo=html5&logoColor=white', color: '#E34F26', logo: 'html5' },
  { name: 'CSS3', category: 'frontend', badgeSlug: 'CSS3-1572B6?logo=css3&logoColor=white', color: '#1572B6', logo: 'css3' },
  { name: 'Svelte', category: 'frontend', badgeSlug: 'Svelte-4A4A55?logo=svelte&logoColor=FF3E00', color: '#FF3E00', logo: 'svelte' },
  { name: 'Vite', category: 'frontend', badgeSlug: 'Vite-B73BFE?logo=vite&logoColor=FFD62E', color: '#646CFF', logo: 'vite' },

  // Backend
  { name: 'Node.js', category: 'backend', badgeSlug: 'Node.js-43853D?logo=node.js&logoColor=white', color: '#339933', logo: 'nodedotjs' },
  { name: 'Express', category: 'backend', badgeSlug: 'Express.js-404D59?logo=express&logoColor=white', color: '#000000', logo: 'express' },
  { name: 'Python', category: 'backend', badgeSlug: 'Python-3670A0?logo=python&logoColor=ffdd54', color: '#3776AB', logo: 'python' },
  { name: 'Go / Golang', category: 'backend', badgeSlug: 'Go-00ADD8?logo=go&logoColor=white', color: '#00ADD8', logo: 'go' },
  { name: 'Rust', category: 'backend', badgeSlug: 'Rust-000000?logo=rust&logoColor=white', color: '#DEA584', logo: 'rust' },
  { name: 'FastAPI', category: 'backend', badgeSlug: 'FastAPI-005571?logo=fastapi', color: '#009688', logo: 'fastapi' },
  { name: 'Django', category: 'backend', badgeSlug: 'Django-092E20?logo=django&logoColor=white', color: '#092E20', logo: 'django' },
  { name: 'NestJS', category: 'backend', badgeSlug: 'NestJS-E0234E?logo=nestjs&logoColor=white', color: '#E0234E', logo: 'nestjs' },
  { name: 'PHP', category: 'backend', badgeSlug: 'PHP-777BB4?logo=php&logoColor=white', color: '#777BB4', logo: 'php' },
  { name: 'Java', category: 'backend', badgeSlug: 'Java-ED8B00?logo=openjdk&logoColor=white', color: '#ED8B00', logo: 'openjdk' },

  // Database
  { name: 'PostgreSQL', category: 'database', badgeSlug: 'PostgreSQL-316192?logo=postgresql&logoColor=white', color: '#4169E1', logo: 'postgresql' },
  { name: 'MySQL', category: 'database', badgeSlug: 'MySQL-00000F?logo=mysql&logoColor=white', color: '#4479A1', logo: 'mysql' },
  { name: 'MongoDB', category: 'database', badgeSlug: 'MongoDB-4EA94B?logo=mongodb&logoColor=white', color: '#47A248', logo: 'mongodb' },
  { name: 'Redis', category: 'database', badgeSlug: 'Redis-DC382D?logo=redis&logoColor=white', color: '#DC382D', logo: 'redis' },
  { name: 'SQLite', category: 'database', badgeSlug: 'SQLite-07405E?logo=sqlite&logoColor=white', color: '#003B57', logo: 'sqlite' },
  { name: 'Supabase', category: 'database', badgeSlug: 'Supabase-3ECF8E?logo=supabase&logoColor=white', color: '#3ECF8E', logo: 'supabase' },
  { name: 'Firebase', category: 'database', badgeSlug: 'Firebase-039BE5?logo=Firebase&logoColor=white', color: '#FFCA28', logo: 'firebase' },

  // DevOps & Cloud
  { name: 'Docker', category: 'devops', badgeSlug: 'Docker-2CA5E0?logo=docker&logoColor=white', color: '#2496ED', logo: 'docker' },
  { name: 'Kubernetes', category: 'devops', badgeSlug: 'Kubernetes-326CE5?logo=kubernetes&logoColor=white', color: '#326CE5', logo: 'kubernetes' },
  { name: 'Git', category: 'devops', badgeSlug: 'Git-F05032?logo=git&logoColor=white', color: '#F05032', logo: 'git' },
  { name: 'GitHub Actions', category: 'devops', badgeSlug: 'GitHub_Actions-2088FF?logo=github-actions&logoColor=white', color: '#2088FF', logo: 'githubactions' },
  { name: 'Linux', category: 'devops', badgeSlug: 'Linux-FCC624?logo=linux&logoColor=black', color: '#FCC624', logo: 'linux' },
  { name: 'AWS', category: 'devops', badgeSlug: 'AWS-232F3E?logo=amazon-aws&logoColor=white', color: '#FF9900', logo: 'amazonaws' },
  { name: 'Vercel', category: 'devops', badgeSlug: 'Vercel-000000?logo=vercel&logoColor=white', color: '#000000', logo: 'vercel' },

  // Tools & Others
  { name: 'VS Code', category: 'tools', badgeSlug: 'VS_Code-0078d4?logo=visual-studio-code&logoColor=white', color: '#007ACC', logo: 'visualstudiocode' },
  { name: 'Postman', category: 'tools', badgeSlug: 'Postman-FF6C37?logo=postman&logoColor=white', color: '#FF6C37', logo: 'postman' },
  { name: 'Figma', category: 'tools', badgeSlug: 'Figma-F24E1E?logo=figma&logoColor=white', color: '#F24E1E', logo: 'figma' },
  { name: 'GraphQL', category: 'tools', badgeSlug: 'GraphQL-E10098?logo=graphql&logoColor=white', color: '#E10098', logo: 'graphql' },
  { name: 'Bun', category: 'tools', badgeSlug: 'Bun-000000?logo=bun&logoColor=white', color: '#FBF0DF', logo: 'bun' }
];

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Rust: '#DEA584',
  Go: '#00ADD8',
  Java: '#B07219',
  'C++': '#F34B7D',
  C: '#555555',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Shell: '#89E051',
  Vue: '#41B883',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dockerfile: '#384D54',
  Solidity: '#AA6746',
  Jupyter: '#DA5B0B'
};
