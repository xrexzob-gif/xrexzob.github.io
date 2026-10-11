export interface GitignoreOption {
  id: string;
  name: string;
  category: 'languages' | 'frameworks' | 'os' | 'editors' | 'security';
  content: string;
}

export const GITIGNORE_OPTIONS: GitignoreOption[] = [
  {
    id: 'env',
    name: '.env & Secret Keys (Wajib Keamanan)',
    category: 'security',
    content: `# Security & Secrets
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
*.pem
*.key
*.cert
id_rsa
`
  },
  {
    id: 'node',
    name: 'Node.js & npm / yarn / pnpm / bun',
    category: 'languages',
    content: `# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
.pnpm-store/
.yarn/
!.yarn/patches
!.yarn/plugins
!.yarn/releases
`
  },
  {
    id: 'build-web',
    name: 'Build Artifacts (dist, build, out, .next)',
    category: 'frameworks',
    content: `# Build outputs
dist/
build/
out/
.next/
.nuxt/
.output/
.turbo/
.cache/
*.tsbuildinfo
`
  },
  {
    id: 'python',
    name: 'Python (venv, __pycache__, .pytest_cache)',
    category: 'languages',
    content: `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
.pytest_cache/
.coverage
htmlcov/
venv/
env/
ENV/
.venv/
`
  },
  {
    id: 'go',
    name: 'Go (binaries & test cache)',
    category: 'languages',
    content: `# Go
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out
vendor/
go.work
`
  },
  {
    id: 'rust',
    name: 'Rust (target directory)',
    category: 'languages',
    content: `# Rust
/target/
**/*.rs.bk
Cargo.lock # (Optional: keep for binaries, ignore for libraries)
`
  },
  {
    id: 'java',
    name: 'Java (Maven & Gradle target)',
    category: 'languages',
    content: `# Java & JVM
*.class
*.log
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar
target/
.gradle/
build/
!gradle/wrapper/gradle-wrapper.jar
`
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code (.vscode)',
    category: 'editors',
    content: `# VS Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace
`
  },
  {
    id: 'jetbrains',
    name: 'JetBrains / IntelliJ / WebStorm (.idea)',
    category: 'editors',
    content: `# JetBrains IDEs
.idea/
*.iws
*.iml
*.ipr
out/
`
  },
  {
    id: 'macos',
    name: 'macOS (.DS_Store & Spotlight)',
    category: 'os',
    content: `# macOS
.DS_Store
.AppleDouble
.LSOverride
Icon?
._*
.Spotlight-V100
.Trashes
`
  },
  {
    id: 'windows',
    name: 'Windows (Thumbs.db & desktop.ini)',
    category: 'os',
    content: `# Windows
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db
*.stackdump
[Dd]esktop.ini
$RECYCLE.BIN/
`
  },
  {
    id: 'docker',
    name: 'Docker (override files & data)',
    category: 'frameworks',
    content: `# Docker
docker-compose.override.yml
*.env.docker
`
  }
];
