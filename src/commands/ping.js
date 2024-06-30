const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows The MxConsole\'s Ping Latency'),
    async execute(interaction) {
        try {
            const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });

            const uptime = `\`\`\`${Math.floor(interaction.client.uptime / 86400000)}d ${Math.floor((interaction.client.uptime % 86400000) / 3600000)}h ${Math.floor((interaction.client.uptime % 3600000) / 60000)}m\`\`\``;
            const heartbeat = `\`\`\`${interaction.client.ws.ping}ms\`\`\``;
            const latency = `\`\`\`${sent.createdTimestamp - interaction.createdTimestamp}ms\`\`\``;
            const memoryUsage = `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``;
            const userCount = `\`\`\`${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}\`\`\``;
            const botVersion = `\`\`\`v1.20.4\`\`\``;

            const embed = new EmbedBuilder()
                .setColor('#d70a84')
                .setTitle(':ping_pong: Pong!')
                .setDescription('**Information about MxConsole\'s Ping**')
                .addFields(
                    { name: ':robot: Bot Version', value: botVersion, inline: true },
                    { name: ':stopwatch: Uptime', value: uptime, inline: true },
                    { name: ':round_pushpin: Latency', value: latency, inline: true },
                    { name: ':bar_chart: Memory Usage', value: `${memoryUsage}`, inline: true },
                    { name: ':sparkling_heart: WS Heartbeat', value: heartbeat, inline: true },
                    { name: ':busts_in_silhouette: User Count', value: `${userCount}`, inline: true }
                )
                .setThumbnail(interaction.client.user.displayAvatarURL())
                .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() })
                .setTimestamp();

            await sent.edit({ content: `${interaction.user}`, embeds: [embed] });
        } catch (error) {
            console.error(`Error executing ping command: ${error}`);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /ping command')
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
                content: 'There was an error while executing this command!',
                ephemeral: true // This ensures only the user who triggered the command can see this response
            });
        }
    },
};
