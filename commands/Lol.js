const { Message, MessageEmbed } = require('discord.js');
const Lol = require('../lib/LolStats');
const { Colours } = require('../classes/CreateEmbed');

module.exports = {
    name: 'lol',
    aliases: ['l', 'lo', 'll'],
    description: '`;lol <target_name>`를 통해 리그 오브 레전드 정보를 불러옵니다.',
    tag_bookmark: 'lol',
    /**
     * 
     * @param {*} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async function (client, message, args) {

        if (args.length <= 0) return message.channel.send(client.scripts.args_not_found);

        const user = (await Lol(args.join(' ')));
        if (!user.Solo && !user.Free) return message.channel.send(client.scripts.lol.user_not_found);
        else {
            var _embed = new MessageEmbed()
                            .setFooter({text: `리그 오브 레전드에서 ${user.Name}님에 대한 정보를 가져왔습니다.`, iconURL: user.IconURL })
                            .setColor(Colours.LOL)
                            .addField('아바타 정보', `- **소환사 이름**: ${user.Name}\n- **레벨**: ${user.Level}`);
            if (user.Solo) {
                _embed.addField(
                    '솔로 랭크', `- **랭크**: ${user.Solo.Rank}\n- **포인트**: ${user.Solo.Point}\n- **승률**: ${user.Solo.WinRate}\n- **승리/패배**: ${user.Solo.Div.Win}/${user.Solo.Div.Lose}`
                    , false);
            }
            if (user.Free) {
                _embed.addField(
                    '자유 랭크', `- **랭크**: ${user.Free.Rank}\n- **포인트**: ${user.Free.Point} LP\n- **승률**: ${user.Free.WinRate}\n- **승리/패배**: ${user.Free.Div.Win}/${user.Free.Div.Lose}`
                    , false);
            }
            _embed.setAuthor({name: '리그 오브 레전드', iconURL: message.author.avatarURL()})
            return message.channel.send({embeds:[_embed]});

        }

    }
}