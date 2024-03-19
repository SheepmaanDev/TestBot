const Discord = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Unban un membre',
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
            let user = args.getUser('membre') || 'Pas de membre à déban !' //Récupére dans le message le membre à unban
            let member = message.guild.members.cache.get(user.id) || 'Pas de membre à ban !' //Vérifie si le membre à unban existe dans le cache du serveur
            let reason = args.getString('raison') || 'Pas de raison fournie.' //Récupére dans le message la raison du unban
            
            try {await user.send(`Tu as été débanni du serveur : \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison : \`${reason}\``)} catch (error) {} //Envoi d'un MP au membre unban
            await message.reply(`\`${message.user.tag}\` a débanni \`${user.tag}\` pour la raison : \`${reason}\``) //Envoi d'un message sur le serveur
            await message.guild.bans.remove(user.id)
        } catch(err) {
            return message.reply('Pas de membre à déban !')
        }
    }
}