const { MessageAttachment } = require('discord.js');
const mongo = require('../mongo/mongo');
const { quotes } = require('../resources/txt/quotes');
const quotesSchema = require('../mongo/schemas/quotes');

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
    {
      'name': 'add',
      'description': 'Add a new quote for Pengwing to say',
      'type': 'SUB_COMMAND',
      'options': [
        {
          'name': 'quote',
          'description': 'The quote',
          'type': 'STRING',
          'required': true,
        },
        {
          'name': 'author',
          'description': 'Who said the quote?',
          'type': 'USER',
          'required': true,
        },
        {
          'name': 'context',
          'description': 'The context of the quote',
          'type': 'STRING',
          'required': false,
        },
      ],
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
    else if (interaction.options.has('add')) {
      const options = interaction.options.get('add').options;

      const quote = options.get('quote').value;
      const author = options.get('author').value;
      const context = options.get('context').value;

      await interaction.reply(`quote added: ${quote}, by ${author}, with context: ${context}`);
      await mongo().then(async (mongoose) => {
        try {
          await new quotesSchema({
            quote: quote,
            author: author,
            context: context,
          }).save();
        }
        finally {
          mongoose.connection.close();
        }
      });
    }
  },
};