# Connect To Webchat

Connect or reconnect to #sailsjs.

`WS GET http://sailstroll-20102.onmodulus.net/chat/connect`

If the connection is new, a `bot` will be created and given a random irc `nick`.  If a session exists, the connection will be re-established using the previous `nick`.

Upon connection, the server will respond with an object containing the bot `nick`.  The client will also be subscribed to `attendance` and `newMessage` events. 

### sails.io.js Example 

```javascript

io.socket.get('/chat/connect',function(serverResponse){
	if (serverResponse.name)
    	console.log('You are being connected to #sailsjs with name',serverResponse.name)
    else
    	console.log('An error has occured',serverResponse.error)
});


```

### Expected Response

##### On Success

```javascript
{
	name:'Web92810'
}
```
##### On Error

```javascript
{
	name:'',
	error:'This is why things failed!'
}
```

> The Sails property `req.isSocket` is checked on the backend therefore this request must be made via websockets.

<docmeta name="uniqueID" value="webchatConnect736212">
<docmeta name="displayName" value="Connect To Webchat">
