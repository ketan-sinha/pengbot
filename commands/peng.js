const { MessageAttachment } = require("discord.js");
const { quotes } = require('../resources/txt/quotes');

module.exports = {
  name: 'peng',
  description: 'Base commands for Pengwing',
  options: [
    {
      'name': 'say',
      'description': 'What\'s Pengwing saying?',
      'type': 'SUB_COMMAND',
      'required': false,
    },
  ],
  async execute(interaction) {
    if (interaction.options.has('say')) {
      const pengImg = new MessageAttachment('./resources/img/pengwing.png', 'pengwing.png');
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const pengEmbed = {
        title: 'Pengwing says!',
        description: quote,
        image: {
          url: 'attachment://pengwing.png',
        },
      };
      await interaction.reply({ embeds: [pengEmbed], files: [pengImg] });
    }
  },
};