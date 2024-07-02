const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const os = require('os');
const axios = require('axios');
const si = require('systeminformation'); // Install systeminformation package
const { version } = require('../../package.json');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Displays information about the bot.'),
    async execute(interaction) {
        try {
            await interaction.deferReply(); // Acknowledge the interaction

            console.log('Interaction deferred, gathering system information...');

            const uptime = formatUptime(Math.floor(process.uptime()));
            const totalMemoryMB = (os.totalmem() / 1024 / 1024).toFixed(2);
            const usedMemoryMB = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            const cpuUsage = os.loadavg()[0].toFixed(2);

            const networkInterfaces = os.networkInterfaces();
            let networkSent = 0, networkReceived = 0;

            for (const iface of Object.values(networkInterfaces)) {
                iface.forEach(interfaceInfo => {
                    if (interfaceInfo.internal) return;
                    networkSent += interfaceInfo.tx_bytes || 0;
                    networkReceived += interfaceInfo.rx_bytes || 0;
                });
            }

            networkSent = (networkSent / (1024 * 1024 * 1024)).toFixed(1); // Convert to GB
            networkReceived = (networkReceived / (1024 * 1024 * 1024)).toFixed(1); // Convert to GB

            const cpuInfo = await si.cpu();
            const diskInfo = await si.fsSize();
            const totalDiskGB = (diskInfo.reduce((acc, disk) => acc + disk.size, 0) / (1024 * 1024 * 1024)).toFixed(1);
            const usedDiskGB = (diskInfo.reduce((acc, disk) => acc + disk.used, 0) / (1024 * 1024 * 1024)).toFixed(1);

            console.log('System information gathered, building embed...');

            const embed = new EmbedBuilder()
                .setColor('#d70a84')
                .setTitle('MxConsole Bot Information')
                .setDescription("Here's a summary of how I'm doing!")
                .setThumbnail(interaction.client.user.displayAvatarURL())
                .addFields(
                    { name: '🛠️ Developer:', value: '```lordskidgod```', inline: true },
                    { name: '🤖 Version:', value: '```v1.20.4```', inline: true },
                    { name: 'System Info:', value: `\`\`\`System: ${os.type()}\nNode Name: ${os.hostname()}\nRelease: ${os.release()}\nVersion: ${os.version()}\nMachine: ${os.arch()}\nProcessor: ${cpuInfo.manufacturer} ${cpuInfo.brand} (${cpuInfo.cores} cores)\`\`\``, inline: false },
                    { name: '📡 Servers:', value: `\`\`\`${interaction.client.guilds.cache.size}\`\`\``, inline: true },
                    { name: '⏳ Uptime:', value: `\`\`\`${uptime}\`\`\``, inline: true },
                    { name: '⚙️ CPU Usage:', value: `\`\`\`${cpuUsage}%\`\`\``, inline: true },
                    { name: '💾 Memory Usage:', value: `\`\`\`${((usedMemoryMB / totalMemoryMB) * 100).toFixed(1)}%\`\`\``, inline: true },
                    { name: '🗃️ Disk Usage:', value: `\`\`\`${usedDiskGB} GB / ${totalDiskGB} GB\`\`\``, inline: true },
                    { name: '📊 Network Sent:', value: `\`\`\`${networkSent} GB\`\`\``, inline: true },
                    { name: '📥 Network Received:', value: `\`\`\`${networkReceived} GB\`\`\``, inline: true },
                    { name: '📋 Commands:', value: `\`\`\`${interaction.client.commands.size}\`\`\``, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() });

            await interaction.editReply({ embeds: [embed] }); // Edit the deferred reply with the embed
            console.log('Reply sent successfully.');

        } catch (error) {
            console.error('Error executing botinfo command:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /botinfo command')
                .setDescription(`\`\`\`${error.message}\`\`\``)
                .setTimestamp()
                .setFooter({ text: 'Error Logger', iconURL: 'https://images-ext-1.discordapp.net/external/0ROztaLHe2QQ0jnmBjVrfePWa-qfibLzcIsttHFnsL0/https/cdn.discordapp.com/avatars/1256991688065417348/e0f76a2548e6a374b9ce236d1b6399c9.webp?format=webp' });

            // Log the error to the webhook
            await axios.post(webhookURL, {
                embeds: [errorEmbed],
                username: 'Error Logger',
                avatar_url: 'https://images-ext-1.discordapp.net/external/0ROztaLHe2QQ0jnmBjVrfePWa-qfibLzcIsttHFnsL0/https/cdn.discordapp.com/avatars/1256991688065417348/e0f76a2548e6a374b9ce236d1b6399c9.webp?format=webp' // Replace with your desired avatar URL
            });

            if (interaction.deferred || interaction.replied) {
                await interaction.editReply('There was an error while executing this command!');
            } else {
                await interaction.reply('There was an error while executing this command!');
            }
        }
    },
};
