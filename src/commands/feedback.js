const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('Report an issue or provide feedback to a staff member.')
    .addUserOption(option =>
      option.setName('staff_member')
        .setDescription('Select the staff member to appreciate.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('issue')
        .setDescription('Describe the issue you encountered.')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('stars')
        .setDescription('Select the star rating from 1 to 5.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('feedback')
        .setDescription('Provide feedback to the staff member.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {

      // Retrieve options from user interaction
      const staffMember = interaction.options.getUser('staff_member');
      const issue = interaction.options.getString('issue');
      const stars = interaction.options.getInteger('stars');
      const feedbackText = interaction.options.getString('feedback');

      // Build the embed using EmbedBuilder
      const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.username}'s Feedback`)
        .setColor('#d70a84')
        .setThumbnail(staffMember.displayAvatarURL())
        .addFields(
          { name: 'Feedback To:', value: `<@${staffMember.id}>`, inline: true },
          { name: 'Issue Solved:', value: issue, inline: true },
          { name: 'Rating:', value: `${'⭐'.repeat(stars)} (${stars}/5)`, inline: true },
          { name: 'Feedback:', value: feedbackText, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() });

      // Send the embed to the interaction's channel
      await interaction.reply({ embeds: [embed] });

    } catch (error) {
      console.error('Error executing command feedback:', error);

      // Create an embed for the error log
      const errorEmbed = new EmbedBuilder()
        .setColor('#d70a84') // Red color for errors
        .setTitle('Error executing /feedback command')
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
