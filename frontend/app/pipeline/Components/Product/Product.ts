///<reference path="../../Application.ts"/>
///<reference path="ProductController.ts"/>

module App.Components.Product {
    "use strict";

    angular.module(App.name)
        .directive('product', function() {
            return {
                replace: true,
                transclude: true,
                templateUrl: 'pipeline/Components/Product/Product.html',
                scope: {
                    productData: '=',
                    view: '@'
                },
                controller: ProductControllerExport
            };
        });
}
