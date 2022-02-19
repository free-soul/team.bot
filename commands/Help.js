const { Message } = require('discord.js');
const { CreateSimplyEmbed, Colours } = require('../classes/CreateEmbed');

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: '`;help <command_name>`를 통해 명령어에 대한 정보를 불러옵니다.',
    /**
     * 
     * @param {*} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async function (client, message, args) {

        if (args.length <= 0) return message.channel.send(client.scripts.args_not_found);

        const cmd = client.commands_handler.isCmd(args.join(' '));
        if (cmd !== false) {
            return message.channel.send({embeds:[
                CreateSimplyEmbed('Commands: ' + cmd.name, '**aliases**: ' + cmd.aliases.join(', ') + '\n**description**: ' + cmd.description, Colours.DESCRIPTION)
            ]})
        }
        return message.channel.send()

    }
}