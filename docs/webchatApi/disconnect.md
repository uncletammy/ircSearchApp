# Disconnect from Webchat

Disconnect client's irc bot from #sailsjs while setting the sessions connection status to 'disconnected'. 

`WS GET http://sailstroll-20102.onmodulus.net/chat/disconnect`

Disconnected clients will continue to receive `attendance` and `newMessage` events but they will be unable to `speak` 

### sails.io.js Example 

```javascript
io.socket.get('/chat/disconnect',function(serverResponse){
	if (!serverResponse.connectedToChat)
		console.log('Disconnected!')
	else
		console.log('Probably not disconnected!')
});
```

### Expected Response
##### On success
```javascript
{
	connectedToChat:false
}

```
##### On failure
```javascript
// No response given

```

> The Sails property `req.isSocket` is checked on the backend therefore this request must be made via websockets.

<docmeta name="uniqueID" value="webchatDisconnect873323">
<docmeta name="displayName" value="Disconnect from Chat">
