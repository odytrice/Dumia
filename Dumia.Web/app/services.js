var App;
(function (App) {
    var Services;
    (function (Services) {
        var InventoryService = (function () {
            function InventoryService(_data) {
                this.data = _data;
            }
            InventoryService.prototype.GetProducts = function () {
                return this.data.get("/api/inventory");
            };
            return InventoryService;
        }());
        Services.InventoryService = InventoryService;
        App.module.service("_inventory", InventoryService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
/// <reference path="app.ts" />
var App;
(function (App) {
    var Services;
    (function (Services) {
        var API = "http://localhost:48213";
        var DataService = (function () {
            function DataService($q, $http, _notify) {
                this.notify = _notify;
                this.http = $http;
                this.Q = $q;
            }
            DataService.prototype.get = function (url) {
                var defer = this.Q.defer();
                var notify = this.notify;
                var getData = this.http.get(API + url);
                //On Success
                getData.success(function (data, status, headers, config) {
                    defer.resolve(data);
                });
                //On Error
                getData.error(function (data, status, header, config) {
                    var message = "Could get data from Server:" + status;
                    //notify.error(message);
                    defer.reject(message);
                });
                return defer.promise;
            };
            DataService.prototype.post = function (url, data) {
                var defer = this.Q.defer();
                var notify = this.notify;
                var postData = this.http.post(url, data);
                //On Success
                postData.success(function (data, status, headers, config) {
                    defer.resolve(data);
                });
                //On Error
                postData.error(function (data, status, headers, config) {
                    var message = "Could not post data to Server: " + status;
                    //notify.error(message);
                    defer.reject(message);
                });
                return defer.promise;
            };
            DataService.prototype.put = function (url, data) {
                var defer = this.Q.defer();
                var notify = this.notify;
                var putData = this.http.put(url, data);
                //On Success
                putData.success(function (data, status, headers, config) {
                    defer.resolve(data);
                });
                //On Error
                putData.error(function (data, status, headers, config) {
                    var message = "Could not send data to Server: " + status;
                    notify.error(message);
                    defer.reject(message);
                });
                return defer.promise;
            };
            DataService.prototype.delete = function (url) {
                var defer = this.Q.defer();
                var notify = this.notify;
                var deleteData = this.http.delete(url);
                deleteData.success(function (data) {
                    defer.resolve(data);
                });
                deleteData.error(function (data, status, headers, config) {
                    var message = "Could not send data to Server: " + status;
                    notify.error(message);
                    defer.reject(message);
                });
                return defer.promise;
            };
            return DataService;
        }());
        Services.DataService = DataService;
        App.module.service("_data", DataService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
/// <reference path="../app.ts" />
/// <reference path="../../typings/toastr/toastr.d.ts" />
var App;
(function (App) {
    var Services;
    (function (Services) {
        var NotifyService = (function () {
            function NotifyService() {
                toastr.options['closeButton'] = true;
            }
            NotifyService.prototype.success = function (message, title) {
                console.log(message);
                toastr.success(this.parse(message), title);
            };
            NotifyService.prototype.error = function (message, title) {
                console.error(message);
                toastr.error(this.parse(message), title);
            };
            NotifyService.prototype.info = function (message, title) {
                console.info(message);
                toastr.info(this.parse(message), title);
            };
            NotifyService.prototype.warning = function (message, title) {
                console.warn(message);
                toastr.warning(this.parse(message), title);
            };
            NotifyService.prototype.option = function (setting, value) {
                toastr.options[setting] = value;
            };
            NotifyService.prototype.parse = function (message) {
                if (!message || message.length <= 0) {
                    return " &nbsp; ";
                }
                return message;
            };
            return NotifyService;
        }());
        Services.NotifyService = NotifyService;
        App.module.service("_notify", NotifyService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
//# sourceMappingURL=services.js.map