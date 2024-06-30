const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
  data: new SlashCommandBuilder()
    .setName('player-report')
    .setDescription('Report an issue about a player.')
    .addUserOption(option =>
      option.setName('player')
        .setDescription('Mention the player.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('report')
        .setDescription('Type the report or issue.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const reportChannelId = '1057003377042661436'; // Channel ID for player reports
      const logChannelId = '1256450029187498015'; // Channel ID for logging reports
      const guildId = interaction.guild.id; // Guild ID for fetching emojis
      const adminRoleId = '1046136176630833196'; // Admin role ID
      const moderatorRoleId = '1046136176630833195'; // Moderator role ID

      // Check if command is used in the correct channel
      if (interaction.channelId !== reportChannelId) {
        await interaction.reply({
          content: `You can only use this command in the <#${reportChannelId}> channel.`,
          ephemeral: true
        });
        return;
      }

      // Retrieve options from user interaction
      const reporter = interaction.user;
      const player = interaction.options.getUser('player');
      const report = interaction.options.getString('report');

      // Send confirmation message to the user
      await interaction.reply({
        content: `Report submitted successfully for **${player.username}** (\`${player.id}\`)`,
        ephemeral: true
      });

      // Build embed for logging the report
      const embed = new EmbedBuilder()
        .setTitle('Player Report')
        .setColor('#d70a84')
        .setDescription(`Report submitted successfully for ${player}`)
        .addFields(
          { name: 'Reporter', value: `<@${reporter.id}>`, inline: true },
          { name: 'Player', value: `${player}`, inline: true },
          { name: 'Report', value: `\`\`\`${report}\`\`\`` }
        )
        .setThumbnail(player.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() });

      // Send the embed to the log channel and react with emojis
      const logChannel = await interaction.client.channels.fetch(logChannelId);
      const sentMessage = await logChannel.send({ embeds: [embed] });

      // Fetch custom emojis by their IDs
      const guild = interaction.client.guilds.cache.get(guildId);
      if (!guild) throw new Error('Guild not found.');

      const successEmojiId = '1227589059740962876'; // ID of <:correct:1227589059740962876>
      const failureEmojiId = '1227589062437900318'; // ID of <:false:1227589062437900318>

      const successEmoji = guild.emojis.cache.get(successEmojiId);
      const failureEmoji = guild.emojis.cache.get(failureEmojiId);

      if (!successEmoji || !failureEmoji) {
        throw new Error('One or both emojis not found in the guild.');
      }

      // React with appropriate emojis
      await sentMessage.react(successEmoji);
      await sentMessage.react(failureEmoji);

      // Reaction collector to handle reactions
      const filter = (reaction, user) => {
        return [successEmojiId, failureEmojiId].includes(reaction.emoji.id) && user.id !== interaction.client.user.id;
      };

      const collector = sentMessage.createReactionCollector({ filter, time: 60000 });

      collector.on('collect', async (reaction, user) => {
        if (reaction.emoji.id === successEmojiId) {
          // Check if the reactor has admin or moderator role
          const member = await interaction.guild.members.fetch(user.id);
          if (member.roles.cache.has(adminRoleId) || member.roles.cache.has(moderatorRoleId)) {
            // Send DM to the reporter
            try {
              await reporter.send({
                content: `Thank you for submitting the report. We will review it and take appropriate action.`
              });

              // Modify the log embed
              embed.setDescription(`**<:dgreen:1227589072604627026> Reporter Alerted! Successfully by ${user}**`);
              await sentMessage.edit({ embeds: [embed] });

              // Remove emojis from the log message
              await sentMessage.reactions.removeAll();
            } catch (error) {
              console.error(`Failed to send DM to ${reporter.username}:`, error);
            }
          }
        }
      });

    } catch (error) {
      console.error('Error executing command player-report:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /olayer-report command')
                .setDescription(`\`\`\`${error.message}\`\`\``)
                .setTimestamp()
                .setFooter({ text: 'Error Logger', iconURL: 'https://images-ext-1.discordapp.net/external/0ROztaLHe2QQ0jnmBjVrfePWa-qfibLzcIsttHFnsL0/https/cdn.discordapp.com/avatars/1256991688065417348/e0f76a2548e6a374b9ce236d1b6399c9.webp?format=webp' });

            // Log the error to the webhook
            await axios.post(webhookURL, {
                embeds: [errorEmbed],
                username: 'Error Logger',
                avatar_url: 'https://images-ext-1.discordapp.net/external/0ROztaLHe2QQ0jnmBjVrfePWa-qfibLzcIsttHFnsL0/https/cdn.discordapp.com/avatars/1256991688065417348/e0f76a2548e6a374b9ce236d1b6399c9.webp?format=webp' // Replace with your desired avatar URL
            });

      await interaction.reply({
        content: 'An error occurred while executing this command!',
        ephemeral: true
      });
    }
  },
};
