import { GameMapProduct, SMMService } from '../types';

export const OWNER_CONTACT = {
  name: 'xrexzob',
  brandName: 'xrexzob Dev & Store',
  whatsapp: '083135445588',
  whatsappFormatted: '+62 831-3544-5588',
  whatsappUrl: 'https://wa.me/6283135445588',
  instagram: 'xrexzob',
  instagramUrl: 'https://www.instagram.com/xrexzob?srtk=cTV1ODZxcHM5dGVl',
  githubUser: 'xrexzob',
  githubUrl: 'https://github.com/xrexzob',
  email: 'xrexzob@gmail.com',
};

export const MAP_PRODUCTS: GameMapProduct[] = [
  {
    id: 'map-fivem-pd',
    title: 'Modern Police Station MLO & Interior',
    category: 'fivem',
    categoryLabel: 'FiveM / GTA V',
    priceLabel: 'Tanya Harga via WA',
    description: 'Interior kantor polisi modern beresolusi tinggi dengan 3 lantai: ruang komando, ruang interogasi, sel tahanan, dan helipad rooftop. Dioptimalkan tanpa lag (0.01ms resmon).',
    features: [
      '3 Lantai full interior dekorasi realistis',
      'Optimasi tekstur & LOD lengkap (low resmon)',
      'Kompatibel dengan QBCore, ESX, & Standalone',
      'Pintu ber-doorlock siap pakai',
      'Bonus sound effect alarm & pintu otomatis'
    ],
    compatibility: 'FiveM QBCore / ESX / Standalone',
    fileFormat: '.ydr / .ytd / .ymap (Ready-to-stream)',
    tag: 'Best Seller',
    accentColor: '#38bdf8',
    demoType: 'interior'
  },
  {
    id: 'map-cyber-club',
    title: 'Cyberpunk Underground Nightclub & VIP Lounge',
    category: 'fivem',
    categoryLabel: 'FiveM / GTA V',
    priceLabel: 'Nego via WhatsApp',
    description: 'Map klub malam futuristik bawah tanah dengan pencahayaan neon animasi, DJ stage interaktif, ruang VIP rahasia, dan bar bertingkat.',
    features: [
      'Animasi lampu laser & RGB moving heads',
      'Ruang VIP tersembunyi dengan kode sandi',
      'Audio occlusions disesuaikan dengan musik bass',
      'Texture resolusi 2K tanpa texture loss',
      'Mudah dipasang hanya tinggal drag & drop'
    ],
    compatibility: 'FiveM Server (Build 2699+)',
    fileFormat: 'Stream Folder + fxmanifest.lua',
    tag: 'Populer',
    accentColor: '#a855f7',
    demoType: 'interior'
  },
  {
    id: 'map-roblox-arena',
    title: 'Roblox Tactical PvP Military Base & Arena',
    category: 'roblox',
    categoryLabel: 'Roblox Studio',
    priceLabel: 'Tanya Harga via WA',
    description: 'Map pertempuran taktis untuk game shooter Roblox dengan gedung bunker, menara pengawas, rintangan cover seimbang, dan script spawn point terintegrasi.',
    features: [
      'Desain layout simetris seimbang untuk PvP',
      'Material PBR modern dan pencahayaan Future Lighting',
      'Termasuk file .rbxl & model asset terpisah',
      'Script killzone dan weapon spawner gratis'
    ],
    compatibility: 'Roblox Studio Engine',
    fileFormat: '.rbxl / .rbxm',
    tag: 'Game Ready',
    accentColor: '#10b981',
    demoType: 'exterior'
  },
  {
    id: 'map-island-resort',
    title: 'Tropical Private Island & Luxury Villa Map',
    category: 'fivem',
    categoryLabel: 'GTA V / FiveM',
    priceLabel: 'Harga Spesial via WA',
    description: 'Pulau kustom eksklusif di lepas pantai Los Santos dengan dermaga kapal pesiar, pantai pasir putih, villa mewah, runway pesawat pribadi, dan jalan offroad.',
    features: [
      'Pulau kustom terpisah di koordinat laut tenang',
      'Runway helikopter dan dermaga kapal luas',
      'Villa kolam renang infinity dengan interior full MLO',
      'Vegetasi pohon kelapa & pencahayaan malam estetik',
      'LOD jarak jauh terlihat tanpa pop-in'
    ],
    compatibility: 'FiveM / Singleplayer GTA V',
    fileFormat: 'YMAP + Custom Props Cache',
    tag: 'VIP Luxury',
    accentColor: '#f59e0b',
    demoType: '3d'
  },
  {
    id: 'map-custom-commission',
    title: 'Custom Map Commission (Request Bebas Sesuai Keinginan)',
    category: 'custom',
    categoryLabel: 'Custom Order',
    priceLabel: 'Konsultasi & Nego',
    description: 'Pesan map kustom eksklusif dari nol sesuai konsep server atau game Anda. Bisa untuk FiveM, GTA, Roblox, maupun game 3D lainnya.',
    features: [
      'Pengerjaan cepat (1-3 hari kerja tergantung tingkat kerumitan)',
      'Revisi hingga puas dan sesuai konsep',
      'Konsultasi langsung via WhatsApp 083135445588',
      'File eksklusif tidak akan dijual ke pembeli lain'
    ],
    compatibility: 'Semua Engine (FiveM, Unity, Roblox, GTA)',
    fileFormat: 'Disesuaikan dengan kebutuhan',
    tag: 'Eksklusif',
    accentColor: '#ec4899',
    demoType: '3d'
  }
];

export const SMM_SERVICES: SMMService[] = [
  // Instagram
  {
    id: 'ig-followers-indo',
    platform: 'instagram',
    platformLabel: 'Instagram',
    serviceName: 'Followers Indonesia Aktif & Real',
    priceLabel: 'Tanya Harga Promo di WA',
    minOrder: 100,
    maxOrder: 20000,
    speed: '1.000 - 3.000 / hari',
    guarantee: 'Garansi Refill 30 Hari',
    quality: 'Akun Indonesia asli dengan foto profil & postingan',
    placeholderTarget: '@username_instagram',
    unitLabel: 'Followers'
  },
  {
    id: 'ig-followers-mix',
    platform: 'instagram',
    platformLabel: 'Instagram',
    serviceName: 'Followers Campuran High Quality (HQ)',
    priceLabel: 'Tanya Harga Murah di WA',
    minOrder: 100,
    maxOrder: 50000,
    speed: 'Instan (10-30 menit mulai masuk)',
    guarantee: 'Garansi Refill 30 Hari',
    quality: 'High Quality, anti-drop stabil',
    placeholderTarget: '@username_instagram',
    unitLabel: 'Followers'
  },
  {
    id: 'ig-likes',
    platform: 'instagram',
    platformLabel: 'Instagram',
    serviceName: 'Likes Postingan / Reels Instant',
    priceLabel: 'Tanya Promo di WA',
    minOrder: 100,
    maxOrder: 30000,
    speed: 'Super Instan (1-5 menit)',
    guarantee: 'Non-Drop Permanen',
    quality: 'Likes natural membantu naik ke Explore Instagram',
    placeholderTarget: 'https://instagram.com/p/xxxxx',
    unitLabel: 'Likes'
  },
  {
    id: 'ig-views-reels',
    platform: 'instagram',
    platformLabel: 'Instagram',
    serviceName: 'Views Video Reels & Postingan (Paket Hemat)',
    priceLabel: 'Tanya Harga Termurah di WA',
    minOrder: 1000,
    maxOrder: 500000,
    speed: 'Kilat (hingga 50K/jam)',
    guarantee: 'Permanen',
    quality: 'Meningkatkan impresi algoritma Reels',
    placeholderTarget: 'https://instagram.com/reel/xxxxx',
    unitLabel: 'Views'
  },

  // TikTok
  {
    id: 'tt-followers',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    serviceName: 'Followers TikTok Organik & Cepat',
    priceLabel: 'Tanya Harga Promo di WA',
    minOrder: 100,
    maxOrder: 25000,
    speed: '500 - 2.000 / hari',
    guarantee: 'Garansi Refill 30 Hari',
    quality: 'Aman untuk akun pemula maupun akun jualan',
    placeholderTarget: '@username_tiktok',
    unitLabel: 'Followers'
  },
  {
    id: 'tt-likes',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    serviceName: 'Likes Video TikTok High Quality',
    priceLabel: 'Tanya Promo di WA',
    minOrder: 100,
    maxOrder: 50000,
    speed: 'Instan 5-15 menit',
    guarantee: 'Permanen',
    quality: 'Bantu boost retensi video untuk masuk FYP',
    placeholderTarget: 'https://tiktok.com/@user/video/xxxx',
    unitLabel: 'Likes'
  },
  {
    id: 'tt-views-fyp',
    platform: 'tiktok',
    platformLabel: 'TikTok',
    serviceName: 'Views TikTok Booster Algoritma FYP (Paket Hemat)',
    priceLabel: 'Tanya Paket Murah di WA',
    minOrder: 2000,
    maxOrder: 1000000,
    speed: 'Sangat Cepat (100K/jam)',
    guarantee: 'Permanen',
    quality: 'Meningkatkan total view & impresi profil',
    placeholderTarget: 'https://vt.tiktok.com/xxxx',
    unitLabel: 'Views'
  },

  // YouTube
  {
    id: 'yt-subscribers',
    platform: 'youtube',
    platformLabel: 'YouTube',
    serviceName: 'Subscribers YouTube Permanen No Drop',
    priceLabel: 'Tanya Harga via WA',
    minOrder: 50,
    maxOrder: 5000,
    speed: '50 - 200 / hari (Natural aman monetisasi)',
    guarantee: 'Garansi Seumur Hidup (Lifetime)',
    quality: 'Akun berumur dengan histori tontonan asli',
    placeholderTarget: 'https://youtube.com/@channel_anda',
    unitLabel: 'Subscribers'
  },
  {
    id: 'yt-views-monet',
    platform: 'youtube',
    platformLabel: 'YouTube',
    serviceName: 'Views Video YouTube High Retention',
    priceLabel: 'Tanya Harga via WA',
    minOrder: 500,
    maxOrder: 100000,
    speed: '1.000 - 5.000 / hari',
    guarantee: 'Garansi Refill 30 Hari',
    quality: 'Retention 2-5 menit per view, ramah analitik',
    placeholderTarget: 'https://youtu.be/xxxx',
    unitLabel: 'Views'
  },

  // Telegram & Twitter
  {
    id: 'tg-members',
    platform: 'telegram',
    platformLabel: 'Telegram',
    serviceName: 'Member Channel / Grup Telegram',
    priceLabel: 'Tanya Promo di WA',
    minOrder: 100,
    maxOrder: 20000,
    speed: 'Instan',
    guarantee: 'Garansi Refill 30 Hari',
    quality: 'Member non-drop untuk grup komunitas & toko',
    placeholderTarget: 'https://t.me/nama_channel',
    unitLabel: 'Members'
  },
  {
    id: 'tw-followers',
    platform: 'twitter',
    platformLabel: 'Twitter / X',
    serviceName: 'Followers Twitter / X High Quality',
    priceLabel: 'Tanya Promo di WA',
    minOrder: 100,
    maxOrder: 10000,
    speed: 'Instan',
    guarantee: 'Garansi 30 Hari',
    quality: 'Akun aktif global dengan avatar',
    placeholderTarget: '@username_twitter',
    unitLabel: 'Followers'
  }
];

export const TRUST_POINTS = [
  {
    title: '100% Aman & Terpercaya',
    desc: 'Semua proses tanpa butuh password! Cukup berikan link postingan atau username Anda.'
  },
  {
    title: 'Harga Nego & Promo Spesial',
    desc: 'Dapatkan diskon khusus untuk pembelian paket besar langsung via WhatsApp 083135445588.'
  },
  {
    title: 'Garansi Refill & Layanan Terbaik',
    desc: 'Layanan bergaransi isi ulang jika terjadi penurunan drastis sesuai syarat garansi.'
  },
  {
    title: 'Dukungan Langsung Pengembang',
    desc: 'Dibuat & dikelola langsung oleh xrexzob dengan respon cepat 24/7 di WhatsApp.'
  }
];
