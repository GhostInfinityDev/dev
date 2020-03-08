const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

const config = require("./botconfig.json");

fs.readdir("./events/", (err, files) => {
if (err) return console.error(err);
files.forEach(file => {
let eventFunction = require(`./events/${file}`);
let eventName = file.split(".")[0];
client.on(eventName, (...args) => eventFunction.run(client, ...args));
});
});


client.on("message", message => {
 if (message.author.bot) return;
if (message.content.indexOf(config.prefix) !== 0) return;
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
try {
let commandFile = require(`./commands/${command}.js`);
commandFile.run(client, message, args);
} catch (err) {
if (config.debugMode === true) {
console.error(err);
}
}
});




client.on('guildMemberAdd', member => {
const channel = member.guild.channels.find('name', 'welkom');
if (!channel) return;

const embed = new Discord.RichEmbed()
.setColor("#77f700")
.addField(`${member.user.tag} is de server gejoind!`, "Welkom op **Infinity\ :sparkles:**\nWij raden u aan om de regels goed te lezen, zodat u geen straf riskeert.")
.setTimestamp()
.setFooter(`Alle rechten voorbehouden © Infinity 2019`, member.user.avatarURL);
channel.send({ embed });





client.on('ready', () => {
console.log(`k ben er klaar voor!`);

});

const PREFIX = "!";


client.on("message", async (message) => {
  if (message.author.equals(client.user)) return;

  if(!message.content.startsWith(PREFIX)) return;

  var args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0].toLowerCase()) {

    case "help": {
      var embed = new Discord.RichEmbed()
      .setTitle("**Hier heb je de lijst met mijn opties.**")
      .addField("Leden", "*Zie alle leden op deze server.*")
      .addField("Ping", "*Kijk maar.*")
      .addField("Staff commands.", "*Alleen voor staff.*")
      .addField("Ban", "*Met deze command kan je mensen een ban geven.*" )
      .setColor(0xd4ff00)

      message.channel.sendEmbed(embed);
      break;}

    case "ping": {
      message.channel.sendMessage("pong :ping_pong: ");
      break;}

    case "leden":{
      var embed = new Discord.RichEmbed()
      .setTitle("**Aantal leden.**")
      .addField("Totale members", message.guild.memberCount)
      .setFooter("Met dit command kan je de members zien.")
      .setColor(0xd4ff00)

      message.channel.sendEmbed(embed);
      break;}


    case "nieuws": {

      let say = args.join(" ");
      
      var embed = new Discord.RichEmbed()
      .setTitle("Nieuws")
      //.addBlankField()
      .addField("Door:", message.author)
      //.addBlankField()
      .addField("bericht", say)

      let NieuwsChannel = message.guild.channels.find(`name`, "informatie");

      //NieuwsChannel.sendEmbed(embed);

      message.channel.sendEmbed(embed);

      message.delete().catch();
      break;}

    case "say": {

      let nNieuws = args.join(" ");
      message.delete().catch();
      message.channel.send(nNieuws);
    break;}

  }

});


client.login(botconfig.token);