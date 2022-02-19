const BotManager = require('./classes/Bot');

const ready_function = require('./events/OnReady');
const message = require('./events/OnMessage');

_manager = new BotManager();

_manager.register('ready', ready_function);
_manager.register('messageCreate', message);
_manager.start();