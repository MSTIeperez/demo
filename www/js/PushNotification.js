/*var parsePlugin = {
    initialize: function(appId, clientKey, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ParsePlugin',
            'initialize',
            [appId, clientKey]
        );
    },

    getInstallationId: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ParsePlugin',
            'getInstallationId',
            []
        );
    },

    getInstallationObjectId: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ParsePlugin',
            'getInstallationObjectId',
            []
        );
    },

    getSubscriptions: function(successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ParsePlugin',
            'getSubscriptions',
            []
        );
    },

    subscribe: function(channel, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ParsePlugin',
            'subscribe',
            [ channel ]
        );
    },

    unsubscribe: function(channel, successCallback, errorCallback) {
        cordova.exec(
            successCallback,
            errorCallback,
            'ParsePlugin',
            'unsubscribe',
            [ channel ]
        );
    }
};
module.exports = parsePlugin;*/

module.exports = {

    setUp: function(appId, clientKey) {
        var self = this;    
        cordova.exec(
            function (result) {
                if (typeof result == "string") {
                    if (result == "onRegisterAsPushNotificationClientSucceeded") {
                        if (self.onRegisterAsPushNotificationClientSucceeded)
                            self.onRegisterAsPushNotificationClientSucceeded();
                    }
/*                  
                    else if (result == "onUnregisterSucceeded") {
                        if (self.onUnregisterSucceeded)
                            self.onUnregisterSucceeded();
                    }
*/                  
                    else if (result == "onSubscribeToChannelSucceeded") {
                        if (self.onSubscribeToChannelSucceeded)
                            self.onSubscribeToChannelSucceeded();
                    }
                    else if (result == "onUnsubscribeSucceeded") {
                        if (self.onUnsubscribeSucceeded)
                            self.onUnsubscribeSucceeded();
                    }
                }
                else {
                    //if (result["event"] == "onXXX") {
                    //  //result["message"]
                    //  if (self.onXXX)
                    //      self.onXXX(result);
                    //}
                }           
            }, 
            function (error) {
                if (typeof result == "string") {
                    if (result == "onRegisterAsPushNotificationClientFailed") {
                        if (self.onRegisterAsPushNotificationClientFailed)
                            self.onRegisterAsPushNotificationClientFailed();
                    }
/*                  
                    else if (result == "onUnregisterFailed") {
                        if (self.onUnregisterFailed)
                            self.onUnregisterFailed();
                    }
*/
                    else if (result == "onSubscribeFailed") {
                        if (self.onSubscribeToChannelFailed)
                            self.onSubscribeToChannelFailed();
                    }
                    else if (result == "onUnsubscribeFailed") {
                        if (self.onUnsubscribeFailed)
                            self.onUnsubscribeFailed();
                    }                   
                }
                else {
                    //if (result["event"] == "onXXX") {
                    //  //result["message"]
                    //  if (self.onXXX)
                    //      self.onXXX(result);
                    //}
                }           
            },
            'ParsePushNotificationPlugin',
            'setUp',            
            [appId, clientKey]
        ); 
    },
/*  
    registerAsPushNotificationClient: function() {
        var self = this;    
        cordova.exec(
            null,
            null,
            'ParsePushNotificationPlugin',
            'registerAsPushNotificationClient',
            []
        ); 
    },
    unregister: function() {
        var self = this;    
        cordova.exec(
            null,
            null,
            'ParsePushNotificationPlugin',
            'unregister',
            []
        ); 
    },  
*/  
    subscribeToChannel: function(channel) {
        var self = this;    
        cordova.exec(
            null,
            null,
            'ParsePushNotificationPlugin',
            'subscribeToChannel',
            [channel]
        ); 
    },
    unsubscribe: function(channel) {
        var self = this;    
        cordova.exec(
            null,
            null,
            'ParsePushNotificationPlugin',
            'unsubscribe',
            [channel]
        ); 
    },
    onRegisterAsPushNotificationClientSucceeded: null,
    onRegisterAsPushNotificationClientFailed: null,
/*  
    onUnregisterSucceeded: null,
    onUnregisterFailed: null,   
*/  
    onSubscribeToChannelSucceeded: null,
    onSubscribeToChannelFailed: null,
    onUnsubscribeSucceeded: null,
    onUnsubscribeFailed: null   
};
