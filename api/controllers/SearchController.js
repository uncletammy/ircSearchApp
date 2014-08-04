/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	go: function(req,res){

		var sendResponse = function(responseBody){
			return res.json(JSON.parse(responseBody))
		};


		var requestObject = {
			"method": "POST",
			"uri": "http://70.113.19.166:1337/search/go",
			"form": {
				"query": req.param("query")
			}
		};

		require('request')(requestObject, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    // console.log('Got a response!',body); // Print the google web page.
		    sendResponse(body);
		  }
		})
		// serverCall.onData()


		console.log('Calling home with query',req.param('query'));

	// req.pipe(require('request').post('http://70.113.19.166:1337/search/go').form({query:req.param('query')})).pipe(res);
	},
	expand: function(req,res){

		var sendResponse = function(responseBody){
			return res.json(JSON.parse(responseBody))
		};

		var expandType = req.param('type');
		// if type is, message, 'id' will be createdAt date 
		var expandID = req.param('id');

		if (expandType === 'message')
			var expandURI = 'http://70.113.19.166:1337/message/getTranscript?message='+expandID;
		else if (expandType === 'user')
			var expandURI = 'http://70.113.19.166:1337/user/'+expandID;	
		else return

		var requestObject = {
			"method": "GET",
			"uri": expandURI
		};

		require('request')(requestObject, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    sendResponse(body);
		  }
		})


	}
};

