///<reference path="_all.ts"/>

module App {
    'use strict';

    export var name = 'ProductFeed';

    export var Globals = {
        API: {
            url: 'http://localhost/product_feed/backend/public/api'
        },
        Events: {
            ERROR_LOG: 'error_log'
        }
    };

    angular
        .element(document)
        .ready(() => angular.bootstrap(document, [App.name]));

    angular
        .module(App.name, [ 'ngRoute' ])
        .config([ '$routeProvider', ($routeProvider) => {
            //Routes
            $routeProvider
                .when('/', {
                    templateUrl: 'pipeline/Routes/Home/Home.html'
                })
                .when('/product/:product_id', {
                    templateUrl: 'pipeline/Routes/Product/Product.html'
                });
        }])
        .run([ '$store', '$scroll', ($store, $scroll) => null ]);
}







