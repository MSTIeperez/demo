//'user strict';
var url ='';
console.log(window.location.hostname);
if(window.location.hostname=="")
	url='http://legixapp.abardev.net';

angular.module('starter.services', ['ngCookies'])

.service('ContentService', function($http, $q) {
    return {
        content: function(id) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;

		$http.post(url+'/api/simple_content',{'id':id})
		
				.success(function(data, status, headers, config){
					 if (data) {
						
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
.service('LoginService', function($http, $q) {
	var user_data={};
    return {
        loginUser: function(name, pw,remember) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;

		$http.post(url+'/api/desktop_login',{'email':name,'password': pw})

				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.message=="logged") {
            window.localStorage.setItem('user',JSON.stringify(data.user));
						if(remember=="ok")
              window.localStorage.setItem('remember','true');
						user_data=data.user;
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
        },
	recoverpass: function(email) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
	
		$http.post(url+'/api/recpassword',{'email':email})

				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.message=="Nuevo") {
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
        },
	user: function() {
		  return user_data;
		}
    }
	
})

.service('Registerservice', function($http, $q) {
	var user_data={};
    return {
        newUser: function(legix_id, first_name,last_name, email, pw, parent_id,child) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var api="create_front";
            if(child=="true")
              api='create';
		$http.post(url+'/api/'+api,{'legix_id':legix_id,'first_name':first_name, 'last_name':last_name, 'email':email,'password': pw, 'parent_id':parent_id})
				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.action=="modify" || data.action=="create"|| data.message=="Creada") {
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
.service('UserService', function($http, $q) {
	var user_data={};
    return {
        datauser: function(section) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
		$http.post(url+'/api/user_data',{'section':section})
	
				.success(function(data, status, headers, config){
			
					 if (!data.alert) {
					
						user_data=data.user;
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
        },
		 remove: function(grupos, usuarios) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
		$http.post(url+'/api/configuration',{'user_configuration':'sent', 'grupos':grupos, 'usuarios':usuarios})
		
				.success(function(data, status, headers, config){
					//data=$.parseJSON(data);
					console.log(data);
					 if (data.message=="Eliminados") {
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


.service('UpdateService', function($http, $q) {
	var user_data={};
    return {
        updateUser: function(first_name,last_name, alias,  pw, thumbnail, archivos) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
		$http.post(url+'/api/update_account',{'first_name':first_name, 'last_name':last_name, 'alias':alias,'password': pw, "thumbnail":thumbnail, 'archivos': archivos})
		
				.success(function(data, status, headers, config){
				console.log($.parseJSON(data));
				data=$.parseJSON(data);
				if (data=='actualizado') {
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
.service('GroupService', function($http, $q) {
	var user_data={};
    return {
        newgroup: function(group_name,temas,usuarios,group_id) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
		$http.post(url+'/api/update_group',{'group_name': group_name, 'temas': temas,'usuarios': usuarios, 'group_id': group_id})
				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.message=='Actualizado') {
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
        },
		updategroup: function(group_name,temas,usuarios,group_id) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
		$http.post(url+'/api/group/update',{'group_name': group_name, 'temas': temas,'usuarios': usuarios, 'group_id': parseInt(group_id)})
				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.status==true) {
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

.factory('Feeds_all', function($http, Auth, $q, $state, $location) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [];
	

  return {
    all: function(status,search,my_feeds, my_follow, fav,  subject_id, origin_id, theme_id, comision_id, feed_in) {
			var deferred = $q.defer();
            var promise = deferred.promise;
		$http.post(url+'/api/feeds/get_all',{'status':-1,'my_feeds':my_feeds,'my_follow':my_follow,'fav':fav, 'subject_id':subject_id, 'origin_id':origin_id, 'theme_id':theme_id, 'comision_id': comision_id, 'feed_in':feed_in})
			.success(function(data){
				if(data.message!="Es necesario iniciar sesión"){
				console.log(data);
				feeds=data.feeds;
				deferred.resolve(data);
				console.log("feeds: "+feeds);
				}else{
				
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

})
.factory('Feeds', function($http, Auth, $q, $state, $location) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [];
	

  return {
    all: function(status,my_feeds, my_follow, fav,  subject_id, origin_id, theme_id, comision_id, feed_in) {
			var deferred = $q.defer();
            var promise = deferred.promise;
		$http.post(url+'/api/my-feeds/get_all',{'status':-1,'my_feeds':my_feeds,'my_follow':my_follow,'fav':fav, 'subject_id':subject_id, 'origin_id':origin_id, 'theme_id':theme_id, 'comision_id': comision_id, 'feed_in':feed_in})
				.success(function(data){
				console.log(data);
				feeds=data.feeds;
				deferred.resolve(data);
				console.log("feeds: "+feeds);
				if(data.message=="Es necesario iniciar sesión"){
				
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

})

.factory('Search', function($http, Auth, $q, $state, $location) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [];
	

  return {
    all: function(status,search, my_feeds, my_follow, fav,  subject_id, origin_id, theme_id, comision_id, feed_in) {
			var deferred = $q.defer();
            var promise = deferred.promise;
		$http.post(url+'/api/feeds_load',{'status':-1,'search':search,'my_feeds':my_feeds,'my_follow':my_follow,'fav':fav, 'subject_id':subject_id, 'origin_id':origin_id, 'theme_id':theme_id, 'comision_id': comision_id, 'feed_in':feed_in})
				.success(function(data){
				console.log(data);
				feeds=data.feeds;
				deferred.resolve(data);
				console.log("feeds: "+feeds);
				if(data.message=="Es necesario iniciar sesión"){
				
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

})

.factory('Follow', function($http, Auth, $q, $state, $location) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var feeds = [];


  return {
    all: function(status,my_feeds, my_follow, fav,  subject_id, origin_id, theme_id, comision_id, feed_in) {
			var deferred = $q.defer();
            var promise = deferred.promise;
		$http.post(url+'/api/follow/get_all',{'status':-1,'my_feeds':my_feeds,'my_follow':my_follow,'fav':fav, 'subject_id':subject_id, 'origin_id':origin_id, 'theme_id':theme_id, 'comision_id': comision_id, 'feed_in':feed_in})
				.success(function(data){
				console.log(data);
				feeds=data.feeds;
				deferred.resolve(data);
				console.log("feeds: "+feeds);
				if(data.message=="Es necesario iniciar sesión"){
				
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
	$http.get(url+'/api/temas')
		
				.success(function(data){
				
				themas=data.origen;
				deferred.resolve(data.origen);
				console.log(themas);
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
	  return themas;
    },
    get: function(themeId) {
      for (var i = 0; i < feeds.length; i++) {
        if (themas[i].id === parseInt(themeId)) {
          return themas[i];
        }
      }
      return null;
    },
    add: function(temas_id){
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.post(url+'/api/update_temas', {'temas_id':temas_id})
        .success(function(data){
          deferred.resolve(data);
          if(data.message=="el usuario no esta registrado"){
              deferred.reject(data);
              Auth.logout();
              $state.go("login");
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
	}
})
.service('LoadImage', function($http, $q) {
	var user_data={};
    return {
        capturePhoto: function(name, pw) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;

		$http.post(url+'/api/desktop_login',{'email':name,'password': pw})
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
	recoverpass: function(email) {
            var deferred = $q.defer();
			
            var promise = deferred.promise;
	
		$http.post(url+'/api/recpassword',{'email':email})
	
				.success(function(data, status, headers, config){
				console.log(data);
					 if (data.message=="Nuevo") {
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
        },
	user: function() {
		  return user_data;
		}
    }
	
});
