// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
.config(function($ionicConfigProvider){
    $ionicConfigProvider.tabs.position('bottom');
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
	            
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
  
    .state('login', {
      url: '/login',
	  /*views: {
            'login': {*/
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            /*}
	  }*/
  }) 
      .state('register', {
        url: '/registro',
        templateUrl: 'templates/signup.html',
		controller: 'RegistroCtrl'
		
    })/*
  
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })*/
    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })
  
    // Each tab has its own nav history stack:

    /*.state('tab.feeds', {
        url: '/feeds',
        views: {
            'tab-feeds': {
                templateUrl: 'templates/tab-feeds.html',
                controller: 'FeedsCtrl'
            }
        }
    })*/
    .state('tab.feeds', {
        url: '/feeds',
        views: {
            'tab-feeds': {
                templateUrl: 'templates/tab-feeds.html',
                controller: 'FeedsCtrl'
            }
        }
    })
        
    .state('tab.myfeeds', {
        url: '/myfeeds',
        views: {
            'tab-myfeeds': {
                templateUrl: 'templates/tab-perfil.html',
                controller: 'MyfeedsCtrl'
            }
        }
    })
    
    .state('tab.following', {
        url: '/following',
        views: {
            'tab-following': {
                templateUrl: 'templates/tab-following.html',
                controller: 'FollowingCtrl'
            }
        }
    })
        
    .state('tab.groups', {
        url: '/groups',
        views: {
            'tab-groups': {
                templateUrl: 'templates/tab-groups.html',
                controller: 'GroupsCtrl'
            }
        }
    })
    
    .state('tab.favorites', {
        url: '/favorites',
        views: {
            'tab-favorites': {
                templateUrl: 'templates/tab-favorites_back.html',
                controller: 'FavoritesCtrl'
            }
        }
    })
    
    .state('tab.feed', {
      url: '/favorites/feed',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-favorites-feed.html',
          controller: 'FeedFavoritesCtrl'
        }
      }
    });
    
    

    
    /*.state('tab.feed', {
        url: '/favorites/feed',
        views: {
            'tab-usuarios': {
                templateUrl: 'templates/tab-feeds.html',
                controller: 'FeedCtrl'
            }
        }
    });*/

    // if none of the above states are matched, use this as the fallback
    if(window.localStorage.getItem('user')==null)
		$urlRouterProvider.otherwise('/login');
	else
		$urlRouterProvider.otherwise('/feeds');		
    
    // setup an abstract state for the tabs directive
    
  
});

var example = angular.module("example", ['ui.router']);
example.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('settings', {
            url: '/settings'
        })
        .state('settings.profile', {
            url: '/profile',
            templateUrl: 'templates/perfil.html',
            controller: 'ProfileCtrl'
        })
        .state('settings.account', {
            url: '/account',
            templateUrl: 'templates/account.html',
            controller: 'AccountCtrl'
        });
    $urlRouterProvider.otherwise('/settings/profile');
});

angular.module('Post', [], function($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */ 
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for(name in obj) {
      value = obj[name];

      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
});
/*
var express = require('express')
var app = express()

app.get('/api/login', function(req, res) {
  res.json({name: 'login'})
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});*/
