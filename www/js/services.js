//'user strict';
var url ='http://legixapp.abardev.net';
angular.module('starter.services', ['ngCookies'])

.service('LoginService', function($http, $q) {
	var user_data={};
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
	//	if(window.localStorage.getItem('user')==null)	{
		//$http.post(url+'/api/login',{'email':name,'password': pw})
		$http.post('/api/login',{'email':name,'password': pw})
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

.factory('Auth', function ($cookieStore) {
   var _user = $cookieStore.get('starter.user');
   var setUser = function (user) {
      _user = user;
      $cookieStore.put('starter.user', _user);
   }

   return {
      setUser: setUser,
      isLoggedIn: function () {
         return _user ? true : false;
      },
      getUser: function () {
         return _user;
      },
      logout: function () {
         $cookieStore.remove('starter.user');
         _user = null;
		 window.localStorage.setItem('user',null);
      }
   }
})

.factory('Feeds', function($http, Auth, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [];

	if(window.localStorage.getItem('user')!=null && Auth.isLoggedIn())	{

  return {
    all: function(status,my_feeds, my_follow, subject_id, origin_id, theme_id, comision_id) {
			var deferred = $q.defer();
            var promise = deferred.promise;
		$http.post('/api/feeds_load',{'status':-1,'my_feeds':my_feeds,'my_follow':my_follow, 'subject_id':subject_id, 'origin_id':origin_id, 'theme_id':theme_id, 'comision_id': comision_id})
				.success(function(data){
				console.log(data);
				feeds=data.feeds;
				deferred.resolve(data.feeds);
				console.log("feeds: "+feeds);
				})
				.error(function (data){
				console.log(data);
				});
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
  }
	}
});
