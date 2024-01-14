module.exports.run = async (message) => {
  // return if unwanted
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  if (config.linkReplace.checkChannels.includes(message.channel.id)) return client.functions.get('ENGINE_linkReplace_check').run(message);

  // non command function: checkin complete questioning Reaction adding
  if (message.mentions.roles.has(config.teamRole)
  && message.channel.parentId === config.checkin.categoryID) return client.functions.get('ENGINE_checkin_postReaction').run(message);
};

module.exports.data = {
  name: 'messageCreate',
};
