export interface OpenSourceProject {
  name: string;
  repo: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  goodFirstIssuesUrl: string;
  websiteUrl?: string;
  topics: string[];
}

export const OPEN_SOURCE_PROJECTS: OpenSourceProject[] = [
  {
    name: 'shadcn/ui',
    repo: 'shadcn-ui/ui',
    description: 'Komponen UI yang dapat disalin dan ditempel ke dalam aplikasi React & Tailwind Anda.',
    language: 'TypeScript',
    stars: 85200,
    forks: 7300,
    goodFirstIssuesUrl: 'https://github.com/shadcn-ui/ui/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22',
    websiteUrl: 'https://ui.shadcn.com',
    topics: ['react', 'tailwind', 'accessible-components']
  },
  {
    name: 'Tailwind CSS',
    repo: 'tailwindlabs/tailwindcss',
    description: 'Utility-first CSS framework for rapid UI development.',
    language: 'TypeScript',
    stars: 83000,
    forks: 4200,
    goodFirstIssuesUrl: 'https://github.com/tailwindlabs/tailwindcss/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22',
    websiteUrl: 'https://tailwindcss.com',
    topics: ['css', 'styling', 'frontend']
  },
  {
    name: 'FastAPI',
    repo: 'tiangolo/fastapi',
    description: 'Modern, fast (high-performance) web framework for building APIs with Python 3.8+ based on standard Python type hints.',
    language: 'Python',
    stars: 78500,
    forks: 6400,
    goodFirstIssuesUrl: 'https://github.com/tiangolo/fastapi/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22',
    websiteUrl: 'https://fastapi.tiangolo.com',
    topics: ['python', 'api', 'backend', 'async']
  },
  {
    name: 'Supabase',
    repo: 'supabase/supabase',
    description: 'The open source Firebase alternative. Postgres database, Auth, instant APIs, Edge Functions, Realtime, and Storage.',
    language: 'TypeScript',
    stars: 76000,
    forks: 6200,
    goodFirstIssuesUrl: 'https://github.com/supabase/supabase/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22',
    websiteUrl: 'https://supabase.com',
    topics: ['postgres', 'database', 'backend']
  },
  {
    name: 'Rust Lang',
    repo: 'rust-lang/rust',
    description: 'Empowering everyone to build reliable and efficient software.',
    language: 'Rust',
    stars: 98400,
    forks: 12100,
    goodFirstIssuesUrl: 'https://github.com/rust-lang/rust/issues?q=is%3Aissue+is%3Aopen+label%3AE-easy',
    websiteUrl: 'https://www.rust-lang.org',
    topics: ['compiler', 'systems-programming', 'rust']
  },
  {
    name: 'Astro',
    repo: 'withastro/astro',
    description: 'The web framework for content-driven websites. 100% HTML, on-demand components, zero JS by default.',
    language: 'TypeScript',
    stars: 49200,
    forks: 2600,
    goodFirstIssuesUrl: 'https://github.com/withastro/astro/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22',
    websiteUrl: 'https://astro.build',
    topics: ['astro', 'ssg', 'static-site-generator']
  }
];
