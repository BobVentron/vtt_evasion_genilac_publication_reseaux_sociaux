const { Events } = require('discord.js');
const logger = require('../gestionLog')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        logger.log('connect', `Bot discord : Logged in as ${client.user.tag}!`);
	},
};