const moment = require('moment');

const errHander = (err) => { console.error('ERROR:', err); };

async function getDate(channel, config) {
  // get all messages
  const messages = await channel.messages.fetch();
  // match date
  const dateRegEx = /\d{4}[-]\d{2}[-]\d{2}/gm;
  const found = await messages.filter((msg) => msg.content.match(dateRegEx) && msg.author.id === channel.name);
  if (!found.size) return;
  const coreMessage = found.entries().next().value[1].content;
  const rawDate = coreMessage.match(dateRegEx)[0];
  return moment(rawDate, config.DoBchecking.dateFormats, true);
}

module.exports.run = async (client, message, config) => {
  // check if team fore was pinged and if channel is a checkin channel
  if (message.mentions.has(config.teamRole)
  && message.channel.parentID === config.checkin.categoryID) {
    await message.react('👌');
    await message.react('✋');
    client.functions.get('FUNC_MessageEmbedMessage')
      .run(
        null,
        message.channel,
        'Please wait for a teammember to review your answers.',
        null,
        4296754,
        false,
      );
  }
};

module.exports.help = {
  name: 'FUNC_checkinPostReaction',
};
