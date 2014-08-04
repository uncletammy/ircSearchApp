# Get Recent Chat Messages

Get the ten most recent IRC messages from the database.

`WS GET http://sailstroll-20102.onmodulus.net/chat/`


### Example 

```javascript
io.socket.get('/chat/index',function(serverResponse){
	if (serverResponse)
		console.log(serverResponse)
});

```

### Expected Response

##### On Success

```javascript
[{"usermentions":[{"nick":"glook",
	"lcnick":"glook",
	"updatedAt":"2014-08-04T21:43:59.785Z"}],
	"sender":"dawunder",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"glook: you can take a look of that https://github.com/tarlepp/angular-sailsjs-boilerplate",
	"createdAt":"2014-08-04T21:46:41.979Z",
	"updatedAt":"2014-08-04T21:46:41.979Z",
	"id":"53dfff410a3e30762ddf5d51"
},
{
	"usermentions":[],
	"sender":"dawunder",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"something like that",
	"createdAt":"2014-08-04T21:46:14.843Z",
	"updatedAt":"2014-08-04T21:46:14.844Z",
	"id":"53dfff260a3e30762ddf5d4a"
},
{
	"usermentions":[],
	"sender":"glook",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"I have express and neo4j installed with npm in node (new to node) would this just be a matter of adding sails and lifting and then telling angular where to find it?",
	"createdAt":"2014-08-04T21:45:55.148Z",
	"updatedAt":"2014-08-04T21:45:55.148Z",
	"id":"53dfff130a3e30762ddf5cdd"
},
{
	"usermentions":[],
	"sender":"glook",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"so angular would communicate with sails which gets to neo4j through node?",
	"createdAt":"2014-08-04T21:45:19.816Z",
	"updatedAt":"2014-08-04T21:45:19.816Z",
	"id":"53dffeef0a3e30762ddf5caf"
},
{
	"usermentions":[{"nick":"glook",
	"lcnick":"glook",
	"updatedAt":"2014-08-04T21:43:59.785Z"}],
	"sender":"dawunder",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"glook: build your backend api on sails",
	"createdAt":"2014-08-04T21:44:39.731Z",
	"updatedAt":"2014-08-04T21:44:39.731Z",
	"id":"53dffec70a3e30762ddf5c94"
},
{
	"usermentions":[],
	"sender":"glook",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"I have node communicating to a cloud-hosted neo4j db.  I need to have angular communicate through node.  I have sails installed but haven't tied it in with this project yet.  I've been led towards plain res.json and pm2 or forever.  Any reason to use sails instaed?",
	"createdAt":"2014-08-04T21:43:59.785Z",
	"updatedAt":"2014-08-04T21:43:59.787Z",
	"id":"53dffe9f0a3e30762ddf5beb"
},
{
	"usermentions":[],
	"sender":"guiiks",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"haha but then it comes from boilerblate?",
	"createdAt":"2014-08-04T21:43:33.985Z",
	"updatedAt":"2014-08-04T21:43:33.986Z",
	"id":"53dffe850a3e30762ddf5bd2"
},
{
	"usermentions":[],
	"sender":"dawunder",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"just under 6 hours of sleep if i go now :D",
	"createdAt":"2014-08-04T21:42:44.976Z",
	"updatedAt":"2014-08-04T21:42:44.977Z",
	"id":"53dffe540a3e30762ddf5ba8"
},
{
	"usermentions":[],
	"sender":"dawunder",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"damn, have to sleep for now",
	"createdAt":"2014-08-04T21:42:18.443Z",
	"updatedAt":"2014-08-04T21:42:18.443Z",
	"id":"53dffe3a0a3e30762ddf5b92"
},
{
	"usermentions":[],
	"sender":"dawunder",
	"channel":"5398d161bc9477dd23c6ae5e",
	"text":"if i just got the time",
	"createdAt":"2014-08-04T21:41:59.408Z",
	"updatedAt":"2014-08-04T21:41:59.408Z",
	"id":"53dffe270a3e30762ddf5b80"}]

```

##### On Error

```javascript
// No response given on error

```

> The Sails property `req.isSocket` is checked on the backend therefore this request must be made via websockets.

<docmeta name="uniqueID" value="webchatRecent282911">
<docmeta name="displayName" value="Get Recent Messages">
