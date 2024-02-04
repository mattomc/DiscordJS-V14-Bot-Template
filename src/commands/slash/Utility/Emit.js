const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios').default

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('emit')
        .setDescription('Emits a function')
        .addStringOption((opt) => 
            opt.setName('event')
            .setDescription('Leave Join')
            .setRequired(true)
        )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    options: {
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        const Emit_Event = interaction.options.getString('event')?.toLocaleLowerCase();
        const Emit_Event_Member = interaction.guild?.members.cache.get(interaction.user.id);

        const user = interaction.user;
        const member = interaction.guild?.members.cache.get(user.id);
        if(Emit_Event === 'join'){
            // @ts-ignore
            console.log(`${member.nickname || member.displayName} joined`)
            // @ts-ignore
            client.emit('guildMemberAdd', member)
        }
        if(Emit_Event === 'leave'){
            // @ts-ignore
            console.log(`${member.nickname || member.displayName} Left`)
                        // @ts-ignore
            client.emit('guildMemberRemove', member)
        }
    }
};
