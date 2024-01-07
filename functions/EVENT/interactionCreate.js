module.exports.run = async (interaction) => {
  // command handler
  if (interaction.isCommand()) return client.functions.get('EVENT_interaction_isCommand').run(interaction).catch(ERR);
  if (interaction.isButton()) return client.functions.get('EVENT_interaction_isButton').run(interaction).catch(ERR);
};

module.exports.data = {
  name: 'interactionCreate',
};
