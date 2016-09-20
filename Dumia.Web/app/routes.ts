/// <reference path="app.ts" />
module App.Routes {
    var config = function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                controller: "HomeCtrl",
                controllerAs: "model",
                templateUrl: "/templates/index.html"
            })
    };
    App.module.config(config);
}