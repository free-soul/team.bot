const { Client, Intents } = require('discord.js')
const CommandHandler = require('./CommandHandler')
const fs = require('fs')

class BotManager {

    constructor() {

        this.default_intents = new Intents([
            Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES
        ]);
        this.commands_handler = new CommandHandler();
        this.client = new Client({intents: this.default_intents});
        this._options = require('../settings.json');
        this.scripts = require('../scripts.example');

        if (!this._options.prefix) this.prefix = ";";
        else {
            this.prefix = this._options.prefix;
        }

        const cmds = fs.readdirSync(__dirname + "/../commands");
        cmds.forEach(cmd => {
            if (cmd.endsWith('.js')) this.commands_handler.registerCommand(__dirname + '/../commands/' + cmd);
        })
    }

    start() {
        if (!this._options.prefix) this._options.prefix = "!";
        this.client.login(this._options.token);
    }

    register(type, func, ...args) {
        this.client.on(type, (...args2) => func(this, ...args2, ...args))
    }
}

module.exports = BotManager;