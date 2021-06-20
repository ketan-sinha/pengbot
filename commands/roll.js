const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'roll',
  description: 'Roll an n-sided die',
  options: [
    {
      'name': 'sides',
      'description': 'The number of sides on the die',
      'type': 'INTEGER',
      'required': true,
    },
  ],
  async execute(interaction) {
    const n = interaction.options.get('sides');
    const roll = Math.ceil(Math.random() * n.value);

    const thumb = new MessageAttachment('./resources/img/pengwing.png', 'pengwing.png');
    const embed = {
      title: `Pengwing rolled a d${n.value}!`,
      description: `**${roll}**`,
      thumbnail: {
        url: 'attachment://pengwing.png',
      },
    };
    await interaction.reply({ embeds: [embed], files: [thumb] });
  },
};