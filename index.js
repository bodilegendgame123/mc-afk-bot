const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// ده الجزء اللي بيخلي الاستضافة تفتكر إن البوت موقع شغال وما تقفلوش
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot AFK is Running 24/7!'));
app.listen(port, () => console.log(`Web server started on port ${port}`));

const bot = mineflayer.createBot({
  host: 'donutsmp.net', // عنوان السيرفر اللي طلبته
  port: 25565,
  username: 'bodylegendgame123@gmail.com', // الإيميل بتاعك
  auth: 'microsoft',
  profilesFolder: './auth_data',
  version: '1.21.4'
});

bot.on('spawn', () => {
  console.log('✅ دخلت السيرفر وموجود حالياً في القائمة!');
  // لو السيرفر بيحتاج أمر عشان يدخل عالم الـ Survival فك الكومنت عن السطر اللي تحت
  // bot.chat('/join survival'); 
});

// حركة الـ AFK عشان ما يطردكش (بيقفز كل 30 ثانية)
bot.on('login', () => {
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 30000); 
});

bot.on('error', (err) => console.log('❌ خطأ:', err));
bot.on('end', () => {
  console.log('⚠️ البوت فصل.. بحاول أرجع تاني');
});
