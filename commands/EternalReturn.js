const { Message, MessageEmbed } = require('discord.js');
const { Colours } = require('../classes/CreateEmbed');
const Eternal = require('../lib/EternalStats');

module.exports = {
    name: 'eternal',
    aliases: ['et', 'e'],
    description: '`;eternal <target_name>`를 통해 이터널 리턴 정보를 불러옵니다. ',
    tag_bookmark: 'eternal_return',
    /**
     * 
     * @param {*} client 
     * @param {Message} message 
     * @param {Array} args 
     */
    run: async function (client, message, args) {
        if (args.length <= 0) return message.channel.send(client.scripts.args_not_found);
        else {

            const eternal_user = await Eternal(args.join(' '));
            if (!eternal_user) return message.channel.send(client.scripts.eternal.user_not_found);
            else {
                if (!eternal_user.Solo && !eternal_user.Duo && !eternal_user.Squad) return message.channel.send(client.scripts.eternal.user_not_found);
                var _embed = new MessageEmbed()
                                .setFooter({text: `🔍  이터널 리턴에서 ${eternal_user.Header.Name}님에 대한 정보를 불러왔습니다.`})
                                .setColor(Colours.ETERNAL_RETURN)
                                .setAuthor({name: '이터널 리턴', iconURL: message.author.avatarURL()});
                _embed.addField('아바타 정보', `- **플레이어 이름**: ${eternal_user.Header.Name}\n- **레벨**: ${eternal_user.Header.Level}`)
                if (eternal_user.Solo) {
                    _embed.addField('솔로 (' + eternal_user.Solo.Rank + ')', 
                        `- **포인트**: ${eternal_user.Solo.Point} MMR
                        - **평균 순위**: ${eternal_user.Solo.AverageTop}
                        - **승률**: ${eternal_user.Solo.WinPercentage}
                        - **게임 수**: ${eternal_user.Solo.Games}
                        - **평균 킬**: ${eternal_user.Solo.AverageKill}
                        - **TOP 2**: ${eternal_user.Solo.Top2}
                        - **평균 딜량**: ${eternal_user.Solo.AverageDamage}
                        - **평균 어시**: ${eternal_user.Solo.AverageAssistant}
                        - **TOP 3**: ${eternal_user.Solo.Top3}
                        - **평균 동물 킬**: ${eternal_user.Solo.AverageAnimalKill}`, true)
                }
                if (eternal_user.Duo) {
                    _embed.addField('듀오 (' + eternal_user.Duo.Rank + ')',
                        `- **포인트**: ${eternal_user.Duo.Point} MMR
                        - **평균 순위**: ${eternal_user.Duo.AverageTop}
                        - **승률**: ${eternal_user.Duo.WinPercentage}
                        - **게임 수**: ${eternal_user.Duo.Games}
                        - **평균 킬**: ${eternal_user.Duo.AverageKill}
                        - **TOP 2**: ${eternal_user.Duo.Top2}
                        - **평균 딜량**: ${eternal_user.Duo.AverageDamage}
                        - **평균 어시**: ${eternal_user.Duo.AverageAssistant}
                        - **TOP 3**: ${eternal_user.Duo.Top3}
                        - **평균 동물 킬**: ${eternal_user.Duo.AverageAnimalKill}`, true)
                }
                if (eternal_user.Squad) {
                    _embed.addField('스쿼드 (' + eternal_user.Squad.Rank + ')',
                        `- **포인트**: ${eternal_user.Squad.Point} MMR
                        - **평균 순위**: ${eternal_user.Squad.AverageTop}
                        - **승률**: ${eternal_user.Squad.WinPercentage}
                        - **게임 수**: ${eternal_user.Squad.Games}
                        - **평균 킬**: ${eternal_user.Squad.AverageKill}
                        - **TOP 2**: ${eternal_user.Squad.Top2}
                        - **평균 딜량**: ${eternal_user.Squad.AverageDamage}
                        - **평균 어시**: ${eternal_user.Squad.AverageAssistant}
                        - **TOP 3**: ${eternal_user.Squad.Top3}
                        - **평균 동물 킬**: ${eternal_user.Squad.AverageAnimalKill}`, true)
                }
                return message.channel.send({embeds:[_embed]});
            }
        }

    }
}