angular.module('irc').controller('AppCtrl', [
'$scope',
'$window',
'$timeout',
function($scope, $window, $timeout) {
	$scope.previousSection = '';

	// console.log('loaded appCtrl');

	$scope.chatButton = [];

	$scope.connectedToChat = false;
	$scope.eventsRegistered = false;
	$scope.isReconnect = false;
	$scope.connectedImageURL = './images/disconnected.png';
	$scope.chatMessages = [];
	$scope.chatNick = '';

	var changeChatStatus = function(newStatus){
		switch (newStatus){
			case "checking":
				var newButton = {
					actionName:'',
					text:'Checking for Connection',
					cssClass:'connected'
				};
				$scope.chatButton = [newButton];
				// $scope.$apply()
			break;
			case "waiting":
				var newButton = {
					actionName:'connect',
					text:'Connect To Chat',
					cssClass:'notConnected'
			};
				$scope.connectedImageURL = './images/disconnected.png';
				$scope.chatButton = [newButton];
				$scope.$apply()
			break;
			case "connecting":
				var newButton = {
					actionName:'',
					text:'Connecting to #sailsjs',
					cssClass:'connecting'
				};
				$scope.chatButton = [newButton];
				$scope.$apply()
			break;
			case "connected":
				$scope.connectedToChat = true;
				var newButton = {
					actionName:'disconnect',
					text:'Click to Disconnect',
					cssClass:'connected'
				};
				$scope.connectedImageURL = './images/connected.png';
				$scope.chatButton = [newButton];
				$scope.$apply()
			break;
			case "disconnected":
				$scope.connectedToChat = false;
				var newButton = {
					actionName:'connect',
					text:'Click to reconnect',
					cssClass:'notConnected'
				};
				$scope.chatButton = [newButton];

				$scope.connectedImageURL = './images/disconnected.png';
		        io.socket.get('/chat/disconnect',function(serverResponse){
		        	console.log('Disconnected with:',serverResponse)
		        	// io.socket.disconnect();
					$scope.connectedToChat = false;
		        });
			break;
			default:break;
		};
	};

	var registerSpeakListeners = function(){
		$('.sendChatMessage').on('mouseup',sayThisThing);

		$('.chatInputBox').on('keyup',function(event){
			if(event.keyCode == 13){
			return sayThisThing();
			}
		})
	};

	var registerEvents = function(clientNick){
		$scope.chatNick = clientNick.name;

	    io.socket.on('attendance',function(msgData){

	        if (msgData.type === 'depart' && msgData.nick === $scope.chatNick){
	            // alert($scope.chatNick+'! Youve been disconnected from #sails.js')
	            changeChatStatus('disconnected')
	        } else if (msgData.type === 'join' && msgData.nick === $scope.chatNick){

	        	registerSpeakListeners()
				changeChatStatus('connected')

	        }

			addMessageToChatBox({from:msgData.nick,message:msgData.type+'ed #sailsjs - '+JSON.stringify(msgData.message)});

	    });

	    io.socket.on('disconnect',function(){
	        console.log('Disconnected!');
			changeChatStatus('disconnected')
	    })

	    // io.socket.on('newMessage',addMessageToChatBox);

	    io.socket.on('newMessage',addMessageToChatBox)

	    if ($scope.isReconnect){
			registerSpeakListeners()
			changeChatStatus('connected')
	    }


	    $scope.eventsRegistered = true;

	};

	var addMessageToChatBox = function(msgData){
		// console.log(msgData)
		$scope.updateTranscriptUsers([msgData.from]);
		$scope.chatMessages.push({sender:msgData.from,text:msgData.message});
		$scope.$apply();

		// THIS has stopped working all of a sudden.  Fix it!
		var boxHeight = $('.chatBox').innerHeight();
		$('.chatBox').scrollTop(boxHeight);
	};

    var sayThisThing = function(){
        console.log('posting messsage to IRC',$('.chatInputBox').val())
        io.socket.get('/chat/speak',{message:$('.chatInputBox').val()});
        $('.chatInputBox').val('')
    };

	$scope.chatAction = function(actionName,options){
		switch (actionName){
			case 'connect':
				io.socket.get('/chat/index',function(serverResponse){
					var getNicks = _.unique(_.pluck(serverResponse,'sender'));
			        $scope.updateTranscriptUsers(getNicks);

						$scope.chatMessages = serverResponse.reverse();
						changeChatStatus('connecting');
						// $scope.$apply();
			        io.socket.get('/chat/connect',function(serverResponse){
			        	if (!$scope.eventsRegistered)
			            	return registerEvents(serverResponse)
			            else
			            	console.log('Events already registered.')
			        });
				})
			break;
			case 'disconnect':
				changeChatStatus('disconnected');
			break;
			// case 'reconnect':


			// break;
			default:break;
		}
		return
	};

	changeChatStatus('checking');

	io.socket.get('/chat/canHazSession',function(serverResponse){

		// If session is available AND bot is connected, reconnect without prompting
		if (serverResponse.name && serverResponse.connectedToChat){
			console.log('Found session and youre already connected');
			$scope.isReconnect = true;
			$scope.chatAction('connect');

		// If session is available BUT bot is not connected, prompt for reconnect
		} else if (serverResponse.name && !serverResponse.connectedToChat){
			console.log('Found session but Not connected',serverResponse.name,serverResponse.connectedToChat)
			// $scope.chatAction('promptReconnect',chatNick);
			$scope.chatNick = serverResponse.name;
			// $scope.eventsRegistered = true;
			changeChatStatus('waiting');
		} else {
			console.log('Cant find session!')
			changeChatStatus('waiting')			
		}
	});






	$scope.searchQuery = 'the problem with';
	$scope.searchResults = [];

	$scope.searchStatus = '';
	// $scope.$watch('searchResults',function(){
		
	// });

	$scope.transcriptUsers = [];

	$scope.getUserColor = function(userNick){
		var gotUserColor = _.find($scope.transcriptUsers,{nick:userNick});
		return gotUserColor
	}

	$scope.updateTranscriptUsers = function(userList){
		_.each(userList,function(oneUser){
			if ($scope.transcriptUsers.indexOf(oneUser) >= 0){

			} else {
				var transUserObject = {
					nick: oneUser,
					color: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
				};
				// console.log(oneUser,'has been assigned',transUserObject.color);
				$scope.transcriptUsers.push(transUserObject)
			}
		});
	};

	$scope.showDetails = function(type,id){
		// console.log(type);
	    $('.searchBoxMessage').html('Getting '+type+' details for "'+id+'"');
		$scope.searchResults = [];
	 //    $scope.$apply();

	    io.socket.post('/search/expand',{type:type,id:id},function(detailResults){

	    	if (detailResults.type === 'message'){

	    	var expandedResultsObject = {};

	    	var getTranscriptCenter = _.map(detailResults.transcript,function(oneMessage){
    			var appendCenterInfo = oneMessage;

	    		if (oneMessage.createdAt === id){
	    			appendCenterInfo.transcriptCenter = oneMessage.id;
	    			return appendCenterInfo
	    		} else {
	    			return oneMessage
	    		}
	    	});
	    	expandedResultsObject.name = id;
	    	// expandedResultsObject.results = detailResults.transcript;
	    	expandedResultsObject.results = getTranscriptCenter;

	    	console.log('Showing:',expandedResultsObject.results.length,'entries')

			$scope.searchResults = [expandedResultsObject];
			$scope.$apply();

	    	} else if (detailResults.type === 'user'){
	    		console.log('Showing User!')
	    	} else {
	    		console.log('unknown type');
	    		return;
	    	}

	    })


	};

	$scope.sendSearchQuery = function(inputVal,$event){
		if ($event){
			if ($event.which === 13){
				console.log('Submitting!')

			} else
				return
		};

		$scope.searchStatus = 'Searching Chat Logs';
		$scope.searchResults = [];

	    io.socket.post('/search/go',{query:inputVal},function(searchResults){
	    	console.log('got',searchResults)
	    	var userList = [];
	        // _.each(searchResults,function(oneGramResults){
	        //     _.each(oneGramResults.results,function(oneMessage){
	        //     	userList.push(oneMessage.sender);
	        //     })
	            
	        // })
			userList = _.pluck(_.flatten(_.pluck(searchResults,'results')),'sender');
			console.log(userList)
	    	// userList = _.unique(userList.concat()

	        userList = _.unique(userList);
	        $scope.updateTranscriptUsers(userList);
	        // console.log('All Users:',userList)
		    // $('.searchBox').html('');



			$scope.searchStatus = '';
			$scope.searchResults = searchResults;
			$scope.$apply();

	    })
	};

	$scope.navItems = [
      {sectionName:'Search IRC Chat Logs',templateName:'search'},
      {sectionName:'#sailsjs IRC Webchat',templateName:'chat'}];

 	$scope.getIsCurrentPage = function(path) {
    	var current = window.location.hash;
    	return current === '#' + path;
	};
	$scope.$on('$locationChangeSuccess', function(event) {
		$scope.currentSection = window.location.hash.replace(/[^a-z]/ig,'');
		console.log($scope.currentSection);
		$scope.searchResults = [];
    	console.log('Location Change:',event)
	});

	$scope.intent = angular.extend($scope.intent || {}, {
		goto: function(hash) {
			window.location.hash = hash;
		},
		loadSubSection: function(templateName){
			window.location.hash = templateName;
			console.log('loading subsection:',templateName)

			if ($scope.previousSection === 'search' && templateName === 'chat'){
				// $scope.eventsRegistered = false;
				registerSpeakListeners();				
				console.log('events will be reloaded')
			}

			$scope.previousSection = templateName;

		}
	});
}
]);
