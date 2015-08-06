(function () {
    'use strict';
 
    angular
        .module('starter')
        .controller('GroupsCtrl', FeedController);
 
    FeedController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function FeedController($location, AuthenticationService, FlashService, Feeds) {
        var vm = this;
 
        vm.feeds = Feeds.all();
		$scope.remove = function(feed) {
		Feeds.remove(feed);
       
    }
 
})();