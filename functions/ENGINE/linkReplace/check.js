async function replaceStuff(message) {
  // replace text
  let content = message.content;
  await config.linkReplace.links.forEach((entry) => {
    content = content.replaceAll(entry.search, entry.replace);
  });

  // prepare username and avatar
  const username = message.member.nickname || message.author.username;
  const avatarURL = message.member.displayAvatarURL({ format: 'png', dynamic: true, size: 512 });

  // get webhook and send message
  const channel = message.channel;
  const channelWebhooks = await channel.fetchWebhooks();
  let hook = channelWebhooks.find((hook) => hook.owner.id === client.user.id);
  if (!hook) hook = await channel.createWebhook({ name: config.name }).catch(ERR);
  hook.send({
    content, username, avatarURL,
  }).catch(ERR);
  return;
}

module.exports.run = async (message) => {
  const foundList = config.linkReplace.links.map((entry) => ({
    notFound: message.content.search(entry.search) === -1,
    searched: entry.search,
    replace: entry.replace,
  }));
  const notFound = foundList.every((entry) => entry.notFound);
  if (notFound) return;
  replaceStuff(message);
};

module.exports.data = {
  name: 'check',
};
