# 🛍️ Online Market Web Sayti

Zamonaviy, tezkor va to'liq interaktiv **Online Market** veb-ilovasi.

## ✨ Imkoniyatlar va Funksiyalar

1. **Mahsulotlar Katalogi**:
   - Smartfonlar, noutbuklar, audio qurilmalar, maishiy texnika va kiyim-kechaklar.
   - Real vaqtda toifalar (kategoriyalar) bo'yicha saralash.
   - Narxi bo'yicha (arzondan qimmatga / qimmatdan arzonga) va reyting bo'yicha saralash.

2. **Jonli Qidiruv (Live Search)**:
   - Mahsulot nomlari va tavsifi bo'yicha bir zumda qidirish.

3. **Interaktiv Savat (Cart Slide Drawer)**:
   - Mahsulot qo'shish, sonini ko'paytirish / kamaytirish, o'chirish.
   - Avtomatik yetkazib berish summasini hisoblash (1 000 000 so'mdan yuqoriga bepul).
   - Promo-kodlar tizimi:
     - `SALOM2026` — 15% chegirma
     - `UZMARKET10` — 10% chegirma
     - `SOVGA` — 100 000 so'm kupon

4. **Sevimlilar (Wishlist)**:
   - Yoqqan mahsulotlarni yurakcha tugmasi orqali saqlab qo'yish va ko'rish.

5. **Tezkor ko'rish (Quick View Modal)**:
   - Mahsulot haqida batafsil ma'lumot va texnik xususiyatlari.

6. **Buyurtma rasmiylashtirish (Checkout) & Telegram Integratsiyasi**:
   - Mijoz ma'lumotlarini qabul qilish (Ism, telefon, manzil, to'lov turi: Click, Payme, Uzum, Naqd).
   - Buyurtmani to'g'ridan-to'g'ri **Telegram orqali do'kon egasiga / menejerga yuborish** tugmasi.
   - Barcha buyurtmalar brauzer xotirasida (`localStorage`) saqlanadi.

7. **Dizayn & UX**:
   - Tungi (Dark) va Kunduzgi (Light) rejimlar.
   - O'zbekiston milliy valyutasi (so'm) formatlangan narxlar.
   - Chiroyli bildirishnomalar (Toast notifications).
   - Mobil, planshet va kompyuter ekranlariga to'liq moslashuvchan (Responsive).

---

## 🚀 Qanday ishga tushirish mumkin?

1. Ushbu papkadagi **`index.html`** faylini istalgan brauzerda (Google Chrome, Microsoft Edge, Mozilla Firefox) sichqonchaning chap tugmasi bilan 2 marta bosib oching.
2. Yoki terminal orqali lokal serverda ishga tushiring:
   ```bash
   npx serve .
   ```
   yoki Python orqali:
   ```bash
   python -m http.server 8000
   ```
   so'ng brauzerda `http://localhost:8000` manziliga kiring.
