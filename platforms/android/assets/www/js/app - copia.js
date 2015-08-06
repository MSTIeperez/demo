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
        url: '/register',
        views: {
            'register': {
                templateUrl: 'templates/signup.html',
                controller: 'FavoritesCtrl'
            }
        }
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
    $urlRouterProvider.otherwise('/login');
    
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
