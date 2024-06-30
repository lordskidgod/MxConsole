const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { TextInputStyle, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bug-report')
        .setDescription('Report a bug in the Minecraft server.'),
    async execute(interaction) {
        try {          
            // Create the modal
            const modal = new ModalBuilder()
                .setCustomId('bugReportModal')
                .setTitle('SriCraft MC Bug Report');

            // Define the input fields
            const ingameNameInput = new TextInputBuilder()
                .setCustomId('ingameName')
                .setLabel("In-Game Name")
                .setPlaceholder("Enter your Minecraft username")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const bugTitleInput = new TextInputBuilder()
                .setCustomId('bugTitle')
                .setLabel("Bug Title")
                .setPlaceholder("Enter a brief title for the bug")
                .setStyle(TextInputStyle.Short)
                .setRequired(true);

            const bugDescriptionInput = new TextInputBuilder()
                .setCustomId('bugDescription')
                .setLabel("Bug Description")
                .setPlaceholder("Describe the bug in detail")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);

            // Create action rows
            const firstActionRow = new ActionRowBuilder().addComponents(ingameNameInput);
            const secondActionRow = new ActionRowBuilder().addComponents(bugTitleInput);
            const thirdActionRow = new ActionRowBuilder().addComponents(bugDescriptionInput);

            // Add action rows to the modal
            modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

            // Show the modal
            await interaction.showModal(modal);
        } catch (error) {
            console.error('Error executing command bug-report:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /bug-report command')
                .setDescription(`\`\`\`${error.message}\`\`\``)
                .setTimestamp()
                .setFooter({ text: 'Error Logger', iconURL: 'https://images-ext-1.discordapp.net/external/0ROztaLHe2QQ0jnmBjVrfePWa-qfibLzcIsttHFnsL0/https/cdn.discordapp.com/avatars/1256991688065417348/e0f76a2548e6a374b9ce236d1b6399c9.webp?format=webp' });

            // Log the error to the webhook
            await axios.post(webhookURL, {
                embeds: [errorEmbed],
                username: 'Error Logger',
                avatar_url: 'https://images-ext-1.discordapp.net/external/0ROztaLHe2QQ0jnmBjVrfePWa-qfibLzcIsttHFnsL0/https/cdn.discordapp.com/avatars/1256991688065417348/e0f76a2548e6a374b9ce236d1b6399c9.webp?format=webp' // Replace with your desired avatar URL
            });

            try {
                await interaction.reply({
                    content: 'An error occurred while executing this command!',
                    ephemeral: true
                });
            } catch (replyError) {
                console.error('Error replying to interaction:', replyError);
            }
        }
    },
};
