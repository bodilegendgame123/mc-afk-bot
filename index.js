const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// إعداد الويب المخصص لـ Railway عشان ما يقفلش البوت
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Railway Bot is Active!'));
app.listen(port, '0.0.0.0', () => {
    console.log(`🌐 الويب سيرفر شغال على بورت ${port} لضمان استقرار Railway`);
});

function startBot() {
    console.log('⏳ جاري الاتصال بسيرفر DonutSMP...');
    const bot = mineflayer.createBot({
        host: 'donutsmp.net',
        port: 25565,
        username: 'bodylegendgame123@gmail.com',
        auth: 'microsoft',
        version: '1.21.4', 
        hideErrors: false // عشان يفضح أي خطأ مخفي
    });

    bot.on('login', () => {
        console.log('🔑 تم تسجيل الدخول بحساب مايكروسوفت بنجاح!');
    });

    bot.on('spawn', () => {
        console.log('✅ البوت نزل في العالم بنجاح وثابت!');
        // حركة الـ AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 15000);
    });

    // لو السيرفر طرده هيطبع السبب هنا
    bot.on('kicked', (reason) => {
        console.log('❌ السيرفر طرد البوت، السبب:', JSON.stringify(reason));
    });

    bot.on('error', (err) => {
        console.log('⚠️ حصل خطأ:', err);
    });

    // لو الاتصال قطع، هيقولنا ليه بالظبط
    bot.on('end', (reason) => {
        console.log(`⚠️ الاتصال انقطع! السبب الحقيقي: ${reason}`);
        console.log('🔄 هحاول أدخل تاني بعد 30 ثانية عشان ماناخدش باند...');
        setTimeout(startBot, 30000);
    });
}

startBot();
