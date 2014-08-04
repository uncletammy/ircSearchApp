# `socket.io` Events

The webchat app emits 2 `socket.io` events.  

To listen for them using `sails.io.js`, use `io.socket.on('`eventName`',`someFunction`)


### `attendance`
Emitted every time a client connects and disconnects from `#sailsjs`.

##### Callback Argument
```javascript
{
	"type":"depart or join",
	"nick":"clientNick",
	"message":"client join/depart message"
}
```

### `newMessage`
Emitted every time a new message is sent by anyone to `#sailsjs` (including the client).

##### Callback Argument
```javascript
{
	"type":"depart or join",
	"nick":"clientNick",
	"message":"client join/depart message"
}
```


### Example 

```javascript
{
	"from":"clientNick",
	"to":"#sailsjs",
	"message":"message spoken"
}

```

<docmeta name="uniqueID" value="webchatEvents228194">
<docmeta name="displayName" value="Events">
