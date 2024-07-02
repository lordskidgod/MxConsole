const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const axios = require('axios');

const webhookURL = process.env.ERROR_WEBHOOK_URL; // Use the environment variable

// Define the changelog entries
const changelogs = [
    {
        version: 'v1.0.1',
        newUpdates: [
            '🎨 Updated texture packs for a fresh visual experience.',
            '🌳 Expanded world with new biomes and terrain features.',
            '💎 Increased rare ore spawn rates for enhanced mining.',
            '🏰 Added new impressive structures to explore.'
        ],
        changes: [
            '🔄 Tweaked Mob AI for better performance.',
            '❌ Removed unused plugins for server stability.',
            '🛠️ Optimized server backend for faster response times.'
        ],
        bugFixes: [
            '🐞 Fixed item duplication exploit.',
            '🔧 Resolved server crashes during peak times.'
        ],
        date: '30/06/2024'
    },
    {
        version: 'v1.0.2',
        newUpdates: [],
        changes: [],
        bugFixes: [],
        date: '00/00/2024'
    }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('changelogs')
        .setDescription('Displays all the changelogs of SriCraft MC server.'),
    async execute(interaction) {
        try {         
            let currentIndex = 0;

            // Function to create an embed for a specific changelog entry
            const createEmbed = (index) => {
                const changelog = changelogs[index];
                const embed = new EmbedBuilder()
                    .setColor('#d70a84') // Custom color for the embed
                    .setAuthor({ name: 'SriCraft Dev Team', iconURL: 'https://media.discordapp.net/attachments/1046136178098831487/1256828597151469670/SriCraft_Logo1.png' }) // Replace with your server's icon URL
                    .setTitle(`📢 SriCraft Patch Update ${changelog.version}`)
                    .setDescription(`Here's what's new, changed in version ${changelog.version}:\n\n`)
                    .addFields(
                        { name: '<:greenbot:1256930225804017674> New Updates', value: changelog.newUpdates.length > 0 ? changelog.newUpdates.map(update => `- ${update}`).join('\n') : 'No new updates.', inline: false },
                        { name: '<:discotoolsxyzicon:1256929650584846418> Changes', value: changelog.changes.length > 0 ? changelog.changes.map(change => `- ${change}`).join('\n') : 'No changes.', inline: false },
                        { name: '<:BugHunter1:1256650386312527894> Bug Fixes', value: changelog.bugFixes.length > 0 ? changelog.bugFixes.map(fix => `- ${fix}`).join('\n') : 'No bug fixes.', inline: false }
                    )
                    .setThumbnail('https://media.discordapp.net/attachments/1046136178098831487/1256828597151469670/SriCraft_Logo1.png') // Replace with your server's icon URL
                    .setImage('https://media.discordapp.net/attachments/1213484205372215356/1233478872759271444/sr111.png') // Example banner image for a more attractive embed, replace with your URL
                    .setFooter({ text: `This update was released on ${changelog.date}.`, iconURL: interaction.client.user.displayAvatarURL() })
                    .setTimestamp();

                return embed;
            };

            // Function to create the action row with navigation buttons
            const createActionRow = () => {
                return new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('previous')
                            .setLabel('◀ Previous')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(currentIndex === 0),
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel('Next ▶')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(currentIndex === changelogs.length - 1),
                        new ButtonBuilder()
                            .setCustomId('latest')
                            .setLabel('🔄 Latest')
                            .setStyle(ButtonStyle.Danger) // This will make the button reddish/pink
                    );
            };

            // Initial reply with the first changelog entry
            await interaction.reply({
                embeds: [createEmbed(currentIndex)],
                components: [createActionRow()],
                ephemeral: false
            });

            // Create a message collector to handle button interactions
            const filter = i => i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({
                filter,
                componentType: ComponentType.Button,
                time: 60000 // 1 minute
            });

            collector.on('collect', async i => {
                if (i.customId === 'previous') {
                    currentIndex--;
                } else if (i.customId === 'next') {
                    currentIndex++;
                } else if (i.customId === 'latest') {
                    currentIndex = changelogs.length - 2; // Redirect to the second-to-last changelog entry
                }

                await i.update({
                    embeds: [createEmbed(currentIndex)],
                    components: [createActionRow()]
                });
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} interactions.`);
            });

        } catch (error) {
            console.error('Error executing command /changelogs:', error);

            // Create an embed for the error log
            const errorEmbed = new EmbedBuilder()
                .setColor('#d70a84') // Red color for errors
                .setTitle('Error executing /changelogs command')
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
                content: 'An error occurred while fetching the changelog. Please try again later.',
                ephemeral: true
            });
        }
    },
};
