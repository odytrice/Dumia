module App {
    export var module = angular.module("MainApp", ["ui.router", "ui.bootstrap",'LocalStorageModule', "ngAnimate"]);
}

//To Allow Minified and non-minified Code Work Together
(<any>window).App = App;

module App.Global {
    App.module.config($httpProvider => $httpProvider.interceptors.push("loadingInterceptor"));
}