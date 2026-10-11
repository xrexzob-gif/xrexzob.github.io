import { GitRecipe } from '../types';

export const GIT_RECIPES: GitRecipe[] = [
  {
    id: 'undo-last-commit-keep',
    category: 'undo',
    titleId: 'Batalkan Komit Terakhir (Pertahankan Perubahan Kode)',
    titleEn: 'Undo Last Commit (Keep Changes in Working Directory)',
    descId: 'Membatalkan komit terakhir tetapi menyimpan semua perubahan kode Anda di staged/unstaged area sehingga siap diperbaiki dan dikomit ulang.',
    descEn: 'Rewinds the last commit while preserving all changes in your working directory ready for editing.',
    commandTemplate: 'git reset --soft HEAD~{count}',
    interactiveParams: [
      {
        key: 'count',
        labelId: 'Jumlah Komit Dibatalkan',
        labelEn: 'Number of Commits to Undo',
        defaultValue: '1',
        options: [
          { label: '1 komit terakhir', value: '1' },
          { label: '2 komit terakhir', value: '2' },
          { label: '3 komit terakhir', value: '3' },
        ]
      }
    ],
    warningId: 'Aman: File Anda tidak akan terhapus. Perubahan tetap ada di status staged.',
    warningEn: 'Safe: Your files will not be deleted. Changes remain staged.'
  },
  {
    id: 'undo-hard-reset',
    category: 'undo',
    titleId: 'Batalkan Komit & Hapus Semua Perubahan Total (Hard Reset)',
    titleEn: 'Undo Commit & Discard All Changes Completely (Hard Reset)',
    descId: 'Menghapus komit terakhir dan membuang seluruh perubahan kode kembali persis ke status sebelumnya.',
    descEn: 'Completely drops recent commits and all uncommitted working code back to the target commit state.',
    commandTemplate: 'git reset --hard HEAD~{count}',
    interactiveParams: [
      {
        key: 'count',
        labelId: 'Jumlah Komit Dihapus',
        labelEn: 'Commits to Discard',
        defaultValue: '1',
        options: [
          { label: '1 komit', value: '1' },
          { label: '2 komit', value: '2' },
        ]
      }
    ],
    warningId: 'Hati-hati: Tindakan ini permanen! Perubahan kode yang belum dikomit akan hilang.',
    warningEn: 'Danger: This action is permanent! Uncommitted changes will be discarded.'
  },
  {
    id: 'amend-commit-message',
    category: 'undo',
    titleId: 'Ubah Pesan Komit Terakhir atau Tambah File Terlupa',
    titleEn: 'Amend Last Commit Message or Include Forgotten Files',
    descId: 'Memperbaiki pesan typo pada komit terakhir atau menyertakan file tambahan ke dalam komit terakhir tanpa membuat komit baru.',
    descEn: 'Updates the last commit with new staged changes and updates its commit message without creating a new commit.',
    commandTemplate: 'git add . && git commit --amend -m "{message}"',
    interactiveParams: [
      {
        key: 'message',
        labelId: 'Pesan Komit Baru',
        labelEn: 'New Commit Message',
        defaultValue: 'feat: perbaiki implementasi dan tambahkan konfigurasi',
      }
    ],
    warningId: 'Jika komit sudah di-push ke GitHub, Anda perlu force-push setelah melakukan amend.',
    warningEn: 'If already pushed to GitHub, you will need to push with lease.'
  },
  {
    id: 'unstage-file',
    category: 'undo',
    titleId: 'Batalkan Staging File (git restore --staged)',
    titleEn: 'Unstage Files (Remove from Staging Area)',
    descId: 'Mengeluarkan file dari antrean komit (staged) tanpa menghapus perubahan kodenya.',
    descEn: 'Removes files from the commit queue without deleting or losing your changes.',
    commandTemplate: 'git restore --staged {filename}',
    interactiveParams: [
      {
        key: 'filename',
        labelId: 'Nama File / Direktori',
        labelEn: 'Filename / Directory',
        defaultValue: '.',
        options: [
          { label: 'Semua file (.)', value: '.' },
          { label: 'File spesifik (src/App.tsx)', value: 'src/App.tsx' },
        ]
      }
    ]
  },
  {
    id: 'create-checkout-branch',
    category: 'branching',
    titleId: 'Buat & Pindah ke Branch Baru Sekaligus',
    titleEn: 'Create & Switch to New Branch Immediately',
    descId: 'Membuat cabang (branch) baru dari posisi saat ini dan langsung berpindah ke branch tersebut.',
    descEn: 'Creates a new branch from current HEAD and switches your workspace to it.',
    commandTemplate: 'git switch -c {branchName}',
    interactiveParams: [
      {
        key: 'branchName',
        labelId: 'Nama Branch Baru',
        labelEn: 'New Branch Name',
        defaultValue: 'feature/login-oauth',
      }
    ]
  },
  {
    id: 'interactive-rebase-squash',
    category: 'branching',
    titleId: 'Gabungkan Beberapa Komit Menjadi Satu (Squash Commits)',
    titleEn: 'Combine Multiple Commits into One (Squash Commits)',
    descId: 'Membersihkan riwayat Git sebelum membuat Pull Request dengan menggabungkan komit eksperimen.',
    descEn: 'Cleans up git commit history before PR by squashing multiple small commits into a single clean commit.',
    commandTemplate: 'git rebase -i HEAD~{count}',
    interactiveParams: [
      {
        key: 'count',
        labelId: 'Berapa Komit Terakhir',
        labelEn: 'Last N Commits to Review',
        defaultValue: '3',
        options: [
          { label: '2 komit terakhir', value: '2' },
          { label: '3 komit terakhir', value: '3' },
          { label: '5 komit terakhir', value: '5' },
        ]
      }
    ],
    warningId: 'Di dalam editor interaktif, ubah kata "pick" menjadi "squash" (atau "s") pada komit yang ingin digabungkan.',
    warningEn: 'In the editor, replace "pick" with "squash" (or "s") for commits you want merged into the previous one.'
  },
  {
    id: 'cherry-pick-commit',
    category: 'branching',
    titleId: 'Ambil Komit Spesifik dari Branch Lain (Cherry-pick)',
    titleEn: 'Pick a Specific Commit from Another Branch (Cherry-pick)',
    descId: 'Menyalin satu komit tertentu dari cabang lain ke cabang yang sedang aktif tanpa harus menggabungkan seluruh branch.',
    descEn: 'Applies changes from a specific commit hash from another branch onto your current active branch.',
    commandTemplate: 'git cherry-pick {commitHash}',
    interactiveParams: [
      {
        key: 'commitHash',
        labelId: 'Hash Komit (SHA)',
        labelEn: 'Commit Hash (SHA)',
        defaultValue: 'a1b2c3d',
      }
    ]
  },
  {
    id: 'delete-branches',
    category: 'branching',
    titleId: 'Hapus Branch Lokal & Remote Sekaligus',
    titleEn: 'Delete Local & Remote Branch Cleanly',
    descId: 'Menghapus branch fitur yang sudah selesai di-merge agar repositori tetap rapi.',
    descEn: 'Removes a feature branch from both your local machine and the remote GitHub repository.',
    commandTemplate: 'git branch -d {branchName} && git push origin --delete {branchName}',
    interactiveParams: [
      {
        key: 'branchName',
        labelId: 'Nama Branch yang Dihapus',
        labelEn: 'Branch to Delete',
        defaultValue: 'feature/login-oauth',
      }
    ]
  },
  {
    id: 'safe-force-push',
    category: 'remote',
    titleId: 'Force Push Aman ke GitHub (--force-with-lease)',
    titleEn: 'Safe Force Push to GitHub (--force-with-lease)',
    descId: 'Mengirim riwayat yang telah di-rebase atau di-amend ke GitHub tanpa risiko menimpa komit rekan tim yang baru di-push.',
    descEn: 'Force pushes commits only if no one else has updated the remote branch, protecting team collaboration.',
    commandTemplate: 'git push origin {branchName} --force-with-lease',
    interactiveParams: [
      {
        key: 'branchName',
        labelId: 'Nama Branch',
        labelEn: 'Target Branch',
        defaultValue: 'main',
        options: [
          { label: 'main', value: 'main' },
          { label: 'master', value: 'master' },
          { label: 'develop', value: 'develop' },
        ]
      }
    ],
    warningId: 'Selalu gunakan --force-with-lease daripada --force biasa untuk mencegah hilangnya kode kerja orang lain!',
    warningEn: 'Always prefer --force-with-lease over standard --force to prevent overwriting coworkers work!'
  },
  {
    id: 'shallow-clone',
    category: 'remote',
    titleId: 'Clone Cepat Repositori Besar (Shallow Clone / Depth 1)',
    titleEn: 'Super Fast Clone for Big Repos (Shallow Clone / Depth 1)',
    descId: 'Mengunduh repositori besar hanya komit terbarunya saja, menghemat kuota internet dan waktu hingga 90%.',
    descEn: 'Downloads only the most recent commit, saving up to 90% bandwidth and time on large repositories.',
    commandTemplate: 'git clone --depth 1 {repoUrl}',
    interactiveParams: [
      {
        key: 'repoUrl',
        labelId: 'URL Repositori GitHub',
        labelEn: 'GitHub Repository URL',
        defaultValue: 'https://github.com/facebook/react.git',
      }
    ]
  },
  {
    id: 'prune-remote-branches',
    category: 'remote',
    titleId: 'Bersihkan Daftar Branch Remote yang Sudah Dihapus',
    titleEn: 'Prune Stale Remote Branch Tracking References',
    descId: 'Menghapus referensi branch remote di komputer lokal yang sebenarnya sudah dihapus di GitHub web.',
    descEn: 'Removes local references to remote branches that have been merged and deleted on GitHub.',
    commandTemplate: 'git fetch --prune origin',
  },
  {
    id: 'stash-with-name',
    category: 'stash',
    titleId: 'Simpan Pekerjaan Sementara dengan Label (git stash push -m)',
    titleEn: 'Save Temporary Work with Label (git stash push -m)',
    descId: 'Menyimpan kode yang belum selesai dikerjakan ke tempat penyimpanan aman agar bisa berganti branch tanpa error.',
    descEn: 'Shelves uncommitted changes safely with a descriptive title so you can switch branches cleanly.',
    commandTemplate: 'git stash push -u -m "{stashName}"',
    interactiveParams: [
      {
        key: 'stashName',
        labelId: 'Catatan Stash',
        labelEn: 'Stash Note',
        defaultValue: 'WIP: komponen navigasi belum selesai',
      }
    ]
  },
  {
    id: 'stash-apply-pop',
    category: 'stash',
    titleId: 'Kembalikan Pekerjaan yang Disimpan dari Stash',
    titleEn: 'Restore Shelved Changes from Stash',
    descId: 'Menerapkan kembali perubahan kode yang disimpan sebelumnya dan menghapusnya dari daftar stash.',
    descEn: 'Reapplies the most recent stashed changes back into your working tree and removes it from the stash stack.',
    commandTemplate: 'git stash pop',
  },
  {
    id: 'untrack-file-keep-local',
    category: 'advanced',
    titleId: 'Hapus File dari Git Tanpa Menghapus File di Komputer',
    titleEn: 'Stop Tracking File Without Deleting from Local Disk',
    descId: 'Sangat berguna jika file konfigurasi atau .env terlanjur ter-push dan ingin dikeluarkan dari Git.',
    descEn: 'Removes tracked file from git index while keeping the physical file intact on your hard drive.',
    commandTemplate: 'git rm --cached {filePath}',
    interactiveParams: [
      {
        key: 'filePath',
        labelId: 'Path File Terlacak',
        labelEn: 'File Path',
        defaultValue: '.env',
        options: [
          { label: '.env', value: '.env' },
          { label: 'dist/', value: 'dist/' },
          { label: 'node_modules/', value: '-r node_modules/' },
        ]
      }
    ],
    warningId: 'Setelah menjalankan perintah ini, tambahkan file tersebut ke file .gitignore agar tidak terlacak lagi.',
    warningEn: 'After running this, add the target to your .gitignore so git ignores it in future commits.'
  },
  {
    id: 'git-bisect',
    category: 'advanced',
    titleId: 'Lacak Penyebab Bug Secara Otomatis (Git Bisect)',
    titleEn: 'Binary Search for Bug-introducing Commit (Git Bisect)',
    descId: 'Gunakan pencarian biner otomatis untuk menemukan komit persis yang menyebabkan bug muncul.',
    descEn: 'Performs automated binary search through commit history to find exactly which commit introduced a bug.',
    commandTemplate: 'git bisect start && git bisect bad && git bisect good {goodCommitHash}',
    interactiveParams: [
      {
        key: 'goodCommitHash',
        labelId: 'Hash Komit Terakhir yang Bebas Bug',
        labelEn: 'Last Known Working Commit SHA',
        defaultValue: 'v1.0.0',
      }
    ]
  }
];
