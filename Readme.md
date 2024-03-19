# Bot Discord
## Installation
Le bot est écrit en JavaScript, elle sera executée dans un environnement Node. Il est imperatif d'avoir Node et NPM d'installé.
* Créer un dossier pour le projet
```bash
mkdir /PATH/TO/FOLDER
cd /PATH/TO/FOLDER
```
* Initialiser le projet
```bash
npm init
```
* Cloner le repositories 
```bash
git clone https://github.com/SheepmaanDev/TestBot.git
```
* Ajouter un fichier _config.json_
```json	
{
    "token": "MY_BOT_TOKEN"
}
```
* Installer les dépendances
```bash
npm i
```
* Executer l'application
```bash
nodemon main.js
```
## Listes des commandes du bot
**/ping** : Renvoi la latence du bot. </br>
**/kick _@Pseudo Raison_** : Expulse un membre avec une raison. </br>
**/ban _@Pseudo Raison_** : Bannir un membre avec une raison. </br>
**/unban _@Pseudo Raison_** : Débannir un memebre avec une raison. </br>
**/mute _@Pseudo Temps Raison_** : Mute un membre pour un temps donné avec une raison. </br>
