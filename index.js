const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is fixing itself!'));
app.listen(process.env.PORT || 3000, '0.0.0.0');

const botArgs = {
    host: 'donutsmp.net',
    port: 25565,
    username: 'bodylegendgame123@gmail.com',
    auth: 'microsoft',
    // الحل هنا: هنخلي النسخة أوتوماتيك تماماً عشان يتوافق مع بيانات السيرفر
    version: false, 
    checkTimeoutInterval: 60000
};

function startBot() {
    console.log('⏳ جاري الاتصال وتخطي مشكلة الـ Chunk...');
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('✅ مبروك! البوت تخطى المشكلة ودخل السيرفر بنجاح');
    });

    bot.on('login', () => {
        console.log('🔑 تم تسجيل الدخول..');
        // نط الـ AFK
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 20000);
    });

    // مهم جداً: لو حصل خطأ في قراءة الداتا (زي اللي بعته) البوت ما يقفلش
    bot.on('error', (err) => {
        if (err.message.includes('Chunk size')) {
            console.log('⚠️ تجاهل خطأ بسيط في قراءة البيانات.. البوت مستمر');
        } else {
            console.log('❌ خطأ:', err.message);
        }
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ الاتصال انقطع: ${reason}`);
        setTimeout(startBot, 10000);
    });
}

startBot();
 
