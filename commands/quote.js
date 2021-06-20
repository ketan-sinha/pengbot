const { MessageAttachment } = require('discord.js');
const { quotes } = require('../resources/txt/quotes');

module.exports = {
  name: 'quote',
  description: 'Quote commands',
  options: [
    {
      'name': 'say',
      'description': 'Have Pengwing say a random quote',
      'type': 'SUB_COMMAND',
      'required': false,
    },
  ],
  async execute(interaction) {
    if (interaction.options.has('say')) {
      const img = new MessageAttachment('./resources/img/pengwing.png', 'pengwing.png');
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const embed = {
        title: 'Pengwing says!',
        description: quote,
        image: {
          url: 'attachment://pengwing.png',
        },
      };
      await interaction.reply({ embeds: [embed], files: [img] });
    }
  },
};