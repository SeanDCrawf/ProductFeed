///<reference path="../../Application.ts"/>

module App.Components.Loader {
    "use strict";

    angular.module(App.name)
        .directive('loader', function() {
            return {
                replace: true,
                transclude: true,
                templateUrl: 'pipeline/Components/Loader/Loader.html',
                scope: {

                }
            };
        });
}
