import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path"; // 'path' modülünü import etmeyi unutmayın

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js"; // app ve server'ı socket.js'den import ettiğinizden emin olun

dotenv.config();

const PORT = process.env.PORT;

// __dirname, ES Modülleri'nde doğrudan bulunmadığı için path.resolve() kullanarak tanımlanır.
const __dirname = path.resolve();

app.use(express.json()); // body-parser görevi görür, JSON istek gövdelerini ayrıştırır
app.use(cookieParser()); // Cookie'leri ayrıştırmak için

// CORS ayarı:
// Eğer frontend ve backend farklı domain'lerde çalışıyorsa bu gereklidir.
// Geliştirme için localhost:5173 uygundu.
// Canlıda, eğer frontend de Render'da aynı URL üzerinden erişiliyorsa,
// veya farklı bir alt domain'de ise, burayı doğru ayarlamanız gerekir.
// Şimdilik test için "*" olarak ayarladım.
// Üretim ortamında burayı kendi frontend URL'nizle değiştirmeniz GEREKİR.
app.use(
    cors({
        origin: "*", // Geçici olarak tüm originlere izin verir. GÜVENLİK İÇİN DİKKATLİ KULLANIN!
        credentials: true,
    })
);

// API Rotaları
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Üretim Ortamında Frontend Dosyalarını Sunma
// process.env.NODE_ENV "production" olduğunda bu blok çalışır.
// Render.com'da ortam değişkenlerinde NODE_ENV'i "production" olarak ayarladığınızdan emin olun.
if (process.env.NODE_ENV === "production") {
    // Frontend'in derlenmiş statik dosyalarını sunar (genellikle 'dist' klasöründe bulunur)
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Tüm diğer GET isteklerini (API rotaları haricindeki) frontend'in index.html'ine yönlendirir.
    // Bu, tek sayfalık uygulamalar (SPA) için gereklidir.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// Sunucuyu başlatma
server.listen(PORT, () => { // 'app.listen' yerine 'server.listen' kullandığınız için Socket.IO ile uyumludur.
    console.log("server is running on PORT:" + PORT);
    connectDB(); // MongoDB bağlantısını başlatır
});