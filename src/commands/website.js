const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
    data: new SlashCommandBuilder()
        .setName('website')
        .setDescription('Displays the Minecraft server website.'),
    async execute(interaction) {
        try {
            // Define the server website
            const serverWebsite = 'https://sricraftmc.net'; // Replace with your actual server website URL

            // Create the embed
            const embed = new EmbedBuilder()
                .setColor('#d70a84') // Custom color
                .setTitle('🏝️ **SriCraft MC Server Website** 🏝️')
                .setDescription('**Visit our website for the latest updates, community forums, and more!**\n\n**Stay connected with us and explore all the exciting features and news we have to offer.**')
                .addFields(
                    { name: '🔗 **Website**', value: `[Click here to visit the website](${serverWebsite})`, inline: false },
                    { name: '📅 **Events**', value: 'Stay tuned for upcoming events and activities on our website!', inline: false },
                    { name: '📣 **Announcements**', value: 'Get the latest news and announcements straight from our website!', inline: false },
                    { name: '🗣️ **Community**', value: 'Join our forums and interact with other players!', inline: false }
                )
                .setThumbnail('https://media.discordapp.net/attachments/1046136178098831487/1256828597151469670/SriCraft_Logo1.png') // Replace with your server's icon URL
                .setImage('https://example.com/banner.png') // Example banner image for a more attractive embed, replace with your URL
                .setTimestamp()
                .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() });

            // Send the embed
            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error executing command /website:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /website command')
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
                content: 'An error occurred while fetching the website information. Please try again later.',
                ephemeral: true
            });
        }
    },
};
