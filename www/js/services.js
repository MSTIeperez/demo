'user strict';
var url ='http://legixapp.abardev.net';
angular.module('starter.services', [])

.service('LoginService', function($http, $q) {
	var user_data={};
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
	//	if(window.localStorage.getItem('user')==null)	{
		$http.post(url+'/api/login',{'email':name,'password': pw})
		//$http.post('/api/login',{'email':name,'password': pw})
				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.message=="logged") {
						window.localStorage.setItem('user',JSON.stringify(data.user));
						user_data=data.user;
						deferred.resolve(data);
						
					} else {
						deferred.reject(data);
					}
				})
				.error(function (data){
					deferred.reject(data);
				});
		//}
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
	user: function() {
		  return user_data;
		}
    }
	
})

.factory('Feeds', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [];
  /*{
    id: 0,
    avatar: 'img/icons/icon-senado.png',
    name: 'Rafael rojas',
    from: 'De Senado',
    update: new Date('2015', '03', '08'),
    message: 'Se prevee la presentación de un exhorto a la PGR y #Pemex a implemetar un programa de #PrevencionDeAdeudos...',
    file: [{
        link: 'img/icons/icon-senado.png'
    }, {
        link: 'img/icons/icon-senado.png'
    }]
  },*/
	if(window.localStorage.getItem('user')!=null)	{
		$http.post(url+'/api/feeds_load',{'status':-1})
		//$http.post('/api/feeds_load',{'status':-1})
				.success(function(data){
				console.log(data);
				feeds=data.feeds;
				console.log("feeds: "+feeds);
				})
				.error(function (data){
				console.log(data);
				});
		}
  return {
    all: function() {
      return feeds;
    },
    remove: function(feed) {
      feed.splice(feeds.indexOf(feed), 1);
    },
    get: function(feedId) {
      for (var i = 0; i < feeds.length; i++) {
        if (feeds[i].id === parseInt(feedId)) {
          return feeds[i];
        }
      }
      return null;
    }
  };
});
