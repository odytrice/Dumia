var App;
(function (App) {
    App.module = angular.module("MainApp", ["ui.router", "ui.bootstrap", 'LocalStorageModule', "ngAnimate"]);
})(App || (App = {}));
//To Allow Minified and non-minified Code Work Together
window.App = App;
var App;
(function (App) {
    var Global;
    (function (Global) {
        App.module.config(function ($httpProvider) { return $httpProvider.interceptors.push("loadingInterceptor"); });
    })(Global = App.Global || (App.Global = {}));
})(App || (App = {}));
