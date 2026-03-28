const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// سيرفر صغير عشان Render يفضل شايف البوت "Online"
app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(port, () => console.log(`Web server running on port ${port}`));

const bot = mineflayer.createBot({
  host: 'donutsmp.net', // تأكد من وضع IP سيرفر Donut SMP هنا
  port: 25565,
  username: 'bodylegendgame123@gmail.com', // إيميل الحساب
  auth: 'microsoft',
  profilesFolder: './auth_data',
  version: '1.21.4'
});

bot.on('spawn', () => {
  console.log('✅ دخلت السيرفر وموجود حالياً!');
});

// حركة عشان ما يطردكش AFK
bot.on('login', () => {
  setInterval(() => {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }, 30000); // يقفز كل 30 ثانية
});

bot.on('error', (err) => console.log('❌ Error:', err));
bot.on('end', () => {
  console.log('⚠️ فصل.. بحاول أرجع تاني');
  process.exit(); 
});
