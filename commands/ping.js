const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'Affiche la latence du bot',
    permission: 'Aucune',
    dm: true,
    async run(bot, message, args) {
        await message.reply(`Le ping du bot est : ${bot.ws.ping}ms`)
    }
}