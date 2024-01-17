const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Replies with pong!')
        .addStringOption((opt) => opt.setName('Message').setDescription('Message to announce').setRequired(true))
        .addChannelOption((opt) => opt.setName('Channel').setDescription('Channel the announcement will be posted').setRequired(true))
        .addMentionableOption((opt) => opt.setName('Mention').setDescription('Role to mention')),
    options: {
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.reply({
            content: 'Sending'
        });

        const Channel_Provided = interaction.options.getChannel('Channel') || interaction.channel
        const Message = interaction.options.getString('Message')

        // @ts-ignore
        Channel_Provided.send(Message);
        
        await interaction.reply({
            content: 'Sent Announcement'
        })

    }
};
