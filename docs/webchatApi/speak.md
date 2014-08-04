# Speak

Connect or reconnect to #sailsjs.

`WS GET http://sailstroll-20102.onmodulus.net/chat/speak?message="roflamo"`

or

`WS POST http://sailstroll-20102.onmodulus.net/chat/speak"`

with JSON
```javascript
{
	message: "roflamo"
}

```

There must be a valid session associated with the client and it must be 'connected'.  Otherwise the request will be ignored.

### Example 

```javascript
io.socket.get('/chat/speak',{message:'roflamo'});

```

### Expected Response

```javascript

// No response given

```

> The Sails property `req.isSocket` is checked on the backend therefore this request must be made via websockets.

<docmeta name="uniqueID" value="webchatSpeak">
<docmeta name="displayName" value="Speak">
