require('dotenv').config(); // Load environment variables from .env file
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('View MxConsole\'s Command List!'),
    async execute(interaction) {
        try {
            const commandsDir = path.join(__dirname);
            const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

            const commandsList = commandFiles.map(file => {
                const command = require(path.join(commandsDir, file));
                return {
                    name: command.data.name,
                    description: command.data.description,
                    usage: command.data.usage || '',
                    category: command.data.category || 'General'
                };
            });

            const categories = {};
            commandsList.forEach(command => {
                if (!categories[command.category]) {
                    categories[command.category] = [];
                }
                categories[command.category].push(command);
            });

            const categoryIcons = {
                'General': 'https://example.com/general-icon.png',
                'Minecraft': 'https://example.com/minecraft-icon.png',
                'Moderation': 'https://example.com/moderation-icon.png'
            };

            const maxCommandsPerPage = 4;
            const embeds = [];
            for (const [category, commands] of Object.entries(categories)) {
                for (let i = 0; i < commands.length; i += maxCommandsPerPage) {
                    const embed = new EmbedBuilder()
                        .setTitle(`📋 MxConsole Bot Commands - SriCraft MC`)
                        .setColor('#d70a84')
                        .setDescription(`Here are the available commands for the **${category}** category:`)
                        .setFooter({ text: 'MxConsole v1.20.4', iconURL: interaction.client.user.displayAvatarURL() })
                        .setThumbnail(categoryIcons[category] || 'https://example.com/default-icon.png')
                        .setTimestamp();

                    const currentCommands = commands.slice(i, i + maxCommandsPerPage);
                    currentCommands.forEach(command => {
                        embed.addFields({
                            name: `**\`/${command.name}\`**`,
                            value: `\`\`\`${command.description}\`\`\``,
                            inline: false
                        });
                    });

                    embeds.push(embed);
                }
            }

            if (embeds.length === 1) {
                await interaction.reply({ embeds: [embeds[0]] });
            } else {
                let currentPage = 0;
                const buttons = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('first')
                            .setLabel('⏮️ First')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId('previous')
                            .setLabel('⬅️ Previous')
                            .setStyle(ButtonStyle.Primary)
                            .setDisabled(true),
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel('Next ➡️')
                            .setStyle(ButtonStyle.Primary),
                        new ButtonBuilder()
                            .setCustomId('last')
                            .setLabel('Last ⏭️')
                            .setStyle(ButtonStyle.Primary)
                    );

                const message = await interaction.reply({
                    embeds: [embeds[currentPage]],
                    components: [buttons],
                    fetchReply: true
                });

                const filter = i => i.user.id === interaction.user.id;
                const collector = message.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 60000 });

                collector.on('collect', async i => {
                    if (i.customId === 'first') {
                        currentPage = 0;
                    } else if (i.customId === 'previous') {
                        currentPage--;
                    } else if (i.customId === 'next') {
                        currentPage++;
                    } else if (i.customId === 'last') {
                        currentPage = embeds.length - 1;
                    }

                    buttons.components[0].setDisabled(currentPage === 0);
                    buttons.components[1].setDisabled(currentPage === 0);
                    buttons.components[2].setDisabled(currentPage === embeds.length - 1);
                    buttons.components[3].setDisabled(currentPage === embeds.length - 1);

                    await i.update({ embeds: [embeds[currentPage]], components: [buttons] });
                });

                collector.on('end', () => {
                    buttons.components.forEach(button => button.setDisabled(true));
                    interaction.editReply({ components: [buttons] });
                });
            }
        } catch (error) {
            console.error('Error executing /help command:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /help command')
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
    }
};
