const { Message } = require("discord.js")

/**
 * 
 * @param {*} client 
 * @param {Message} msg 
 */
module.exports = (client, msg) => {

    if (msg.author.bot || !msg.guild) return false;
    if (!msg.content.startsWith(client.prefix)) return false; 

    var messages = msg.content.split(' ');
    if (messages[0][client.prefix.length] == client.prefix) return false; 

    var _name = messages[0].replace(client.prefix, '');
    var cmd = client.commands_handler.isCmd(_name);

    if (cmd !== false) {
        messages = messages.slice(1, messages.length)
        cmd.run(client, msg, messages);
    }
}