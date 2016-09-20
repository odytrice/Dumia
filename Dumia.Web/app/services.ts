module App.Services {
    export class InventoryService {
        data: DataService;
        constructor(_data) {
            this.data = _data;
        }

        GetProducts() {
            return this.data.get<Inventory[]>("/api/inventory");
        }
    }
    App.module.service("_inventory", InventoryService);
}


/// <reference path="app.ts" />
module App.Services {

    let API = "http://localhost:48213";

    export class DataService {

        private notify: NotifyService;
        private http: ng.IHttpService;
        private Q: ng.IQService;

        constructor($q: ng.IQService, $http: ng.IHttpService, _notify: NotifyService) {
            this.notify = _notify;
            this.http = $http;
            this.Q = $q;
        }

        get<T>(url: string) {
            var defer = this.Q.defer<T>();
            var notify = this.notify;

            var getData = this.http.get(API + url);

            //On Success
            getData.success(function (data: T, status, headers, config) {
                defer.resolve(data);
            });

            //On Error
            getData.error(function (data, status, header, config) {
                var message = "Could get data from Server:" + status;
                //notify.error(message);
                defer.reject(message);
            });

            return defer.promise;
        }

        post<T>(url: string, data: {}) {
            var defer = this.Q.defer<T>();

            var notify = this.notify;

            var postData = this.http.post(url, data);

            //On Success
            postData.success(function (data: T, status, headers, config) {
                defer.resolve(data);
            });

            //On Error
            postData.error(function (data, status, headers, config) {
                var message = "Could not post data to Server: " + status;
                //notify.error(message);
                defer.reject(message);
            });

            return defer.promise;
        }

        put<T>(url: string, data: {}) {
            var defer = this.Q.defer<T>();
            var notify = this.notify;

            var putData = this.http.put(url, data);

            //On Success
            putData.success(function (data: T, status, headers, config) {
                defer.resolve(data);
            });

            //On Error
            putData.error(function (data, status, headers, config) {
                var message = "Could not send data to Server: " + status;
                notify.error(message);
                defer.reject(message);
            });

            return defer.promise;
        }

        delete<T>(url: string) {
            var defer = this.Q.defer<T>();

            var notify = this.notify;

            var deleteData = this.http.delete(url);

            deleteData.success(function (data: T) {
                defer.resolve(data);
            });

            deleteData.error(function (data, status, headers, config) {
                var message = "Could not send data to Server: " + status;
                notify.error(message);
                defer.reject(message);
            });

            return defer.promise;
        }
    }

    App.module.service("_data", DataService);
}


/// <reference path="../app.ts" />
/// <reference path="../../typings/toastr/toastr.d.ts" />
module App.Services {

    export class NotifyService {

        constructor() {
            toastr.options['closeButton'] = true;
        }

        success(message: string, title?: string) {
            console.log(message);
            toastr.success(this.parse(message), title);
        }
        error(message: string, title?: string) {
            console.error(message);
            toastr.error(this.parse(message), title);
        }
        info(message: string, title?: string) {
            console.info(message);
            toastr.info(this.parse(message), title);
        }
        warning(message: string, title?: string) {
            console.warn(message);
            toastr.warning(this.parse(message), title);
        }
        option(setting: string, value: any) {
            toastr.options[setting] = value;
        }

        parse(message: string) {
            if (!message || message.length <= 0) {
                return " &nbsp; ";
            }
            return message;
        }
    }
    App.module.service("_notify", NotifyService);
}
