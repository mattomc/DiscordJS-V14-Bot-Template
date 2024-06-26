// @ts-ignore
const config = require("../../config");
// @ts-ignore
const { log } = require("../../functions");
const ExtendedClient = require("../../class/ExtendedClient");

module.exports = {
    event: "guildMemberAdd",
    /**
     *
     * @param {ExtendedClient} client
     * @returns
     */
    run: async (member, client) => {
      let SAFR_Guild = member.guilds.cache.find(g => g.id === '680036316783968316')
      // @ts-ignore
      let SAFR_Guild_member = SAFR_Guild.members.cache.find(m => m.id === client.user.id)
      // @ts-ignore

      if(client.guild.id !== '680036316783968316') return;
      let Channel = await SAFR_Guild.channels.cache.find(ch => ch.id === '685126748492529677');
      // @ts-ignore
      if(!Channel) return; Channel.send(`# Welcome  <@${client.user.id}> to ${client.guild.name}\n[Apply Here](https://cms.safrgaming.com/apply)\nImportant information can be found in #public-information\n<:SAFR:735256212387528785>`)
      try {
        SAFR_Guild_member.roles.add('722692460714917908') 
      } catch (error) {
        console.log(error)
      }
    }
}