const { MessageEmbed } = require('discord.js')
const Colours = {
    DESCRIPTION: '#2c2f33',
    WARINING: '#FF3636',
    LOL: '#CBB857',
    ETERNAL_RETURN: '#9191E1'
}

function CreateSimplyEmbed(title, description, colours) {
    return new MessageEmbed()
        .setColor(colours)
        .setDescription(description)
        .setAuthor({name: title});
}

module.exports.CreateSimplyEmbed = CreateSimplyEmbed;
module.exports.Colours = Colours;