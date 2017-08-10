///<reference path="../../../Application.ts"/>

module API.Products {
    "use strict";

    export class ProductsService {

        constructor(private $http, private $flux) { }

        /**
         * Uses the global api url to build the full API URL
         * @param uri {string}    The endpoint URI
         */
        private _apiUrl(uri: string): string {
            return App.Globals.API.url + uri;
        }

        /**
         * Uses the global api url to build the full API URL
         * @param data {Object}     The form data to be included in the request
         * @param success? {Function}    The success callback
         * @param error? {Function}     The error callback
         */
        public list(data:{} = {}, success?:Function, error?:Function): void {
            this.$http({
                method: 'POST',
                url: this._apiUrl('/products'),
                data: data
            }).then(
                (response) => !!success && success(response),
                (response) => !!error && error(response)
            );
        }
    }

    angular.module(App.name)
        .factory('$products', [
            '$http', '$flux',
            ($http, $flux) => new ProductsService($http, $flux)
        ]);
}
