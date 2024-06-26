const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const axios = require('axios').default

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('removewhitelist')
        .setDescription('Removes whitelist for a member!')
        .addUserOption((opt) =>
        opt.setName('user')
            .setDescription('The user.')
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

        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild?.members.cache.get(user.id);
        const isWhitelisted = await axios.get(`https://cms.safrgaming.com/api/fivem/whitelisted?discord=${user.id}`);

        if(!member){
            await interaction.reply({
             content: 'That user is not in the guild'
         });
         return;
        };

        if(!isWhitelisted.data.Whitelisted){
            await interaction.reply({
                content: `${member?.nickname || user.displayName} is not whitelisted. to whitelist the member please use /whitelist`
            });
            return;
        }

        if(isWhitelisted.data.Whitelisted){
            const whitelist_member = await axios({method: 'PATCH', url: 'https://cms.safrgaming.com/api/discord/member/whitelist', data: {"DiscordID": user.id, "Whitelisted":"false"}, headers: {"discordid": interaction.user.id}})
            if(whitelist_member.data.success) return await interaction.reply({content: `Whitelisted ${member?.nickname || user.displayName}!`})
            await interaction.reply({content: `an error occured. error\n${whitelist_member.data.error}`}); return;
        }
    }
};
