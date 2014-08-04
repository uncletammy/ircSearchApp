# Check Connection Status

Check to see if a valid session exists for this client and if their bot is connected to #sailsjs.

`WS GET http://sailstroll-20102.onmodulus.net/chat/canHazSession`

If a session exists for the client, then a bot will also exist on the server.

### sails.io.js Example 

```javascript

io.socket.get('/chat/canHazSession',function(serverResponse){

	if (serverResponse.name && serverResponse.connectedToChat)
		console.log('Found session and youre already connected');
	else if (serverResponse.name && !serverResponse.connectedToChat)
		console.log('Found session but Not connected')
	else
		console.log('Cant find session!')
});


```

### Expected Response

##### On Success

```javascript
{
	serverResponse: {
		name: 'Web29291',
		connectedToChat: 'false'
	}
}

```
##### On Error

```javascript

{}


```

> The Sails property `req.isSocket` is checked on the backend therefore this request must be made via websockets.

<docmeta name="uniqueID" value="webchatStatus736212">
<docmeta name="displayName" value="Connection Status">
