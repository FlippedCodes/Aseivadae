const errHander = (err) => { console.error('ERROR:', err); };

const welcomeMessage = (userID) => `
Hey there <@!${userID}>! Welcome to TDM.
Before we can continue im going to ask you some questions and a staff member is going to review them and let you in.

:one: - Please state your age.
:two: - How do you act in a displeasing situation?
:three: - Why do you want to join the server?
:four: - What does kin mean to you?
:five: - Do you understand your inner self, or just chose something that's close enough?
:six: - Why do you consider yourself kin?
:seven: - Do you know what "kin" means?
:eight: - How long have you been kin and have you switched kin?

When you are done please ping/mention \`@Staff\`, so we know that you are done and ready to be reviewd.
`;

// calculate user creation
function calcUserAge(user) {
  const currentDate = new Date();
  const creationDate = new Date(user.createdAt);
  const msDiff = Math.abs(currentDate - creationDate);
  return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
}

function createChannel(guild, user, topic) {
  guild.channels.create(user.id, { type: 'text', topic, parent: config.checkin.categoryID })
    .then((channel) => channel.lockPermissions())
    .then((channel) => channel.createOverwrite(user, { VIEW_CHANNEL: true }))
    .then(async (channel) => channel.send(welcomeMessage(user.id)))
    .catch(errHander);
}

module.exports.run = async (reaction)=> {
  // check emoji and channel
  const configReaction = config.checkin.reaction;
  if (reaction.member.roles.length !== 0) return;
  if (reaction.channel_id !== configReaction.channel) return;
  if (reaction.message_id !== configReaction.message) return;
  if (reaction.emoji.name !== configReaction.emoji) return;
  // get guild and user
  const guild = await client.guilds.cache.find((guild) => guild.id === reaction.guild_id);
  const user = await client.users.fetch(reaction.member.user.id, false);
  // check if user already has checkin channel
  const checkinChannel = await guild.channels.cache.find((channel) => channel.name === user.id);
  if (!checkinChannel) {
    const dayDiff = calcUserAge(user);
    // TODO: add DB table to check if user was in guild before
    // Create channel, set settings and edit channel topic
    const topic = `
    Username: ${user.tag}
    Avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })}
    Days since creation: ${dayDiff};
    Creation date: ${user.createdAt}`;
    createChannel(guild, user, topic);
  }
  // remvove user reaction
  const reactionChannel = await guild.channels.cache.get(config.checkin.reaction.channel);
  const reactionMessage = await reactionChannel.messages.fetch(config.checkin.reaction.message);
  const initalReaction = await reactionMessage.reactions.cache.get(config.checkin.reaction.emoji);
  initalReaction.users.remove(user);
};

module.exports.help = {
  name: 'FUNC_checkinInitReaction',
};
