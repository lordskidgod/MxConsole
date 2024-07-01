const { SlashCommandBuilder } = require('@discordjs/builders');

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
            await interaction.reply({ content: 'There was an error trying to purge messages in this channel.', ephemeral: true });
        }
    },
};
