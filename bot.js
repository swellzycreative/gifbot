const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;


client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);


/////
client.on(`userUpdate`, (oldUser, newUser) => {

  let kişi = client.users.get(oldUser.id)
  let avatar = kişi.avatarURL.split('?')[0]
  let kanal = client.channels.find(ch => ch.id === '757959743036850317')/// Gifsiz Avatar Kanal İd
  let kanal1 = client.channels.find(ch => ch.id === '757959742713888878')/// Gifli Avatar Kanal İd
if(avatar.endsWith('.png')) {
  const emb = new Discord.RichEmbed()
  .setImage(avatar)
.setFooter("Lrows Gif", client.user.avatarURL)
  .setColor("BLACK")
  .setDescription(`Fotoğrafı Büyütmek İçin [Tıkla](${kişi.avatarURL})!`)
  kanal.send(emb)
}
if(avatar.endsWith('.gif')) {
  const emb = new Discord.RichEmbed()
  .setImage(avatar)
  .setColor("BLACK")
  .setFooter("Lrows Gif", client.user.avatarURL)
  .setDescription(`Gifi Büyütmek İçin [Tıkla](${kişi.avatarURL})!`)
  kanal1.send(emb)
}
});

//---------------------------------KOMUTLAR---------------------------------\\
//---------------------------------- Gif Sunucusu Kur----------------------------// 
client.on('message', async message => {
  const ms = require('ms');
  const prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "ryze-gif-kur") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Gif Sunucunuzun Kurulmasını İstiyorsanız **Kur** Yazınız.`)
      message.channel.awaitMessages(response => response.content === 'Kur', {
        max: 1,
        time: 10000,
        errors: ['time'],
     })
    .then((collected) => {

message.guild.createChannel('J4J CHANNELS', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🎀・j4j-fast`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "J4J CHANNELS")))
        
        message.guild.createChannel(`💊・j4j-advertise`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "J4J CHANNELS")))

      message.guild.createChannel(`🍭・s4s`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "J4J CHANNELS")))

        message.guild.createChannel(`🤖・bot-report`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "J4J CHANNELS")))

message.guild.createChannel('INFORMATION CHANNELS', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🔔・discord rules`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "INFORMATION CHANNELS")))
        
        message.guild.createChannel(`🎈・announcements`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "INFORMATION CHANNELS")))
        
        message.guild.createChannel(`🎈・roles`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "INFORMATION CHANNELS")))
        
        message.guild.createChannel(`🎁・boosters`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "INFORMATION CHANNELS")))
        
        message.guild.createChannel(`🎁・partner`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "INFORMATION CHANNELS")))

message.guild.createChannel('CHAT', 'category', [{
  id: message.guild.id,
}]);
        
                message.guild.createChannel(`💬・trchat`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CHAT")))
        
                message.guild.createChannel(`💬・eng・chat`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CHAT")))
        
                message.guild.createChannel(`📷・photo・chat`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CHAT")))
        
                message.guild.createChannel(`🤖・bot commands`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CHAT")))
        
                message.guild.createChannel(`🚀・random・gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CHAT")))
        
                message.guild.createChannel(`🚀・random・pp`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CHAT")))

        message.guild.createChannel('MUSTAFA KEMAL ATATURK', 'category', [{
  id: message.guild.id,
}]);
        
message.guild.createChannel(`mka-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "MUSTAFA KEMAL ATATURK")))
        
        message.guild.createChannel(`mka-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "MUSTAFA KEMAL ATATURK")))


message.guild.createChannel('WOMAN', 'category', [{
  id: message.guild.id,
}]);
message.guild.createChannel(`🌹・woman-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "WOMAN")))
        
        message.guild.createChannel(`🌹・woman-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "WOMAN")))
        
        message.guild.createChannel('COUPLE', 'category', [{
  id: message.guild.id,
}]);
        
                message.guild.createChannel(`💕・couple-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "COUPLE")))
        
                message.guild.createChannel(`💕・couple-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "COUPLE")))
        
                message.guild.createChannel('BFF', 'category', [{
  id: message.guild.id,
}]);
        
                  message.guild.createChannel(`💛・bff-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "COUPLE")))
        
                          message.guild.createChannel(`💛・bff-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "COUPLE")))
        
                        message.guild.createChannel('ANIMAL', 'category', [{
  id: message.guild.id,
}]);
                message.guild.createChannel(`🐾・animal-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "ANIMAL")))
        
                        message.guild.createChannel(`🐾・animal-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "ANIMAL")))
        
                                message.guild.createChannel('CARTOON', 'category', [{
  id: message.guild.id,
}]);

                      message.guild.createChannel(`🧸・cartoon-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CARTOON")))

                      message.guild.createChannel(`🧸・cartoon-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "CARTOON")))
        
        
                        message.guild.createChannel('FUNNY', 'category', [{
  id: message.guild.id,
}]);
        
                      message.guild.createChannel(`👻・funny-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FUNNY")))
        
                       message.guild.createChannel(`👻・funny-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FUNNY")))
        
        
                  message.guild.createChannel('STREAMER', 'category', [{
  id: message.guild.id,
}]);
        
                               message.guild.createChannel(`🎥・streamer-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "STREAMER")))
        
                                       message.guild.createChannel(`🎥・streamer-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "STREAMER")))
        
                          message.guild.createChannel('BABY', 'category', [{
  id: message.guild.id,
}]);
        
                       message.guild.createChannel(`🍼・baby-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "BABY")))
        
                               message.guild.createChannel(`🍼・baby-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "BABY")))
        
        
                                  message.guild.createChannel('MOVIE/SERIES', 'category', [{
  id: message.guild.id,
}]);
                                      
        message.guild.createChannel(`🎬・movieseries-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "MOVIE/SERIES")))
        
                message.guild.createChannel(`🎬・movieseries-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "MOVIE/SERIES")))
        
        
      
                                  message.guild.createChannel('ANIME', 'category', [{
  id: message.guild.id,
}]);
        
        
                     message.guild.createChannel(`🥀・anime-boy-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "ANIME")))
        
        
                            message.guild.createChannel(`🥀・anime-girl-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "ANIME")))
        
        
                            message.guild.createChannel(`🥀・anime-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "ANIME")))
        
        
                                          message.guild.createChannel('FAMED AND OTHERS', 'category', [{
  id: message.guild.id,
}]);
        
        
                                    message.guild.createChannel(`✈️・soldier-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        
                                            message.guild.createChannel(`✈️・soldier-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        
                                            message.guild.createChannel(`🚭・smoke-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        
                                            message.guild.createChannel(`🚭・smoke-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        
                                            message.guild.createChannel(`🌑・blackandwhite-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        
                                            message.guild.createChannel(`🌑・blackandwhite-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        //created by lrowsxrd videonda paylaşacaksan discorddan bana ulaşmak zorundasın yoksa telif xD
                                            message.guild.createChannel(`🍁・thomas-shelby-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        //created by lrowsxrd videonda paylaşacaksan discorddan bana ulaşmak zorundasın yoksa telif xD
                                            message.guild.createChannel(`🍁・thomas-shelby-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        //created by lrowsxrd videonda paylaşacaksan discorddan bana ulaşmak zorundasın yoksa telif xD
                                            message.guild.createChannel(`💍・billie-eilish-gif`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
      //created by lrowsxrd videonda paylaşacaksan discorddan bana ulaşmak zorundasın yoksa telif xD  
                                            message.guild.createChannel(`💍・billie-eilish-photo`, 'text')
.then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "FAMED AND OTHERS")))
        
        
        //created by lrowsxrd videonda paylaşacaksan discorddan bana ulaşmak zorundasın yoksa telif xD
        
        
       message.channel.send("Gif Sunucunuz Başarıyla Kuruldu! -Lrowsxrd")
     
            })   
      
}
});
//----------------------------------Lrows Gif Sunucusu Kur----------------------------// 
//created by lrowsxrd videonda paylaşacaksan discorddan bana ulaşmak zorundasın yoksa telif xD