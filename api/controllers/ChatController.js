/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req,res){
		if (req.isSocket){

			var sendResponse = function(responseBody){
				console.log('Returning most recent chat messages');
				return res.json(JSON.parse(responseBody))
			};

			var requestObject = {
				"method": "GET",
				"uri": "http://70.113.19.166:1337/message/recentMessages/"
			};

			require('request')(requestObject, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    sendResponse(body);
			  }
			})


		} else {
			console.log('Trying to connect to chat/index over http.  Stop it');
			res.json(false);
		}
	},
	speak: function(req,res){
		if (req.isSocket && req.session.ircName){
			var getBot = sails.hooks.irchook.bots[req.session.ircName];
			// getBot.lastSpoke = new Date();
			getBot.say('#sailsjs',req.param('message'));

			res.end();
		} else {
			console.log('You arent connected to IRC.  Who are you even talking to?')
			res.json(false)
		}
	},
	disconnect:  function(req,res){
		if (req.isSocket && req.session.ircName && req.session.connectedToChat){
			var botName = req.session.ircName;
			console.log('Disconnecting Bot:',botName)
			if (sails.hooks.irchook.bots[botName])
				sails.hooks.irchook.bots[botName].disconnect();
			req.session.connectedToChat = false;
			return res.json({connectedToChat:false});
		} else {
			console.log('You arent connected to IRC.  Who are you even talking to?')
			return res.json(false)
		}
	},
	connect: function(req,res){

		if (req.isSocket){

			if (!req.session.ircName){
				var randomName = 'web'+Math.round(Math.random()*10000+1);

				var botObject = {
			            name: randomName,
						host: 'chat.freenode.net',
						autorejoin: false,
						autoconnect: true,
						channels: ['#sailsjs'],
						events: sails.config.irc.chatControllerEvents,
						autokick: 5*1000*60
				}

				var botRegStatus = sails.hooks.irchook.spawnNewBot(botObject);

				if (botRegStatus){
					sails.sockets.join(req.socket,'chat')
			    	req.session.ircName = randomName;
					req.session.connectedToChat = true;
					res.json({name:randomName})
			    	// req.session.userBot = sails.hooks.irchook.bots[randomName];
				} else {
					res.json({name:'',error:'failed!'})
				}
				
			} else if (req.session.ircName && !req.session.connectedToChat){

				// User has a session.  THey previously disconnected and are now reconnecting.
				var botName = req.session.ircName;
				console.log('Reconnecting Bot:',botName)
				sails.hooks.irchook.bots[botName].connect();
				req.session.connectedToChat = true;

				sails.sockets.join(req.socket,'chat');
				res.json({name:req.session.ircName})
			} else if (req.session.ircName && req.session.connectedToChat){

				sails.sockets.join(req.socket,'chat');
				res.json({name:req.session.ircName})

			}
		}

	},
	canHazSession: function(req,res){
		console.log('Trying to get session')
		if (req.isSocket){

			var serverResponse = {};

			if (req.session.ircName){
				serverResponse.name = req.session.ircName;				
				console.log('got it!',req.session.ircName)
				if (req.session.connectedToChat)
					serverResponse.connectedToChat = req.session.connectedToChat;
				else
					serverResponse.connectedToChat = false;


				return res.json(serverResponse)


			} else {
				console.log('Couldnt find a session')
				return res.json({})
			}

		} else {
			console.log('Not a socket!')
			return false
		}
	}
};


// io.socket.get('/chat/canHazSession',function(r){console.log(r)})