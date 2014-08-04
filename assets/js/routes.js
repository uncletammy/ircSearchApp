/**
 * Configure client-side routes (#/foo, #/bar, etc.)
 */

angular.module('irc')
.config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/', {
      redirectTo: '/search'
    })
    .when('/search', {
      templateUrl: 'templates/search.html'
    })
    .when('/chat', {
      templateUrl: 'templates/chat.html'
    })
/*
    // Documentation section sub-router
    .when('/documentation/:sectionPath*?', {
      templateUrl: 'templates/pages/Documentation/DocsSection.html',
      controller: ['$scope', '$routeParams', function ($scope, $routeParams) {

        $scope.docs.findMenuItemByID = function (id, findIn) {
          // var grabItem = _.find(findIn,{fullPathAndFileName:id})
          // if (grabItem){       
          //   return grabItem
          // } else {
          //   return {};
          // }
        };
        var currentHashURL = window.location.hash.replace(/\/+$/,'');
        var grabParents = function(){

        }

      grabParents();

      }]
    });
*/
}]);
