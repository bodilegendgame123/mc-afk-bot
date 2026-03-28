const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// استخدام البورت 8080 اللي باين في الـ Log عندك
const port = process.env.PORT || 8080; 
app.get('/', (req, res) => res.send('DonutSMP Bot is Alive!'));
app.listen(port, () => console.log(`Web server started on port ${port}`));

const botArgs = {
    host: 'donutsmp.net',
    port: 25565,
    username: 'bodylegendgame123@gmail.com',
    auth: 'microsoft',
    version: '1.21.4'
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('✅ إدخل السيرفر وموجود حالياً في القائمة');
        // تأكد إنك واقف في مكان آمن في السيرفر
    });

    // حركة الـ AFK عشان ما يطردكش
    bot.on('login', () => {
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 15000); // بينط كل 15 ثانية
    });

    bot.on('error', (err) => console.log('❌ Error:', err));

    // إعادة الاتصال التلقائي لو السيرفر رستر
    bot.on('end', () => {
        console.log('⚠️ فصل الاتصال.. جاري إعادة المحاولة خلال 10 ثواني');
        setTimeout(createBot, 10000);
    });
}

createBot();
 
