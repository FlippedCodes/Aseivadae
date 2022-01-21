// init Discord
const Discord = require('discord.js');
// init Discord client
global.client = new Discord.Client({ disableEveryone: true });
// init sequelize
// const sequelize = require('sequelize');
// init filesystem
const fs = require('fs');
// init correct config
global.inDev = process.env.NODE_ENV === 'development';
global.config = require('./config.json');

// create new collections in client and config
client.functions = new Discord.Collection();
client.commands = new Discord.Collection();

// load Functions and Commands
config.setup.startupFunctions.forEach((FCN) => {
  let INIT = require(`./functions/${FCN}.js`);
  INIT.run(fs);
});

// Login the bot
client.login(process.env.DCtoken);

client.once('ready', async () => {
  // confirm user logged in
  console.log(`[Main] User ${client.user.tag} is now logged in!`);
  // set bot player status
  config.setup.setupFunctions.forEach((FCN) => {
    client.functions.get(FCN).run();
  });
});

client.on('message', async (message) => {
  client.functions.get('EVENT_message').run(message);
});

client.on('guildMemberRemove', async (member) => {
  client.functions.get('EVENT_guildMemberRemove').run(member);
});

client.on('messageReactionAdd', async (reaction, user) => {
  client.functions.get('EVENT_messageReactionAdd').run(reaction, user);
});

// trigger on reaction with raw package
client.on('raw', async (packet) => {
  if (packet.t === 'MESSAGE_REACTION_ADD' && packet.d.guild_id) {
    client.functions.get('FUNC_checkinInitReaction').run(packet.d);
  }
});

// logging errors
client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
