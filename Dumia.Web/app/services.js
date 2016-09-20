var App;
(function (App) {
    var Services;
    (function (Services) {
        var LocationService = (function () {
            function LocationService(_notify, $q) {
                this.notify = _notify;
                this.Q = $q;
            }
            LocationService.prototype.GetLocation = function () {
                var defer = this.Q.defer();
                if ("geolocation" in navigator) {
                    navigator.geolocation
                        .getCurrentPosition(function (p) { return defer.resolve(p.coords); }, function (e) { return defer.reject(e); });
                }
                else {
                    var message = "Location Not Available";
                    this.notify.error(message);
                    defer.reject(message);
                }
                return defer.promise;
            };
            LocationService.prototype.GetAddress = function (coords) {
                var defer = this.Q.defer();
                //TODO: Fetch Resolved Location
                defer.resolve("");
                return defer.promise;
            };
            return LocationService;
        }());
        Services.LocationService = LocationService;
        App.module.service("_location", LocationService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
/// <reference path="app.ts" />
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DataService = (function () {
            function DataService($q, $http, _notify) {
                this.notify = _notify;
                this.http = $http;
                this.Q = $q;
            }
            DataService.prototype.get = function (url) {
                var defer = this.Q.defer();
                var notify = this.notify;
                var getData = this.http.get(url);
                //On Success
                getData.success(function (data, status, headers, config) {
                    if (data.Succeeded) {
                        defer.resolve(data.Result);
                    }
                    else {
                        var message = data.Message;
                        //notify.error(message, "Server Error");
                        defer.reject(message);
                    }
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
                    if (data.Succeeded) {
                        defer.resolve(data.Result);
                    }
                    else {
                        var message = data.Message;
                        //notify.error(message);
                        defer.reject(message);
                    }
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
                    if (data.Succeeded) {
                        defer.resolve(data.Result);
                    }
                    else {
                        var message = data.Message;
                        notify.error(message);
                        defer.reject(message);
                    }
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
                    if (data.Succeeded) {
                        defer.resolve(data.Result);
                    }
                    else {
                        var message = data.Message;
                        notify.error(message);
                        defer.reject(message);
                    }
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
