(function () {
    'use strict';
 
    angular
        .module('starter', ['ionic', 'ngRoute', 'ngCookies'])
        .config(config)
        .run(run);
		
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
        
 
            .when('/login', {
                controller: 'LoginCtrl',
                templateUrl: 'templates/login.html',
                controllerAs: 'vm'
            })
 
            .when('/register', {
                controller: 'RegisterCtrl',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
			
			.when('/feeds', {
				templateUrl: 'templates/tab-feeds.html',
				controller: 'FeedsCtrl',
				controllerAs: 'vm'
			})
        	
			.when('/myfeeds', {
				templateUrl: 'templates/tab-perfil.html',
				controller: 'MyfeedsCtrl',
				controllerAs: 'vm'
			})
			.when('/following', {
				templateUrl: 'templates/tab-following.html',
				controller: 'FollowingCtrl',
				controllerAs: 'vm'
			})
			.when('/groups', {
				templateUrl: 'templates/tab-groups.html',
				controller: 'GroupsCtrl',
				controllerAs: 'vm'
			})
    		.when('/favorites', {
				templateUrl: 'templates/tab-favorites_back.html',
				controller: 'FavoritesCtrl',
				controllerAs: 'vm'
			})
			.when('/favorites/feed', {
				templateUrl: 'templates/tab-favorites-feed.html',
				controller: 'FeedFavoritesCtrl',
				controllerAs: 'vm'
			})
            .otherwise({ redirectTo: '/login' });
			
			// Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }
 
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
 
})();