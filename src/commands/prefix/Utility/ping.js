const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'announce',
        description: 'Announce a message',
        aliases: ['say', 'sayembed'],
        permissions: 'Administrator',
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        message.delete();
        const embed = new EmbedBuilder()
            .setAuthor({name: 'SAFR Gaming', url: 'https://cms.safrgaming.com', iconURL: 'https://cms.safrgaming.com/assets/SAFR.png'})
            .setDescription(args.slice(0).join(" "))
            .setTimestamp()
            .setFooter({text: 'MMXXIV - SAFR Gaming', iconURL: 'https://cms.safrgaming.com/assets/SAFR.png'})

        await message.channel.send({embeds: [embed]})
    }
};
