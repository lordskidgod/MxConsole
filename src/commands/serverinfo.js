const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about this server.'),
    async execute(interaction) {
        try {
            
            const { guild } = interaction;
            const owner = await guild.fetchOwner();
            const roles = guild.roles.cache.map(role => role.name).join(', ');

            // Filter channels by type for accurate count
            const textChannels = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
            const voiceChannels = guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;

            // Construct the embed
            const embed = new EmbedBuilder()
                .setTitle('📊 Server Information')
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .addFields(
                    { name: '📛 Server Name', value: `\`\`\`${guild.name}\`\`\``, inline: true },
                    { name: '🆔 Server ID', value: `\`\`\`${guild.id}\`\`\``, inline: true },
                    { name: '👥 Total Members', value: `\`\`\`${guild.memberCount}\`\`\``, inline: true },
                    { name: '📅 Creation Date', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
                    { name: '👑 Owner', value: `<@${guild.ownerId}> (\`${owner.user.tag}\`)`, inline: true },
                    { name: '🔢 Role Count', value: `\`\`\`${guild.roles.cache.size}\`\`\``, inline: true },
                    { name: '📋 Channel Count', value: `\`\`\`${guild.channels.cache.size}\`\`\``, inline: true }, // Total channels
                    { name: '💬 Text Channels', value: `\`\`\`${textChannels}\`\`\``, inline: true },
                    { name: '🔊 Voice Channels', value: `\`\`\`${voiceChannels}\`\`\``, inline: true },
                    { name: '🚀 Boost Level', value: `\`\`\`${guild.premiumTier}\`\`\``, inline: true },
                    { name: '🔮 Boost Count', value: `\`\`\`${guild.premiumSubscriptionCount}\`\`\``, inline: true },
                    { name: '🏷️ Roles', value: `\`\`\`${roles || 'No roles'}\`\`\``, inline: false }
                )
                .setTimestamp()
                .setFooter({
                    text: 'MxConsole v1.20.4',
                    iconURL: interaction.client.user.displayAvatarURL()
                })
                .setColor('#d70a84');

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing command serverinfo:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /serverinfo command')
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
                content: 'An error occurred while executing this command. Please try again later.',
                ephemeral: true
            });
        }
    },
};
