//Search Controller
module App.Controllers {
    class SearchCtrl {

        Location: Coordinates;
        Address: string;

        notify: Services.NotifyService;
        location: Services.LocationService;
        state: ng.ui.IStateService;

        constructor(_location, _notify, $state) {
            this.notify = _notify;
            this.state = $state;
            this.location = _location;

            var getLocation = this.location.GetLocation();

            getLocation
                .then(l => this.Location = l)
                .catch(c => console.error("Location Required"))
                .finally(() => angular.element("div[data-loader]").hide(10));

            //Also Get Address
            getLocation.then(l => this.location.GetAddress(l).then(a => this.Address = a))
        }

        search(uniqueNo: string) {
            var location = this.Location || { longitude: 0, latitude: 0 };
            this.state.go("result", { uniqueNo: uniqueNo });
        }
    }
    App.module.controller("SearchCtrl", SearchCtrl);
}

module App.Controllers {
    class ResultCtrl {

        Url = "/api/products";

        uniqueNo: string;

        Product: Product;
        Location: Coordinates;

        state: ng.ui.IStateService;
        data: Services.DataService;
        location: Services.LocationService;
        notify: Services.NotifyService;

        Message: string;

        ReportSent = false;

        getProduct = () => {
            this.location.GetLocation().then(l => {
                var location = this.Location = l
            }).finally(() => {
                var location = this.Location || { longitude: 0, latitude: 0 };
                
                let query: Query = {
                    UniqueNo: this.uniqueNo,
                    Longitude: location.longitude,
                    Latitude: location.latitude,
                    Source: "Web"
                };

                var fetchProduct = this.data.post<Product>(this.Url + "/query", query);

                fetchProduct.then(p => {
                    this.Product = p;
                });

                fetchProduct.catch(p => {
                    this.Product = null;
                    this.Message = this.uniqueNo + " not Found";
                    console.log(p);
                });
            });
        }

        constructor($stateParams, $state, _data, _location, _notify) {
            this.uniqueNo = $stateParams["uniqueNo"];

            this.data = _data;
            this.location = _location;
            this.notify = _notify;
            this.state = $state;

            this.getProduct();
        }

        search() {
            this.getProduct();
        }

        send(report: Report) {
            var sendReport =
                this.data
                    .post<Report>(this.Url + "/report", report)
                    .then(p => this.ReportSent = true)
                    .catch(this.notify.error);
        }
    }
    App.module.controller("ResultCtrl", ResultCtrl);
}