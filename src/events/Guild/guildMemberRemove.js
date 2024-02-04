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
      await axios({
        method: 'patch',
        url: 'https://cms.safrgaming.com/api/discord/member/leave',
        data: {
          "DiscordID": client.user?.id,
        },
        headers: {
          'DiscordID': '582540910554906645'
        }
      }).then(async res => {
        console.log(res.data)
        Member_Name = res.data.profile ? res.data.profile.username : 'N/A';
      })
      if(Member_Name === 'N/A') Member_Name = client.user?.username;
      SAFR_Leave_Channel.send(`Member: ${Member_Name} Left`)

    }
}