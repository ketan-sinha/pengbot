const { Client, Intents, Collection } = require('discord.js');
const {
  guild_id,
  token,
} = require('./config.json');

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const client = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });
client.commands = new Collection();

client.on('ready', async () => {
  console.log('🐧🤖 is ready!');
  client.user.setActivity('over his eggs!', { type: 'WATCHING' });
});

client.on('message', async message => {
  if (!client.guilds.cache.get(guild_id).ownerID) await client.guilds.cache.get(guild_id).fetch();

  if (message.content.toLowerCase() === '!deploy' && message.author.id === client.guilds.cache.get(guild_id).ownerID) {
    console.log('Deleting commands!');

    const guild = await client.guilds.fetch(guild_id);
    const commands = guild.commands;
    commands.set([]);

    console.log('Deploying commands...');
    for (const file of commandFiles) {
      const cmd = require(`./commands/${file}`);
      console.log(`Deploying ${cmd.name}...`)
      const data = {
        name: cmd.name,
        description: cmd.description,
        options: cmd.options,
      };
      await client.guilds.cache.get(guild_id).commands.create(data);
      client.commands.set(cmd.name, cmd);
      console.log(`Deployed ${cmd.name}!`);
    }

    console.log('Finished deploying!');
  }
});

client.on('interaction', async interaction => {
  const command = interaction.commandName;

  if (!interaction.isCommand()) return;
  if (!client.commands.get(command)) return;

  try {
    await client.commands.get(command).execute(interaction);
  }
  catch (e) {
    console.error(e);
    interaction.reply('There was an error executing that command!');
  }
});

client.login(token);