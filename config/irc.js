var local = require('./local.js');
var _ = require('lodash');
// var onIRCJoin = function(from, to, message){

// 	console.log('')

// };

var speakBot = function(sayToRoom,thingToSay){
	console.log('sailsTroll has been commanded to say',thingToSay,'in room',sayToRoom)
	sails.hooks.irchook.bots.sailsTroll.say(sayToRoom,thingToSay);
};


// var doLogin = function(botName){
// 	console.log(this,typeof this)
// 	sails.hooks.irchook.bots[this.opt.nick].ctcp('NickServ','privmsg','identify '+local.irc.password);
// }

// var onIRCMessage = function(from, to, message){

// 	var getMessageWords = message.toLowerCase().replace(/[^\w ]/ig,'').replace(/ {2,}/,'').split(' ');


// 	if (from.toLowerCase() !== 'sailstroll' && getMessageWords[0] !== 'sailstroll'){
// 		var messageToSave = {
// 			sender: from,
// 			channel: to,
// 			text: message,
// 			createdAt: new Date()
// 		}

// 		Message.create(messageToSave).exec(function(e,m){
// 			if (e) return console.log('Oh dear god, no!',e);
// 			console.log('Create callback fired and',m.id,'saved')
// 		})
// 	}

// 	if (getMessageWords[0] === 'sailstroll' && getMessageWords[1] === 'search'){

// 		var speakURLResults = function(err,urlOfResults){
// 			if (err){
// 				return speakBot(to,'Sorry'+from+'. me got big error:'+err);
// 			}

// 			return speakBot(to,from+', try this: '+'http://sailstroll-20102.onmodulus.net/search/results/'+urlOfResults);

// 		}

// 		getMessageWords.shift();
// 		getMessageWords.shift();

// 		Search.doSearch(getMessageWords.join(' '),speakURLResults,true)

// 	}

// };

var onJoin = function(channel,nick,message){
	// console.log(from,':',message)
	var messageData = {
		type:'join',
		nick:nick,
		message:'signing on from http://sailsjs.org/support/irc/webchat'
	};

	sails.sockets.broadcast('chat','attendance',messageData)
};
var onPart = function(nick,message,channels,args){
	// console.log('PARTING!!!!:',arguments)
	var messageData = {
		type:'depart',
		nick:nick,
		message:' goodbye forever...'
	};

	sails.sockets.broadcast('chat','attendance',messageData)
}

var onIRCMessage = function(from, to, message){

	console.log(from,':',message)
	var messageData = {
		from:from,
		to:to,
		message:message
	};

	sails.sockets.broadcast('chat','newMessage',messageData)

	Chat.create(messageData).exec(function(err,savedChatMessage){
		if (err)
			return console.log('Error saving chat message');

		// console.log('Saved IRC Message:',savedChatMessage)
	})

};

module.exports.irc = {
	chatControllerEvents: {
		error:console.log
		// message:onIRCMessage
	},
	bots: {
		"SailsBotkeeper": {
			config: {
				name: 'SailsBotkeeper',
				host: 'chat.freenode.net',
				autoRejoin: true,
				autoconnect: true,
				channels: ['#sailsjs']
			},
			events:{
				error:console.log,
				join:onJoin,
				part:onPart,
				quit:onPart,
				message:onIRCMessage
				// say:console.log,
				// registered:doLogin
			}
		} 		
	}
};

