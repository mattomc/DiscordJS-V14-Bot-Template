// @ts-nocheck
// @ts-ignore
const config = require("../../config");
// @ts-ignore
const { log } = require("../../functions");
const ExtendedClient = require("../../class/ExtendedClient");
const axios = require('axios').default

module.exports = {
    event: "guildMemberRemove",
    /**
     *
     * @param {ExtendedClient} client
     * @returns
     */
    run: async (member, client) => {
      let SAFR_Guild = member.guilds.cache.find(g => g.id === '680036316783968316')
      let SAFR_Leave_Channel = SAFR_Guild.channels.cache.find(ch => ch.id === '808563940635443200');
      // @ts-ignore
      // @ts-ignore
      let Member_Name;

      if(client.guild.id !== '680036316783968316') return;
      const leave = await axios.post(`https://cms.safrgaming.com/members/discord/leave?discordid=${client.user?.id}&auth=582540910554906645`)
        console.log(leave.data)
        Member_Name = leave.data.profile ? res.data.profile.username : 'N/A';
      if(Member_Name === 'N/A') Member_Name = client.user?.username;
      SAFR_Leave_Channel.send(`Member: ${Member_Name} Left`)

    }
}