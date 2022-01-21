const { MessageEmbed } = require('discord.js');

module.exports.run = async (message) => {
  // return if unwanted
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  // checking if staffmember
  if (message.member.roles.cache.find((role) => role.id === config.teamRole)) config.set('isTeam', true);

  // non command function: checkin complete questioning Reaction adding
  client.functions.get('FUNC_checkinPostReaction').run(message);

  // put comamnd in array
  const messageArray = message.content.split(/\s+/g);
  const command = messageArray[0];
  const args = messageArray.slice(1);

  // return if not prefix
  if (!command.startsWith(config.prefix)) return;

  // remove prefix and lowercase
  const cmd = client.commands.get(command.slice(config.prefix.length).toLowerCase());

  // run cmd if existent
  if (cmd) {
    cmd.run(message, args, MessageEmbed)
      .catch(console.log);
  }
};

module.exports.help = {
  name: 'EVENT_message',
};
