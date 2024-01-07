module.exports.run = async (reaction, user) => {
  if (user.bot) return;

  // checkin
  client.functions.get('FUNC_checkinCompletedReaction').run(reaction, user);
};

module.exports.help = {
  name: 'EVENT_messageReactionAdd',
};
