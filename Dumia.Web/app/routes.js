/// <reference path="app.ts" />
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var config = function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("home", {
                url: "/",
                controller: "HomeCtrl",
                controllerAs: "model",
                templateUrl: "/templates/index.html"
            });
        };
        App.module.config(config);
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
