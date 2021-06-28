const { MessageAttachment, MessageEmbed } = require('discord.js');
const mongo = require('../mongo/mongo');
const quotesSchema = require('../mongo/schemas/quotesSchema');

const thumb = new MessageAttachment('./resources/pengwing/penghead.png', 'penghead.png');
const color = '#90e0f7';

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
    const embed = new MessageEmbed();

    if (interaction.options.has('say')) {
      await mongo().then(async mongoose => {
        try {
          const rand = Math.floor(Math.random() * await quotesSchema.countDocuments());
          const quote = await quotesSchema.findOne().skip(rand);

          if (quote) {
            const author = await guild.members.fetch(quote.author);

            embed.setTitle('Pengwing said!')
              .setDescription(`${quote.quote}`)
              .setColor(color)
              .setAuthor(author.user.username, author.user.avatarURL())
              .setThumbnail('attachment://penghead.png')
              .setFooter(`#${quote._id}`);

            if (quote.context) {
              embed.fields = [{
                name: 'Context',
                value: `${quote.context}`,
                inline: true,
              }];
            }

            await interaction.reply({ embeds: [embed], files: [thumb] });
          }
          else {
            console.log('No quotes in db');
            await interaction.reply('No quotes found! Try adding one with `/quote add`', { ephemeral: true });
          }
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

      embed.setTitle('Pengwing says!')
        .setDescription(`${quote}`)
        .setColor(color)
        .setAuthor(author.user.username, author.user.avatarURL())
        .setThumbnail('attachment://penghead.png')
        .setFooter(`#${quote._id}`);

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