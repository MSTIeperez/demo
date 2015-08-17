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

.service('Registerservice', function($http, $q) {
	var user_data={};
    return {
        newUser: function(legix_id, first_name,last_name, email, pw) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
		//$http.post(url+'/api/create',{'legix_id':legix_id,'first_name':first_name, 'last_name':last_name, 'email':email,'password': pw})
		$http.post('/api/create',{'legix_id':legix_id,'first_name':first_name, 'last_name':last_name, 'email':email,'password': pw})
				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.message=="Creada") {
						deferred.resolve(data);
					} else {
						deferred.reject(data);
					}
				})
				.error(function (data){
					deferred.reject(data);
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

.factory('Feeds', function($http, Auth, $q, $state) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [];

	if(window.localStorage.getItem('user')!=null && Auth.isLoggedIn())	{

  return {
    all: function(status,my_feeds, my_follow, subject_id, origin_id, theme_id, comision_id) {
			var deferred = $q.defer();
            var promise = deferred.promise;
		//$http.post(url+'/api/feeds_load',{'status':-1,'my_feeds':my_feeds,'my_follow':my_follow, 'subject_id':subject_id, 'origin_id':origin_id, 'theme_id':theme_id, 'comision_id': comision_id})
		$http.post('/api/feeds_load',{'status':-1,'my_feeds':my_feeds,'my_follow':my_follow, 'subject_id':subject_id, 'origin_id':origin_id, 'theme_id':theme_id, 'comision_id': comision_id})
				.success(function(data){
				console.log(data);
				feeds=data.feeds;
				deferred.resolve(data.feeds);
				console.log("feeds: "+feeds);
				if(data.message=="el usuario no esta registrado"){
				
						Auth.logout();
						$state.go("login");
					
				}
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
})
.factory('Themes', function($http, Auth, $q, $state) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var themas = [];

	if(window.localStorage.getItem('user')!=null && Auth.isLoggedIn())	{

  return {
    all: function() {
			var deferred = $q.defer();
            var promise = deferred.promise;
		//$http.get(url+'/api/temas')
		$http.get('/api/temas')
				.success(function(data){
				//console.log(data);
				themas=data.origen;
				deferred.resolve(data.origen);
				console.log("temas: "+themas);
				if(data.message=="el usuario no esta registrado"){
				
						Auth.logout();
						$state.go("login");
					
				}
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
    remove: function(theme) {
      theme.splice(themas.indexOf(theme), 1);
    },
    get: function(themeId) {
      for (var i = 0; i < feeds.length; i++) {
        if (themas[i].id === parseInt(themeId)) {
          return themas[i];
        }
      }
      return null;
    }
  }
	}
});
