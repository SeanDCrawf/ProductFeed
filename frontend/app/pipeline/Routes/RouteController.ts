///<reference path="../Application.ts"/>

namespace App.Routes {

    export class RouteController {

        constructor(protected $scope, protected $flux) {
            this.$scope.controller = this;
        }

    }

    angular.module(App.name)
        .controller('Routes.RouteController', [
            '$scope', '$flux',
            ($scope, $flux) => new RouteController($scope, $flux)
        ]);
}
