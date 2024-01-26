// @ts-ignore
const { ChatInputCommandInteraction, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType, PermissionsBitField, PermissionFlagsBits } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios').default

module.exports = {
    structure: new ContextMenuCommandBuilder()
        .setName('whitelist')
        .setType(ApplicationCommandType.User)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    // @ts-ignore
    run: async (client, interaction) => {

        if(!interaction.isUserContextMenuCommand()) return;
        // @ts-ignore
        const user = interaction.targetUser;
        // @ts-ignore
        const member = interaction.guild?.members.cache.get(user.id);
        const isWhitelisted = await axios.get(`https://cms.safrgaming.com/api/fivem/whitelisted?discord=${user.id}`);

        if(!member){
            // @ts-ignore
            await interaction.reply({
             content: 'That user is not in the guild'
         });
         return;
        };

        if(isWhitelisted.data.Whitelisted){
            // @ts-ignore
            await interaction.reply({
                content: `${member?.nickname || user.displayName} is already whitelisted. to remove whitelist please use /removewhitelist`
            });
            return;
        }

        if(!isWhitelisted.data.Whitelisted){
            // @ts-ignore
            const whitelist_member = await axios({method: 'PATCH', url: 'https://cms.safrgaming.com/api/discord/member/whitelist', data: {"DiscordID": user.id, "Whitelisted":"true"}, headers: {"discordid": interaction.user.id}})
            // @ts-ignore
            if(whitelist_member.data.success) return await interaction.reply({content: `Whitelisted ${member?.nickname || user.displayName}!`})
            // @ts-ignore
            await interaction.reply({content: `an error occured. error\n${whitelist_member.data.error}`}); return;
        }
    }
};
