//Search Controller
module App.Controllers {
    class HomeCtrl {

        Products: Product[];

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

        }
    }
    App.module.controller("HomeCtrl", HomeCtrl);
}