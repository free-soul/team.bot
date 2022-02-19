const fs = require('fs');

class CommandHandler {
    constructor() {
        this.commands = new Map();
    }

    registerCommand(file) {
        const cmd = require(file);
        this.commands.set(cmd.name, cmd);
    }

    unregister(name) {
        if (this.commands.has(name)) this.commands.delete(name);
        else return false; 
    }

    isCmd(name) {
        if (this.commands.has(name)) return this.commands.get(name);
        else {
            var includesd = false; 
            this.commands.forEach(cmd => {
                if (cmd.aliases.includes(name)) includesd = cmd;
            })
            return includesd;
        }
    }
}

module.exports = CommandHandler;