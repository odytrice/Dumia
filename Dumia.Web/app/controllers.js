//Search Controller
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var HomeCtrl = (function () {
            function HomeCtrl(_inventory, _notify) {
                var _this = this;
                this.inventory = _inventory;
                this.notify = _notify;
                var getProducts = this.inventory.GetProducts()
                    .then(function (r) { return r.map(function (i) { return i.Product; }); })
                    .catch(function (m) { return _this.notify.error("Could not Retrieve Products: " + m); });
            }
            return HomeCtrl;
        }());
        App.module.controller("HomeCtrl", HomeCtrl);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=controllers.js.map