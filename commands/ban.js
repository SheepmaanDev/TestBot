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
            let user = args.getUser('membre') || 'Pas de membre à ban !' //Récupére dans le message le membre à ban
            let member = message.guild.members.cache.get(user.id) || 'Pas de membre à ban !' //Vérifie si le membre à ban existe dans le cache du serveur
            let reason = args.getString('raison') || 'Pas de raison fournie.' //Récupére dans le message la raison du ban
            
            if(message.user.id === user.id) {return message.reply('Essaie pas de te bannir toi même ...')} //Controle si le membre à ban n'est pas l'auteur du message
            if((await message.guild.fetchOwner()).id === user.id) {return message.reply('On ne ban pas le grand patron du serveur voyons ...')} //Controle si le membre à ban est le propriétaire du serveur
            if(member && !member?.bannable) {return message.reply('Je ne peux pas bannir ce membre !')} //Controle si le membre est banable
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply('Tu ne peux pas bannir cette personne !') //Controle si l'auteur du message à les droits nécéssaires
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply('Ce membre est déjà ban !') //Controle si le membre à ban n'est pas déjà ban
            
            try {await user.send(`Tu as été banni du serveur : \`${message.guild.name}\` par \`${message.user.tag}\` pour la raison : \`${reason}\``)} catch (error) {} //Envoi d'un MP au membre ban
            await message.reply(`\`${message.user.tag}\` a banni \`${user.tag}\` pour la raison : \`${reason}\``) //Envoi d'un message sur le serveur
            await message.guild.bans.create(user.id, {reason : reason}) //Bannage du membre
        } catch(err) {
            return message.reply('Pas de membre à bannir !')
        }
    }
}