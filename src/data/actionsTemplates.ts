export interface ActionWorkflowTemplate {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  category: 'ci' | 'deploy' | 'release' | 'docker';
  generateYaml: (config: {
    branch: string;
    runtimeVersion: string;
    packageManager: string;
    buildCommand: string;
  }) => string;
}

export const WORKFLOW_TEMPLATES: ActionWorkflowTemplate[] = [
  {
    id: 'node-ci',
    nameId: 'Node.js CI (Lint, Test & Build)',
    nameEn: 'Node.js CI (Lint, Test & Build)',
    descId: 'Menjalankan instalasi dependensi, linting, pengujian unit, dan proses build otomatis setiap ada push atau pull request.',
    descEn: 'Runs clean install, linting, tests, and build automatically on every push or pull request.',
    category: 'ci',
    generateYaml: ({ branch, runtimeVersion, packageManager, buildCommand }) => `name: Node.js CI

on:
  push:
    branches: [ ${branch} ]
  pull_request:
    branches: [ ${branch} ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [ ${runtimeVersion} ]

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: '${packageManager === 'npm' ? 'npm' : packageManager === 'pnpm' ? 'pnpm' : 'yarn'}'

    - name: Install dependencies
      run: ${packageManager === 'npm' ? 'npm ci' : packageManager === 'pnpm' ? 'pnpm install --frozen-lockfile' : packageManager === 'bun' ? 'bun install --frozen-lockfile' : 'yarn --frozen-lockfile'}

    - name: Run Lint & Typecheck
      run: ${packageManager} run lint || echo "No lint script specified"

    - name: Run Tests
      run: ${packageManager} test --if-present

    - name: Build Project
      run: ${buildCommand || `${packageManager} run build`}
`
  },
  {
    id: 'github-pages',
    nameId: 'Deploy ke GitHub Pages',
    nameEn: 'Deploy to GitHub Pages',
    descId: 'Membangun aplikasi web statis (Vite, Next.js static, Astro) dan mempublikasikannya otomatis ke GitHub Pages.',
    descEn: 'Builds static web app and automatically deploys distribution files to GitHub Pages.',
    category: 'deploy',
    generateYaml: ({ branch, packageManager, buildCommand }) => `name: Deploy to GitHub Pages

on:
  push:
    branches: [ ${branch} ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: '${packageManager === 'npm' ? 'npm' : packageManager}'

      - name: Install dependencies
        run: ${packageManager === 'npm' ? 'npm ci' : `${packageManager} install`}

      - name: Build static site
        run: ${buildCommand || `${packageManager} run build`}

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`
  },
  {
    id: 'docker-ghcr',
    nameId: 'Build & Push Docker ke GitHub Container Registry',
    nameEn: 'Build & Push Docker to GitHub Container Registry',
    descId: 'Membangun container Docker dan mengunggahnya ke GitHub Container Registry (ghcr.io) secara otomatis.',
    descEn: 'Builds multi-platform Docker container image and publishes to ghcr.io.',
    category: 'docker',
    generateYaml: ({ branch }) => `name: Docker Build & Push

on:
  push:
    branches: [ ${branch} ]
    tags: [ 'v*.*.*' ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata (tags, labels)
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
`
  },
  {
    id: 'release-tag',
    nameId: 'Otomatis Buat GitHub Release saat Tag Baru',
    nameEn: 'Automated GitHub Release on Git Tag',
    descId: 'Membuat rilis resmi di GitHub lengkap dengan catatan perubahan (changelog) otomatis saat Anda membuat git tag (cth: v1.0.0).',
    descEn: 'Automatically drafts GitHub release with changelog whenever a version tag is pushed.',
    category: 'release',
    generateYaml: () => `name: Automated Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Create Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
  }
];
