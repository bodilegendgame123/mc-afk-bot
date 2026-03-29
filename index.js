const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// أهم سطر لـ Railway: لازم يسمع للبورت اللي ريلواي بيفرضه
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is Alive and Stable!'));

app.listen(port, '0.0.0.0', () => {
    console.log(`🌐 الويب سيرفر شغال على بورت ${port}`);
});

function startBot() {
    const bot = mineflayer.createBot({
        host: 'donutsmp.net',
        port: 25565,
        username: 'bodylegendgame123@gmail.com',
        auth: 'microsoft',
        version: '1.21.4'
    });

    bot.on('spawn', () => {
        console.log('✅ البوت دخل السيرفر وموجود حالياً!');
    });

    // حركة النط كل 20 ثانية عشان الـ AFK
    bot.on('login', () => {
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 20000); 
    });

    bot.on('error', (err) => console.log('❌ خطأ:', err));

    bot.on('end', (reason) => {
        console.log(`⚠️ الاتصال انقطع بسبب: ${reason}`);
        console.log('🔄 هحاول أرجع كمان 10 ثواني...');
        setTimeout(startBot, 10000); 
    });
}

startBot();
