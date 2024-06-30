const { EmbedBuilder, Events, PermissionsBitField } = require('discord.js');

module.exports = (client) => {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'bugReportModal') {
            try {
                const ingameName = interaction.fields.getTextInputValue('ingameName');
                const bugTitle = interaction.fields.getTextInputValue('bugTitle');
                const bugDescription = interaction.fields.getTextInputValue('bugDescription');

                console.log(`In-Game Name: ${ingameName}`);
                console.log(`Bug Title: ${bugTitle}`);
                console.log(`Bug Description: ${bugDescription}`);

                const devRoleID = '1046136176630833199'; // Development role ID
                const devRoleMention = `<@&${devRoleID}>`; // Mention the development role

                const embed = new EmbedBuilder()
                    .setColor('#d70a84')
                    .setTitle(`Bug Report from ${interaction.user.tag}`)
                    .setDescription(`**In-Game Name:** ${ingameName}\n**Bug Title:** ${bugTitle}\n**Bug Description:** ${bugDescription}`)
                    .setTimestamp()
                    .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() });

                const logChannel = interaction.client.channels.cache.get('1256518597988319345');
                if (logChannel) {
                    // Mention the development role in the content
                    await logChannel.send({ content: `${devRoleMention}`, embeds: [embed] });

                    await interaction.reply({ content: 'Bug Report Submitted Successfully!', ephemeral: true });
                } else {
                    console.error(`Error: Log channel not found with ID 1256518597988319345`);
                    await interaction.reply({ content: 'Log channel not found. Please contact an administrator.', ephemeral: true });
                }
            } catch (error) {
                console.error('Error handling modal submission:', error);
                if (error.code !== 'InteractionAlreadyReplied') {
                    await interaction.reply({
                        content: 'An error occurred while submitting your bug report. Please try again later.',
                        ephemeral: true
                    });
                }
            }
        }
    });
};
