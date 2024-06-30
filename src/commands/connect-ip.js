const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Displays the Minecraft server IP address.'),
    async execute(interaction) {
        try {
            // Define the server IP
            const serverIP = 'play.sricraftmc.net'; // Replace with your actual server IP

            // Create the embed
            const embed = new EmbedBuilder()
                .setColor('#d70a84')
                .setTitle('🏝️ **SriCraft MC Server IP**')
                .setDescription('**Connect to our Minecraft server using the IP address below:**')
                .addFields(
                    { name: '<:mcpink:1256833648154640526>  Server IP', value: `\`\`\`${serverIP}\`\`\``, inline: false },
                    { name: '<:dev:1256832847554281542> Version', value: '\`\`1.20.4\`\`', inline: true }, // Example field for server version
                    { name: '<:dgreen:1227589072604627026> Status', value: '\`\`Online\`\`', inline: true } // Example field for server status
                )
                .setThumbnail('https://media.discordapp.net/attachments/1046136178098831487/1256828597151469670/SriCraft_Logo1.png') // Replace with your server's icon URL
                .setImage('https://example.com/banner.png') // Example banner image for a more attractive embed, replace with your URL
                .setTimestamp()
                .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() });

            // Send the embed
            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error executing command /ip:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /ip command')
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
                content: 'An error occurred while fetching the server IP. Please try again later.',
                ephemeral: true
            });
        }
    },
};
