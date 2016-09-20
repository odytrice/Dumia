//Search Controller
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var SearchCtrl = (function () {
            function SearchCtrl(_location, _notify, $state) {
                var _this = this;
                this.notify = _notify;
                this.state = $state;
                this.location = _location;
                var getLocation = this.location.GetLocation();
                getLocation
                    .then(function (l) { return _this.Location = l; })
                    .catch(function (c) { return console.error("Location Required"); })
                    .finally(function () { return angular.element("div[data-loader]").hide(10); });
                //Also Get Address
                getLocation.then(function (l) { return _this.location.GetAddress(l).then(function (a) { return _this.Address = a; }); });
            }
            SearchCtrl.prototype.search = function (uniqueNo) {
                var location = this.Location || { longitude: 0, latitude: 0 };
                this.state.go("result", { uniqueNo: uniqueNo });
            };
            return SearchCtrl;
        }());
        App.module.controller("SearchCtrl", SearchCtrl);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var ResultCtrl = (function () {
            function ResultCtrl($stateParams, $state, _data, _location, _notify) {
                var _this = this;
                this.Url = "/api/products";
                this.ReportSent = false;
                this.getProduct = function () {
                    _this.location.GetLocation().then(function (l) {
                        var location = _this.Location = l;
                    }).finally(function () {
                        var location = _this.Location || { longitude: 0, latitude: 0 };
                        var query = {
                            UniqueNo: _this.uniqueNo,
                            Longitude: location.longitude,
                            Latitude: location.latitude,
                            Source: "Web"
                        };
                        var fetchProduct = _this.data.post(_this.Url + "/query", query);
                        fetchProduct.then(function (p) {
                            _this.Product = p;
                        });
                        fetchProduct.catch(function (p) {
                            _this.Product = null;
                            _this.Message = _this.uniqueNo + " not Found";
                            console.log(p);
                        });
                    });
                };
                this.uniqueNo = $stateParams["uniqueNo"];
                this.data = _data;
                this.location = _location;
                this.notify = _notify;
                this.state = $state;
                this.getProduct();
            }
            ResultCtrl.prototype.search = function () {
                this.getProduct();
            };
            ResultCtrl.prototype.send = function (report) {
                var _this = this;
                var sendReport = this.data
                    .post(this.Url + "/report", report)
                    .then(function (p) { return _this.ReportSent = true; })
                    .catch(this.notify.error);
            };
            return ResultCtrl;
        }());
        App.module.controller("ResultCtrl", ResultCtrl);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
