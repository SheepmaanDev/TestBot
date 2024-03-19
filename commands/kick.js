const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kick un membre',
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: 'user',
            name: 'membre',
            description: 'Le membre à kick',
            required: true
        }, {
            type: 'string',
            name: 'raison',
            description: 'La raison du kick',
            required: false
        }
    ],
    async run(bot, message, args) {
        let user = args.getUser('membre') || 'Pas de membre à kick !' //Récupére dans le message le membre à kick
        let member = message.guild.members.cache.get(user.id) || 'Pas de membre à kick !' //Vérifie si le membre à kick existe dans le cache du serveur
        let reason = args.getString('raison') || 'Pas de raison fournie.' //Récupére dans le message la raison du kick
        
        if(message.user.id === user.id) {return message.reply('Tu ne peux pas te kick toi même !')} //Controle si le membre à kick n'est pas l'auteur du message
        if((await message.guild.fetchOwner()).id === user.id) {return message.reply('On ne kick pas le propriétaire du serveur voyons ...')} //Controle si le membre à kick est le propriétaire du serveur
        if(member && !member?.kickable) {return message.reply('Je ne peux pas kick ce membre !')} //Controle si le membre est kickable
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu ne peux pas kick cette personne !') //Controle si l'auteur du message à les droits nécéssaires
        
        try {await user.send(`Tu as été kick du serveur \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison : \`${reason}\``)} catch (err) {} //Envoi d'un MP au membre kické
        
        await message.reply(`${message.user.tag} a kick \`${user.tag}\` pour la raison : \`${reason}\``) //Envoi d'un message sur le serveur
        
        await member.kick(reason) //Kickage du membre
    }
}