///<reference path="../RouteController.ts"/>
///<reference path="../../Services/Store/StoreService.ts"/>
///<reference path="../../Services/Scroll/ScrollService.ts"/>

module App.Routes.Product {

	export class ProductController extends RouteController {

		constructor($scope, $flux, private $products, private $store, private $routeParams, private $location) {
            super($scope, $flux);
			this.$scope.controller = this;
            this._updateProduct();
		}

        /**
         * Returns to the Home route.
         */
        public goBack(): void {
            this.$location.path('/');
        }

        /**
         * Retrieves the current product from the Store
         */
        private _updateProduct(): void {
            var products = this.$store.get('products');
            for(var i in products){
                if(products[i].productID === this.$routeParams.product_id){
                    return (this.$scope.product = products[i]);
                }
            }

            this.$location.path('/');

            this.$flux.dispatch({
                type: App.Globals.Events.ERROR_LOG,
                payload: 'Can\'t find that product.'
            });
        }

	}

    angular.module(App.name)
        .controller('Routes.ProductController', [
	        '$scope', '$flux', '$products', '$store', '$routeParams', '$location',
	        ($scope, $flux, $products, $store, $routeParams, $location) => new ProductController($scope, $flux, $products, $store, $routeParams, $location)
	    ]);
}
