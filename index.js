const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Live!'));
app.listen(process.env.PORT || 3000, '0.0.0.0');

const botArgs = {
    host: 'donutsmp.net',
    port: 25565,
    username: 'bodylegendgame123@gmail.com',
    auth: 'microsoft',
    version: false, 
    checkTimeoutInterval: 60000
};

let moveInterval;

function startBot() {
    console.log('⏳ جاري الاتصال بالسيرفر...');
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('✅ البوت جوه السيرفر ودلوقتي هيبدأ ينط');
        
        // لو كان فيه تايمر قديم بنمسحه عشان ما يحصلش تداخل
        if (moveInterval) clearInterval(moveInterval);

        // النط كل 20 ثانية
        moveInterval = setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 20000);
    });

    bot.on('error', (err) => {
        console.log('❌ حصل خطأ:', err.message);
    });

    bot.on('end', (reason) => {
        console.log(`⚠️ السيرفر طرد البوت لسبب: ${reason}. هحاول أرجع كمان 30 ثانية...`);
        // بنوقف النط أول ما يخرج
        clearInterval(moveInterval);
        // إعادة المحاولة بعد 30 ثانية (أمان أكتر عشان الـ Anti-Spam)
        setTimeout(startBot, 30000);
    });
}

startBot();
 
