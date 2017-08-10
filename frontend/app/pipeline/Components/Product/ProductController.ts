
module App.Components.Product {

	export class ProductController {

		constructor(private $scope, private $location) {
			this.$scope.controller = this;
		}

        /**
         * Opens the product URL in the current window
         */
		public goToProduct(): void {
			this.$location.path('/product/' + this.$scope.productData.productID);
		}

        /**
         * Activate/deactivates the rollover state of the product
         * @param state {boolean}    If the rollover state is active
         */
        public rollover(state:boolean = true): void {
            this.$scope.rollover = state;
        }

	}

    export var ProductControllerExport: any[] = [
        '$scope', '$location',
        ($scope, $location) => new ProductController($scope, $location)
    ];
}
