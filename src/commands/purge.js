const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

const webhookURL = process.env.ERROR_WEBHOOK_URL;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge a specified number of messages.')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to purge (max 100)')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        // Check if the amount is within the valid range
        if (amount < 1 || amount > 100) {
            return await interaction.reply({ content: 'You need to input a number between 1 and 100.', ephemeral: true });
        }

        // Get the channel and fetch the messages
        const channel = interaction.channel;

        try {
            const messages = await channel.messages.fetch({ limit: amount });
            await channel.bulkDelete(messages, true);

            await interaction.reply({ content: `Successfully Purged ${messages.size} messages.`, ephemeral: true });
        } catch (error) {
            console.error('Error purging messages:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /purge command')
                .setDescription(`\`\`\`${error.message}\`\`\``)
                .setTimestamp();

            // Log the error to the webhook
            try {
                await axios.post(webhookURL, {
                    embeds: [errorEmbed],
                    username: 'Error Logger',
                    avatar_url: 'https://cdn.discordapp.com/avatars/1256991688065417348/e0f76a2548e6a374b9ce236d1b6399c9.webp?size=128' // Replace with your desired avatar URL
                });
            } catch (err) {
                console.error('Error logging to webhook:', err);
                // Retry logic or additional error handling can be added here
            }

            // Reply to the user with an error message
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};
