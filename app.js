// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
const YTDL = require("ytdl-core");
const superagent = require("superagent");
const search = require('youtube-search');
const queue = new Map();
var fs = require('fs');
const db = require('quick.db')
const mysql = require("mysql");
const ms = require("ms");
const moment = require('moment');
const Client = new Discord.Client({autoReconnect: true, max_message_cache: 0});
const {get} = require("snekfetch"); 
var servers = {};

var XP = JSON.parse(fs.readFileSync('Storage/XP.json', 'utf8'));
var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
var warnData = JSON.parse(fs.readFileSync('Storage/warnData.json', 'utf8'));
var coins = JSON.parse(fs.readFileSync('Storage/coins.json', 'utf8'));
var report = JSON.parse(fs.readFileSync('Storage/report.json', 'utf8'));

/*var con = mysql.createConnection({
    host: "ds247410.mlab.com",
    password: "AshleyAshu12",
    user: "root",
    database: "moneydroplobby"
});

con.connect(err => {
    if(err) throw err;
    console.log(`Connected to database`)
});*/

let version = "1.3.7";
let prefix = ">";
// const SupportPrefix = '<';

bot.commands = new Discord.Collection();

fs.readdir('./Commands/', (err, files) => {
    if(err) console.error(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if(jsfiles.length <= 0) { return console.log(`No commands found!`)}
    else { console.log(jsfiles.length + ' commands found.')}

    jsfiles.forEach((f, i) => {
        var cmds = require(`./Commands/${f}`);
        console.log(`Loading ${f} command..`);
        bot.commands.set(cmds.config.command, cmds);

    })
})
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


bot.on('message', async message => {
if(message.author.bot) return
if(message.channel.type === "dm") return

    // Variables - Variables make it easy to call things, since it requires less typing.
let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
let sender = message.author; // This variable takes the message, and finds who the author is.
let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.
const serverQueue = queue.get(message.guild.name);


var cmd = bot.commands.get(cont[0]);
if(cmd) cmd.run(bot, message, args);
// Commands
let randomColor = Math.floor(Math.random() * 16777214) + 1;


    let fetched = await db.fetch(`prefix_${message.guild.id}`);
    if(fetched === null) prefix = ">";
    else prefix = fetched;
        
        if(msg.match(prefix + "SETPREFIX")) {
            if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply('You don\'t have permission to change the prefix of this server.');
            if(!args.join(" ")) return message.reply(`enter a new prefix. \`Usage: ${prefix}setprefix [prefix]\``)
            db.set(`prefix_${message.guild.id}`, args.join().trim()).then(i => {
                message.channel.send(`Prefix changed to \`${i}\``).then(console.log(`${message.author.tag} changed the prefix of the server ${message.guild.name} to | ${i}`))
            })
        }

    

    if(message.content.includes("<@405062984457781248>" + " hello")) {
        message.reply(`hello, I am the best bot ever!`)
    }


    let channel = message.guild.channels.find("name", "reviews");
    if(channel) {
        if(message.channel.id === channel.id) message.react("♥")
    }


//XP
if(!XP[sender.id + message.guild.id]) XP[sender.id + message.guild.id] = {
    xp: 0,
    level: 1
}
    let curxp = XP[message.author.id + message.guild.id].xp;
    let curlevel = XP[message.author.id + message.guild.id].level;
    let xpAdd = Math.floor(Math.random() * 7) + 8;
    let nextLevel = XP[message.author.id + message.guild.id].level * 300;
    XP[message.author.id + message.guild.id].xp = curxp + xpAdd;
    if(nextLevel <= XP[message.author.id + message.guild.id].xp) {
        XP[message.author.id + message.guild.id].level = curlevel + 1;
        let lvlup = new Discord.RichEmbed()
        .setColor(randomColor)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField(`Level Up`, `New level: ${curlevel + 1}`)
        .setTimestamp();
        message.channel.send(lvlup).then(msg => msg.delete(5000))
    }
    fs.writeFile("Storage/XP.json", JSON.stringify(XP), (err) => {
        if(err) console.log(err)
    });
//XP
//userData
if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {
    messagesSent: 0
}
userData[sender.id + message.guild.id].messagesSent++;
fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
if(err) console.error(err);
});

if(!coins[sender.id + message.guild.id]) coins[sender.id + message.guild.id] = {
    coins: 0
};


if(!coins[sender.id + message.guild.id]) coins[sender.id + message.guild.id] = {
    coins: 0
};

let coinAmt = Math.floor(Math.random() + 15) + 1;
let baseAmt = Math.floor(Math.random() + 15) + 1;

if(coinAmt === baseAmt) coins[sender.id + message.guild.id] = {
    coins: coins[sender.id + message.guild.id].coins + coinAmt
}
    fs.writeFile("Storage/coins.json", JSON.stringify(coins), (err) => {
        if(err) console.log(err)
    });

if(msg.startsWith(prefix + "POLL")) {
    if (!args) return message.reply(`Usage: ${prefix}poll [poll message]`);
  if (!message.content.includes("?")) return message.reply('"Include a "?" in your poll!"');
  let pollem = new Discord.RichEmbed()
  .setColor(randomColor)
  .setTitle(`:ballot_box:  ${message.author.username} started a vote :ballot_box:`)
  .setDescription(`\n:arrow_lower_right:  ${args.join(" ")}  :arrow_lower_left:`)
  .setFooter(`Vote with ✅ for "Yes", ❔ for "I don't know", ❌ for "No" `)
  .setTimestamp()
    
  message.channel.send(pollem).then(async message => {
     await message.react("✅")
     await message.react("❔")
    await message.react("❌")
    
  }).catch(console.error)
  return
}
if(msg.startsWith(prefix + "SERVERINFO")) {

    let bots = 0;
    let humans = 0;
    
    message.guild.members.forEach(member => {
        if(member.user.bot) {
            bots++
        } else {
            humans++
        }
    });

const sembed = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.setColor(randomColor)
.setThumbnail(message.guild.iconURL)
.addField("Owner", message.guild.owner, true)
.addField("Members",`${humans} (${bots} Bots)`, true)
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
    if(toWarn.id == bot.user.id) return message.reply("you can't warn me!")
   if(toWarn.id === message.author.id) return message.reply("You can\'t warn yourself!")

    let reason = message.content.split(" ").slice(2).join(" ");
    let modlog = message.guild.channels.find("name", "bans");
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
    if(toClearWarn.highestRole.position >= message.member.highestRole.position) return message.reply("you can\'t clear warns of a member who has a higher role or the same as your!");
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
    if(args[1] != isNaN) {
        message.channel.send(`Usage: [Channel] [Amount of winners max. 30] [Time example: Feb 12, 2018 10:00:00] [What you want to give away]`)
        return
    }
    if(winners > 30) return message.channel.send(`${winners} winners are too much. Max. 30 winners!`)


    var time = args.slice(2,6).join(" ");
    if(!time) return message.channel.send(`Usage: [Channel] [Amount of winners] [Time example: Feb 12, 2018 10:00:00] [What you want to give away]`);

    let inhalt = args.slice(6).join(" ");
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
    let guild = message.guild
    if(message.author.id != "397781787561951252") return 
    const welcomemessage = new Discord.RichEmbed()
    .setThumbnail(guild.iconURL)
    .setDescription(`**Welcome** ${message.member}\nWe are happy to see your joining our **${guild.name}** Discord server!\nPlease read first of all the #rules.\nThe permantent invite link to this server is https://discord.me/moneydroplobby\nHave a nice day! ♥️`)
    .setColor(Math.floor(Math.random() * 16777214) + 1)

    message.channel.send(welcomemessage)
}
// Ping
if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.
    // Now, let's send a response.
    message.channel.send('🏓 **Pong ' + (new Date().getTime() - message.createdTimestamp) + " ms**" + ' 🏓') // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
}
if (msg === prefix + 'PONG') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.
    // Now, let's send a response.
    message.channel.send('🏓 **Ping ' + (new Date().getTime() - message.createdTimestamp) + " ms**" + ' 🏓'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
}

if(msg.startsWith(prefix + "COINTOSS")) {

    var cointoss = [
        "Head",
        "Tail"
    ]
    var randomCointoss = cointoss[Math.floor(Math.random() * cointoss.length)];

     message.reply("you flipped.. **" + randomCointoss + "**")
    return;    
}

if(msg.startsWith(prefix + "AVATAR")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply(`you don't have the permission to use this command`);


    let getAvatarOf = message.guild.member(message.mentions.users.first());

    if(!isNaN()) return message.reply("you need to mention someone to get his avatar image!");
    if(message.mentions.users.size < 1) return message.reply("you need to mention someone to get his avatar image");

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
    if(!coins[mention.id + message.guild.id]) coins[mention.id + message.guild.id] = {
        coins: 0
    }
    if(!report[mention.id + message.guild.id]) report[mention.id + message.guild.id] = {
        reports: 0
    }

    const userinfo = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor(mention.user.tag, mention.user.avatarURL)
        .setThumbnail(mention.user.avatarURL)
        .addField("User ", mention, true)
        .addField("User ID", mention.id, true)
        .addField("Messages ", userData[mention.id + message.guild.id].messagesSent, true)
        .addField("Coins ", coins[mention.id + message.guild.id].coins, true)
        .addField("Warns", warnData[mention.id + message.guild.id].userWarns, true)
        .addField("Reports", report[mention.id + message.guild.id].reports, true)
        .setFooter("Account created at: " + mention.user.createdAt)


        message.channel.send(userinfo)
}
if(msg.startsWith(prefix + "TMUTE")) {
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that, give me permissions!');
    if(!toMute) return message.reply(`Usage: ${prefix}tmute [user] [time: s = secounds, m = minutes, h = hours, d = days]`);
    if(message.author === toMute) return message.reply("you can't mute yourself");
    if(toMute.id === bot.user.id) return message.reply("**nice try :)**");
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

    if(toMute.id === message.author.id) return message.reply("You can\'t mute yourself!");
    if(toMute.id === bot.user.id) return message.reply("**nice try :)**");
    if(toMute.id === message.guild.owner.id) return message.reply("you can't mute the Owner of this Guild.")
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
    message.channel.send(`${toMute} successfully muted`).then(message => {
        message.react("✅")
    });
    console.log(`${toMute.user.tag} got muted by ${message.author.tag} in ${message.channel.name}`)
    toMute.send(`You got *muted* in the Discord server **${message.guild.name}**`)
}
if(msg.startsWith(prefix + 'UNMUTE')) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('I don\'t have the permission to do that, give me permissions!');

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
    if(!toKick) return message.reply(`mention someone to kick him`)
    if(message.author === toKick) {
        message.reply("You can\'t kick yourself!")
        return
    }
    if(toKick.id === bot.user.id) return message.reply("**nice try :)**");
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
    let toBan = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(message.mentions.users.size < 1) return message.reply("mention someone, please. `Usage: [User] [Reason]`").then(msg => msg.delete(10000))
    if(toBan.id === message.author.id) return message.reply("You can\'t ban yourself!").then(msg => msg.delete(5000))
    if(toBan.highestRole.position >= message.member.highestRole.position) return message.reply("You can\'t ban someone with a higher role or the same as your!");



    let reason = message.content.split(" ").slice(2).join(" ");
    let modlog = message.guild.channels.find("name", "bans");
    if(message.mentions.users.size < 1) return message.reply('You need to mention someone!');
    if(!reason) return message.reply('please supply a reason for this ban.');



    if(!message.guild.member(toBan.id).bannable) return message.reply('I can\'t ban someone who has a higher role then you!');
    toBan.send("You got banned from " + message.guild.name)

    const banembed = new Discord.RichEmbed()
        .setAuthor(toBan.user.tag, toBan.user.avatarURL)
        .setThumbnail(toBan.user.avatarURL)
        .setColor(0xff0000)
        .addField("Ban information", '**Banned user: **' + user + '\n**Moderator: **' + message.author + '\n**Reason: **' + reason)
        .setTimestamp()
        .setFooter("ID: " + toBan.id);
        if(modlog) {
            modlog.send(banembed)
        } 
        
    message.guild.member(toBan.id).ban(7, toBan.id);
    console.log(toBan.user.tag + " got banned by " + message.author.tag + "Reason: " + reason)

}
if(msg.startsWith(prefix + 'UNBAN')) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply('You don\'t have permission to do that.');
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) return message.reply('I don\'t have the permission to do that!');
    let user = args[0];
    let reason = message.content.split(" ").slice(2).join(" ");
    if(!reason) return message.reply("you need to enter a reason");
    if (!user) return message.reply ("you need to enter an ID");
    let modlog = message.guild.channels.find("name", "bans");


    message.guild.unban(user);

    const unbanembed = new Discord.RichEmbed()
        .setColor(0xd9a744)
        .setAuthor('Unbanned ' + user)
        .setTimestamp()
        .addField("Unban information", '**Unbanned user: **' + user + '\n**Moderator: **' + message.author);
    if(modlog) modlog.send(unbanembed)
    console.log(`${user} got unbanned by ${message.author.tag} in ${message.channel.name}`)


}
if (msg.startsWith(prefix + 'SAY')) {
    message.delete()
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return
    
    message.channel.send("" +  args.join(" "));
}
if(msg.startsWith(prefix + "SEND")) {
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return
    let mentionChannel = message.guild.channels(message.mentions.channels.first());
    let smessage = args.slice(1).join(" ");

    mentionChannel.send("" + smessage);
    message.delete()
    console.log(`${message.author.username} has sent a message in ${mentionChannel.name}`)
}
if(msg.match(`${prefix}DM`)) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return
    let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(args[0] == message.mentions.users.size < 1) return message.reply(`please mention someone to send him a DM`);
    let text = args.slice(1).join(" ");
    if(!text) return message.reply(`you need to write a message`)
    
    user.send(text)

    let modlog = message.guild.channels.find("name", "server-log");

        const log = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`Direct message`)
        .addField(`${message.author} sent a DM to ${user}`, `DM content: ${text}`)
        .setTimestamp()
        
    if(modlog) modlog.send(log)
    console.log(`${message.author.tag} sent a DM to ${user.user.tag}. DM Content: ${text}`)
}
if (msg.startsWith(prefix + 'EMBED')) {
       message.delete()
    if (!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply('You don\'t have permission to do that.');
       const embed = new Discord.RichEmbed()
           .setColor(0xFC8439)
           .setDescription("" + args.join(" "));
       message.channel.send(embed)
   }

if (msg.startsWith(prefix + 'HELP')) {
    
    message.reply("**Look in your DM for the command list!**").then(msg => msg.delete(5000))

  
    let owner = message.guild.members.find("id", "397781787561951252")
    
    let help1 = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setTitle(`Command list`)
    .addField(`Everyone can use`, 
    `\`${prefix}help
${prefix}ping
${prefix}pong
${prefix}report
${prefix}rps
${prefix}cointoss
${prefix}coins
${prefix}pay
${prefix}xp\``, true)

        const help2 = new Discord.RichEmbed()
        .setColor(randomColor)
        .addField(`Administrator`, `\`
${prefix}clean | 
${prefix}kick
${prefix}mute
${prefix}tmute
${prefix}ban
${prefix}unban
${prefix}warn
${prefix}setprefix
${prefix}clearwarns
${prefix}clearreports
${prefix}userinfo
${prefix}serverinfo
${prefix}botinfo
${prefix}hook
${prefix}addcoins | For logs, add a channel called "server-log" to your server
${prefix}removecoins
${prefix}send
${prefix}dm
${prefix}embed
${prefix}say
${prefix}avatar
${prefix}poll
${prefix}giveaway\``, true)
        .setFooter(`Creator: ${owner.user.tag} | Current version ${version}`, owner.user.displayAvatarURL)
        
    message.author.send(help1)
    message.author.send(help2)
    message.delete()
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
if(msg.startsWith(prefix + "CLEAN")) {
    message.delete()
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have the permissions to clean messages! Give me the permissions!")
    if(isNaN(args[0])) return message.reply("please type in a valid number to clean messages").then(sentMsg => sentMsg.delete(5000))
    if(args[0] > 100) return message.reply(`you need to choose a number between 1 - 100`).then(sentMsg => sentMsg.delete(5000))

    message.channel.bulkDelete(args[0]).then(messages => message.channel.send(`**Successfully deleted \`${messages.size}/${args[0]}\` messages**`)).then(sentMsg => sentMsg.delete(5000))
    .catch(error => message.channel.send(`**ERROR: ${error}**`))
    return
}
if(msg.match(prefix + "ADDCOINS")){
   
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return 
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have the permissions to give someone coins! Give me the permissions!")

    let mention = message.guild.member(message.mentions.users.first());
    if(message.mentions.users.size < 1) return message.reply(`Usage: \`${prefix}addcoins [member] [amount]\``).then(sentMsg => sentMsg.delete(10000))
    if(isNaN(args[1])) return message.reply(`Usage: \`${prefix}addcoins [member] [amount]\``).then(sentMsg => sentMsg.delete(10000))
    if(args.length > 2) return message.reply(`Usage: \`${prefix}addcoins [member] [amount]\``).then(i => i.delete(10000))
    //if(args[1].includes("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z")) return message.reply(`apply a valid number`)
    if(!coins[mention.id + message.guild.id]) coins[mention.id + message.guild.id] = {
        coins: 0
    }

    let mCoins = coins[mention.id + message.guild.id].coins;
    coins[mention.id + message.guild.id] = {
        coins: mCoins +parseInt(args[1])
    }
    let serverLog = message.guild.channels.find("name", "server-log");
    if(server) {

    }
    if(!serverLog) return message.guild.owner.send(`No channel called \`server-log\` found in ${message.guild.name}`)

    const membed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .addField(`Coins added`, `**${message.author}** has added himself **${parseInt(args[1])} Coins**`)
    .setTimestamp()
    if(message.author.id === mention.id) message.channel.send(membed).then(msg => msg.delete(5000)).then(serverLog.send(membed))
    //if(message.author.id === mention.id) serverLog.send(membed)

    const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle("Coins added")
    .setDescription(`**${message.author.username}** has added **${mention.user.username} ${parseInt(args[1])}** Coins`)
    .setTimestamp()

if(message.author.id != mention.id) message.channel.send(embed).then(sentMsg => sentMsg.delete(5000)).then(serverLog.send(embed))
//if(message.author.id != mention.id) serverLog.send(embed)
fs.writeFile("Storage/coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
});

}
if(msg.match(prefix + "REMOVECOINS")){
   
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return 
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have the permissions to give someone coins! Give me the permissions!")

    let serverLog = message.guild.channels.find("name", "server-log");
    if(!serverLog) return message.guild.owner.send(`No channel called \`server-log\` found in ${message.guild.name}`)

    let mention = message.guild.member(message.mentions.users.first());
    if(message.mentions.users.size < 1) return message.reply(`Usage: \`${prefix}removecoins [member] [amount]\``).then(sentMsg => sentMsg.delete(5000))
    if(isNaN(args[1])) return message.reply(`Usage: \`${prefix}removecoins [member] [amount]\``).then(sentMsg => sentMsg.delete(5000))
    if(args.length > 2) return message.reply(`Usage: \`${prefix}removecoins [member] [amount]\``)
    //if(args[1].includes("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z")) return message.reply(`apply a valid number`)
    if(!coins[mention.id + message.guild.id]) coins[mention.id + message.guild.id] = {
        coins: 0
    }

    let mCoins = coins[mention.id + message.guild.id].coins;
    if(mCoins < parseInt(args[1])) return message.reply("this user does not have that much of coins")

    coins[mention.id + message.guild.id] = {
        coins: mCoins - parseInt(args[1])
    }

    const membed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle("Coins remove")
    .setDescription(`**${message.author.username}** has removed himself **${parseInt(args[1])}** Coins`)
    .setTimestamp()
    if(message.author.id === mention.id) message.channel.send(membed).then(msg => msg.delete(5000)).then(serverLog.send(membed))
    //if(message.author.id === mention.id) serverLog.send(membed)

    const embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle("Coins remove")
    .setDescription(`**${message.author.username}** has removed **${mention.user.username} ${parseInt(args[1])}** Coins`)
    .setTimestamp()

if(message.author.id != mention.id) message.channel.send(embed).then(sentMsg => sentMsg.delete(5000)).then(serverLog.send(embed))
//if(message.author.id != mention.id) serverLog.send(embed)
fs.writeFile("Storage/coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
});
}
if(msg.startsWith(prefix + "COINS")) {


    if(!coins[message.author.id + message.guild.id]) coins[message.author.id + message.guild.id] = {
        coins: 0
    }
    if(args.length > 0) return message.reply(`just write **${prefix}coins** to find out your coins`).then(sentMsg => sentMsg.delete(5000))

    let uCoins = coins[message.author.id + message.guild.id].coins;
    
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(randomColor)
    .setDescription(`**${message.author.username}** you have **${uCoins}** coins`);
    
    message.channel.send(coinEmbed).then(msg => msg.delete(5000))
    message.delete()
}

if(msg.startsWith(prefix + "PAY")) {


    if(!coins[message.author.id + message.guild.id]) return message.reply("you don't have any coins!").then(msg => msg.delete(10000))
    let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(args[0] != pUser) return message.reply(`Usage: \`${prefix}pay [member] [amount]\``).then(message.delete(5000))
    if(isNaN(args[1])) return message.reply(`Usage: \`${prefix}pay [member] [amount]\``).then(msg => msg.delete(10000))
    if(pUser.id === message.author.id) return message.reply("you can't pay to yourself coins").then(msg => msg.delete(5000))

    if(!coins[pUser.id + message.guild.id]) coins[pUser.id + message.guild.id] = {
        coins: 0
    }

    let pCoins = coins[pUser.id + message.guild.id].coins;
    let sCoins = coins[message.author.id + message.guild.id].coins;

    if(sCoins < args[1]) return message.reply(`you don't have enought coins.\nYou have currently ${pCoins}`).then(message.delete(10000))

    coins[message.author.id + message.guild.id] = {
        coins: sCoins - parseInt(args[1])
    };

    coins[pUser.id + message.guild.id] = {
        coins: pCoins + parseInt(args[1])
    };

    const payembed = new Discord.RichEmbed()
.setColor(randomColor)
.setAuthor(message.author.username, message.author.avatarURL)
.setTitle("Coin transfer")
.setDescription(`${message.author} transferred ${parseInt(args[1])} coins to ${pUser}`);

message.channel.send(payembed)

fs.writeFile("Storage/coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
});
console.log(`${message.author.tag} has transferred ${pUser.user.tag} ${args[1]}`)

}
if(msg.startsWith(prefix + "XP")) {
    if(!XP[message.author.id + message.guild.id]) XP[message.author.id + message.guild.id] = {
        xp: 0,
        level: 1
    }
    
    let curxp = XP[message.author.id + message.guild.id].xp;
    let curlvl = XP[message.author.id + message.guild.id].level;
    let nextLvlXp = curlevel * 300;
    let difference = nextLvlXp - curxp;

    let embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(`XP:`, curxp, true)
    .addField(`Level`, curlvl, true)
    .setFooter(`${difference} XP till next level up`, message.author.displayAvatarURL);
    message.channel.send(embed).then(msg => msg.delete(10000))
}
if(msg.startsWith(prefix + "REPORT")) {
    let mention = message.guild.member(message.mentions.users.first());
    if(args[0] = message.mentions.users.size < 1) return message.reply("mention someone to report him").then(msg => msg.delete(7000))
    if(message.author.id == mention.id) return message.reply(`you can't report yourself.`).then(msg => msg.delete(7000))
    let reason = args.join(" ").slice(6);
    if(!args[1]) return message.reply("add a reason for the report").then(msg => msg.delete(7000))
    let reportCh = message.guild.channels.find("name", "reports");
    if(!reportCh) message.guild.owner.send(`Your guild called ${message.guild.name} with the ID ${message.guild.id}does not have a channel called \`reports\`. \nPlease create the channel or nobody can report someone`)
    
    if(!report[mention.id + message.guild.id]) report[mention.id + message.guild.id] = {
        reports: 0
    }
    report[mention.id + message.guild.id].reports++
    const rep = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle(`Report`)
    .setColor('RANDOM')
    .setDescription(`${message.author} has reported ${mention}\nReason: ${reason}`)

    reportCh.send(rep)

    fs.writeFile("Storage/report.json", JSON.stringify(report), (err) => {
        if(err) console.log(err)
    });
}
if(msg.match(prefix + "CLEARREPORTS")) {

    let mention = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let server_log = message.guild.channels.find("server-log");

    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have the permission to do that.")
    if(!message.guild.member(bot.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have the permissions to give someone coins! Give me the permissions!")

    if(args[0] = message.mentions.users.size < 1) return message.reply("mention a user to clear the reports of him.")

    if(!report[mention.id + message.guild.id]) report[mention.id + message.guild.id] = {
        reports: 0
    }
    
    report[mention.user.id + message.guild.id] = {
        reports: 0
    }

    fs.writeFile("Storage/reports.json", JSON.stringify(report), (err) => {
        if(err) console.log(err)
    });
}

});



// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('guildMemberAdd', member => {
    console.log('User ' + member.user.tag + ' has joined the server!')
//let David = Client.users.get("name", "David_Chi");
let welcome = member.guild.channels.find("name", "welcome");
let guild = member.guild;
let rules = member.guild.channels.find("name", "rules");

const emb = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setDescription(`Welcome ${member}\nWe are happy to see you joining our **${guild.name}** Discord server!\nPlease read first of all the ${rules}\nJoined with https://discord.me/mdlgc`);

const embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setDescription(`Welcome ${member}\nWe are happy to see you joining our **${guild.name}** Discord server!\nPlease read first of all the ${rules}\nJoined with https://discord.me/moneydroplobby`);
    if(member.guild.id == "447313711321972736") welcome.send(embed)
    if(member.guild.id == "388073833237577730") welcome.send(emb)
if(member.user.id == "340855732012580864") member.ban().then(console.log(`David tried to join :D in ${member.guild.name} guild`))
if(member.guild.members.get(member.user.id).user.username.toString().toLowerCase().toUpperCase().startsWith("DAVID_CHI")) member.ban().then(console.log(`David tried to join ${member.guild.name} but banned`))

const welcomemessage = new Discord.RichEmbed()
    .setThumbnail(guild.iconURL)
    .setDescription(`**Welcome** ${member}\nWe are happy to see your joining our **${guild.name}** Discord server!\nPlease read first of all the #rules.\nThe permantent invite link to this server is https://discord.me/moneydroplobby\nHave a nice day! ♥️`)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    
    member.send(welcomemessage).catch(error => console.log(error))

});
bot.on('guildMemberRemove', member => {
    console.log("User: " + member.user.tag + " has left the server!")
    const leaveember = new Discord.RichEmbed()
    .setTitle(`Member left`)
    .setAuthor(member.user.username, member.user.avatarURL)
    .setImage(member.user.avatarURL)
    .setColor(Math.floor(Math.random() * 16777214) + 1)
    .setTimestamp();

    let leaveChannel = member.guild.channels.find("name", "leave-log");
    if(leaveChannel) {
        leaveChannel.send(leaveember)
    }
});
bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log(`${bot.user.tag} is online on ${bot.guilds.size} Discord server`);
    bot.user.setPresence({ game: { name: `${prefix}help | Multitasking`}})

    
});
bot.on('error', error => {
    console.log(error)
});
/*bot.on('messageDelete', message => {

    const embed = new Discord.RichEmbed()
    .setAuthor(message.author.avatarURL, message.author.tag)
    .setTitle(`Message Deleted`)
    .addField(`Message sent by ${message.author} deleted in ${message.channel}`, message.content)
    .setTimestamp();

    let modlog = message.guild.channels.find("name", "server-log");
    modlog.send(embed)
});*/

// bot.login(`MzQ0ODIxMTE1ODMyNTAwMjM0.DYWQ2w.Jpov-JSUPMx_EuAgHILh073HWmI`); /* 01 */

// bot.login('NDQ3MzQ0NDcwNDY4MzI5NDcz.DeGNhA.msBxS3LaOKk_twQrMjCZAVW8a1Q'); /* Original */

bot.login('NDQ4ODg1MDgzMjY5NjI3OTA0.DecoUw.Uwz4XwqlxukBWRU5hQWunFe0JkM') /* Test bot */

// bot.login('Mzk4MDkzOTYxNDM4Mjk4MTIy.DYROlw.58fICsfpiusRuYbC4nC4uXUigEM'); /* old */
