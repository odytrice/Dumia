//Search Controller
module App.Controllers {
    class HomeCtrl {

        Products: Product[];
        Cart: Cart;

        notify: Services.NotifyService;
        inventory: Services.InventoryService;

        constructor(_inventory, _notify) {
            this.inventory = _inventory;
            this.notify = _notify;

            let getProducts =
                this.inventory.GetProducts()
                    .then(r => {
                        this.Products = r.map(i => i.Product)
                        console.log(this.Products)
                    })
                    .catch(m => this.notify.error("Could not Retrieve Products: " + m));

            //Initialize Cart
            this.Cart = {
                Items: []
            }
        }

        addToCart(product: Product) {
            let items = this.Cart.Items;

            var item = items.filter(i => i.Product.ProductID == product.ProductID)[0];

            if (item == null) {
                item = {
                    Product: product,
                    Quantity: 1
                }
                this.Cart.Items.push(item);
            }
            else {
                item.Quantity = item.Quantity + 1
            }

            console.log(this.Cart);
        }

        displayCart() {
            return this.Cart && this.Cart.Items && this.Cart.Items.length
        }

        getItemTotal(item: Item) {
            return item.Product.Price * item.Quantity
        }

        displayTotal(cart: Cart) {
            if (this.displayCart()) {
                return cart.Items
                    .map(i => i.Product.Price * i.Quantity)
                    .reduce((ag, e) => ag + e);
            }
            return 0;
        }
    }
    App.module.controller("HomeCtrl", HomeCtrl);
}