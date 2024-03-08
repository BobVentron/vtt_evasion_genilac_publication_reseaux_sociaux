const { REST, Routes } = require('discord.js');
const config = require('./config.json')
const clientId = config.discord.clientId
const guildId = config.discord.guildID
const token = config.discord.token
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Chemin d'accès au répertoire contenant les commandes
const commandsPath = path.join(__dirname, config.discord.fichierCommands);
// Lire le contenu du répertoire commands pour récupérer les noms des fichiers de commandes
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    // Construire le chemin d'accès complet du fichier de commande
    const filePath = path.join(commandsPath, file);
    // Charger le fichier de commande
    const command = require(filePath);
    // Vérifier si le fichier de commande a les propriétés 'data' et 'execute'
    if ('data' in command && 'execute' in command) {
        // Si le fichier de commande a les propriétés requises, ajouter son objet de données (JSON) au tableau des commandes
        commands.push(command.data.toJSON());
    } else {
        // Si le fichier de commande manque de propriétés requises, afficher un avertissement
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();