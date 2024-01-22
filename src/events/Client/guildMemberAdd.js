const config = require("../../config");
const { log } = require("../../functions");
const ExtendedClient = require("../../class/ExtendedClient");

module.exports = {
    event: "guildMemberAdd",
    /**
     *
     * @param {ExtendedClient} client
     * @param {import('discord.js').Interaction} interaction
     * @returns
     */
    run: async (member) => {
      console.log(member)
        if(member.guild.id !== '680036316783968316') return;
        let Channel = await member.guilds.channels.cache.find(ch => ch.id === '685126748492529677');
        if(!Channel) return;
        Channel.send(`# Welcome  <@${member.user.id}> to ${member.guild.name}\n[Apply Here](https://cms.safrgaming.com/apply)\nImportant information can be found in #public-information\n<:SAFR:735256212387528785>`)
        try {
            member.roles.add('722692460714917908')     
          } catch (error) {
            console.log(error)
          }
    }
}