///<reference path="../RouteController.ts"/>
///<reference path="../../Services/Store/StoreService.ts"/>
///<reference path="../../Services/Scroll/ScrollService.ts"/>

module App.Routes.Home {

	export class HomeController extends RouteController {

		constructor($scope, $flux, private $products, private $store) {
            super($scope, $flux);
			this.$scope.controller = this;
            this.$scope.products = [];
            this.$scope.model = {
                product_url: 'http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf8&fid=251713&categoryType=2&additionalType=2&limit=10'
            };

            this.$flux.subscribe({
                type: Store.Events.UPDATE,
                action: (key) => {
                    switch(key){
                        case 'products':
                            this._updateProducts()
                            break;
                        case 'scrollY':
                            this._updateScrollY()
                            break;
                    }
                }
            });

            this._updateProducts();
            if(!this.$scope.products){
                this.submit();
            }
		}

        /**
         * Determines the if the key press is the 'Enter' key and if so -> submit the form.
         * @param ev {KeyPressEvent}
         */
        public keypress(ev): void {
            ev.keyCode === 13 && this.submit();
        }

        /**
         * Dispatches an event to be picked up by the ScrollService
         * -> To scroll back to the top of the page.
         */
        public toTop(): void {
            this.$flux.dispatch({ type: Scroll.Events.SCROLL_TOP });
        }

        /**
         * Sends a product list request with the current value of the search field.
         */
        public submit(): void {
            this.$scope.loading = true;

            this.$products.list({ url: this.$scope.model.product_url },
                (r) => this._storeData(r),
                (r) => this._handleError(r));
        }

        /**
         * Handles the success callback.
         * -> Send the product data to the Store.
         * @param response {XMLHttpResponse}
         */
        private _storeData(response): void {
            this.$flux.dispatch({
                type: Store.Events.SET,
                payload: {
                    key: 'products',
                    value: response.data
                }
            });

            this.$scope.loading = false;
        }

        /**
         * Handles the error callback.
         * -> Creates error messages.
         * @param response {XMLHttpResponse}
         */
        private _handleError(response): void {
            for(var i in response.data){
                for(var q = 0; q < response.data[i].length; q++){
                    this.$flux.dispatch({
                        type: App.Globals.Events.ERROR_LOG,
                        payload: response.data[i][q]
                    });
                }
            }

            this.$scope.loading = false;
        }

        /**
         * Retrieves the current product list from the Store
         */
        private _updateProducts(): void {
            this.$scope.products = this.$store.get('products');
        }

        /**
         * Retrieves the current scrollY value from the Store
         */
        private _updateScrollY(): void {
            this.$scope.scrollY = this.$store.get('scrollY');
        }
	}

    angular.module(App.name)
        .controller('Routes.HomeController', [
	        '$scope', '$flux', '$products', '$store',
	        ($scope, $flux, $products, $store) => new HomeController($scope, $flux, $products, $store)
	    ]);
}
