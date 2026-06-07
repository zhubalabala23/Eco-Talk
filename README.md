# Eco Talk

Eco Talk adalah platform pembelajaran digital interaktif yang dirancang khusus untuk siswa kelas 5 SD. Aplikasi ini bertujuan untuk meningkatkan kesadaran dan pemahaman siswa terhadap isu-isu lingkungan seperti Banjir dan Polusi.

## Fitur Utama
- **Penilaian Kemampuan Berbicara Melalui Rekaman Suara (Fitur Utama):** Fitur inovatif yang mewajibkan siswa untuk merekam suara mereka sendiri saat menjelaskan kembali materi (sebab-akibat peristiwa lingkungan). Rekaman ini disimpan secara otomatis dan menjadi bahan utama bagi guru untuk mengevaluasi kemampuan berbicara dan pemahaman siswa secara lisan.
- **Materi Pembelajaran Interaktif:** Pembelajaran menggunakan video animasi (via Cloudinary) yang disinkronkan dengan narasi bacaan otomatis (Text-to-Speech) untuk pengalaman belajar yang anti membosankan.
- **Dasbor Penilaian Guru (Teacher View):** Antarmuka khusus untuk guru mendengarkan rekaman suara tiap siswa satu per satu, dan langsung memberikan nilai berbasis rubrik kriteria yang sudah disediakan sistem.
- **Sistem Registrasi dan Sesi Pintar:** Sistem login cerdas menggunakan validasi Nama dan Nomor Absen yang memastikan progres belajar siswa tidak tertukar dan tidak hilang saat halaman disegarkan (refresh).
- **Penyimpanan Cloud Real-time:** Menggunakan database Firebase Firestore untuk menyimpan dan menyinkronkan seluruh profil siswa dan data penilaian suara dengan aman.
- **Rubrik Penilaian Terbuka:** Halaman informasi khusus agar siswa mengetahui standar kriteria penilaian guru sebelum mereka mulai merekam suara.
- **Desain Responsif:** UI/UX yang modern, ramah anak-anak, dan optimal untuk digunakan di berbagai layar perangkat.

## Teknologi yang Digunakan
- React.js / Vite (Frontend Framework)
- Firebase Firestore (Database Serverless)
- Cloudinary (Video Hosting/Streaming)
- Tailwind CSS (Styling/Desain)
- Vercel (Deployment Web)
