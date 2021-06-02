const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'slowmode',
	aliases: ['slow'],

	execute(client, message, args) {

        if (!message.member.hasPermission('ADMINISTRATOR')) {
            return message.reply('no permissions');
          }
          
          const duration = args[0];
          
          if (!duration) {
              return message.reply('Please provide a duration');
            }
            
            if (duration === 'off') {
                message.channel.setRateLimitPerUser(0);
                
                return message.channel.send('👍 ');
            }
            
            if (isNaN(duration)) {
                return message.reply('Please provide either a number of seconds or the word "off"');
            }
            
            if (duration > 21600) {
                return message.reply('Please provide either a number of seconds or the word "off"');
            }
            
            if (duration) {
                message.channel.setRateLimitPerUser(duration);
                
                return message.channel.send('👍 ');
            }
	}
};
