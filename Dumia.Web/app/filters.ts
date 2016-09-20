module App.Interceptors {

    var loadingInterceptor = function ($q) {
        return {
            // optional method
            'request': function (config) {
                // do something on success

                angular.element("div[data-loader]").show(10);

                return config;
            },

            // optional method
            'requestError': function (rejection) {
                // do something on error
                angular.element("div[data-loader]").hide(10);
                return $q.reject(rejection);
            },



            // optional method
            'response': function (response) {
                // do something on success
                angular.element("div[data-loader]").hide(10);
                return response;
            },

            // optional method
            'responseError': function (rejection) {
                // do something on error
                angular.element("div[data-loader]").hide(10);
                return $q.reject(rejection);
            }
        };
    }

    // register the interceptor as a service
    App.module.factory('loadingInterceptor', loadingInterceptor);
}