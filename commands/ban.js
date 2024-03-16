const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Ban un membre',
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Le membre à bannir',
            required: true
        }, {
            type: 'string',
            name: 'raison',
            description: 'La raison du bannissement',
            required: false
        }
    ],
    async run(bot, message, args) {
        try {
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply('Pas de membre à bannir !')
            let member = message.guild.members.cache.get(user.id)
            let reason = args.get('raison').value
            if(!reason) reason = 'Pas de raison fournie.'
            if(message.user.id === user.id) return message.reply('Essaie pas de te bannir toi même ...')
            if((await message.guild.fetchOwner()).id === message.user.id) return message.reply('On ne ban pas le grand patron du serveur voyons ...')
            if(!member?.bannable) return message.reply('Je ne peux pas bannir ce membre !')
        } catch(err) {
            return message.reply('Pas de membre à bannir !')
        }
    }
}