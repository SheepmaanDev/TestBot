const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'mute',
    description: 'Mute un membre',
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Le membre à mute',
            required: true
        }, {
            type: 'string',
            name: 'temps',
            description: 'Le temps de mute',
            required: true
        }, {
            type: 'string',
            name: 'raison',
            description: 'la raison du mute',
            required: false
        }
    ],
    async run(bot, message, args) {
        let user = args.getUser('membre') || 'Pas de membre à mute !' //Récupére dans le message le membre à mute
        let member = message.guild.members.cache.get(user.id) || 'Pas de membre à mute !' //Vérifie si le membre à mute existe dans le cache du serveur
        let reason = args.getString('raison') || 'Pas de raison fournie.' //Récupére dans le message la raison du mute
        let time = args.getString('temps') || 'Pas de temps fournie.' //Récupére dans le message le temps de mute

        if(isNaN(ms(time))) return message.reply('Pas le bon format !') //Controle si le format du temps est bon
        if(ms(time) > 86400000) return message.reply('Le mute ne peut pas durer plus de 28 jours !') //Controle si le temps est plus de 28 jours (en ms)
        if(message.user.id === user.id) return message.reply('Ne te mute pas tout seul !') //Controle si le membre à mute n'est pas l'auteur du message
        if((await message.guild.fetchOwner()).id === user.id) return message.reply('Ne mute pas le propriétaire du serveur !') //Controle si le membre à mute est le propriétaire du serveur
        if(!member.moderatable) return message.reply('Je ne peux pas mute ce membre !') //Controle si le membre est muteable
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu ne peux pas mute cette personne !') //Controle si l'auteur du message à les droits nécéssaires
        if(member.isCommunicationDisabled()) return message.reply('Ce membre est déjà mute !') //Controle si le membre à mute n'est pas déjà mute

        try {await user.send(`Tu as été mute du serveur : \`${message.guild.name}\` par \`${message.user.tag}\` pendant \`${time}\` pour la raison : \`${reason}\``)} catch (error) {} //Envoi d'un MP au membre muté

        await message.reply(`\`${message.user.tag}\` a mute \`${user.tag}\` pendant \`${time}\` pour la raison : \`${reason}\``) //Envoi d'un message sur le serveur

        await member.timeout(ms(time), reason) //Mute du membre
    }
}