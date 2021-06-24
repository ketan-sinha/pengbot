const { MessageAttachment, Client } = require('discord.js');
const mongo = require('../mongo/mongo');
const { quotes } = require('../resources/txt/quotes');
const quotesSchema = require('../mongo/schemas/quotes');

const thumb = new MessageAttachment('./resources/img/penghead.png', 'penghead.png');

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
  async execute(interaction, client, guild) {
    if (interaction.options.has('say')) {
      await mongo().then(async mongoose => {
        try {
          const rand = Math.floor(Math.random() * await quotesSchema.countDocuments());
          const quote = await quotesSchema.findOne().skip(rand);
          const author = await guild.members.fetch(quote.author);
          console.log(author);
          const embed = {
            title: 'Pengwing says!',
            description: `${quote.quote}`,
            author: author.user.username,
            thumbnail: {
              url: 'attachment://penghead.png',
            },
            footer: {
              text: `—${author.nickname}`,
              icon_url: author.user.avatarURL(),
            },
          };

          console.log(quote);
          await interaction.reply({ embeds: [embed], files: [thumb] });
        }
        finally {
          mongoose.connection.close();
        }
      });

    }
    else if (interaction.options.has('add')) {
      const options = interaction.options.get('add').options;

      const quote = options.get('quote').value;
      const author = await guild.members.fetch(options.get('author').value);
      const context = options.has('context') ? options.get('context').value : null;

      const embed = {
        title: 'Pengwing says!',
        description: `${quote}`,
        author: author.user.username,
        thumbnail: {
          url: 'attachment://penghead.png',
        },
        footer: {
          text: `—${author.nickname}`,
          icon_url: author.user.avatarURL(),
        },
      };

      await interaction.reply({ embeds: [embed], files: [thumb] });
      await mongo().then(async (mongoose) => {
        try {
          await new quotesSchema({
            quote: quote,
            author: options.get('author').value,
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