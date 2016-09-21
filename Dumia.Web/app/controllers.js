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
                    .then(function (r) {
                    _this.Products = r.map(function (i) { return i.Product; });
                    console.log(_this.Products);
                })
                    .catch(function (m) { return _this.notify.error("Could not Retrieve Products: " + m); });
                //Initialize Cart
                this.Cart = {
                    Items: []
                };
            }
            HomeCtrl.prototype.addToCart = function (product) {
                var items = this.Cart.Items;
                var item = items.filter(function (i) { return i.Product.ProductID == product.ProductID; })[0];
                if (item == null) {
                    item = {
                        Product: product,
                        Quantity: 1
                    };
                    this.Cart.Items.push(item);
                }
                else {
                    item.Quantity = item.Quantity + 1;
                }
                console.log(this.Cart);
            };
            HomeCtrl.prototype.displayCart = function () {
                return this.Cart && this.Cart.Items && this.Cart.Items.length;
            };
            HomeCtrl.prototype.getItemTotal = function (item) {
                return item.Product.Price * item.Quantity;
            };
            HomeCtrl.prototype.displayTotal = function (cart) {
                if (this.displayCart()) {
                    return cart.Items
                        .map(function (i) { return i.Product.Price * i.Quantity; })
                        .reduce(function (ag, e) { return ag + e; });
                }
                return 0;
            };
            return HomeCtrl;
        }());
        App.module.controller("HomeCtrl", HomeCtrl);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=controllers.js.map