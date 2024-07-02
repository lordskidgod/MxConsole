// Import necessary modules
require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping
  ]
});

// Initialize command collection
client.commands = new Collection();

// Read command files from directory
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load commands into client.commands collection
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// Event listener for when the client is ready
client.once('ready', () => {
  console.log(`✅ ${client.user.tag} is online.`);
});

// Event listener for interactions (commands and modals)
client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.warn(`Command not found: ${interaction.commandName}`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing command ${interaction.commandName}: ${error}`);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === 'bugReportModal') {
      try {
        const ingameName = interaction.fields.getTextInputValue('ingameName');
        const bugTitle = interaction.fields.getTextInputValue('bugTitle');
        const bugDescription = interaction.fields.getTextInputValue('bugDescription');

        console.log(`In-Game Name: \`${ingameName}\``);
        console.log(`Bug Title: \`${bugTitle}\``);
        console.log(`Bug Description: \`${bugDescription}\``);

        const devRoleID = process.env.DEV_ROLE_ID; // Development role ID
        const devRoleMention = `<@&${devRoleID}>`; // Mention the development role

        const embed = new EmbedBuilder()
          .setColor('#d70a84')
          .setTitle(`🐞 Bug Report`)
          .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
          .setDescription('A new bug report has been submitted:')
          .addFields(
            { name: '📝 In-Game Name', value: `\`${ingameName}\``, inline: true },
            { name: '📋 Bug Title', value: `\`${bugTitle}\``, inline: true },
            { name: '📝 Description', value: `\`${bugDescription}\``, inline: false }
          )
          .setTimestamp()
          .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() });

        const logChannel = interaction.client.channels.cache.get(process.env.BUG_REPORT_CHANNEL);
        if (logChannel) {
          await logChannel.send({ content: `${devRoleMention}`, embeds: [embed] });
          console.log('Bug report successfully sent to log channel.');
          await interaction.reply({ content: '<:BugHunter1:1256650386312527894> Bug report submitted successfully!', ephemeral: true });
        } else {
          console.error(`Error: Log channel not found with ID 1256518597988319345`);
          await interaction.reply({ content: 'Log channel not found. Please contact an administrator.', ephemeral: true });
        }
      } catch (error) {
        console.error('Error handling modal submission:', error);
        if (error.code !== 'InteractionAlreadyReplied') {
          await interaction.reply({
            content: 'An error occurred while submitting your bug report. Please try again later.',
            ephemeral: true
          });
        }
      }
    }
  }
});

// Login to Discord with bot token
client.login(process.env.TOKEN);
