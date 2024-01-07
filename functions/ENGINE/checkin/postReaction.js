const {
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
} = require('discord.js');

const moment = require('moment');

const buttonsAdd = new ActionRowBuilder()
  .addComponents([
    new ButtonBuilder()
      .setCustomId('checkin_COMPONENT_button_allow')
      .setEmoji('👌')
      .setLabel('Allow')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('checkin_COMPONENT_button_deny')
      .setEmoji('✋')
      .setLabel('Deny')
      .setStyle(ButtonStyle.Danger),
  ]);

module.exports.run = async (message) => {
  // check if team fore was pinged and if channel is a checkin channel
  const embed = new EmbedBuilder()
    .setColor('Green')
    .setDescription('Please wait for a teammember to review your answers.')
    .setFooter({ text: 'You can ignore the buttons below.' });

  message.channel.send({ embeds: [embed], components: [buttonsAdd] });
};

module.exports.data = {
  name: 'postReaction',
};
