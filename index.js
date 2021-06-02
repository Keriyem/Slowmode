const discord = require('discord.js');
const fs = require('fs');

const prefix = '-';

const client = new discord.Client({
    ws: { properties: { $browser: 'Discord iOS' } }
});

client.on('error', e => console.error(e));
client.on('warn', e => console.warn(e));
client.on('debug', e => console.info(e));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`safe @ home`, { type: 'PLAYING' });
});

client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
	const commands = fs
		.readdirSync(`./commands/${dirs}`)
		.filter(files => files.endsWith('.js'));

	for (const file of commands) {
		const command = require(`./commands/${dirs}/${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
});

client.on('message', message => {
	if (message.author.bot || message.channel.type === 'dm') {
		return;
	}

	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd =
		client.commands.get(command) ||
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

	if (!cmd) {
		return;
	}

	try {
		if (cmd) cmd.execute(client, message, args);
	} catch (err) {
		console.log(err);
	}
});


client.login(process.env.TOKEN);