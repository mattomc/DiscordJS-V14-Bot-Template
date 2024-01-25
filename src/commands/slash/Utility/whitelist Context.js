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
    run: async (client, interaction) => {

        if(!interaction.isUserContextMenuCommand()) return;
        const user = interaction.targetUser;
        const member = interaction.guild?.members.cache.get(user.id);
        const isWhitelisted = await axios.get(`https://cms.safrgaming.com/api/fivem/whitelisted?discord=${user.id}`);

        if(!member){
            await interaction.reply({
             content: 'That user is not in the guild'
         });
         return;
        };

        if(isWhitelisted.data.Whitelisted){
            await interaction.reply({
                content: `${member?.nickname || user.displayName} is already whitelisted. to remove whitelist please use /removewhitelist`
            });
            return;
        }

        if(!isWhitelisted.data.Whitelisted){
            const whitelist_member = await axios({method: 'PATCH', url: 'https://cms.safrgaming.com/api/discord/member/whitelist', data: {"DiscordID": user.id, "Whitelisted":"true"}, headers: {"discordid": interaction.user.id}})
            if(whitelist_member.data.success) return await interaction.reply({content: `Whitelisted ${member?.nickname || user.displayName}!`})
            await interaction.reply({content: `an error occured. error\n${whitelist_member.data.error}`}); return;
        }
    }
};
