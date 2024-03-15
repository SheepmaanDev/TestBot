const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping un serveur'),
	async execute(interaction) {
		await interaction.reply({ content: `le ping et de : ${client.ws.ping} ms`})
	},
}