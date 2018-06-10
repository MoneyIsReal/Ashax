// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
const YTDL = require("ytdl-core");
const superagent = require("superagent");
const search = require('youtube-search');
const queue = new Map();
var fs = require('fs');
const ms = require("ms");
const moment = require('moment');
const Client = new Discord.Client({autoReconnect: true, max_message_cache: 0});
const {get} = require("snekfetch"); 
var servers = {};

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
var warnData = JSON.parse(fs.readFileSync('Storage/warnData.json', 'utf8'));


var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
var warnData = JSON.parse(fs.readFileSync('Storage/warnData.json', 'utf8'));
//let points = JSON.parse(fs.readFileSync("Storage/xpSystem", "utf8"));

const prefix = '!'; // This is the prefix, you can change it to whatever you want.
var version = "1.3.0";
// Listener Event: Runs whenever a message is received.

  function searchfunc(message){
    var server = servers[message.guild.id];
    let opts = {
      key: "AIzaSyAdpVJagVs0EoJSeTQ4pRNBCw--StCbS2Y",
    }
    let args = message.content.slice(6)
    let name = args
    console.log(name)
    search(name, opts, (err, results) => {
        if(error) return console.log(error);
        server.queue.push(results[0].link);
      })
  };

    function generateXp() {
     let min = 10;
     let max = 30;

    let xpGen = Math.floor(Math.random() * (max - min + 1)) + min;
 }


function hook(channel, title, message, color, avatar) { // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel) return console.log('Channel not specified.');
    if (!title) return console.log('Title not specified.');
    if (!message) return console.log('Message not specified.');
    if (!color) color = 'd9a744'; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
    if (!avatar) avatar = 'https://cdn.discordapp.com/avatars/398152535413882880/1a15969bd4a141b8dc2501824488c7ee.png?size=2048' // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, '');
    avatar = avatar.replace(/\s/g, '');

    // This is the start of creating the webhook
    channel.fetchWebhooks() // This gets the webhooks in the channel
        .then(webhook => {

        // Fetches the webhook we will use for each hook
        let foundHook = webhook.find('name', 'MDL'); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

    // This runs if the webhook is not found.
    if (!foundHook) {
        channel.createWebhook('Webhook', 'https://cdn.discordapp.com/avatars/398152535413882880/1a15969bd4a141b8dc2501824488c7ee.png?size=2048') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
            .then(webhook => {
            // Finally send the webhook
            webhook.send('', {
            "username": title,
            "avatarURL": avatar,
            "embeds": [{
                "color": parseInt(`0x${color}`),
                "description":message
            }]
        })
            .catch(error => { // We also want to make sure if an error is found, to report it in chat.
            console.log(error);
        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
    })
    })
    } else { // That webhook was only for if it couldn't find the original webhook
        foundHook.send('', { // This means you can just copy and paste the webhook & catch part.
            "username": title,
            "avatarURL": avatar,
            "embeds": [{
                "color": parseInt(`0x${color}`),
                "description":message
            }]
        })
            .catch(error => { // We also want to make sure if an error is found, to report it in chat.
            console.log(error);
        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
    })
    }

})

}

bot.on('messageDelete', message => {

    let logChannel = message.guild.channels.find("name", "server-log");
    if(!logChannel) return console.log("Log channel does not seem to exist!");
    const removeembed = new Discord.RichEmbed()
    .setTimestamp()
    .setAuthor(bot.user.avatarURL, bot.user.username)
    .setDescription(`${message.author.tag} deleted a message in ${message.channel.name}`)
    logChannel.send(removeembed)

});

bot.on('message', async message => {
if(message.author.bot) return
if(message.channel.type === "dm") return


    // Variables - Variables make it easy to call things, since it requires less typing.
let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
let sender = message.author; // This variable takes the message, and finds who the author is.
let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
const serverQueue = queue.get(message.guild.name);
// Commands
let randomColor = Math.floor(Math.random() * 16777214) + 1;

//reviews
let channel = message.guild.channels.find("name", "reviews").id;
if(message.channel.id === channel) message.react("♥")
//reviews

  /*  let reviewWriter = bot.channels.get("name", "reviews")
    let otherChannels = bot.channels.find("name", "general", "stuff-chat");
    let reviewChannel = bot.channels.find("name", "reviews");
    if(bot.users.get('id', '398152535413882880')) return;
    if(otherChannels) return
    if(sender) bot.channels.get("name", "reviews").send(message.author + ", thanks, we appreciate your review!")
    .then(function (message) {
        message.react("🔺")
        message.react("♥")
        message.react("🔻")
    return;
    });*/
    
if(msg.startsWith(prefix + "BOTINFO")) {
message.delete()
    message.channel.send("Current bot version: **" + version+ "**")
}
//userData
if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {
    messagesSent: 0
}
userData[sender.id + message.guild.id].messagesSent++;
fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
if(err) console.error(err);
});

//XP
/*if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  points[message.author.id].points++;
  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
  if (curLevel > userData.level) {
    // Level up!
    userData.level = curLevel;
    message.reply(`You"ve leveled up to level **${curLevel}**!`);
    console.log("There you got lvl")
  }
  if (msg.startsWith(prefix + "LEVEL")) {
    message.reply(`You are currently level ${userData.level}, with ${userData.points} points.`);
  }
  fs.writeFile("Storage/points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });*/


//CAT AND DOG
if (msg.startsWith(prefix + 'CAT')) {
    try {
        get('https://random.cat/meow').then(response => {
            message.channel.send({files: [{attachment: response.body.file, name: `cat.${response.body.file.split('.')[2]}`}]});
        })
    } catch (e) {
        console.log(e);
    }
    message.delete(5000).then(message.react("✅"))
}
if(msg.startsWith(prefix + "POLL")) {
    if (!args) return message.reply(`Usage: ${prefix}poll [poll message]`);
  if (!message.content.includes("?")) return message.reply('"Include a "?" in your poll!"');
    
  message.channel.send(`:ballot_box:  **${message.author.username} started a vote** :ballot_box:\n\n:arrow_lower_right:  ${args.join(" ")}  :arrow_lower_left:`).then(message => {
         message.react("✅")
         message.react("❌",9000)
    });
    message.delete()
}
if(msg.startsWith(prefix + "SERVERINFO")) {

const sembed = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.setColor(randomColor)
.setThumbnail(message.guild.iconURL)
.addField("Owner", message.guild.owner, true)
.addField("Members", message.guild.memberCount, true)
.addField("ID", message.guild.id, true)
.addField("Channels", message.guild.channels.size, true)
.addField("Roles", message.guild.roles.size, true)
.addField("Emojis", message.guild.emojis.size, true)
.addField("Server Region", message.guild.region, true)
.addField("Verification level", message.guild.verificationLevel, true)
.setFooter(message.guild.createdAt);

message.channel.send(sembed)
}
if(msg.startsWith(prefix + "WARN")) {

    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that!');
    let toWarn = message.guild.member(message.mentions.users.first());
    if(!toWarn) return message.reply("you didn\'t mentioned someone")

   if(toWarn.id === message.author.id) return message.reply("You can\'t warn yourself!")

    let reason = message.content.split(" ").slice(2).join(" ");
    let modlog = bot.channels.find('name', 'bans');
    if(!modlog) return message.reply('This server doesn\'t have the **bans** channel!');
    if(!reason) return message.reply('You need to supply a reason');
  if(toWarn.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t warn someone with a higher role or the same as your!");
   
    if(!warnData[toWarn.id + message.guild.id]) warnData[toWarn.id + message.guild.id] = {
        userWarns: 0
    }
    warnData[toWarn.id + message.guild.id].userWarns++;
    fs.writeFile('Storage/warnData.json', JSON.stringify(warnData), (err) => {
    if(err) console.error(err);
    }); 

    if(toWarn.roles.has("name", "Muted")) return
    let muteRole = message.guild.roles.find(r => r.name === "Muted");
    if(warnData[toWarn.id + message.guild.id].userWarns > 9) toWarn.addRole(muteRole.id).then(message.reply(toWarn + " Successfully warned. This member already got 10 or more warns. I will mute him for you :white_check_mark:"))
    if(warnData[toWarn.id + message.guild.id].userWarns < 10) message.reply(`You successfully warned ${toWarn.user.tag}`).then(message.react("✅"));
    
    const warnembed = new Discord.RichEmbed()
    .setColor(0x00ff04)
    .setThumbnail(toWarn.user.avatarURL)
    .setAuthor(toWarn.user.tag, toWarn.user.avatarURL)
    .addField("Warn information", '**Warned user: **' + toWarn + '\n**Moderator: **' + message.author + '\n**Reason: **' + reason)
    .setTimestamp()
    .setFooter("ID: " + toWarn.id);
    modlog.send({embed : warnembed})

    const testembed = new Discord.RichEmbed()
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setAuthor("Important message for you" , toWarn.user.avatarURL)
    .addField("You got a warn! Please do follow the rules next time. After 10 warns, you will get a perma mute! \nYour current warns: " + warnData[toWarn.id + message.guild.id].userWarns, "Warn reason: " + reason)

    toWarn.send(testembed)
    console.log(toWarn.user.tag + " got warned by moderator " + message.author.tag)
}
if(msg.startsWith(prefix + "CLEARWARNS")){
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that!');
    let toClearWarn = message.guild.member(message.mentions.users.first());
    if(toClearWarn.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t clear warns of a member who has a higher role or the same as your!");
    if(!toClearWarn) return message.reply("you didn\'t mentioned someone")

    if(!warnData[toClearWarn.id + message.guild.id]) return message.reply("This user has no warns to clear")

    if(warnData[toClearWarn.id + message.guild.id]) warnData[toClearWarn.id + message.guild.id] = {
        userWarns: 0
    }
    message.react("✅")


}
if(msg.startsWith(prefix + "GIVEAWAY")) {


   let mentionChannel = message.mentions.channels.first();
    if(!mentionChannel) return message.channel.send(`Usage: [Channel] [Amount of winners] [Time example: Feb 12, 2018 10:00:00] [What you want to give away]`);

    var winners = args[1];
    console.log(winners)
    if(!winners) {
        message.channel.send(`Usage: [Channel] [Amount of winners max. 30] [Time example: Feb 12, 2018 10:00:00] [What you want to give away]`)
        return
    }
    if(winners > 30) return message.channel.send(`${winners} winners are too much. Max. 30 winners!`)


    var time = args.slice(2,6).join(" ");
    console.log(time)
    if(!time) return message.channel.send(`Usage: [Channel] [Amount of winners] [Time example: Feb 12, 2018 10:00:00] [What you want to give away]`);

    let inhalt = args.slice(6).join(" ");
    console.log(inhalt)
    if(!inhalt) return message.channel.send(`Usage: [Channel] [Amount of winners] [Time example: Feb 12, 2018 10:00:00] [What you want to give away]`);
    
    const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setTitle(`**${inhalt}**`)
    .addField("React with 🎉 to join the giveaway", `**Giveaway Started**`);
    let startMessage = mentionChannel.send("🎉 Giveaway 🎉")
    mentionChannel.send(embed).then(async(message) => {

       var x = setInterval(function() {
            var now = new Date().getTime();
            var countDownDate = new Date(time).getTime();
            var distance = countDownDate - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const embed = new Discord.RichEmbed()
            .setColor(randomColor)
            .setTitle(`**${inhalt}**`)
            .setDescription("React with 🎉 to join the giveaway")
            .addField(`Time remaining:`, `${days} days ${hours} hours ${minutes} mins ${seconds} secs`);
            

            message.edit(embed)
            message.react("🎉")


            if(distance < 0) {
                clearInterval(x)
                let reactii = message.reactions.get("🎉")

                const endembed = new Discord.RichEmbed()
                .setColor(randomColor)
                .setTitle(`**${inhalt}**`)
                .setDescription("React with 🎉 to join the giveaway")
            .addField(`Time remaining: `, `**Ended**`);
                message.edit(endembed)
            }
          },1000);


          var now = new Date().getTime();
            var countDownDate = new Date(time).getTime();
            var distance = countDownDate - now;
            
        let winner = await message.awaitReactions((reaction, user) => reaction.emoji.name === '🎉' && user.id,{ time: distance })
        .then(collected => {
            let usersWhoParticiped =  collected.size;
            console.log(usersWhoParticiped)    
            let fuckingEmoji = collected.first(); 
            let usersThatReactedWithThatEmoji = fuckingEmoji.users
            console.log(usersThatReactedWithThatEmoji)
            
        })
            .catch(console.error);


    });
}
if(msg.startsWith(prefix + "TEST")) {
    










}
// Ping
if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.
    // Now, let's send a response.
    message.channel.send(':money_with_wings: **Pong ' + (new Date().getTime() - message.createdTimestamp) + " ms**" + ':money_with_wings: ') // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
}
if (msg === prefix + 'PONG') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.
    // Now, let's send a response.
    message.channel.send(':money_with_wings: **Ping ' + (new Date().getTime() - message.createdTimestamp) + " ms**" + ':money_with_wings: '); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
}

if(msg.startsWith(prefix + "COINTOSS")) {

    var cointoss = [
        "Head",
        "Tail"
    ]
    var randomCointoss = cointoss[Math.floor(Math.random() * cointoss.length)];

     message.reply("you flipped the coin.. **" + randomCointoss + "**")
    return;    
}

if(msg.startsWith(prefix + "AVATAR")) {
    if(!message.member.hasPermission("MENAGE_MESSAGES")) return message.reply(`you don't have the permission to use this command`);

    let getAvatarOf = message.guild.member(message.mentions.users.first());

    if(!isNaN) return message.reply("you need to mention someone to get his avatar image!");
    if(!getAvatarOf) return message.reply("you need to mention someone to get his avatar image");

    if(getAvatarOf) return message.reply(getAvatarOf.user.avatarURL);
    console.log("!avatar command used in " + message.channel.name + " \nUser: " + message.author.tag)
}

if(msg.startsWith(prefix + "RPS")) {
    message.delete();
    var rps = [
        "**Stone** :black_circle:",
        "**Paper** :newspaper:",
        "**Scissor** :scissors:"
    ];

    var expression = [
        "Damn",
        "There you go",
        "Aaah",
        "Not bad",
        "Hmm",
        "I guess",
        "Well..",
        "Uhm",
        "Ough",
        "Pow",
        "Rolling..",
        "There it is"
    ];

    var randomExpression = expression[Math.floor(Math.random() * expression.length)];
    var randomRPS = rps[Math.floor(Math.random() * rps.length)];
    message.channel.send(`${randomExpression} ${message.author}, ${randomRPS}`)

}
if(msg.startsWith(prefix + 'USERINFO')) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don\'t have the permission to use this command");
    let mention = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(!mention) {
        message.reply("You need to mention someone to get his informations")
        return;
    }
//messages
    if(!userData[mention.id + message.guild.id]) userData[mention.id + message.guild.id] = {
        messagesSent: 0
    }
//warns
    if(!warnData[mention.id + message.guild.id]) warnData[mention.id + message.guild.id] = {
        userWarns: 0
    }
    

    const userinfo = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor(mention.user.tag, mention.user.avatarURL)
        .setThumbnail(mention.user.avatarURL)
        .addField("User ", mention, true)
        .addField("Server ID", mention.id, true)
        .addField("Messages ", userData[mention.id + message.guild.id].messagesSent, true)
        .addField("Warns", warnData[mention.id + message.guild.id].userWarns, true)
        .setFooter("Account created at: " + mention.user.createdAt)


        message.channel.send({embed : userinfo})

        return;
}
if(msg.startsWith(prefix + "TMUTE")) {
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that, give me permissions!');
    if(!toMute) return message.reply(`Usage: ${prefix}tmute [user] [time: s = secounds, m = minutes, h = hours, d = days]`);
    if(message.author === toMute) return message.reply("you can't mute yourself");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t mute someone with a higher role or the same as your!");
    let muteRole = message.guild.roles.find("name", "Muted");
    if(!muteRole) return message.channel.send("Couldn't find a role called *Muted*. Please create the role!");
    if(toMute.roles.has(muteRole.id)) return message.channel.send(toMute + " is already muted");
    let muteTime = args[1];
    if(!muteTime) return message.reply("you didn't defined a time");
    
    toMute.addRole(muteRole.id)
    message.reply('you successfully muted ' + toMute + " for " + muteTime);

    toMute.send("You got muted for " + muteTime + " in the Discord server **" + message.guild.name +"**");
    console.log(toMute.user.tag + " got time muted by " + message.author.tag + " for " + muteTime)

    setTimeout(function(){
        if(!toMute.roles.has(muteRole.id)) return
        toMute.removeRole(muteRole.id);
        message.channel.send(toMute + ", your mute is over. You can talk again.");
        toMute.send("Your mute is over and you can talk again in the Discord server **" + message.guild.name+"**");
        console.log("User " + toMute.user.tag + " his time is over for the mute. " + "Mute time was: "+muteTime)
    }, ms(muteTime));


}
if(msg.startsWith(prefix+'MUTE')) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that, give me permissions!');

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.reply("You need to write someones ID or mention someone!");

    if(toMute.id === message.author.id) return message.reply("You can\'t mute yourself!")
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t mute someone with a higher role or the same as your!");

    let role = message.guild.roles.find(r => r.name === "Muted");
    if(!role) {
        try {
            role = message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: []
            });
        message.guild.channels.forEach((channel, id) => {
            channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
        } catch(e) {
            console.log(e.stack);
        }
    }
    if(toMute.roles.has(role)) return message.reply("This user is already muted!");

    toMute.addRole(role);
    message.channel.send(toMute +" successfully muted!").then(message => {
        message.react("✅")
    });
    console.log(`${toMute.user.tag} got muted by ${message.author.tag} in ${message.channel.name}`)
    toMute.send("You got *muted* in the Discord server **MoneyDropLoby**")

return;
}
if(msg.startsWith(prefix + 'UNMUTE')) {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don\'t have permission to do that!");

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.reply("You need to write someones ID or memtion someone!");

    let role = message.guild.roles.find(r => r.name === "Muted");

    if(!role || !toMute.roles.has(role.id)) return message.reply("This member is not muted!");

    toMute.removeRole(role);
    message.channel.send(toMute +" successfully unmuted!").then(message => {
        message.react("✅")
    });
    console.log(`${toMute.user.tag} got unmuted by ${message.author.tag} in ${message.channel.name}`)
    toMute.send("You got *unmuted* in the Discord server **MoneyDropLoby**")
    return;
}

if(msg.startsWith(prefix + 'KICK')) {
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply('I don\'t have the permission to do that, give me permissions!');
    let toKick = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

    if(message.author === toKick) {
        message.reply("You can\'t kick yourself!")
        return
    }

   
    let reason = message.content.split(" ").slice(2).join(" ");
    let modlog = message.guild.channels.find("name", "bans");

    if(!modlog) return message.reply('This server doesn\'t have the **bans** channel!');
    if(message.mentions.users.size < 1) return message.reply('You need to mention someone!');
    if(!reason) return message.reply('You need to supply a reason');

 //   if(userDJ) return message.reply("You can\'t kick " + user);
    //if(userAdmins, userProgrammer, userModerators, userOwner, userCoOwner, ) return message.reply('You can\'t kick this member!');
  // if(userAdmins) return message.reply("You can\'t kick " + user);
  //  if(userOwner) return message.reply("You can\'t kick " + user);
    if(toKick.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t kick someone with a higher role or the same as your!");

    if(!message.guild.member(toKick).kickable) return message.reply('I can\'t kick someone who has a higher role then you!');
    toKick.send("You got *kicked* out if the Discord server **MoneyDropLoby**")

        
    message.guild.member(toKick).kick().then(member => {
        message.reply('**' + member.user.username + '**' + ' successfully kicked.')
    console.log(toKick.user.tag + " got kicked by " + message.author.tag + " Reason: " + reason)


}).catch(console.error)


    const kickembed = new Discord.RichEmbed()
        .setColor(0x00dfff)
        .setThumbnail(toKick.user.avatarURL)
        .setAuthor(toKick.user.tag, toKick.user.avatarURL)
        .addField("Kick information", '**Kicked user: **' + user + '\n**Moderator: **' + message.author + '\n**Reason: **' + reason)
        .setTimestamp()
        .setFooter("ID: " + toBan.id);
    modlog.send({embed : kickembed})

}
if(msg.startsWith(prefix + 'BAN')) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) return message.reply('I don\'t have the permission to do that!');
    let toBan = message.guild.member(message.mentions.users.first());

    if(toBan.id === message.author.id) return message.reply("You can\'t ban yourself!")

  //  let userDJ = message.guild.roles.find('name', 'DJ');
   // let userOwner = message.guild.roles.find('name', 'Owner');
  //  let userAdmins = message.guild.roles.find('name', 'Admins');
    let reason = message.content.split(" ").slice(2).join(" ");
    let modlog = bot.channels.find('id', '339076369982029827');
    if(!modlog) return message.reply('This server doesn\'t have the **bans** channel!');
    if(message.mentions.users.size < 1) return message.reply('You need to mention someone!');
    if(!reason) return message.reply('You need to supply a reason');

  //  if(userDJ) return message.reply("You can\'t ban " + user);
  //  if(userAdmins) return message.reply("You can\'t ban " + user);
  //  if(userOwner) return message.reply("You can\'t ban " + user);
    if(toBan.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t ban someone with a higher role or the same as your!");

    if(!message.guild.member(toBan.id)
            .kickable) return message.reply('I can\'t ban someone who has a higher role then you!');

    message.guild.member(toBan.id).ban(7, toBan.id);

    toBan.send("You got banned from " + message.guild.name)

    const banembed = new Discord.RichEmbed()
        .setAuthor(toBan.user.tag, toBan.user.avatarURL)
        .setThumbnail(toBan.user.avatarURL)
        .setColor(0xff0000)
        .addField("Ban information", '**Banned user: **' + user + '\n**Moderator: **' + message.author + '\n**Reason: **' + reason)
        .setTimestamp()
        .setFooter("ID: " + toBan.id);
    modlog.send({embed : banembed})
    console.log(toBan.user.tag + " got banned by " + message.author.tag + "Reason: " + reason)


}
if(msg.startsWith(prefix + 'UNBAN')) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) return message.reply('I don\'t have the permission to do that!');
    let user = args[0];
    let reason = message.content.split(" ").slice(2).join(" ");
    if(!reason) return message.reply("you need to enter a reason");
    if (!user) return message.reply ("you need to enter an ID");
    let modlog = bot.channels.find('id', '339076369982029827');
    if(!modlog) return message.reply('This server doesn\'t have the **bans** channel!');

    message.guild.unban(user);

    const unbanembed = new Discord.RichEmbed()
        .setColor(0xd9a744)
        .setAuthor('Unbanned ' + user)
        .setTimestamp()
        .addField("Unban information", '**Unbanned user: **' + user + '\n**Moderator: **' + message.author);
    modlog.send({embed : unbanembed})
    console.log(`${user} got unbanned by ${message.author.tag} in ${message.channel.name}`)


}
if (msg.startsWith(prefix + 'SAY')) {
    message.delete()
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    
    message.channel.send("" +  args.join(" "));
}
if(msg.startsWith(prefix + "SEND")) {
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    let mentionChannel = message.mentions.channels.first();
    let smessage = args.slice(1).join(" ");

    mentionChannel.send("" + smessage);
    message.delete()
    console.log(`${message.author.username} has sent a message in ${mentionChannel.name}`)
}
if (msg.startsWith(prefix + 'MESSAGE')) {
       message.delete()
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
       const embed = new Discord.RichEmbed()
           .setColor(0xFC8439)
           .setDescription("" + args.join(" "));
       message.channel.send({embed})
   }

if (msg.startsWith(prefix + 'HELP')) {
    message.delete();
    if (!message.member.roles.find("name", "DJ")) { // This checks to see if they DONT have it, the "!" inverts the true/false
        message.channel.send('You do not have the permission to use this command!');
        return;
    }
    message.reply("**Look in your DM for the command list!**")

    const embed = new Discord.RichEmbed()

    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(0xffa114)
    .setTitle("Full command list")
    .addField("**" +prefix+"ping**", " Bot responds with *Pong* and will tell you his ms/ping")
    .addField("**" +prefix+"pong**", " Bot responds with *Ping* and will tell you his ms/ping")
    .addField("**" +prefix+"say**", " Usage: " + prefix + "say <message>, will send a message in the chat with your message/content")
    .addField("**" +prefix+"send**", " Usage: " + prefix + "send <channel> <message>, will send a message in the definded chat with your message/content")
    .addField("**" +prefix+"message**", " Usage: " + prefix + "message <message>, will send a message in embed in your channel where you write this command")
    .addField("**" +prefix+"hook**", " Usage: " + prefix + "hook <Hook name> <Hook message>, will create a webhook in which channel you will type in this command")
    .addField("**" +prefix+"warn**", " Usage: " + prefix + "warn <member>, will warn a member")
    .addField("**" +prefix+"clearwarns**", " Usage: " + prefix + "clearwarns <member>, will clear all warns of a member")
    .addField("**" +prefix+"mute**", " Usage: " + prefix + "mute <member>, will mute a member")
    .addField("**" +prefix+"tmute**", " Usage: " + prefix + "tmute <member> <[time] in s = secounds, m = minutes, h = hours, d = days>, will time mute a member")
    .addField("**" +prefix+"unmute**", " Usage: " + prefix + "unmute <member>, will unmute a member")
    .addField("**" +prefix+"kick**", " Usage: " + prefix + "kick <member> <reason>, will kick a member")
    .addField("**" +prefix+"ban**", " Usage: " + prefix + "ban <member> <reason>, will ban a member")
    .addField("**" +prefix+"unban**", " Usage: " + prefix + "unban <member(just name)>, will unban a member")
    .addField("**" +prefix+"botinfo**", " Usage: " + prefix + "botinfo, will show you details of the bot")
    .addField("**" +prefix+"serverinfo**", " Usage: " + prefix + "serverinfo, will show you details of the current guild")
    .addField("**" +prefix+"userinfo**", " Usage: " + prefix + "userinfo <member>, will show you details of a member")
    .addField("**" +prefix+"clean**", " Usage: " + prefix + "clean <amount>, will clean your amount of messages in a channel")
    .addField("**" +prefix+"avatar**", " Usage: " + prefix + "avatar <member>, will send you the avatar of a member")
    .addField("**" +prefix+"rps**", " Usage: " + prefix + "rps, play Rock, Paper, Scissor")
    .addField("**" +prefix+"cointoss**", " Usage: " + prefix + "cointoss, will flip a coin")
    .addField("**" +prefix+"cat**", " Usage: " + prefix + "cat, will show you a random cat picture");
    message.author.send({embed})

}
if (msg.startsWith(prefix + 'HOOK')) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_WEBHOOKS")) {
        return message.reply("I don\'t have the permission to kick the user!");
    }
    message.delete();
    if (msg == prefix + 'HOOK') {
        return hook(message.channel, 'Hook Usage', `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional**`,'FC8469','https://cdn.discordapp.com/avatars/398152535413882880/1a15969bd4a141b8dc2501824488c7ee.png?size=2048')
    }
    let hookArgs = message.content.slice(prefix.length + 4).split(","); // This slices the first 6 letters (prefix & the word hook) then splits them by 'commas'

    hook(message.channel, hookArgs[0], hookArgs[1], hookArgs[2], hookArgs[3]); // This is where it actually calls the hook.
}

//MUSIC

});



// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('guildMemberAdd', member => {
    console.log('User ' + member.user.tag + ' has joined the server!')
//let David = Client.users.get("name", "David_Chi");
let welcome = bot.channels.find("name", "welcome");
let guild = member.guild;
let rules = bot.channels.find("name", "rules");

//guild.member(David).ban();

const embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setDescription("Welcome " + member + ", we are happy to see you joining our " + guild.name + " Discord server! \nPlease read first of all the " + rules + " \nJoined with https://discord.me/moneydroplobby")
// .addField("Welcome " + member + ", we are happy to see you joining our " + guild.name + " Discord server! Please read first of all " + rules.tag)

welcome.send(embed)
//member.guild.channels.find('name', 'welcome').send(':money_with_wings: Welcome ' + member.user + " we are happy to see you joining our **MoneyDropLobby** Discord server! Please read #rules :money_with_wings:");
});
bot.on('guildMemberRemove', member => {
    console.log("User: " + member.user.tag + " has left the server!")
});

bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log('Bot started.');
    bot.user.setPresence({ game: { name: 'Everything !help'}})
});

bot.login('Mzk4MTUyNTM1NDEzODgyODgw.DTGGng.jUz22myjqT_CGbmnecSGVq2RIfg');

//bot.login('NDA1MDYyOTg0NDU3NzgxMjQ4.DU9qkg.M6N3b7CO3Y0sv2IoQc_uo2kDmdY');
