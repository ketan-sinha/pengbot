const { Client, Intents, Collection } = require('discord.js');
const {
  guild_id,
  token,
} = require('./config.json');

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const client = new Client({ intents: Intents.FLAGS.GUILD_MESSAGES });
client.commands = new Collection();

client.on('ready', async () => {
  console.log('🐧🤖 is ready!');

  for (const file of commandFiles) {
    const cmd = require(`./commands/${file}`);
    const data = {
      name: cmd.name,
      description: cmd.description,
      options: cmd.options,
    };
    await client.guilds.cache.get(guild_id).commands.create(data);
    client.commands.set(cmd.name, cmd);
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