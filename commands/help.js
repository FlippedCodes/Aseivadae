const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, config) => {
  // prepare title and user CMDs
  let embed = new MessageEmbed()
    .setAuthor('How to uwse me:');
  if (message.channel.type !== 'dm') embed.setColor(message.member.displayColor);
  // creating embed fields for every command
  client.commands.forEach((CMD) => {
    if (!CMD.help.title) return;
    embed.addField(
      CMD.help.title,
      `\`${config.prefix}${CMD.help.name} ${CMD.help.usage || ''}\`
      ${CMD.help.desc}`,
      false,
    );
  });
  message.channel.send({ embed });
  return;
};

module.exports.help = {
  name: 'help',
  title: 'HALP',
  desc: 'Displays the help of usable commands for the corrent user.',
};
