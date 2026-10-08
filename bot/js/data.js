// Online Market mahsulotlar bazasi
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    category: "elektronika",
    price: 15400000,
    oldPrice: 17200000,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Chegirma -10%",
    badgeType: "discount",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    description: "Eng so'nggi A17 Pro protsessori, aviatsiya darajasidagi titan korpus va 5x optik zumli professional kamera tizimi.",
    specs: {
      "Ekran": "6.7 dyuym Super Retina XDR OLED 120Hz ProMotion",
      "Protsessor": "Apple A17 Pro (3 nm)",
      "Doimiy xotira": "256 GB",
      "Tezkor xotira": "8 GB RAM",
      "Asosiy kamera": "48 MP + 12 MP + 12 MP (5x zoom)",
      "Akkumulyator": "4422 mAh, 29W tezkor quvvatlash"
    },
    colors: ["#96948e", "#44464c", "#e3e4e5", "#383c48"],
    stock: 12,
    isFeatured: true
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 512GB Titanium Gray",
    category: "elektronika",
    price: 14200000,
    oldPrice: 15900000,
    rating: 4.8,
    reviewsCount: 98,
    badge: "Galaxy AI",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    description: "Sun'iy intellekt (Galaxy AI) texnologiyalari, o'rnatilgan S-Pen stilus va 200MP kameraga ega zamonaviy Android flagmani.",
    specs: {
      "Ekran": "6.8 dyuym Dynamic AMOLED 2X, 2600 nit",
      "Protsessor": "Snapdragon 8 Gen 3 for Galaxy",
      "Doimiy xotira": "512 GB",
      "Tezkor xotira": "12 GB RAM",
      "Asosiy kamera": "200 MP + 50 MP + 12 MP + 10 MP",
      "Akkumulyator": "5000 mAh, 45W tezkor quvvatlash"
    },
    colors: ["#585a62", "#dcd0c2", "#353842"],
    stock: 8,
    isFeatured: true
  },
  {
    id: 3,
    name: "Apple MacBook Pro 14\" M3 Pro (18GB / 512GB SSD)",
    category: "elektronika",
    price: 24800000,
    oldPrice: 27500000,
    rating: 5.0,
    reviewsCount: 64,
    badge: "Tavsiya etiladi",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: "Dasturchilar, dizaynerlar va og'ir montaj ishlari uchun mo'ljallangan aqlbovar qilmas kuchli M3 Pro noutbuki.",
    specs: {
      "Ekran": "14.2 dyuym Liquid Retina XDR (120Hz ProMotion)",
      "Protsessor": "Apple M3 Pro (11 yadro CPU, 14 yadro GPU)",
      "Doimiy xotira": "512 GB SSD ultra tezkor",
      "Tezkor xotira": "18 GB Unified Memory",
      "Batareya": "22 soatgacha avtonom ishlash",
      "Vazni": "1.61 kg"
    },
    colors: ["#2d2e30", "#e0e1e6"],
    stock: 5,
    isFeatured: true
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Simsiz shovqin so'ndiruvchi quloqchin",
    category: "gadjetlar",
    price: 4300000,
    oldPrice: 4900000,
    rating: 4.9,
    reviewsCount: 215,
    badge: "Top Shovqin So'ndirish",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Dunyoning eng yaxshi shovqin so'ndirish tizimiga ega Hi-Res audio quloqchinlari. Kristaldek toza va chuqur bas ovoz.",
    specs: {
      "Turi": "Simsiz to'liq o'lchamli quloqchin",
      "ANC": "Industry-leading Dual Chip Noise Canceling",
      "Avtonomiya": "30 soatgacha (ANC yoqilgan holatda)",
      "Tezkor quvvatlash": "3 daqiqada 3 soatlik musiqa",
      "Bluetooth": "5.2, LDAC, AAC, SBC",
      "Mikrofon": "8 ta mikrofon kristal suhbat uchun"
    },
    colors: ["#1e1e1e", "#d5cfc7", "#243247"],
    stock: 19,
    isFeatured: true
  },
  {
    id: 5,
    name: "Apple Watch Ultra 2 GPS + Cellular 49mm Titan",
    category: "gadjetlar",
    price: 9900000,
    oldPrice: 11200000,
    rating: 4.8,
    reviewsCount: 77,
    badge: "Yangi Model",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Sportchilar, tog' sayohatchilari va faol hayot tarzi ixlosmandlari uchun maxsus yaratilgan aviatsiya titani korpusli soat.",
    specs: {
      "Korpus": "49 mm aviatsiya titani, Safir shisha",
      "Ekran yorqinligi": "3000 nit quyosh ostida ko'rinish",
      "Suvga chidamlilik": "100 metrgacha sho'ng'ish (WR100)",
      "Batareya": "Oddiy rejimda 36 soat, tejamkor rejimda 72 soat",
      "Sensorlar": "EKG, Kislorod miqdori, Chuqurlik o'lchagich"
    },
    colors: ["#df7e26", "#e5e5e5", "#304035"],
    stock: 7,
    isFeatured: false
  },
  {
    id: 6,
    name: "Dyson V15 Detect Extra Simsiz Changyutgich",
    category: "texnika",
    price: 8900000,
    oldPrice: 9900000,
    rating: 4.9,
    reviewsCount: 89,
    badge: "Lazer Texnologiya",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    description: "Lazer nuri yordamida ko'rinmas mayda changlarni ko'rsatuvchi va 240 AW kuchli tortish quvvatiga ega simsiz changyutgich.",
    specs: {
      "Tortish kuchi": "240 AW kuchli Hyperdymium motor",
      "Ishlash vaqti": "60 daqiqagacha tinimsiz tozalash",
      "Filtr tizimi": "99.99% mikroskopik zarralarni ushlab qoladi",
      "Ekran": "Chang hajmini hisoblovchi LCD displey",
      "Qo'shimcha nasadkalar": "6 xil tozalash nasadkalari"
    },
    colors: ["#f27200", "#76428a"],
    stock: 6,
    isFeatured: true
  },
  {
    id: 7,
    name: "De'Longhi Magnifica S Avtomatik Qahva Mashinasi",
    category: "texnika",
    price: 5900000,
    oldPrice: 6800000,
    rating: 4.7,
    reviewsCount: 112,
    badge: "Top Qahva",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    description: "Yangi maydalangan qahva donalaridan haqiqiy italyancha espresso va nozik sutli kapuchino tayyorlang.",
    specs: {
      "Bosim": "15 Bar professional nasos",
      "Maydalagich": "13 xil darajada po'lat tig'li maydalash",
      "Kapuchinator": "Kremali sut ko'pigi uchun qo'lda boshqaruv",
      "Suv idishi": "1.8 litr olinadigan idish",
      "Quvvat": "1450 Watt"
    },
    colors: ["#1c1c1c", "#silver"],
    stock: 9,
    isFeatured: false
  },
  {
    id: 8,
    name: "Nike Air Max 270 Black & White Original Krossovka",
    category: "kiyim",
    price: 1650000,
    oldPrice: 1950000,
    rating: 4.8,
    reviewsCount: 310,
    badge: "Trend 2026",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "Nike kompaniyasining eng qulay Max Air 270 havo yostig'iga ega kundalik va sport mashg'ulotlari uchun poyabzali.",
    specs: {
      "Material": "Nafas oluvchi to'rsimon mato va termo-polimer",
      "Taglik": "270 darajali havo baloni va mustahkam rezina",
      "Foydalanish": "Sport, yugurish va shahar bo'ylab yurish",
      "Mavsum": "Bahor, Yoz, Kuz",
      "Ishlab chiqarilgan": "Vietnam"
    },
    colors: ["#ff0033", "#000000", "#ffffff"],
    stock: 24,
    isFeatured: true
  },
  {
    id: 9,
    name: "The North Face Nuptse 1996 Qishki Issiq Kurtka",
    category: "kiyim",
    price: 3200000,
    oldPrice: 3800000,
    rating: 4.9,
    reviewsCount: 145,
    badge: "Chegirma -15%",
    badgeType: "discount",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    description: "700-fill tabiiy g'oz pati bilan to'ldirilgan afsonaviy retro dizayndagi qishki issiq va shamol-suv o'tkazmaydigan kurtka.",
    specs: {
      "To'ldiruvchi": "700 fill tabiiy toza g'oz pati",
      "Mato": "DWR suv o'tkazmaydigan ripstop neylon",
      "Kaptur": "Yoqa ichiga yig'iladigan qulay kapyushon",
      "Cho'ntaklar": "Ichki xavfsiz va yonbosh fermuarli cho'ntaklar"
    },
    colors: ["#e5b32f", "#111111", "#2255aa"],
    stock: 11,
    isFeatured: false
  },
  {
    id: 10,
    name: "Xiaomi Mijia Smart Professional Havo Tozalagich 4",
    category: "texnika",
    price: 2100000,
    oldPrice: 2500000,
    rating: 4.7,
    reviewsCount: 83,
    badge: "Toza Havo",
    badgeType: "hot",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80",
    description: "Xona ichidagi chang, allergen, tutun va yoqimsiz hidlarni 99.97% tozalovchi HEPA filtrli aqlli havo tozalagich.",
    specs: {
      "Qamrov maydoni": "48 m² gacha xonalar uchun",
      "Filtr turi": "3 qatlamli yuqori samarali HEPA filtr",
      "Boshqaruv": "Mi Home ilovasi, sensorli OLED displey",
      "Shovqin darajasi": "Tungi rejimda atigi 32 dB",
      "Filtrlash tezligi": "400 m³/soat CADR"
    },
    colors: ["#ffffff"],
    stock: 14,
    isFeatured: false
  },
  {
    id: 11,
    name: "Anker Prime 20,000mAh 200W GaN Smart Power Bank",
    category: "gadjetlar",
    price: 1450000,
    oldPrice: 1750000,
    rating: 4.9,
    reviewsCount: 167,
    badge: "Ultra Quvvat",
    badgeType: "new",
    image: "https://images.unsplash.com/photo-1609592426867-0c01d4a86f2b?auto=format&fit=crop&w=800&q=80",
    description: "Bir vaqtning o'zida ikkita noutbuk va telefonni eng yuqori 200W quvvatda zaryadlovchi aqlli rangli displeyli powerbank.",
    specs: {
      "Sig'im": "20,000 mAh (72Wh)",
      "Chiqish quvvati": "Maksimal 200W umumiy (100W + 100W)",
      "Displey": "Rangli aqlli displey real vaqt quvvati bilan",
      "Portlar": "2x USB-C + 1x USB-A",
      "Hajmi": "Ixcham va samolyot bortiga ruxsat etilgan"
    },
    colors: ["#2b2b2b"],
    stock: 22,
    isFeatured: false
  },
  {
    id: 12,
    name: "Harman Kardon Onyx Studio 8 Premium Akustika",
    category: "gadjetlar",
    price: 3400000,
    oldPrice: 3950000,
    rating: 4.8,
    reviewsCount: 92,
    badge: "Hi-Fi Ovoz",
    badgeType: "featured",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
    description: "Anodlangan alyuminiy tutqichli zamonaviy nafis san'at asari va har qanday xonaga moslashuvchi chuqur boy bas tovushi.",
    specs: {
      "Quvvati": "50W RMS yuqori sifatli ovoz",
      "Akustik sozlanish": "Har bir xona akustikasiga avtomatik moslashish",
      "Avtonomiya": "8 soatgacha to'xtovsiz musiqa",
      "Qo'shish imkoni": "2 ta dinamikni bitta stereo tizimga ulash",
      "Bluetooth": "5.2 ko'p nuqtali ulanish"
    },
    colors: ["#1a1a1a", "#002a4a", "#e8e5dc"],
    stock: 8,
    isFeatured: false
  }
];

// Kategoriyalar ro'yxati
const CATEGORIES = [
  { id: "all", name: "Barchasi", icon: "ri-grid-fill" },
  { id: "elektronika", name: "Elektronika", icon: "ri-smartphone-line" },
  { id: "gadjetlar", name: "Gadjet & Audio", icon: "ri-headphone-line" },
  { id: "texnika", name: "Maishiy texnika", icon: "ri-home-gear-line" },
  { id: "kiyim", name: "Kiyim & Poyabzal", icon: "ri-t-shirt-line" }
];

// Promo-kodlar ro'yxati
const PROMO_CODES = {
  "UZMARKET10": { discountPercent: 10, title: "10% Chegirma" },
  "SALOM2026": { discountPercent: 15, title: "15% Maxsus Chegirma" },
  "SOVGA": { discountAmount: 100000, title: "100,000 so'm chegirma" }
};
