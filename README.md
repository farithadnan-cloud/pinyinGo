# 📱 PinyinGo - Portal Pembelajaran Bahasa Mandarin Kolej Vokasional (ELM 4322)

Aplikasi web interaktif pembelajaran Bahasa Mandarin merangkumi kesemua **7 Topik Rasmi Modul ELM 4322 Kolej Vokasional**, dibangunkan khas untuk kemudahan guru dan pelajar di telefon pintar, tablet, dan komputer.

---

## 🌟 7 Topik Pembelajaran Lengkap

Setiap topik dibina dalam halaman web berasingan yang boleh diakses terus melalui Portal Utama (`index.html`):

1. **Topik 1: Membeli Makanan (买食物 Mǎi shíwù)** (`topik1.html`)
   - Buah-buahan, makanan harian, pesanan restoran, dan sebutan harga dalam Ringgit Malaysia (令吉).
2. **Topik 2: Membeli Pakaian (买服装 Mǎi fúzhuāng)** (`topik2.html`)
   - Pakaian, saiz baju (大号, 中号, 小号), warna, penjodoh bilangan (件, 条, 双), dan diskaun.
3. **Topik 3: Hobi Saya (我的爱好 Wǒ de àihào)** (`topik3.html`)
   - Aktiviti sukan (badminton, bola sepak, takraw, renang), membaca, melukis, menyanyi, dan melayari internet.
4. **Topik 4: Di Pejabat (在办公室 Zài bàngōngshì)** (`topik4.html`)
   - Kedudukan alatan pejabat (atas, bawah, depan, belakang), rakan sekerja, telefon, mesin fotostat, dan pengurus.
5. **Topik 5: Nama Tempat (地名 Dìmíng)** (`topik5.html`)
   - Nama negeri di Malaysia, ibu negeri, balai polis, balai bomba, hospital, pejabat pos, sekolah, dan bank.
6. **Topik 6: Kenderaan Awam & Arah (公共交通 Gōnggòng jiāotōng)** (`topik6.html`)
   - Pengangkutan awam (bas, teksi, keretapi, LRT/MRT, kapal terbang), Menara Berkembar Petronas (KLCC), dan tunjuk arah (belok kiri, kanan, jalan terus).
7. **Topik 7: Temuduga Kerjaya (面试 Miànshì)** (`topik7.html`)
   - Pengenalan diri profesional, resume / CV, pengalaman latihan industri (praktikal), kelebihan diri, dan etika temuduga.

---

## 💎 Ciri-Ciri Khas Mengikut Kehendak Modul & Pelajar

1. **20 Soalan Unik Bina Kata (/20):**
   - Setiap topik mengandungi 20 soalan cabaran kosa kata tanpa ulangan soalan yang sama.
   - Dilengkapi Hanzi, Pinyin bertanda nada, dan butang audio sebutan jelas.
2. **Pola Ayat Rawak (Scrambled Sentence Builder):**
   - Kad-kad jawapan disusun secara rawak (*Fisher-Yates shuffle*) bagi menguji kefahaman struktur tatabahasa pelajar yang sebenar.
3. **Simulasi Chat & Semakan Sebutan Suara Pengguna (Web Speech Recognition):**
   - Pelajar boleh menekan ikon mikrofon 🎤 dan menyebut ayat dalam Bahasa Mandarin standard (`zh-CN`).
   - Sistem menganalisis sebutan suku kata demi suku kata secara langsung:
     - 🟢 **Hijau**: Suku kata yang tepat disebut.
     - 🔴 **Merah (High-Contrast Red Badge)**: Suku kata Pinyin yang salah atau tertinggal ditonjolkan dengan jelas. Pelajar boleh menekan badge merah tersebut untuk mendengar semula sebutan yang betul!
4. **Kamus Kosa Kata Interaktif:**
   - Senarai penuh kosa kata setiap topik lengkap dengan fungsi carian pantas dan butang sebutan suara (*Text-to-Speech*).
5. **Watermark Guru / Pereka:**
   - Watermark rasmi `Hajar Nur Atiqah Binti Mohd Adam` dipaparkan pada sudut bawah kiri (*bottom left*) setiap halaman HTML.

---

## 🚀 Cara 'Deploy' ke Netlify

1. Sambungkan repositori GitHub `farithadnan-cloud/pinyinGo` terus ke akaun Netlify anda.
2. Tetapan *Publish directory*: `.` (folder akar).
3. Setiap kemas kini yang ditolak (*push*) ke GitHub akan automatik dikemas kini ke laman sesawang pelajar secara langsung.

---

## 💻 Cara Uji Secara Tempatan (Local Test)

- Buka fail `index.html` menggunakan pelayar web (Google Chrome, Microsoft Edge, atau Safari).
