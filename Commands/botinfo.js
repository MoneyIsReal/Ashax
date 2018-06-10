const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    let randomColor = Math.floor(Math.random() * 16777214) + 1;
    let version = "1.3.8"
    let creator = message.guild.members.find("id", "397781787561951252")
    let uptime = bot.uptime / 60 / 60;
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setTitle(`Bot information`)
    .addField("Creator", creator)
    .setDescription(``)
    .setThumbnail(bot.user.avatarURL)
    .setFooter(`Bot uptime: ${uptime}s`)
    .setTimestamp()
    message.channel.send(embed)
}
module.exports.config = {
    command: "botinfo"
}