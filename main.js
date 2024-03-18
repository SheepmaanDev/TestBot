const Discord = require('discord.js') // Importation de la librairie discord.js
const intents = new Discord.IntentsBitField(3276799) //Stockage des intents 
const bot = new Discord.Client({intents}) // Création du bot avec toutes les intents
const loadCommands = require('./loaders/loadCommands') // Chargement du fichier "loadCommands.js"
const loadEvents = require('./loaders/loadEvents') // Chargement du fichier "loadEvents.js"
const config = require('./config') // Chargement du fichier de config

bot.commands = new Discord.Collection()

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)
