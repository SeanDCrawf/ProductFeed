
describe('Component: Product', function() {

    var $scope, controller;

    beforeEach(function(){
        module(App.name);

        inject(function($rootScope, $compile) {
            var el = angular.element("<div product></div>");
            $compile(el)($rootScope.$new());
            $rootScope.$digest();

            controller = el.controller("product");
        });
    });

    it('should exist', function() {
        expect(controller).toBeTruthy();
    });

    describe('rollover()', function() {
        it('should activate the rollover state', function() {
            controller.rollover();
            expect(controller.$scope.rollover).toBeTruthy();
        });
        it('should de-activate the rollover state when false is passed', function() {
            controller.rollover(false);
            expect(controller.$scope.rollover).toBeFalsy();
        });
    });

});
