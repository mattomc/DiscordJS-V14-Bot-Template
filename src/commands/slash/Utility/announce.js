const { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Sends a announcement to a specified channel')
        .addStringOption((opt) => opt.setName('message').setDescription('Message to announce').setRequired(true))
        .addChannelOption((opt) => opt.setName('channel').setDescription('Channel the announcement will be posted').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addMentionableOption((opt) => opt.setName('mention').setDescription('Role to mention')),
    options: {
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const Channel_Provided = interaction.options.getChannel('channel') || interaction.channel
        const Message = interaction.options.getString('message')

        // @ts-ignore
        Channel_Provided.send(Message);

        await interaction.reply({
            content: 'Sent Announcement'
        })

    }
};
