module.exports.run = async (reaction, user) => {
  if (user.bot) return;

  // rolerequest
  client.functions.get('FUNC_userRoleRequest').run(reaction, user);
  // checkin
  client.functions.get('FUNC_checkinCompletedReaction').run(reaction, user);
};

module.exports.help = {
  name: 'EVENT_messageReactionAdd',
};
