const mineflayer = require('mineflayer');
const bot = mineflayer.createBot({
  host: 'donutsmp.net', 
  port: 25565,
  username: 'bodylegendgame123@gmail.com',
  auth: 'microsoft',
  profilesFolder: './auth_data',
  version: '1.21.4'
});
bot.on('spawn', () => console.log('✅ دخلت السيرفر!'));
bot.on('error', (err) => console.log(err));
